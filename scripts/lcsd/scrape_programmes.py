#!/usr/bin/env python3
"""
LCSD SmartPLAY 課程爬蟲
========================
低頻抓取 SmartPLAY 全港課程 meta（名稱、場地、年齡、收費、日期、開放日期）。
只抓取 K1-K3 適齡段（2-6 歲），不做任何報名/交易操作。

用法:
  python scripts/lcsd/scrape_programmes.py [--resume] [--limit N] [--output FILE]

依賴: playwright, supabase-py (可選，直接寫 DB)
"""

import argparse
import asyncio
import json
import os
import random
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

# 加入 project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.lcsd.config import (
    CATEGORY_KEYWORDS,
    DISTRICT_MAP,
    OUTPUT_DIR,
    OUTPUT_FILE,
    PROGRESS_FILE,
    SCRAPE_CONFIG,
    SMARTPLAY_BASE_URL,
    TARGET_AGE_RANGES,
    USER_AGENT,
    VIEWPORT_SIZES,
)


def random_delay(min_s: float = None, max_s: float = None):
    """模擬真實用戶的隨機延遲"""
    min_s = min_s or SCRAPE_CONFIG["min_delay_seconds"]
    max_s = max_s or SCRAPE_CONFIG["max_delay_seconds"]
    delay = random.uniform(min_s, max_s)
    time.sleep(delay)
    return delay


def classify_category(name: str) -> str:
    """根據課程名稱分類"""
    name_lower = name.lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in name_lower:
                return cat
    return "other"


def resolve_district(venue_text: str) -> str | None:
    """從場地文本推斷地區"""
    if not venue_text:
        return None
    for cn_name, code in DISTRICT_MAP.items():
        if cn_name in venue_text:
            return code
    return None


def parse_age_range(age_text: str) -> tuple[int | None, int | None]:
    """從年齡描述文本解析年齡範圍"""
    if not age_text:
        return None, None

    # 嘗試匹配 "X-Y歲" 或 "X至Y歲"
    match = re.search(r"(\d+)\s*[-至到]\s*(\d+)\s*歲?", age_text)
    if match:
        return int(match.group(1)), int(match.group(2))

    # 嘗試匹配 "X歲以上" 或 "X歲或以上"
    match = re.search(r"(\d+)\s*歲?(?:或)?以上", age_text)
    if match:
        return int(match.group(1)), None

    # 嘗試匹配 "X歲以下"
    match = re.search(r"(\d+)\s*歲?(?:或)?以下", age_text)
    if match:
        return None, int(match.group(1))

    # 嘗試匹配單個年齡 "X歲"
    match = re.search(r"(\d+)\s*歲", age_text)
    if match:
        age = int(match.group(1))
        return age, age

    return None, None


def parse_fee(fee_text: str) -> float | None:
    """解析費用文本"""
    if not fee_text:
        return None
    fee_text = fee_text.strip()
    if "免費" in fee_text or "free" in fee_text.lower():
        return 0.0

    # 移除 $ 和 HK$ 前綴
    fee_text = re.sub(r"HK?\$\s*", "", fee_text)

    match = re.search(r"[\d,]+(?:\.\d+)?", fee_text)
    if match:
        return float(match.group().replace(",", ""))
    return None


def parse_date(date_text: str) -> str | None:
    """解析日期文本，返回 ISO date string"""
    if not date_text:
        return None

    # 嘗試多種日期格式
    patterns = [
        (r"(\d{4})[/-](\d{1,2})[/-](\d{1,2})", "%Y-%m-%d"),
        (r"(\d{1,2})[/-](\d{1,2})[/-](\d{4})", "%d-%m-%Y"),
    ]
    for pat, fmt in patterns:
        match = re.search(pat, date_text)
        if match:
            try:
                d = datetime.strptime(match.group(), fmt.replace("-", match.group()[4] if len(match.group()) > 8 else match.group()[2]))
                return d.strftime("%Y-%m-%d")
            except ValueError:
                pass

    # 嘗試中文日期 "2026年4月20日"
    match = re.search(r"(\d{4})年(\d{1,2})月(\d{1,2})日", date_text)
    if match:
        return f"{match.group(1)}-{int(match.group(2)):02d}-{int(match.group(3)):02d}"

    return None


