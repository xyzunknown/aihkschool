#!/usr/bin/env python3
"""
XHS Login Helper — Opens a visible browser for manual login.

Monitors the page for successful login automatically (no need to press Enter).
Once logged in, saves cookies and exits.

Usage:
    python scripts/xhs/login.py
"""
from __future__ import annotations

import sys
import time
from pathlib import Path

_project_root = str(Path(__file__).resolve().parents[2])
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

import random

from scripts.xhs import config
from scripts.xhs.site import build_home_url, build_search_url, has_session_cookie
from scripts.xhs.utils import load_json, save_json


def main():
    from playwright.sync_api import sync_playwright

    print("🔐 Opening XHS for login...")
    print("   Please log in via QR code or phone number.")
    print("   The script will detect login automatically.\n")

    # Pick random UA + viewport from pool (consistent with scraper)
    ua = random.choice(config.USER_AGENTS)
    vp = random.choice(config.VIEWPORT_OPTIONS)

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
        user_agent=ua,
        viewport=vp,
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

    # Navigate to XHS homepage for login
    try:
        page.goto(build_home_url(), timeout=15000, wait_until="commit")
    except Exception as e:
        print(f"   ⚠️ Initial navigation issue ({e.__class__.__name__}), continuing anyway...")
    
    time.sleep(3)

    print("   ⏳ Waiting for you to log in...")
    print("   (The login page will stay open — checking in the same page)\n")

    # ─── Polling strategy ─────────────────────────────────────────────
    # Reuse the same page for login checks so we don't open extra tabs/windows.
    max_wait = 300  # 5 minutes
    elapsed = 0
    check_interval = 10  # Check every 10 seconds (less aggressive)
    initial_wait = 15     # Give user 15 seconds before first check

    print(f"   (First check in {initial_wait}s — take your time scanning the QR code)")
    time.sleep(initial_wait)
    elapsed += initial_wait

    while elapsed < max_wait:
        try:
            # Method 1: Check cookies for login token (no navigation needed)
            cookies = context.cookies()
            has_session = has_session_cookie(cookies)

            if has_session:
                try:
                    page.goto(
                        build_search_url("幼稚園", current_url=page.url),
                        timeout=15000,
                        wait_until="domcontentloaded",
                    )
                    time.sleep(5)

                    body = page.evaluate("() => document.body.innerText.substring(0, 1000)")

                    if "登录后查看" not in body and "登錄後查看" not in body:
                        # Check for actual notes
                        note_count = page.evaluate("""() => {
                            return document.querySelectorAll(
                                'section.note-item, a[href*="/explore/"], [data-note-id]'
                            ).length;
                        }""")

                        if note_count > 0:
                            print(f"\n   ✅ Login successful! ({note_count} notes visible)")
                            cookies = context.cookies()
                            save_json(cookies, config.COOKIES_PATH)
                            print(f"   ✅ Cookies saved to {config.COOKIES_PATH}")
                            print("   You can now close this window and run the scraper.")
                            time.sleep(2)
                            browser.close()
                            pw.stop()
                            return True

                        print(f"   ⏳ Session cookie found but no notes yet... ({elapsed}s)")
                    else:
                        print(f"   ⏳ Session cookie found but login wall still showing... ({elapsed}s)")

                except Exception as e:
                    print(f"   ⏳ Same-page check error ({e.__class__.__name__})... ({elapsed}s)")
            else:
                print(f"   ⏳ Waiting for login... ({elapsed}s elapsed, no session cookie yet)")

        except Exception as e:
            error_name = e.__class__.__name__
            if "TargetClosedError" in error_name or "closed" in str(e).lower():
                print(f"\n   ❌ Browser was closed ({error_name}). Aborting.")
                try:
                    pw.stop()
                except Exception:
                    pass
                return False
            print(f"   ⏳ Check error ({error_name}), retrying... ({elapsed}s)")

        time.sleep(check_interval)
        elapsed += check_interval

    print("\n   ❌ Timeout — could not detect login after 5 minutes")
    print("   Try running this script again.")
    browser.close()
    pw.stop()
    return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
