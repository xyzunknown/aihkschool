#!/usr/bin/env python3
"""
LCSD SmartPLAY REST API 爬蟲
==============================
通過 SmartPLAY 公開 REST API 抓取全港課程 meta。
只抓取 K1-K3 適齡段（2-6 歲），不做任何報名/交易操作。

用法:
  python scripts/lcsd/scrape_api.py [--limit N] [--all-ages]

輸出: data/lcsd/programmes.json
"""

import argparse
import json
import os
import sys
import time
import random
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode

import requests

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from scripts.lcsd.config import (
    CATEGORY_KEYWORDS,
    OUTPUT_DIR,
    OUTPUT_FILE,
    SCRAPE_CONFIG,
    SMARTPLAY_BASE_URL,
)

# ── SmartPLAY API 常量 ──
API_BASE = f"{SMARTPLAY_BASE_URL}/rest/programme-catalog/api/v1/publ"
PARAM_API = f"{SMARTPLAY_BASE_URL}/rest/param/api/v1/publ"
PAGE_SIZE = 50
# SmartPLAY 地區代碼 → 系統地區碼
DISTRICT_CODE_MAP = {
    "CW": "central_and_western",
    "EN": "eastern",
    "SN": "southern",
    "WCH": "wan_chai",
    "KC": "kowloon_city",
    "KT": "kwun_tong",
    "SSP": "sham_shui_po",
    "WTS": "wong_tai_sin",
    "YTM": "yau_tsim_mong",
    "IS": "islands",
    "KwT": "kwai_tsing",
    "NTH": "north",
    "SK": "sai_kung",
    "ST": "sha_tin",
    "TP": "tai_po",
    "TW": "tsuen_wan",
    "TM": "tuen_mun",
    "YL": "yuen_long",
}

# SmartPLAY 活動類型代碼 → 可讀名稱
ACTIVITY_TYPE_MAP = {
    "AQU": "aquatics",
    "ARC": "archery",
    "ATH": "athletics",
    "BLG": "ball_games",
    "CMB": "combat_sports",
    "CYC": "cycling",
    "DAN": "dance",
    "GYM": "gymnastics",
    "MDS": "mind_sports",
    "ODR": "outdoor",
    "SWM": "swimming",
    "TCI": "tai_chi",
    "SPP": "special_programmes",
    "OTH": "others",
    "DF": "dance_fitness",
    "WSP": "water_sports",
}


def classify_category(name: str, activity_type: str = "") -> str:
    """根據課程名稱和活動類型分類"""
    name_lower = name.lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in name_lower:
                return cat

    # Fallback to activity type mapping
    if activity_type in ("SWM", "AQU", "WSP"):
        return "swimming"
    if activity_type == "DAN":
        return "dance"
    if activity_type in ("BLG", "ATH", "CMB", "GYM", "CYC", "ARC"):
        return "sport"
    if activity_type == "TCI":
        return "sport"

    return "other"


def is_age_eligible(age_from: int, age_to: int) -> bool:
    """檢查課程是否適合 K1-K3 年齡段（2-6 歲）"""
    # 有交集即算：課程的 [age_from, age_to] 與目標 [2, 6] 重疊
    return age_from <= 6 and age_to >= 2