def parse_datetime(dt_text: str) -> str | None:
    """解析日期時間文本，返回 ISO datetime string"""
    if not dt_text:
        return None

    date_part = parse_date(dt_text)
    if not date_part:
        return None

    # 嘗試提取時間
    time_match = re.search(r"(\d{1,2}):(\d{2})(?::(\d{2}))?", dt_text)
    if time_match:
        h, m = int(time_match.group(1)), int(time_match.group(2))
        s = int(time_match.group(3)) if time_match.group(3) else 0
        return f"{date_part}T{h:02d}:{m:02d}:{s:02d}+08:00"

    # 嘗試匹配上午/下午
    am_pm_match = re.search(r"(上午|下午)\s*(\d{1,2})", dt_text)
    if am_pm_match:
        h = int(am_pm_match.group(2))
        if am_pm_match.group(1) == "下午" and h < 12:
            h += 12
        return f"{date_part}T{h:02d}:00:00+08:00"

    return f"{date_part}T00:00:00+08:00"


def is_age_eligible(age_min: int | None, age_max: int | None) -> bool:
    """檢查課程是否在目標年齡範圍（2-6 歲）"""
    if age_min is None and age_max is None:
        return True  # 無年齡限制，保留

    for target in TARGET_AGE_RANGES:
        t_min, t_max = target["min"], target["max"]
        # 有交集即可
        if age_min is not None and age_max is not None:
            if age_min <= t_max and age_max >= t_min:
                return True
        elif age_min is not None:
            if age_min <= t_max:
                return True
        elif age_max is not None:
            if age_max >= t_min:
                return True

    return False


