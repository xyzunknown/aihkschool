#!/usr/bin/env python3
"""
Phase 2 & 3: Scrape XHS posts (and comments for Round 2).

Uses Playwright to search Xiaohongshu for kindergarten-related posts,
fetch post details, and optionally scrape comments for hot posts.

Usage:
    # Round 1: all schools, max 50 posts each, no comments
    python -m scripts.xhs.scrape_posts --round 1

    # Round 2: top 100 schools, max 100 posts each + comments on hot posts
    python -m scripts.xhs.scrape_posts --round 2

    # Resume from where we left off
    python -m scripts.xhs.scrape_posts --round 1 --resume

    # Test with a single school
    python -m scripts.xhs.scrape_posts --test 619841
"""
from __future__ import annotations

import argparse
import json
import logging
import random
import re
import sys
import time
import traceback
from datetime import datetime
from pathlib import Path

# Always ensure the project root is on sys.path so relative imports work
# regardless of how the script is invoked (python -m, direct path, etc.)
_project_root = str(Path(__file__).resolve().parents[2])
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from scripts.xhs import config
from scripts.xhs.utils import (
    load_json,
    save_json,
    load_progress,
    save_progress,
    random_delay,
    classify_kg_post,
    match_post_to_school,
    split_name_and_branch,
)

# ─── Global state ────────────────────────────────────────────────────
seen_post_ids: set[str] = set()  # Cross-school dedup

# ─── Logging ─────────────────────────────────────────────────────────
log = logging.getLogger("xhs_scraper")


def setup_logging(round_num: int) -> None:
    """Configure logging to both console and file."""
    log_path = config.XHS_DIR / f"round{round_num}_log.txt"
    log.setLevel(logging.INFO)
    # File handler — always append
    fh = logging.FileHandler(log_path, mode="a", encoding="utf-8")
    fh.setLevel(logging.INFO)
    fh.setFormatter(logging.Formatter("%(asctime)s %(message)s", datefmt="%H:%M:%S"))
    # Console handler
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    ch.setFormatter(logging.Formatter("%(message)s"))
    log.addHandler(fh)
    log.addHandler(ch)


def create_browser(headless: bool = True):
    """Create Playwright browser with saved cookies."""
    from playwright.sync_api import sync_playwright

    pw = sync_playwright().start()
    browser = pw.chromium.launch(
        headless=headless,
        channel="chrome",  # Use system Chrome — less detectable than bundled Chromium
        args=[
            "--disable-blink-features=AutomationControlled",
            "--no-first-run",
            "--no-default-browser-check",
        ],
    )
    context = browser.new_context(
        user_agent=(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        ),
        viewport={"width": 1440, "height": 900},
        locale="zh-TW",
    )

    # Load cookies if available
    if config.COOKIES_PATH.exists():
        cookies = load_json(config.COOKIES_PATH)
        if cookies:
            context.add_cookies(cookies)
            log.info("  Loaded saved cookies")

    page = context.new_page()
    # Stealth: override navigator.webdriver
    page.add_init_script("""
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    """)
    return pw, browser, context, page


def save_cookies(context) -> None:
    """Save browser cookies for reuse."""
    cookies = context.cookies()
    save_json(cookies, config.COOKIES_PATH)


