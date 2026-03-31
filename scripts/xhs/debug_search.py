#!/usr/bin/env python3
"""Quick debug script to check XHS search in headless vs non-headless."""
from playwright.sync_api import sync_playwright
import json
import time

def test_search(headless: bool):
    mode = "headless" if headless else "visible"
    print(f"\n{'='*50}")
    print(f"Testing {mode} mode")
    print(f"{'='*50}")

    pw = sync_playwright().start()
    browser = pw.chromium.launch(
        headless=headless,
        args=["--disable-blink-features=AutomationControlled"],
    )
    context = browser.new_context(
        user_agent=(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/123.0.0.0 Safari/537.36"
        ),
        viewport={"width": 1440, "height": 900},
        locale="zh-TW",
    )

    # Load cookies
    cookies = json.load(open("data/xhs/cookies.json"))
    context.add_cookies(cookies)
    page = context.new_page()
    page.add_init_script(
        'Object.defineProperty(navigator, "webdriver", { get: () => undefined });'
    )

    kw = "維多利亞幼稚園 面試"
    url = (
        f"https://www.xiaohongshu.com/search_result"
        f"?keyword={kw}&source=web_search_result_notes"
    )
    print(f"URL: {url}")
    page.goto(url, timeout=30000, wait_until="domcontentloaded")
    time.sleep(8)

    # Get info
    current_url = page.url
    title = page.title()
    body_text = page.evaluate("() => document.body.innerText")
    
    print(f"Current URL: {current_url}")
    print(f"Title: {title}")
    print(f"Body text length: {len(body_text)}")
    print(f"Body text (first 800):\n{body_text[:800]}")
    
    # Check login/captcha
    has_login = "登录" in body_text or "登錄" in body_text
    has_captcha = "验证" in body_text or "驗證" in body_text
    print(f"\nLogin prompt in text: {has_login}")
    print(f"Captcha in text: {has_captcha}")
    
    # Count elements
    counts = page.evaluate("""() => {
        return {
            section_note: document.querySelectorAll('section.note-item').length,
            a_explore: document.querySelectorAll('a[href*="/explore/"]').length,
            divs: document.querySelectorAll('div').length,
            imgs: document.querySelectorAll('img').length,
        }
    }""")
    print(f"Element counts: {json.dumps(counts)}")

    browser.close()
    pw.stop()


if __name__ == "__main__":
    test_search(headless=True)
