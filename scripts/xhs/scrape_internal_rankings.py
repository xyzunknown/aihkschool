#!/usr/bin/env python3
from __future__ import annotations

import argparse
import logging
import sys
import time
import traceback
from datetime import datetime
from pathlib import Path

_project_root = str(Path(__file__).resolve().parents[2])
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from scripts.xhs import config
from scripts.xhs.scrape_posts import (
    ensure_login,
    fetch_post_detail,
    random_delay,
    save_cookies,
    search_posts,
    setup_logging,
    warmup_session,
)
from scripts.xhs.utils import load_json, save_json


log = logging.getLogger("xhs_scraper")


DEFAULT_KEYWORDS_PATH = Path(__file__).with_name("internal_ranking_keywords.json")
DEFAULT_OUTPUT_DIR = config.XHS_DIR / "internal_rankings"
DEFAULT_OUTPUT_FILE = DEFAULT_OUTPUT_DIR / "ranking_posts.json"


def apply_internal_profile() -> None:
    config.SEARCH_PAGE_SETTLE_MIN = 4.0
    config.SEARCH_PAGE_SETTLE_MAX = 7.0
    config.DETAIL_NAVIGATION_COOLDOWN_MIN = 4.0
    config.DETAIL_NAVIGATION_COOLDOWN_MAX = 8.0
    config.DETAIL_PAGE_SETTLE_MIN = 5.0
    config.DETAIL_PAGE_SETTLE_MAX = 8.0
    config.DETAIL_FAIL_BACKOFF_MIN = 6.0
    config.DETAIL_FAIL_BACKOFF_MAX = 10.0
    config.SECURITY_REDIRECT_RETRY_WAIT_MIN = 6.0
    config.SECURITY_REDIRECT_RETRY_WAIT_MAX = 12.0
    config.SCHOOL_COOLDOWN_MIN = 4.0
    config.SCHOOL_COOLDOWN_MAX = 8.0


def slugify_keyword(keyword: str) -> str:
    sanitized = "".join(ch if ch.isalnum() else "_" for ch in keyword.strip())
    sanitized = "_".join(part for part in sanitized.split("_") if part)
    return sanitized.lower()[:80] or "keyword"


def load_keywords(path: Path) -> list[str]:
    raw = load_json(path)
    if not isinstance(raw, list):
        raise ValueError(f"Keyword file must be a JSON array: {path}")
    keywords: list[str] = []
    seen: set[str] = set()
    for item in raw:
        if not isinstance(item, str):
            continue
        keyword = item.strip()
        if keyword and keyword not in seen:
            seen.add(keyword)
            keywords.append(keyword)
    if not keywords:
        raise ValueError(f"No keywords found in {path}")
    return keywords


def collect_keyword_posts(page, keyword: str, max_posts: int, detail_limit: int) -> dict:
    summaries = search_posts(page, keyword, max_posts=max_posts, sort="general")
    summary_rows = [
        {
            "post_id": summary.get("post_id"),
            "url": summary.get("url"),
            "title": summary.get("title", ""),
            "search_keyword": keyword,
        }
        for summary in summaries
    ]
    posts: list[dict] = []
    seen_ids: set[str] = set()

    for summary in summaries:
        if len(posts) >= detail_limit:
            break
        post_id = summary.get("post_id")
        if not post_id or post_id in seen_ids:
            continue

        detail = fetch_post_detail(page, summary["url"])
        if not detail:
            continue

        seen_ids.add(post_id)
        posts.append(
            {
                "post_id": post_id,
                "url": detail.get("resolved_url") or summary["url"],
                "title": detail.get("title", "") or summary.get("title", ""),
                "content": detail.get("content", ""),
                "publish_date": detail.get("publish_date"),
                "likes": detail.get("likes", 0),
                "collects": detail.get("collects", 0),
                "comments_count": detail.get("comments_count", 0),
                "search_keyword": keyword,
                "fetch_timestamp": datetime.now().isoformat(),
            }
        )

        random_delay(config.ROUND1_MIN_DELAY, config.ROUND1_MAX_DELAY)

    return {
        "keyword": keyword,
        "summary_count": len(summaries),
        "detail_count": len(posts),
        "search_summaries": summary_rows,
        "posts": posts,
        "fetch_timestamp": datetime.now().isoformat(),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Scrape XHS ranking/recommendation posts for internal school pool discovery")
    parser.add_argument("--keywords", type=Path, default=DEFAULT_KEYWORDS_PATH, help="JSON array of ranking keywords")
    parser.add_argument("--max-keywords", type=int, default=0, help="Limit number of keywords to run, 0 means all")
    parser.add_argument("--max-posts-per-keyword", type=int, default=8, help="Max search results per keyword")
    parser.add_argument("--detail-limit-per-keyword", type=int, default=6, help="Max detail pages fetched per keyword")
    parser.add_argument("--headless", action="store_true", default=False, help="Run browser headless")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_FILE, help="Combined output JSON path")
    parser.add_argument("--resume", action="store_true", help="Reuse existing output and skip completed keywords")
    args = parser.parse_args()

    setup_logging(1)
    apply_internal_profile()

    keywords = load_keywords(args.keywords)
    if args.max_keywords > 0:
        keywords = keywords[: args.max_keywords]

    args.output.parent.mkdir(parents=True, exist_ok=True)
    existing = load_json(args.output) if args.resume and args.output.exists() else {}
    if not isinstance(existing, dict):
        existing = {}

    completed_keywords = {
        item.get("keyword")
        for item in existing.get("keywords", [])
        if isinstance(item, dict) and item.get("keyword")
    }

    targets = [keyword for keyword in keywords if keyword not in completed_keywords]
    log.info(f"Internal ranking crawl: {len(targets)}/{len(keywords)} keywords pending")
    log.info(f"  Max posts/keyword: {args.max_posts_per_keyword}")
    log.info(f"  Detail fetch/keyword: {args.detail_limit_per_keyword}")
    log.info("")

    if not targets:
        log.info("No pending keywords. Nothing to do.")
        return

    combined = {
        "mode": "internal_ranking_keywords",
        "generated_at": datetime.now().isoformat(),
        "keywords_path": str(args.keywords),
        "keywords": existing.get("keywords", []) if isinstance(existing.get("keywords"), list) else [],
    }

    pw, browser, context, page = ensure_login(headless=args.headless)
    warmup_session(page)

    try:
        for index, keyword in enumerate(targets, start=1):
            log.info(f"[{index}/{len(targets)}] {keyword}")
            try:
                result = collect_keyword_posts(
                    page,
                    keyword,
                    max_posts=args.max_posts_per_keyword,
                    detail_limit=args.detail_limit_per_keyword,
                )
                combined["keywords"].append(result)

                per_keyword_path = args.output.parent / f"{slugify_keyword(keyword)}.json"
                save_json(result, per_keyword_path)
                save_json(combined, args.output)

                log.info(f"  ✅ {result['detail_count']} detailed posts saved")
                save_cookies(context)
                time.sleep(config.SCHOOL_COOLDOWN_MIN)
            except Exception as exc:
                log.info(f"  ❌ {keyword} failed: {exc}")
                log.info(traceback.format_exc())
                save_json(combined, args.output)
    finally:
        try:
            browser.close()
            pw.stop()
        except Exception:
            pass


if __name__ == "__main__":
    main()