def login_manually(context, page) -> None:
    """Open XHS for manual login, then save cookies.
    
    Uses polling to detect login success instead of waiting for user input,
    so it works in non-interactive terminals (e.g. background processes).
    """
    log.info("  ⚠️  Manual login required!")
    log.info("  A browser window should be open. Please log in to Xiaohongshu.")
    log.info("  Monitoring for login success automatically...\n")

    try:
        page.goto("https://www.xiaohongshu.com/", timeout=15000, wait_until="commit")
    except Exception:
        pass

    # Poll for login success
    max_wait = 300  # 5 minutes
    elapsed = 0
    check_interval = 8

    while elapsed < max_wait:
        time.sleep(check_interval)
        elapsed += check_interval

        try:
            page.goto(
                "https://www.xiaohongshu.com/search_result?keyword=幼稚園&source=web_search_result_notes",
                timeout=15000,
                wait_until="domcontentloaded",
            )
            time.sleep(4)

            body = page.evaluate("() => document.body.innerText.substring(0, 1000)")
            if "登录后查看" in body or "登錄後查看" in body:
                log.info(f"  ⏳ Still need login... ({elapsed}s elapsed)")
                try:
                    page.goto("https://www.xiaohongshu.com/", timeout=10000, wait_until="domcontentloaded")
                except Exception:
                    pass
                continue

            note_count = page.evaluate("""() => {
                return document.querySelectorAll('section.note-item, a[href*="/explore/"], [data-note-id]').length;
            }""")

            if note_count > 0:
                log.info(f"  ✅ Login detected! ({note_count} notes visible)")
                save_cookies(context)
                log.info("  ✅ Cookies saved!")
                return

            log.info(f"  ⏳ No notes yet... ({elapsed}s)")

        except Exception as e:
            log.info(f"  ⏳ Check error ({e.__class__.__name__}), retrying... ({elapsed}s)")

    raise RuntimeError("Login timeout — no login detected after 5 minutes")


def check_login(page) -> bool:
    """Check if we're logged in by visiting a search page and seeing if results load."""
    try:
        page.goto(
            "https://www.xiaohongshu.com/search_result?keyword=幼稚園&source=web_search_result_notes",
            timeout=20000,
            wait_until="domcontentloaded",
        )
        # Wait longer for JS rendering
        time.sleep(6)
        body = page.evaluate("() => document.body.innerText")
        # If we see the login wall, session is expired
        if "登录后查看" in body or "登錄後查看" in body:
            log.info("  Session expired — login wall detected")
            return False
        if "login" in page.url.lower():
            return False
        # Check if note items loaded — try multiple selectors
        note_count = page.evaluate("""() => {
            const notes = document.querySelectorAll('section.note-item, a[href*="/explore/"], [data-note-id]');
            return notes.length;
        }""")
        if note_count > 0:
            log.info(f"  ✅ Session valid ({note_count} notes visible)")
            return True
        # No notes found — session is likely invalid
        log.info(f"  ❌ No notes found on search page — session invalid")
        return False
    except Exception as e:
        log.info(f"  ⚠️ Login check error: {e}")
        return False


def ensure_login(headless: bool) -> tuple:
    """
    Ensure we have a valid session. Always does login check in non-headless mode.
    Returns (pw, browser, context, page) ready for scraping.
    """
    # Step 1: Try with existing cookies in non-headless mode for login check
    pw, browser, context, page = create_browser(headless=False)

    if check_login(page):
        # Session is valid. If user wants headless, restart in headless mode
        save_cookies(context)
        if headless:
            browser.close()
            pw.stop()
            log.info("  Switching to headless mode for scraping...")
            pw, browser, context, page = create_browser(headless=True)
        return pw, browser, context, page

    # Step 2: Need manual login
    login_manually(context, page)

    # Verify login worked
    if not check_login(page):
        log.info("  ❌ Login failed — please try again")
        browser.close()
        pw.stop()
        raise RuntimeError("Login failed")

    save_cookies(context)

    # Switch to headless if requested
    if headless:
        browser.close()
        pw.stop()
        log.info("  Switching to headless mode for scraping...")
        pw, browser, context, page = create_browser(headless=True)

    return pw, browser, context, page


def parse_xhs_date(text: str) -> str | None:
    """
    Parse XHS relative/absolute dates to YYYY-MM-DD.
    Handles: "2天前", "1周前", "2024-10-15", "10-15", "昨天", "3月前" etc.
    """
    if not text:
        return None
    text = text.strip()
    now = datetime.now()

    # Absolute: "2024-10-15" or "2024年10月15日"
    m = re.match(r"(\d{4})[-年](\d{1,2})[-月](\d{1,2})", text)
    if m:
        return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"

    # Short absolute: "10-15" (current year)
    m = re.match(r"^(\d{1,2})-(\d{1,2})$", text)
    if m:
        return f"{now.year}-{int(m.group(1)):02d}-{int(m.group(2)):02d}"

    # Relative: "X天前", "X周前", "X月前", "X年前"
    m = re.search(r"(\d+)\s*(天|日|周|週|月|年)前", text)
    if m:
        n = int(m.group(1))
        unit = m.group(2)
        from datetime import timedelta
        if unit in ("天", "日"):
            dt = now - timedelta(days=n)
        elif unit in ("周", "週"):
            dt = now - timedelta(weeks=n)
        elif unit == "月":
            dt = now - timedelta(days=n * 30)
        elif unit == "年":
            dt = now - timedelta(days=n * 365)
        else:
            return None
        return dt.strftime("%Y-%m-%d")

    # "昨天"
    if "昨天" in text:
        from datetime import timedelta
        return (now - timedelta(days=1)).strftime("%Y-%m-%d")

    # "前天"
    if "前天" in text:
        from datetime import timedelta
        return (now - timedelta(days=2)).strftime("%Y-%m-%d")

    return None


