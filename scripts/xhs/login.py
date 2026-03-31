#!/usr/bin/env python3
"""
XHS Login Helper — Opens a visible browser for manual login.

Monitors the page for successful login automatically (no need to press Enter).
Once logged in, saves cookies and exits.

Usage:
    python scripts/xhs/login.py
"""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

_project_root = str(Path(__file__).resolve().parents[2])
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from scripts.xhs import config
from scripts.xhs.utils import load_json, save_json


def main():
    from playwright.sync_api import sync_playwright

    print("🔐 Opening XHS for login...")
    print("   Please log in via QR code or phone number.")
    print("   The script will detect login automatically.\n")

    pw = sync_playwright().start()
    browser = pw.chromium.launch(
        headless=False,
        channel="chrome",  # Use system Chrome instead of bundled Chromium
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

    # Load existing cookies (might help skip some steps)
    if config.COOKIES_PATH.exists():
        cookies = load_json(config.COOKIES_PATH)
        if cookies:
            context.add_cookies(cookies)
            print("   Loaded existing cookies (may be expired)")

    page = context.new_page()
    page.add_init_script("""
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    """)

    # Navigate to XHS
    try:
        page.goto("https://www.xiaohongshu.com/", timeout=15000, wait_until="commit")
    except Exception as e:
        print(f"   ⚠️ Initial navigation issue ({e.__class__.__name__}), continuing anyway...")
    
    time.sleep(3)

    print("   ⏳ Waiting for you to log in...")
    print("   (checking every 5 seconds for search results)\n")

    # Poll: navigate to a search page periodically to check if logged in
    max_wait = 300  # 5 minutes
    elapsed = 0
    check_interval = 8

    while elapsed < max_wait:
        time.sleep(check_interval)
        elapsed += check_interval

        try:
            # Try navigating to search page to verify login
            page.goto(
                "https://www.xiaohongshu.com/search_result?keyword=幼稚園&source=web_search_result_notes",
                timeout=15000,
                wait_until="domcontentloaded",
            )
            time.sleep(4)

            body = page.evaluate("() => document.body.innerText.substring(0, 1000)")

            if "登录后查看" in body or "登錄後查看" in body:
                print(f"   ⏳ Still need login... ({elapsed}s elapsed)")
                # Go back to homepage so user can see QR code
                try:
                    page.goto("https://www.xiaohongshu.com/", timeout=10000, wait_until="domcontentloaded")
                except Exception:
                    pass
                continue

            # Check for note items
            note_count = page.evaluate("""() => {
                return document.querySelectorAll('section.note-item, a[href*="/explore/"], [data-note-id]').length;
            }""")

            if note_count > 0:
                print(f"\n   ✅ Login successful! ({note_count} notes visible)")
                # Save cookies
                cookies = context.cookies()
                save_json(cookies, config.COOKIES_PATH)
                print(f"   ✅ Cookies saved to {config.COOKIES_PATH}")
                print("   You can now close this window and run the scraper.")
                time.sleep(2)
                browser.close()
                pw.stop()
                return True

            print(f"   ⏳ Page loaded but no notes yet... ({elapsed}s elapsed)")

        except Exception as e:
            print(f"   ⏳ Check failed ({e.__class__.__name__}), retrying... ({elapsed}s)")

    print("\n   ❌ Timeout — could not detect login after 5 minutes")
    print("   Try running this script again.")
    browser.close()
    pw.stop()
    return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