class SmartPlayScraper:
    """SmartPLAY 課程爬蟲"""

    def __init__(self, headless: bool = True, resume: bool = False):
        self.headless = headless
        self.resume = resume
        self.programmes: list[dict] = []
        self.progress: dict = {"scraped_pages": 0, "total_programmes": 0, "last_page": 0}
        self.consecutive_failures = 0
        self.output_dir = PROJECT_ROOT / OUTPUT_DIR
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def _load_progress(self):
        """載入上次進度"""
        progress_path = self.output_dir / PROGRESS_FILE
        if self.resume and progress_path.exists():
            with open(progress_path, "r", encoding="utf-8") as f:
                self.progress = json.load(f)
            print(f"[Resume] 從第 {self.progress.get('last_page', 0)} 頁繼續")

            # 載入已抓取的數據
            output_path = self.output_dir / OUTPUT_FILE
            if output_path.exists():
                with open(output_path, "r", encoding="utf-8") as f:
                    self.programmes = json.load(f)
                print(f"[Resume] 已載入 {len(self.programmes)} 個課程")

    def _save_progress(self):
        """保存進度"""
        progress_path = self.output_dir / PROGRESS_FILE
        self.progress["total_programmes"] = len(self.programmes)
        self.progress["last_saved"] = datetime.now(timezone.utc).isoformat()
        with open(progress_path, "w", encoding="utf-8") as f:
            json.dump(self.progress, f, ensure_ascii=False, indent=2)

    def _save_programmes(self):
        """保存課程數據"""
        output_path = self.output_dir / OUTPUT_FILE
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(self.programmes, f, ensure_ascii=False, indent=2)
        print(f"[Save] 已保存 {len(self.programmes)} 個課程到 {output_path}")

    async def scrape(self, limit: int | None = None):
        """主爬取流程"""
        from playwright.async_api import async_playwright

        self._load_progress()

        async with async_playwright() as p:
            viewport = random.choice(VIEWPORT_SIZES)
            browser = await p.chromium.launch(headless=self.headless)
            context = await browser.new_context(
                viewport=viewport,
                user_agent=USER_AGENT,
                locale="zh-HK",
                timezone_id="Asia/Hong_Kong",
            )
            page = await context.new_page()

            try:
                # 1. 打開 SmartPLAY 首頁
                print(f"[Nav] 打開 SmartPLAY: {SMARTPLAY_BASE_URL}")
                await page.goto(SMARTPLAY_BASE_URL, wait_until="networkidle", timeout=30000)
                random_delay(3, 6)

                # 2. 嘗試導航到搜索頁面
                print("[Nav] 導航到課程搜索…")
                await self._navigate_to_search(page)
                random_delay(2, 5)

                # 3. 設置搜索條件（年齡範圍 2-6 歲）
                print("[Search] 設置搜索條件…")
                await self._setup_search_filters(page)
                random_delay(2, 4)

                # 4. 執行搜索
                print("[Search] 執行搜索…")
                await self._execute_search(page)
                random_delay(3, 6)

                # 5. 解析搜索結果
                page_num = self.progress.get("last_page", 0)
                batch_count = 0
                no_more_pages = False

                while not no_more_pages:
                    page_num += 1
                    print(f"\n[Page {page_num}] 解析搜索結果…")

                    try:
                        new_programmes = await self._parse_results_page(page)

                        if not new_programmes:
                            print(f"[Page {page_num}] 無更多結果，結束")
                            break

                        # 篩選適齡課程
                        eligible = [
                            p for p in new_programmes
                            if is_age_eligible(p.get("age_min"), p.get("age_max"))
                        ]

                        self.programmes.extend(eligible)
                        self.progress["scraped_pages"] = page_num
                        self.progress["last_page"] = page_num
                        self.consecutive_failures = 0

                        print(f"[Page {page_num}] 找到 {len(new_programmes)} 個課程，"
                              f"{len(eligible)} 個適齡，累計 {len(self.programmes)} 個")

                        if limit and len(self.programmes) >= limit:
                            print(f"[Limit] 已達限制 {limit}，停止")
                            break

                        # 批次保存 & 延遲
                        batch_count += 1
                        if batch_count % SCRAPE_CONFIG["batch_size"] == 0:
                            self._save_programmes()
                            self._save_progress()
                            pause_min = SCRAPE_CONFIG["batch_delay_minutes"]
                            print(f"[Batch] 批次完成，暫停 {pause_min} 分鐘…")
                            await asyncio.sleep(pause_min * 60)
                        else:
                            random_delay()

                        # 翻頁
                        no_more_pages = not await self._go_to_next_page(page)
                        if not no_more_pages:
                            random_delay(3, 7)

                    except Exception as e:
                        self.consecutive_failures += 1
                        print(f"[Error] 頁面 {page_num} 解析失敗: {e}")

                        if self.consecutive_failures >= SCRAPE_CONFIG["max_consecutive_failures"]:
                            pause = SCRAPE_CONFIG["failure_pause_minutes"]
                            print(f"[Pause] 連續失敗 {self.consecutive_failures} 次，暫停 {pause} 分鐘")
                            await asyncio.sleep(pause * 60)
                            self.consecutive_failures = 0
                        else:
                            random_delay(5, 15)

                        # 嘗試翻頁繼續
                        no_more_pages = not await self._go_to_next_page(page)

                # 6. 抓取各課程詳情
                print(f"\n[Detail] 開始抓取 {len(self.programmes)} 個課程的詳情…")
                for i, prog in enumerate(self.programmes):
                    if prog.get("_detail_fetched"):
                        continue

                    if prog.get("raw_url"):
                        try:
                            detail = await self._fetch_programme_detail(page, prog["raw_url"])
                            prog.update(detail)
                            prog["_detail_fetched"] = True
                            print(f"[Detail {i+1}/{len(self.programmes)}] {prog.get('name_zh', 'N/A')}")
                        except Exception as e:
                            print(f"[Detail Error] {prog.get('name_zh', 'N/A')}: {e}")

                        random_delay()

                        if (i + 1) % SCRAPE_CONFIG["batch_size"] == 0:
                            self._save_programmes()
                            self._save_progress()

            except Exception as e:
                print(f"[Fatal] 爬蟲出錯: {e}")
                import traceback
                traceback.print_exc()

            finally:
                # 保存最終結果
                self._save_programmes()
                self._save_progress()
                await browser.close()

        # 去重
        self._deduplicate()
        self._save_programmes()

        print(f"\n[Done] 共抓取 {len(self.programmes)} 個適齡課程")
        return self.programmes

    async def _navigate_to_search(self, page):
        """導航到搜索頁面"""
        # SmartPLAY 是 SPA，嘗試多種方式
        try:
            # 嘗試直接 URL
            await page.goto(f"{SMARTPLAY_BASE_URL}/smart/search", wait_until="networkidle", timeout=20000)
        except Exception:
            # 嘗試點擊搜索按鈕
            try:
                search_btn = page.locator("text=搜尋").first
                if await search_btn.is_visible():
                    await search_btn.click()
                    await page.wait_for_load_state("networkidle", timeout=15000)
            except Exception:
                # 嘗試活動/課程列表連結
                try:
                    course_link = page.locator("text=活動").first
                    if await course_link.is_visible():
                        await course_link.click()
                        await page.wait_for_load_state("networkidle", timeout=15000)
                except Exception:
                    print("[Warn] 無法自動導航到搜索頁，繼續嘗試…")

    async def _setup_search_filters(self, page):
        """設置搜索過濾條件"""
        try:
            # 嘗試設定年齡篩選
            age_select = page.locator("select[name*='age'], [data-testid*='age']").first
            if await age_select.is_visible(timeout=3000):
                await age_select.select_option(label="2-6")
        except Exception:
            pass  # 篩選器可能不存在或格式不同

    async def _execute_search(self, page):
        """執行搜索"""
        try:
            search_btn = page.locator(
                "button[type='submit'], button:has-text('搜尋'), button:has-text('Search')"
            ).first
            if await search_btn.is_visible(timeout=5000):
                await search_btn.click()
                await page.wait_for_load_state("networkidle", timeout=20000)
        except Exception:
            print("[Warn] 無法找到搜索按鈕")

    async def _parse_results_page(self, page) -> list[dict]:
        """解析當前搜索結果頁面"""
        programmes = []

        # 嘗試多種選擇器來匹配課程卡片
        selectors = [
            ".programme-card",
            ".course-item",
            ".activity-card",
            "[class*='programme']",
            "[class*='course']",
            ".search-result-item",
            "table tbody tr",
            ".list-group-item",
        ]

        items = None
        for sel in selectors:
            items = page.locator(sel)
            count = await items.count()
            if count > 0:
                print(f"[Parse] 使用選擇器 '{sel}'，找到 {count} 個項目")
                break

        if not items or await items.count() == 0:
            # 嘗試從頁面 HTML 解析
            html = await page.content()
            programmes = self._parse_html_fallback(html)
            return programmes

        count = await items.count()
        for i in range(count):
            try:
                item = items.nth(i)
                prog = await self._extract_programme_from_element(item, page)
                if prog:
                    programmes.append(prog)
            except Exception as e:
                print(f"[Parse Error] 項目 {i}: {e}")
                continue

        return programmes

    async def _extract_programme_from_element(self, element, page) -> dict | None:
        """從頁面元素提取課程資料"""
        try:
            text = await element.inner_text()
            if not text.strip():
                return None

            # 嘗試提取連結
            link = None
            try:
                a_tag = element.locator("a").first
                if await a_tag.count() > 0:
                    href = await a_tag.get_attribute("href")
                    if href:
                        link = href if href.startswith("http") else f"{SMARTPLAY_BASE_URL}{href}"
            except Exception:
                pass

            # 嘗試提取結構化數據
            name_zh = ""
            venue = ""
            fee_text = ""
            age_text = ""
            date_text = ""
            lcsd_id = ""

            # 嘗試各種子元素選擇器
            for name_sel in [".programme-name", ".course-name", "h3", "h4", ".title", "td:first-child"]:
                try:
                    el = element.locator(name_sel).first
                    if await el.count() > 0:
                        name_zh = (await el.inner_text()).strip()
                        break
                except Exception:
                    continue

            if not name_zh:
                # 取第一行作為名稱
                lines = [l.strip() for l in text.split("\n") if l.strip()]
                name_zh = lines[0] if lines else ""

            for venue_sel in [".venue", ".location", "[class*='venue']", "[class*='location']"]:
                try:
                    el = element.locator(venue_sel).first
                    if await el.count() > 0:
                        venue = (await el.inner_text()).strip()
                        break
                except Exception:
                    continue

            for fee_sel in [".fee", ".price", "[class*='fee']", "[class*='price']"]:
                try:
                    el = element.locator(fee_sel).first
                    if await el.count() > 0:
                        fee_text = (await el.inner_text()).strip()
                        break
                except Exception:
                    continue

            for age_sel in [".age", "[class*='age']"]:
                try:
                    el = element.locator(age_sel).first
                    if await el.count() > 0:
                        age_text = (await el.inner_text()).strip()
                        break
                except Exception:
                    continue

            # 嘗試提取 programme ID
            try:
                data_id = await element.get_attribute("data-id")
                if data_id:
                    lcsd_id = data_id
            except Exception:
                pass

            if not lcsd_id and link:
                # 從 URL 提取 ID
                id_match = re.search(r"(?:id|programme|course)[=/](\w+)", link)
                if id_match:
                    lcsd_id = id_match.group(1)

            if not lcsd_id:
                # 用名稱 hash 作為臨時 ID
                import hashlib
                lcsd_id = f"sp_{hashlib.md5(name_zh.encode()).hexdigest()[:12]}"

            age_min, age_max = parse_age_range(age_text or text)
            fee = parse_fee(fee_text or text)

            return {
                "lcsd_programme_id": lcsd_id,
                "name_zh": name_zh,
                "name_en": None,
                "category": classify_category(name_zh),
                "age_min": age_min,
                "age_max": age_max,
                "venue": venue or None,
                "district": resolve_district(venue or text),
                "fee_hkd": fee,
                "sessions_count": None,
                "start_date": parse_date(date_text or text),
                "end_date": None,
                "enrolment_open_at": None,
                "enrolment_close_at": None,
                "raw_url": link,
                "is_active": True,
                "last_scraped_at": datetime.now(timezone.utc).isoformat(),
            }

        except Exception as e:
            print(f"[Extract Error] {e}")
            return None

    def _parse_html_fallback(self, html: str) -> list[dict]:
        """HTML 後備解析（用 cheerio/regex 從 HTML 直接提取）"""
        programmes = []
        try:
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(html, "html.parser")

            # 查找表格或列表結構
            rows = soup.select("table tbody tr") or soup.select(".list-group-item")
            for row in rows:
                text = row.get_text(strip=True)
                if not text or len(text) < 5:
                    continue

                link_tag = row.find("a")
                link = None
                if link_tag and link_tag.get("href"):
                    href = link_tag["href"]
                    link = href if href.startswith("http") else f"{SMARTPLAY_BASE_URL}{href}"

                name = link_tag.get_text(strip=True) if link_tag else text[:50]
                age_min, age_max = parse_age_range(text)

                import hashlib
                lcsd_id = f"sp_{hashlib.md5(name.encode()).hexdigest()[:12]}"

                programmes.append({
                    "lcsd_programme_id": lcsd_id,
                    "name_zh": name,
                    "name_en": None,
                    "category": classify_category(name),
                    "age_min": age_min,
                    "age_max": age_max,
                    "venue": None,
                    "district": resolve_district(text),
                    "fee_hkd": parse_fee(text),
                    "sessions_count": None,
                    "start_date": parse_date(text),
                    "end_date": None,
                    "enrolment_open_at": None,
                    "enrolment_close_at": None,
                    "raw_url": link,
                    "is_active": True,
                    "last_scraped_at": datetime.now(timezone.utc).isoformat(),
                })
        except ImportError:
            print("[Warn] beautifulsoup4 未安裝，跳過 HTML 後備解析")
        except Exception as e:
            print(f"[HTML Parse Error] {e}")

        return programmes

    async def _fetch_programme_detail(self, page, url: str) -> dict:
        """抓取單個課程詳情"""
        detail = {}
        try:
            await page.goto(url, wait_until="networkidle", timeout=20000)
            random_delay(2, 5)

            text = await page.inner_text("body")

            # 嘗試提取更多詳細信息
            age_min, age_max = parse_age_range(text)
            if age_min is not None:
                detail["age_min"] = age_min
            if age_max is not None:
                detail["age_max"] = age_max

            fee = parse_fee(text)
            if fee is not None:
                detail["fee_hkd"] = fee

            # 嘗試提取報名日期
            enrolment_patterns = [
                r"報名[日期開始]*[：:]\s*(.+?)(?:\n|$)",
                r"[Ee]nrolment\s*(?:starts?|opens?)[：:]\s*(.+?)(?:\n|$)",
                r"登記[日期開始]*[：:]\s*(.+?)(?:\n|$)",
            ]
            for pat in enrolment_patterns:
                match = re.search(pat, text)
                if match:
                    enrol_dt = parse_datetime(match.group(1))
                    if enrol_dt:
                        detail["enrolment_open_at"] = enrol_dt
                        break

            # 嘗試提取截止日期
            close_patterns = [
                r"截止[日期]*[：:]\s*(.+?)(?:\n|$)",
                r"[Ee]nrolment\s*(?:ends?|closes?)[：:]\s*(.+?)(?:\n|$)",
            ]
            for pat in close_patterns:
                match = re.search(pat, text)
                if match:
                    close_dt = parse_datetime(match.group(1))
                    if close_dt:
                        detail["enrolment_close_at"] = close_dt
                        break

            # 嘗試提取堂數
            session_match = re.search(r"(\d+)\s*(?:堂|節|課|sessions?)", text)
            if session_match:
                detail["sessions_count"] = int(session_match.group(1))

            # 提取開始/結束日期
            date_patterns = [
                r"日期[：:]\s*(.+?)(?:\n|$)",
                r"[Dd]ate[：:]\s*(.+?)(?:\n|$)",
            ]
            for pat in date_patterns:
                match = re.search(pat, text)
                if match:
                    date_str = match.group(1)
                    start = parse_date(date_str)
                    if start:
                        detail["start_date"] = start
                    # 嘗試提取結束日期（範圍格式）
                    end_match = re.search(r"[-至到]\s*(.+?)$", date_str)
                    if end_match:
                        end = parse_date(end_match.group(1))
                        if end:
                            detail["end_date"] = end
                    break

        except Exception as e:
            print(f"[Detail Error] {url}: {e}")

        return detail

    async def _go_to_next_page(self, page) -> bool:
        """翻到下一頁"""
        try:
            next_btn = page.locator(
                "button:has-text('下一頁'), a:has-text('下一頁'), "
                "button:has-text('Next'), a:has-text('Next'), "
                ".pagination .next:not(.disabled), "
                "[aria-label='Next page']"
            ).first

            if await next_btn.is_visible(timeout=3000):
                is_disabled = await next_btn.get_attribute("disabled")
                cls = await next_btn.get_attribute("class") or ""
                if is_disabled or "disabled" in cls:
                    return False

                await next_btn.click()
                await page.wait_for_load_state("networkidle", timeout=15000)
                return True
        except Exception:
            pass

        return False

    def _deduplicate(self):
        """去重"""
        seen = set()
        unique = []
        for prog in self.programmes:
            key = prog.get("lcsd_programme_id", "")
            if key and key not in seen:
                seen.add(key)
                unique.append(prog)
        self.programmes = unique