def search_posts(
    page,
    keyword: str,
    max_posts: int = 50,
    sort: str = "general",
) -> list[dict]:
    """
    Search XHS for a keyword and collect post summaries.
    Returns list of {post_id, url, title, snippet}.
    """
    encoded_kw = keyword.replace(" ", "%20")
    sort_param = ""
    if sort == "popularity_descending":
        sort_param = "&sort=popularity_descending"
    elif sort == "time_descending":
        sort_param = "&sort=time_descending"

    url = (
        f"https://www.xiaohongshu.com/search_result?"
        f"keyword={encoded_kw}&source=web_search_result_notes{sort_param}"
    )

    try:
        page.goto(url, timeout=20000, wait_until="domcontentloaded")
        time.sleep(2 + random.random())
    except Exception as e:
        log.info(f"    ⚠️ Search page load failed: {e}")
        # Try once more with a fresh navigation
        try:
            page.goto("https://www.xiaohongshu.com/", timeout=10000, wait_until="domcontentloaded")
            time.sleep(2)
            page.goto(url, timeout=20000, wait_until="domcontentloaded")
            time.sleep(2 + random.random())
        except Exception:
            return []

    # Check for login wall mid-scrape
    try:
        body_text = page.evaluate("() => document.body.innerText.substring(0, 500)")
        if "登录后查看" in body_text or "登錄後查看" in body_text:
            log.info("    🔒 Login wall detected during search — session expired!")
            return []  # Caller should handle re-login
    except Exception:
        pass

    # Wait for note items
    try:
        page.wait_for_selector(
            'section.note-item, [data-note-id], a[href*="/explore/"]',
            timeout=8000,
        )
    except Exception:
        # No results or blocked
        return []

    posts: list[dict] = []
    last_count = 0
    scroll_attempts = 0

    while len(posts) < max_posts and scroll_attempts < 15:
        # Extract posts from current viewport
        items = page.evaluate("""() => {
            const results = [];
            // Try multiple selectors for XHS note cards
            const selectors = [
                'section.note-item a[href*="/explore/"]',
                'a[href*="/explore/"][class*="note"]',
                'div[class*="note-item"] a[href*="/explore/"]',
                'a[href*="/search_result/"]',
            ];
            const links = new Set();
            for (const sel of selectors) {
                document.querySelectorAll(sel).forEach(el => {
                    const href = el.getAttribute('href') || '';
                    const match = href.match(/explore\\/([a-f0-9]+)/);
                    if (match && !links.has(match[1])) {
                        links.add(match[1]);
                        const title = el.querySelector('.title, h3, [class*="title"]');
                        results.push({
                            post_id: match[1],
                            url: 'https://www.xiaohongshu.com' + href,
                            title: title ? title.innerText.trim() : '',
                        });
                    }
                });
            }
            return results;
        }""")

        for item in items:
            pid = item.get("post_id")
            if pid and pid not in seen_post_ids and pid not in {p["post_id"] for p in posts}:
                posts.append(item)

        if len(posts) >= max_posts:
            break

        # Scroll down
        page.evaluate("window.scrollBy(0, 800)")
        time.sleep(1.0 + random.random() * 1.5)

        if len(posts) == last_count:
            scroll_attempts += 1
        else:
            scroll_attempts = 0
            last_count = len(posts)

    return posts[:max_posts]


