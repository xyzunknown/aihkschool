#!/usr/bin/env python3
"""Debug: check what XHS search page actually looks like."""
from __future__ import annotations
import sys, time
from pathlib import Path

_project_root = str(Path(__file__).resolve().parents[2])
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from playwright.sync_api import sync_playwright
from scripts.xhs import config
from scripts.xhs.site import build_search_url, has_session_cookie, is_explore_url, is_search_url
from scripts.xhs.utils import load_json, save_json


def main():
    pw = sync_playwright().start()
    browser = pw.chromium.launch(
        headless=False,
        channel="chrome",
        args=["--disable-blink-features=AutomationControlled"],
    )
    context = browser.new_context(
        viewport={"width": 1280, "height": 900},
        user_agent=(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/125.0.0.0 Safari/537.36"
        ),
    )
    # Load cookies if exist
    if config.COOKIES_PATH.exists():
        cookies = load_json(config.COOKIES_PATH)
        if cookies:
            context.add_cookies(cookies)
            print(f"Loaded {len(cookies)} cookies")

    page = context.new_page()
    page.add_init_script(
        'Object.defineProperty(navigator, "webdriver", { get: () => undefined });'
    )

    url = build_search_url("幼稚園")
    print(f"Navigating to: {url}")
    page.goto(url, timeout=20000, wait_until="domcontentloaded")
    time.sleep(8)

    # Body text
    body = page.evaluate("() => document.body.innerText.substring(0, 800)")
    print("\n--- BODY TEXT (first 800 chars) ---")
    print(body)
    print(f"\nCurrent URL: {page.url}")
    print(f"Is search page: {is_search_url(page.url)}")
    print(f"Is explore page: {is_explore_url(page.url)}")

    # Selectors
    selectors = [
        "section.note-item",
        'a[href*="/explore/"]',
        "[data-note-id]",
        ".note-item",
        '[class*="note"]',
        '[class*="feeds"]',
        ".feeds-container",
        "#global-feed",
        "div.feeds-page",
        '[class*="search"]',
        '[class*="card"]',
        '[class*="Cover"]',
        '[class*="cover"]',
    ]
    print("\n--- SELECTOR COUNTS ---")
    for sel in selectors:
        count = page.evaluate(f'() => document.querySelectorAll("{sel}").length')
        if count > 0:
            print(f"  ✅ '{sel}': {count}")
        else:
            print(f"     '{sel}': 0")

    # Get all class names that contain 'note' or 'feed' or 'card'
    classes = page.evaluate("""() => {
        const all = document.querySelectorAll('*');
        const matches = new Set();
        for (const el of all) {
            for (const cls of el.classList) {
                if (cls.match(/note|feed|card|cover|search.*result/i)) {
                    matches.add(cls);
                }
            }
        }
        return Array.from(matches).sort().slice(0, 50);
    }""")
    print("\n--- RELEVANT CSS CLASSES ---")
    for c in classes:
        print(f"  {c}")

    # Save cookies regardless
    cookies = context.cookies()
    save_json(cookies, config.COOKIES_PATH)
    print(f"\nCookies saved: {len(cookies)} items → {config.COOKIES_PATH}")
    print(f"Session cookie detected: {has_session_cookie(cookies)}")

    browser.close()
    pw.stop()


if __name__ == "__main__":
    main()