class SmartPlayAPIClient:
    """SmartPLAY REST API 客戶端"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json",
            "Referer": f"{SMARTPLAY_BASE_URL}/programme/search-result?lang=en",
        })
        self._init_session()

    def _init_session(self):
        """初始化 session：獲取 cookies"""
        print("[Init] 獲取 session cookies...")
        resp = self.session.get(
            f"{SMARTPLAY_BASE_URL}/programme/search-result?lang=en",
            timeout=15,
        )
        resp.raise_for_status()
        print(f"[Init] Cookies: {list(self.session.cookies.keys())}")

    def _delay(self, short: bool = False):
        """隨機延遲"""
        if short:
            delay = random.uniform(0.5, 1.5)
        else:
            delay = random.uniform(1.0, 2.5)
        time.sleep(delay)

    def get_activities(self, page_no: int = 1, page_size: int = PAGE_SIZE,
                       lang: str = "en", age_range: str = None) -> dict:
        """獲取活動列表"""
        params = {
            "pageNum": page_no,
            "pageSize": page_size,
            "lang": lang,
        }
        if age_range:
            params["ageRange"] = age_range

        url = f"{API_BASE}/activities"
        resp = self.session.get(url, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if data.get("code") != "0":
            raise RuntimeError(f"API error: {data.get('message')}")
        return data["data"]

    def get_activity_detail(self, activity_id: int, lang: str = "en") -> dict:
        """獲取活動詳細信息"""
        url = f"{API_BASE}/activities/{activity_id}"
        params = {"lang": lang}
        resp = self.session.get(url, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if data.get("code") != "0":
            raise RuntimeError(f"API error: {data.get('message')}")
        return data.get("data", {})

    def get_filter_enums(self, lang: str = "en") -> dict:
        """獲取篩選枚舉值"""
        url = f"{API_BASE}/activity-params/filter-enums"
        params = {"lang": lang}
        resp = self.session.get(url, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("data", {})


def transform_activity(activity: dict, detail: dict = None) -> dict:
    """將 API 活動數據轉換為系統格式"""
    merged = {**activity}
    if detail:
        merged.update(detail)

    district_code = merged.get("district", "")
    system_district = DISTRICT_CODE_MAP.get(district_code)

    name_en = merged.get("enName") or merged.get("activityName", "")
    name_zh = merged.get("tcName") or ""
    name_sc = merged.get("scName") or ""

    # 報名日期
    enrl_start = merged.get("enrlStartDate")
    enrl_end = merged.get("enrlEndDate")
    fcfs_start = merged.get("fcfsStartDate")
    fcfs_end = merged.get("fcfsEndDate")

    # 優先使用 FCFS 日期，再用 ballot 日期
    enrolment_open = fcfs_start or enrl_start
    enrolment_close = fcfs_end or enrl_end

    # 轉換為 ISO 格式
    if enrolment_open and not enrolment_open.endswith("+08:00"):
        enrolment_open = enrolment_open.replace(" ", "T") + "+08:00" if " " in enrolment_open else enrolment_open
    if enrolment_close and not enrolment_close.endswith("+08:00"):
        enrolment_close = enrolment_close.replace(" ", "T") + "+08:00" if " " in enrolment_close else enrolment_close

    activity_type = merged.get("activityType", "")

    return {
        "lcsd_programme_id": str(merged.get("id", "")),
        "activity_no": merged.get("activityNo", ""),
        "name_zh": name_zh,
        "name_en": name_en,
        "name_sc": name_sc,
        "category": classify_category(name_en or name_zh, activity_type),
        "activity_type": ACTIVITY_TYPE_MAP.get(activity_type, activity_type),
        "programme_category": merged.get("pgmCat", ""),
        "age_min": merged.get("ageFrom"),
        "age_max": merged.get("ageTo"),
        "venue": merged.get("venue", ""),
        "venue_address": merged.get("venueAddr", ""),
        "venue_tel": merged.get("venueTelNo", ""),
        "district": system_district,
        "district_code": district_code,
        "fee_hkd": merged.get("fee"),
        "sessions_count": merged.get("lesson"),
        "total_quota": merged.get("totalQuota"),
        "quota_left": merged.get("quotaLeft"),
        "start_date": merged.get("startDate"),
        "end_date": merged.get("endDate"),
        "start_time": merged.get("startTime"),
        "end_time": merged.get("endTime"),
        "activity_week": merged.get("activityWeek", ""),
        "enrolment_method": merged.get("enrlMethod", ""),
        "enrolment_open_at": enrolment_open,
        "enrolment_close_at": enrolment_close,
        "enrolment_status": merged.get("status", ""),
        "instructor": merged.get("instructorName", ""),
        "target_group": merged.get("targetGroup", ""),
        "co_organiser": merged.get("coOrganiser"),
        "raw_url": f"{SMARTPLAY_BASE_URL}/programme/activity-detail?id={merged.get('id', '')}&lang=en",
        "is_active": True,
        "last_scraped_at": datetime.now(timezone.utc).isoformat(),
    }


def scrape_programmes(limit: int = None, all_ages: bool = False, fetch_details: bool = True):
    """主爬取流程"""
    client = SmartPlayAPIClient()

    # 使用兩個年齡段篩選：AR_0_4 (below 5) 和 AR_5_11 (5-11)
    age_ranges = [None] if all_ages else ["AR_0_4", "AR_5_11"]
    all_activities = {}  # id -> activity，用於去重

    for age_range in age_ranges:
        label = age_range or "all"
        print(f"\n{'='*50}")
        print(f"[Scrape] 開始抓取 age_range={label}")

        # 先獲取第一頁看總數
        first_page = client.get_activities(page_no=1, page_size=PAGE_SIZE, age_range=age_range)
        total = first_page["total"]
        pages = first_page["pages"]
        print(f"[Scrape] 共 {total} 條活動，{pages} 頁")

        # 收集所有列表數據
        for page_no in range(1, pages + 1):
            if limit and len(all_activities) >= limit:
                print(f"[Scrape] 已達上限 {limit}，停止")
                break

            if page_no == 1:
                page_data = first_page
            else:
                client._delay(short=True)
                try:
                    page_data = client.get_activities(
                        page_no=page_no, page_size=PAGE_SIZE, age_range=age_range
                    )
                except Exception as e:
                    print(f"[Error] 第 {page_no} 頁失敗: {e}")
                    continue

            activities = page_data.get("list", [])
            for act in activities:
                act_id = act.get("id")
                if act_id and act_id not in all_activities:
                    all_activities[act_id] = act

            print(f"[Scrape] 第 {page_no}/{pages} 頁: +{len(activities)} 條 (累計 {len(all_activities)})")

    print(f"\n[Scrape] 列表抓取完成：共 {len(all_activities)} 條不重複活動")

    # 過濾年齡適合的課程（如果已經用年齡篩選器抓的，再做一次精確過濾）
    if not all_ages:
        eligible = {}
        for act_id, act in all_activities.items():
            age_from = act.get("ageFrom", 0)
            age_to = act.get("ageTo", 199)
            if is_age_eligible(age_from, age_to):
                eligible[act_id] = act
        print(f"[Filter] 年齡過濾: {len(all_activities)} → {len(eligible)} 條 (2-6 歲適齡)")
        all_activities = eligible

    if limit:
        # 截斷到 limit
        ids = list(all_activities.keys())[:limit]
        all_activities = {k: all_activities[k] for k in ids}

    # 獲取詳細信息
    programmes = []
    total_to_fetch = len(all_activities)
    batch_count = 0

    for i, (act_id, act) in enumerate(all_activities.items(), 1):
        detail = None
        if fetch_details:
            try:
                client._delay()
                detail = client.get_activity_detail(act_id)
            except Exception as e:
                print(f"[Detail Error] ID {act_id}: {e}")

            batch_count += 1
            if batch_count % 50 == 0:
                print(f"[Batch] 已處理 {batch_count}/{total_to_fetch}，暫停 5 秒...")
                time.sleep(5)

        prog = transform_activity(act, detail)
        programmes.append(prog)

        if i % 20 == 0 or i == total_to_fetch:
            print(f"[Progress] {i}/{total_to_fetch} ({i*100//total_to_fetch}%)")

    return programmes


def save_results(programmes: list[dict]):
    """保存結果"""
    output_dir = PROJECT_ROOT / OUTPUT_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / OUTPUT_FILE

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(programmes, f, ensure_ascii=False, indent=2)
    print(f"\n[Save] 已保存到 {output_path} ({len(programmes)} 條)")

    # 保存 progress
    progress = {
        "last_run": datetime.now(timezone.utc).isoformat(),
        "total_programmes": len(programmes),
        "method": "rest_api",
    }
    with open(output_dir / "scrape_progress.json", "w", encoding="utf-8") as f:
        json.dump(progress, f, ensure_ascii=False, indent=2)


def print_stats(programmes: list[dict]):
    """輸出統計"""
    print(f"\n{'='*50}")
    print(f"SmartPLAY API 爬蟲完成")
    print(f"{'='*50}")
    print(f"總課程數: {len(programmes)}")

    by_cat = {}
    for p in programmes:
        cat = p.get("category", "other")
        by_cat[cat] = by_cat.get(cat, 0) + 1
    print(f"\n按類別:")
    for cat, count in sorted(by_cat.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")

    by_dist = {}
    for p in programmes:
        dist = p.get("district") or "未知"
        by_dist[dist] = by_dist.get(dist, 0) + 1
    print(f"\n按地區:")
    for dist, count in sorted(by_dist.items(), key=lambda x: -x[1])[:10]:
        print(f"  {dist}: {count}")

    by_method = {}
    for p in programmes:
        m = p.get("enrolment_method", "unknown")
        by_method[m] = by_method.get(m, 0) + 1
    print(f"\n按報名方式:")
    for m, count in sorted(by_method.items(), key=lambda x: -x[1]):
        print(f"  {m}: {count}")

    has_enrolment = sum(1 for p in programmes if p.get("enrolment_open_at"))
    has_fee = sum(1 for p in programmes if p.get("fee_hkd") is not None)
    has_detail = sum(1 for p in programmes if p.get("venue_address"))
    print(f"\n數據完整性:")
    print(f"  有報名日期: {has_enrolment}/{len(programmes)}")
    print(f"  有費用: {has_fee}/{len(programmes)}")
    print(f"  有場地地址: {has_detail}/{len(programmes)}")


def main():
    parser = argparse.ArgumentParser(description="LCSD SmartPLAY REST API 爬蟲")
    parser.add_argument("--limit", type=int, default=None, help="最多抓取 N 個課程")
    parser.add_argument("--all-ages", action="store_true", help="抓取所有年齡段（不過濾）")
    parser.add_argument("--no-details", action="store_true", help="跳過詳情抓取（只取列表）")
    parser.add_argument("--output", type=str, default=None, help="自定義輸出路徑")
    args = parser.parse_args()

    programmes = scrape_programmes(
        limit=args.limit,
        all_ages=args.all_ages,
        fetch_details=not args.no_details,
    )

    save_results(programmes)

    if args.output:
        output_path = Path(args.output)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(programmes, f, ensure_ascii=False, indent=2)
        print(f"[Output] 額外保存到 {output_path}")

    print_stats(programmes)


if __name__ == "__main__":
    main()