def fetch_post_detail(page, post_url: str) -> dict | None:
    """Navigate to a post and extract full content + metadata."""
    try:
        page.goto(post_url, timeout=15000, wait_until="domcontentloaded")
        time.sleep(1.5 + random.random())
    except Exception:
        return None

    try:
        page.wait_for_selector(
            '#detail-desc, .note-content, [class*="content"]',
            timeout=8000,
        )
    except Exception:
        pass  # Continue even if selector not found

    detail = page.evaluate("""() => {
        // Title
        const titleEl = document.querySelector(
            '#detail-title, .title, [class*="note-title"]'
        );
        const title = titleEl ? titleEl.innerText.trim() : '';

        // Content
        const contentEl = document.querySelector(
            '#detail-desc, .note-content, [class*="desc"], [class*="content"]'
        );
        const content = contentEl ? contentEl.innerText.trim() : '';

        // Date
        const dateEl = document.querySelector(
            '.date, [class*="date"], [class*="time"], span[data-type="date"]'
        );
        const dateText = dateEl ? dateEl.innerText.trim() : '';

        // Engagement — try multiple patterns
        function getNum(selectors) {
            for (const sel of selectors) {
                const el = document.querySelector(sel);
                if (el) {
                    const t = el.innerText.trim();
                    const m = t.match(/[\\d.]+[万]?/);
                    if (m) {
                        let n = parseFloat(m[0]);
                        if (m[0].includes('万')) n *= 10000;
                        return Math.round(n);
                    }
                }
            }
            return 0;
        }

        const likes = getNum([
            '[class*="like"] [class*="count"]',
            '.like-wrapper .count',
            'span[class*="like"]',
        ]);
        const collects = getNum([
            '[class*="collect"] [class*="count"]',
            '.collect-wrapper .count',
            'span[class*="collect"]',
        ]);
        const comments = getNum([
            '[class*="chat"] [class*="count"]',
            '.comment-wrapper .count',
            'span[class*="comment"]',
        ]);

        return { title, content, dateText, likes, collects, comments };
    }""")

    if not detail or (not detail.get("title") and not detail.get("content")):
        return None

    publish_date = parse_xhs_date(detail.get("dateText", ""))

    # Date filter: skip posts before MIN_DATE
    if publish_date and publish_date < config.MIN_DATE:
        return None

    return {
        "title": detail.get("title", ""),
        "content": detail.get("content", ""),
        "publish_date": publish_date,
        "likes": detail.get("likes", 0),
        "collects": detail.get("collects", 0),
        "comments_count": detail.get("comments", 0),
    }


def scrape_comments(page, post_url: str, max_comments: int = 30) -> list[dict]:
    """Scrape comments from a post page (for Round 2 hot posts)."""
    try:
        page.goto(post_url, timeout=15000, wait_until="domcontentloaded")
        time.sleep(2)
    except Exception:
        return []

    # Try to expand comments
    for _ in range(5):
        try:
            more_btn = page.query_selector(
                '[class*="show-more"], [class*="load-more"], button:has-text("查看更多")'
            )
            if more_btn:
                more_btn.click()
                time.sleep(1.5)
            else:
                break
        except Exception:
            break

    comments = page.evaluate(f"""() => {{
        const results = [];
        const items = document.querySelectorAll(
            '.comment-item, [class*="comment-item"], [class*="commentItem"]'
        );
        for (let i = 0; i < Math.min(items.length, {max_comments}); i++) {{
            const el = items[i];
            const textEl = el.querySelector(
                '.comment-text, [class*="content"], [class*="text"]'
            );
            const likeEl = el.querySelector('[class*="like"]');
            const dateEl = el.querySelector('[class*="date"], [class*="time"]');
            results.push({{
                content: textEl ? textEl.innerText.trim() : '',
                likes: likeEl ? parseInt(likeEl.innerText.replace(/[^\\d]/g, '') || '0') : 0,
                date_text: dateEl ? dateEl.innerText.trim() : '',
                is_reply: !!el.closest('[class*="reply"]'),
            }});
        }}
        return results;
    }}""")

    return [
        {
            "content": c["content"],
            "likes": c.get("likes", 0),
            "publish_date": parse_xhs_date(c.get("date_text")),
            "is_reply": c.get("is_reply", False),
        }
        for c in comments
        if c.get("content")
    ]