async def main():
    parser = argparse.ArgumentParser(description="LCSD SmartPLAY 課程爬蟲")
    parser.add_argument("--resume", action="store_true", help="從上次進度繼續")
    parser.add_argument("--limit", type=int, default=None, help="最多抓取 N 個課程")
    parser.add_argument("--output", type=str, default=None, help="輸出文件路徑")
    parser.add_argument("--headed", action="store_true", help="有頭模式（調試用）")
    args = parser.parse_args()

    scraper = SmartPlayScraper(headless=not args.headed, resume=args.resume)
    programmes = await scraper.scrape(limit=args.limit)

    # 如果指定了自定義輸出路徑
    if args.output:
        output_path = Path(args.output)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(programmes, f, ensure_ascii=False, indent=2)
        print(f"[Output] 已保存到 {output_path}")

    # 輸出統計
    print(f"\n{'='*50}")
    print(f"SmartPLAY 爬蟲完成")
    print(f"{'='*50}")
    print(f"總課程數: {len(programmes)}")

    # 按類別統計
    by_cat = {}
    for p in programmes:
        cat = p.get("category", "other")
        by_cat[cat] = by_cat.get(cat, 0) + 1
    print(f"按類別:")
    for cat, count in sorted(by_cat.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")

    # 按地區統計
    by_dist = {}
    for p in programmes:
        dist = p.get("district") or "未知"
        by_dist[dist] = by_dist.get(dist, 0) + 1
    print(f"按地區:")
    for dist, count in sorted(by_dist.items(), key=lambda x: -x[1])[:10]:
        print(f"  {dist}: {count}")

    # 有報名日期的比例
    has_enrolment = sum(1 for p in programmes if p.get("enrolment_open_at"))
    print(f"有報名日期: {has_enrolment}/{len(programmes)}")


if __name__ == "__main__":
    asyncio.run(main())