def scrape_school(
    page,
    school_entry: dict,
    max_posts: int,
    group_schools: list[dict] | None,
    fetch_comments: bool = False,
) -> dict:
    """
    Scrape all posts for a single school.
    Returns the raw post data dict to be saved.
    """
    school_code = school_entry["school_code"]
    name_tc = school_entry["name_tc"]

    all_posts: list[dict] = []
    local_ids: set[str] = set()

    # Search with different queries and sort modes
    queries_to_try = school_entry["search_queries"][:6]  # Max 6 queries
    sort_modes = ["general", "popularity_descending"]

    for sort_mode in sort_modes:
        if len(all_posts) >= max_posts:
            break

        for query in queries_to_try:
            if len(all_posts) >= max_posts:
                break

            remaining = max_posts - len(all_posts)
            search_results = search_posts(
                page, query, max_posts=min(remaining + 5, 30), sort=sort_mode
            )

            for sr in search_results:
                pid = sr["post_id"]
                if pid in seen_post_ids or pid in local_ids:
                    continue
                if len(all_posts) >= max_posts:
                    break

                # Fetch full detail
                detail = fetch_post_detail(page, sr["url"])
                if not detail:
                    random_delay(0.5, 1.0)
                    continue

                # KG classification
                kg_class = classify_kg_post(
                    detail.get("title", "") or sr.get("title", ""),
                    detail.get("content", ""),
                )
                if kg_class == "no":
                    continue

                # Multi-branch matching
                match = match_post_to_school(
                    {
                        "title": detail.get("title", "") or sr.get("title", ""),
                        "content": detail.get("content", ""),
                    },
                    school_entry,
                    group_schools,
                )

                post_record = {
                    "post_id": pid,
                    "url": sr["url"],
                    "title": detail.get("title", "") or sr.get("title", ""),
                    "content": detail.get("content", ""),
                    "author": "",
                    "publish_date": detail.get("publish_date"),
                    "likes": detail.get("likes", 0),
                    "collects": detail.get("collects", 0),
                    "comments_count": detail.get("comments_count", 0),
                    "search_keyword": query,
                    "matched_school_code": match["school_code"],
                    "branch_identified": match.get("branch_identified", True),
                    "match_confidence": match["match_confidence"],
                    "kg_confidence": kg_class,
                    "fetch_timestamp": datetime.now().isoformat(),
                }

                all_posts.append(post_record)
                local_ids.add(pid)
                seen_post_ids.add(pid)

                random_delay()

            random_delay(1.0, 2.0)

    # Round 2: fetch comments for hot posts
    comments_data: dict[str, list] = {}
    if fetch_comments and all_posts:
        # Sort by engagement, take top N
        sorted_posts = sorted(
            all_posts,
            key=lambda p: p["likes"] + p["collects"] + p["comments_count"],
            reverse=True,
        )
        hot_posts = [p for p in sorted_posts if p["comments_count"] > 0][
            : config.HOT_POSTS_FOR_COMMENTS
        ]

        for hp in hot_posts:
            log.info(f"      Fetching comments for {hp['post_id']}...")
            comments = scrape_comments(page, hp["url"], config.COMMENTS_PER_POST)
            if comments:
                comments_data[hp["post_id"]] = comments
                # Also save comments separately
                save_json(
                    comments,
                    config.RAW_COMMENTS_DIR / f"{hp['post_id']}.json",
                )
            random_delay()

    return {
        "school_code": school_code,
        "name_tc": name_tc,
        "total_posts": len(all_posts),
        "fetch_timestamp": datetime.now().isoformat(),
        "posts": all_posts,
        "comments": comments_data,
    }


def select_round2_schools(search_queries: list[dict]) -> list[dict]:
    """
    Select top schools for Round 2 based on Round 1 results.
    Reads raw_posts/ to calculate engagement scores.
    """
    school_stats: list[dict] = []

    for sq in search_queries:
        code = sq["school_code"]
        raw_path = config.RAW_POSTS_DIR / f"{code}.json"
        if not raw_path.exists():
            continue
        data = load_json(raw_path)
        posts = data.get("posts", [])
        if not posts:
            continue

        total_engagement = sum(
            p.get("likes", 0) + p.get("collects", 0) + p.get("comments_count", 0)
            for p in posts
        )
        interview_posts = sum(
            1 for p in posts
            if "面試" in (p.get("title", "") + " " + p.get("content", ""))
        )

        school_stats.append({
            **sq,
            "post_count": len(posts),
            "total_engagement": total_engagement,
            "interview_posts": interview_posts,
        })

    # Sort by engagement
    school_stats.sort(key=lambda s: s["total_engagement"], reverse=True)

    # Select: post_count >= 20 OR top 50 by engagement OR interview_posts >= 5
    selected: list[dict] = []
    selected_codes: set[str] = set()

    # Criteria 1: top by engagement
    for s in school_stats[: config.ROUND2_TOP_ENGAGEMENT]:
        if s["school_code"] not in selected_codes:
            selected.append(s)
            selected_codes.add(s["school_code"])

    # Criteria 2: post_count >= 20
    for s in school_stats:
        if s["school_code"] not in selected_codes and s["post_count"] >= config.ROUND2_MIN_POSTS:
            selected.append(s)
            selected_codes.add(s["school_code"])

    # Criteria 3: interview_posts >= 5
    for s in school_stats:
        if s["school_code"] not in selected_codes and s["interview_posts"] >= config.ROUND2_MIN_INTERVIEW_POSTS:
            selected.append(s)
            selected_codes.add(s["school_code"])

    # Cap at max
    selected = selected[: config.ROUND2_MAX_SCHOOLS]
    return selected


def main() -> None:
    parser = argparse.ArgumentParser(description="Scrape XHS posts for HK kindergartens")
    parser.add_argument("--round", type=int, default=1, choices=[1, 2], help="Scraping round")
    parser.add_argument("--resume", action="store_true", help="Resume from last checkpoint")
    parser.add_argument("--test", type=str, help="Test with a single school code")
    parser.add_argument("--headless", action="store_true", default=False, help="Run browser headless")
    args = parser.parse_args()

    setup_logging(args.round)

    # Load search queries
    search_queries = load_json(config.SEARCH_QUERIES_PATH)
    if not search_queries:
        log.info("❌ No search queries found. Run generate_search_queries.py first.")
        return

    # Build group lookup
    groups: dict[str, list[dict]] = {}
    schools_merged = load_json(config.SCHOOLS_MERGED_PATH)
    school_by_code = {s["code"]: s for s in schools_merged}
    for sq in search_queries:
        if sq["is_multi_branch"] and sq["group_name"]:
            groups.setdefault(sq["group_name"], []).append(school_by_code.get(sq["school_code"], {}))

    # Determine target list
    if args.test:
        targets = [sq for sq in search_queries if sq["school_code"] == args.test]
        if not targets:
            log.info(f"❌ School code {args.test} not found")
            return
    elif args.round == 2:
        targets = select_round2_schools(search_queries)
        log.info(f"Round 2: Selected {len(targets)} schools")
    else:
        targets = search_queries

    max_posts = config.ROUND2_MAX_POSTS if args.round == 2 else config.ROUND1_MAX_POSTS
    fetch_comments = args.round == 2

    # Resume support
    progress = load_progress()
    if args.resume and progress.get("round") == args.round:
        completed = set(progress.get("completed_schools", []))
        log.info(f"  Resuming: {len(completed)} schools already done")
    else:
        completed = set()
        progress = {
            "last_school_index": 0,
            "completed_schools": [],
            "failed_schools": {},
            "total_posts_fetched": 0,
            "round": args.round,
        }

    # Create directories
    config.RAW_POSTS_DIR.mkdir(parents=True, exist_ok=True)
    config.RAW_COMMENTS_DIR.mkdir(parents=True, exist_ok=True)

    # Launch browser — always verify login with visible window, then optionally go headless
    log.info(f"Starting Round {args.round} scraping...")
    log.info(f"  Targets: {len(targets)} schools")
    log.info(f"  Max posts/school: {max_posts}")
    log.info(f"  Comments: {'Yes' if fetch_comments else 'No'}")

    pw, browser, context, page = ensure_login(headless=args.headless)

    consecutive_failures = 0
    MAX_CONSECUTIVE_FAILURES = 10  # If 10 in a row fail, something is wrong
    login_wall_detected = False

    try:

        for i, target in enumerate(targets):
            code = target["school_code"]

            if code in completed:
                continue

            name = target["name_tc"]
            log.info(f"  [{i+1}/{len(targets)}] {name} ({code})")

            try:
                # Ensure page is still alive, recreate if needed
                try:
                    page.url  # Simple check
                except Exception:
                    log.info("    🔄 Recreating page...")
                    try:
                        page = context.new_page()
                        page.add_init_script("""
                            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
                        """)
                    except Exception as be:
                        log.info(f"    ❌ Browser context dead, restarting: {be}")
                        try:
                            browser.close()
                            pw.stop()
                        except Exception:
                            pass
                        pw, browser, context, page = ensure_login(headless=args.headless)

                group_schools = groups.get(target.get("group_name", ""))
                result = scrape_school(
                    page, target, max_posts, group_schools, fetch_comments
                )

                # Check if we got zero posts — might be login wall
                if result["total_posts"] == 0 and consecutive_failures >= 2:
                    # Verify session is still valid
                    if not check_login(page):
                        log.info("  🔒 Session expired! Re-authenticating...")
                        try:
                            browser.close()
                            pw.stop()
                        except Exception:
                            pass
                        pw, browser, context, page = ensure_login(headless=args.headless)
                        # Retry this school
                        result = scrape_school(
                            page, target, max_posts, group_schools, fetch_comments
                        )

                # Save raw posts
                save_json(result, config.RAW_POSTS_DIR / f"{code}.json")

                post_count = result["total_posts"]
                comment_count = sum(len(v) for v in result.get("comments", {}).values())
                log.info(f"    ✅ {post_count} posts, {comment_count} comments")

                progress["completed_schools"].append(code)
                progress["total_posts_fetched"] += post_count
                progress["last_school_index"] = i

                if post_count > 0:
                    consecutive_failures = 0
                else:
                    consecutive_failures += 1

            except Exception as e:
                log.info(f"    ❌ Error: {e}")
                log.info(traceback.format_exc())
                progress["failed_schools"][code] = str(e)
                consecutive_failures += 1

            if consecutive_failures >= MAX_CONSECUTIVE_FAILURES:
                log.info(f"  ❌❌ {MAX_CONSECUTIVE_FAILURES} consecutive zero-post schools — "
                         "attempting re-login before giving up...")
                try:
                    browser.close()
                    pw.stop()
                except Exception:
                    pass
                try:
                    pw, browser, context, page = ensure_login(headless=args.headless)
                    consecutive_failures = 0
                    log.info("  ✅ Re-login successful, continuing...")
                except Exception:
                    log.info("  ❌ Re-login failed. Stopping scraper.")
                    break

            # Save progress after every school
            save_progress(progress)

            # Summary every 10 schools
            if (i + 1) % 10 == 0:
                log.info(f"  📊 Progress: {len(progress['completed_schools'])} done, "
                         f"{progress['total_posts_fetched']} posts total")

            # Batch delay every 20 schools
            if (i + 1) % 20 == 0:
                delay = config.BATCH_DELAY + random.random() * 5
                log.info(f"  💤 Batch cooldown ({delay:.0f}s)...")
                time.sleep(delay)

        # Final save
        save_progress(progress)
        log.info(f"\n✅ Round {args.round} complete!")
        log.info(f"  Schools processed: {len(progress['completed_schools'])}")
        log.info(f"  Total posts: {progress['total_posts_fetched']}")
        log.info(f"  Failed schools: {len(progress['failed_schools'])}")

    except Exception as e:
        log.info(f"❌ Fatal error: {e}")
        log.info(traceback.format_exc())
        save_progress(progress)

    finally:
        try:
            browser.close()
            pw.stop()
        except Exception:
            pass


if __name__ == "__main__":
    main()
