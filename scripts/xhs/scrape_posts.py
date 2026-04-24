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
from scripts.xhs.site import (
    build_home_url,
    build_search_url,
    choose_origin,
    has_session_cookie,
    has_session_cookie_for_domain,
    is_explore_url,
    is_search_url,
    normalize_search_url,
    normalize_url,
    preferred_origin_from_cookies,
)
from scripts.xhs.utils import (
    load_json,
    save_json,
    load_progress,
    save_progress,
    random_delay,
    maybe_long_pause,
    classify_kg_post,
    looks_like_ui_shell_text,
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
    """Create Playwright browser with saved cookies, randomized fingerprint."""
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

    ua = random.choice(config.USER_AGENTS)
    vp = random.choice(config.VIEWPORT_OPTIONS)
    log.info(f"  Browser fingerprint: {vp['width']}x{vp['height']}, UA=...{ua[-30:]}")

    context = browser.new_context(
        user_agent=ua,
        viewport=vp,
        locale="zh-TW",
    )

    # Load cookies if available
    if config.COOKIES_PATH.exists():
        cookies = load_json(config.COOKIES_PATH)
        if cookies:
            context.add_cookies(cookies)
            log.info("  Loaded saved cookies")

    page = context.new_page()
    # Stealth: override navigator.webdriver + more
    page.add_init_script("""
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        // Override chrome.runtime to look like real Chrome
        window.chrome = { runtime: {} };
        // Override permissions query
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) =>
            parameters.name === 'notifications'
                ? Promise.resolve({ state: Notification.permission })
                : originalQuery(parameters);
        // Override plugins to look real
        Object.defineProperty(navigator, 'plugins', {
            get: () => [1, 2, 3, 4, 5],
        });
        // Override languages
        Object.defineProperty(navigator, 'languages', {
            get: () => ['zh-TW', 'zh', 'en-US', 'en'],
        });
    """)
    return pw, browser, context, page


def save_cookies(context) -> None:
    """Save browser cookies for reuse."""
    cookies = context.cookies()
    save_json(cookies, config.COOKIES_PATH)


def session_origin(page, fallback: str | None = None) -> str:
    """Resolve the active site origin from the current page."""
    current_url = getattr(page, "url", None)
    if current_url:
        current = choose_origin(current_url, fallback)
        if current_url.startswith(current):
            return current
    try:
        cookies = page.context.cookies()
        return preferred_origin_from_cookies(cookies)
    except Exception:
        return choose_origin(current_url, fallback)


def page_has_logged_in_content(page) -> bool:
    """Detect whether the current page already shows real feed/detail content."""
    try:
        return bool(page.evaluate("""() => {
            const selectors = [
                'section.note-item',
                '[data-note-id]',
                'a[href*="/explore/"]',
                '[class*="feed"]',
                '[class*="note-item"]',
                '#detail-title',
                '#detail-desc',
                '.note-content'
            ];
            return selectors.some((selector) => document.querySelector(selector));
        }"""))
    except Exception:
        return False


def prime_cross_domain_session(page, context) -> None:
    """Visit both supported domains once so cookies/session can settle on each."""
    for target in ("https://www.xiaohongshu.com/", "https://www.rednote.com/explore"):
        try:
            page.goto(target, timeout=15000, wait_until="domcontentloaded")
            time.sleep(2)
        except Exception:
            continue
    save_cookies(context)


def session_valid_for_current_origin(page) -> bool:
    """Check whether the current site's search page is usable with the current cookies."""
    current = page.url
    search_url = build_search_url("幼稚園", current_url=current)
    try:
        page.goto(search_url, timeout=15000, wait_until="domcontentloaded")
        time.sleep(3)
        body = page.evaluate("() => document.body.innerText.substring(0, 1200)")
        if "登录后查看" in body or "登錄後查看" in body:
            return False
        if page_has_logged_in_content(page):
            return True
        cookies = page.context.cookies()
        host = current.split("//", 1)[-1].split("/", 1)[0]
        return has_session_cookie_for_domain(cookies, host)
    except Exception:
        cookies = page.context.cookies()
        host = current.split("//", 1)[-1].split("/", 1)[0]
        return has_session_cookie_for_domain(cookies, host)


def login_manually(context, page) -> None:
    """Open XHS for manual login, then save cookies.
    
    Uses polling to detect login success instead of waiting for user input,
    so it works in non-interactive terminals (e.g. background processes).
    
    Detection stays on the same page so the script does not open extra tabs/windows.
    """
    log.info("  ⚠️  Manual login required!")
    log.info("  A browser window should be open. Please log in to Xiaohongshu.")
    log.info("  The login page will stay open — checking in the same page.\n")

    try:
        context.clear_cookies()
    except Exception:
        pass

    try:
        page.goto(build_home_url(), timeout=15000, wait_until="commit")
    except Exception:
        pass

    # Give user time before first check
    initial_wait = 15
    log.info(f"  (First check in {initial_wait}s — take your time scanning the QR code)")
    time.sleep(initial_wait)

    max_wait = 300  # 5 minutes total
    elapsed = initial_wait
    check_interval = 10
    # Track how many times we've seen the session cookie — if we see it
    # consistently, trust it even if the background-tab verification fails.
    cookie_seen_count = 0

    while elapsed < max_wait:
        try:
            # Step 1: Quick cookie check (no navigation, no page disruption)
            cookies = context.cookies()
            has_session = has_session_cookie(cookies)

            if has_session:
                cookie_seen_count += 1

                # After seeing the cookie 3+ times (30s), trust it directly
                # — the background-tab search verification is unreliable
                if cookie_seen_count >= 3:
                    prime_cross_domain_session(page, context)
                    log.info(f"  ✅ Login detected! (web_session cookie present for {cookie_seen_count} checks)")
                    save_cookies(context)
                    log.info("  ✅ Cookies saved!")
                    return

                log.info(f"  ⏳ Login signal detected, confirming... ({elapsed}s)")
            else:
                cookie_seen_count = 0
                log.info(f"  ⏳ Waiting for login... ({elapsed}s, no session cookie)")

        except Exception as e:
            error_name = e.__class__.__name__
            if "TargetClosedError" in error_name or "closed" in str(e).lower():
                log.info(f"  ❌ Browser/page was closed during login polling ({error_name}). Aborting login.")
                raise RuntimeError(f"Browser closed during login: {e}")
            log.info(f"  ⏳ Check error ({error_name}), retrying... ({elapsed}s)")

        time.sleep(check_interval)
        elapsed += check_interval

    raise RuntimeError("Login timeout — no login detected after 5 minutes")


def check_login(page) -> bool:
    """Check if we're logged in. Uses homepage first (more reliable), falls back to search page."""
    # Strategy 1: Check homepage — less likely to be blocked
    try:
        page.goto(
            build_home_url(page.url),
            timeout=15000,
            wait_until="domcontentloaded",
        )
        time.sleep(4)
        body = page.evaluate("() => document.body.innerText.substring(0, 2000)")

        # Login wall check
        if "登录后查看" in body or "登錄後查看" in body:
            log.info("  Session expired — login wall detected on homepage")
            return False
        if "login" in page.url.lower():
            return False

        # Check whether the current origin can actually load search results.
        if session_valid_for_current_origin(page):
            log.info("  ✅ Session valid (current site can load search content)")
            return True

        # Homepage loaded without login wall but no feed items — 
        # could be slow JS rendering. Check cookies as fallback.
        cookies = page.context.cookies()
        has_session = has_session_cookie(cookies)
        if has_session:
            log.info("  ✅ Session valid (web_session cookie present, homepage loaded)")
            return True

        log.info("  ❌ No feed items and no session cookie on homepage")
        return False

    except Exception as e:
        log.info(f"  ⚠️ Login check error: {e}")
        # If page load timed out, check cookies as last resort
        try:
            cookies = page.context.cookies()
            has_session = has_session_cookie(cookies)
            if has_session:
                log.info("  ✅ Session valid (cookie fallback after timeout)")
                return True
        except Exception:
            pass
        return False


def ensure_login(headless: bool) -> tuple:
    """
    Ensure we have a valid session. Always does login check in non-headless mode.
    Returns (pw, browser, context, page) ready for scraping.
    
    NOTE: This should only be called ONCE at startup (or when no pw instance exists).
    For mid-scrape re-login, use refresh_session() instead to avoid asyncio conflicts.
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


def refresh_session(pw, browser, headless: bool) -> tuple:
    """
    Re-authenticate mid-scrape by reusing the existing Playwright instance.
    
    This avoids the "Playwright Sync API inside the asyncio loop" error
    that happens when calling sync_playwright().start() a second time.
    
    Strategy:
    1. Close old browser (but keep pw alive)
    2. Launch a new NON-headless browser on the same pw instance for login
    3. Check cookies / do manual login
    4. If headless requested, close that browser and launch headless one
    
    Returns (pw, browser, context, page).
    """
    log.info("  🔄 Refreshing session (reusing Playwright instance)...")
    
    # Close old browser — but NOT pw
    try:
        browser.close()
    except Exception:
        pass
    
    ua = random.choice(config.USER_AGENTS)
    vp = random.choice(config.VIEWPORT_OPTIONS)

    def _make_context(br):
        ctx = br.new_context(viewport=vp, user_agent=ua)
        if config.COOKIES_PATH.exists():
            cookies = load_json(config.COOKIES_PATH)
            if cookies:
                ctx.add_cookies(cookies)
                log.info("  Loaded saved cookies")
        return ctx

    def _make_page(ctx):
        p = ctx.new_page()
        p.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            window.chrome = { runtime: {} };
        """)
        return p

    def _launch(hl):
        return pw.chromium.launch(
            channel="chrome", headless=hl,
            args=["--disable-blink-features=AutomationControlled"],
        )
    
    # Launch new non-headless browser for login check
    browser = _launch(False)
    context = _make_context(browser)
    page = _make_page(context)
    
    if check_login(page):
        save_cookies(context)
        log.info("  ✅ Session refreshed — cookies still valid")
        if headless:
            browser.close()
            browser = _launch(True)
            context = _make_context(browser)
            page = _make_page(context)
            log.info("  Switched to headless mode for scraping")
        return pw, browser, context, page
    
    # Need manual login
    log.info("  🔒 Cookies invalid, need manual re-login...")
    login_manually(context, page)
    
    if not check_login(page):
        raise RuntimeError("Re-login failed")
    
    save_cookies(context)
    
    if headless:
        browser.close()
        browser = _launch(True)
        context = _make_context(browser)
        page = _make_page(context)
        log.info("  Switched to headless mode for scraping")
    
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


# ─── 真人行为模拟工具 ─────────────────────────────────────────────────

def human_scroll(page, distance: int | None = None) -> None:
    """
    Simulate realistic human scrolling: variable speed, occasional pause,
    sometimes scroll back up a bit.
    """
    if distance is None:
        distance = random.randint(300, 700)

    # 80% normal scroll, 15% slow scroll, 5% scroll up then down
    roll = random.random()
    if roll < 0.05:
        # Scroll up a bit then down (like re-reading something)
        page.evaluate(f"window.scrollBy(0, -{random.randint(100, 200)})")
        time.sleep(0.3 + random.random() * 0.5)
        page.evaluate(f"window.scrollBy(0, {distance + random.randint(100, 200)})")
    elif roll < 0.20:
        # Slow multi-step scroll
        for _ in range(random.randint(2, 4)):
            step = distance // random.randint(2, 4)
            page.evaluate(f"window.scrollBy(0, {step})")
            time.sleep(0.2 + random.random() * 0.4)
    else:
        # Normal scroll
        page.evaluate(f"window.scrollBy(0, {distance})")

    # Post-scroll pause (reading time)
    time.sleep(0.8 + random.random() * 2.0)


def human_mouse_move(page) -> None:
    """Simulate random mouse movement to look like a real user."""
    try:
        x = random.randint(200, 1200)
        y = random.randint(200, 700)
        page.mouse.move(x, y, steps=random.randint(5, 15))
        time.sleep(0.1 + random.random() * 0.3)
    except Exception:
        pass  # Non-critical, don't fail on this


def wait_for_network_settle(page, timeout_ms: int = 15000) -> None:
    """Best-effort wait for slow pages; ignore timeout because XHS often streams forever."""
    try:
        page.wait_for_load_state("networkidle", timeout=timeout_ms)
    except Exception:
        pass


def count_visible_result_items(page) -> int:
    """Count result cards/links currently available on the page."""
    try:
        return int(page.evaluate("""() => {
            const selectors = [
                'section.note-item',
                '[data-note-id]',
                'a[href*="/explore/"]',
            ];
            const seen = new Set();
            let count = 0;
            for (const sel of selectors) {
                document.querySelectorAll(sel).forEach((el) => {
                    const key = el.getAttribute('href') || el.getAttribute('data-note-id') || el.innerText || Math.random().toString();
                    if (!seen.has(key)) {
                        seen.add(key);
                        count += 1;
                    }
                });
            }
            return count;
        }"""))
    except Exception:
        return 0


def wait_for_search_results(page) -> str:
    """
    Wait for the search page to either show results, a clear login wall,
    a clear security redirect, or timeout.
    """
    deadline = time.time() + config.SEARCH_RESULTS_WAIT_TIMEOUT
    while time.time() < deadline:
        risk = detect_risk_control(page)
        if risk in ("login_wall", "security_redirect", "captcha_page"):
            return risk
        if count_visible_result_items(page) > 0:
            return "results"
        time.sleep(config.SEARCH_RESULTS_POLL_INTERVAL)
    return "timeout"


def wait_for_detail_content(page) -> str:
    """
    Wait for detail page content to show up before deciding it failed.
    """
    deadline = time.time() + config.DETAIL_CONTENT_WAIT_TIMEOUT
    while time.time() < deadline:
        risk = detect_risk_control(page)
        if risk in ("login_wall", "security_redirect", "captcha_page"):
            return risk
        if not is_explore_url(page.url):
            time.sleep(config.DETAIL_CONTENT_POLL_INTERVAL)
            continue
        try:
            has_content = bool(page.evaluate("""() => {
                return !!document.querySelector(
                    '#detail-desc, .note-content, div[class*="note-content"], [class*="desc"], [class*="content"], #detail-title, [class*="note-title"]'
                );
            }"""))
        except Exception:
            has_content = False
        if has_content:
            return "content"
        time.sleep(config.DETAIL_CONTENT_POLL_INTERVAL)
    return "timeout"


def warmup_session(page) -> None:
    """
    'Warm up' the session by browsing XHS naturally before scraping.
    Visit homepage, scroll a bit, click explore — like a real user opening the app.
    """
    log.info("  🌡️ Warming up session (browsing naturally for 15-25s)...")
    try:
        page.goto(build_home_url(page.url), timeout=15000, wait_until="domcontentloaded")
        time.sleep(3 + random.random() * 3)

        # Scroll the feed a few times
        for _ in range(random.randint(2, 4)):
            human_scroll(page, random.randint(300, 600))
            human_mouse_move(page)

        # Maybe click on the explore tab
        if random.random() < 0.3:
            try:
                page.goto(build_home_url(page.url), timeout=10000, wait_until="domcontentloaded")
                time.sleep(2 + random.random() * 2)
                human_scroll(page, random.randint(200, 400))
            except Exception:
                pass

        time.sleep(1 + random.random() * 2)
        log.info("  🌡️ Warmup complete")
    except Exception as e:
        log.info(f"  ⚠️ Warmup error (non-fatal): {e}")


def detect_risk_control(page) -> str | None:
    """
    Check if XHS has triggered any risk control measures.
    Returns a description of the detected risk, or None if all clear.
    """
    try:
        url = page.url.lower()
        body = page.evaluate("() => document.body.innerText.substring(0, 2000)")

        # Captcha / verification
        if "captcha" in url or "verify" in url:
            return "captcha_page"
        if "验证" in body or "驗證" in body or "滑动" in body:
            return "captcha_challenge"

        # Account restrictions
        if "账号异常" in body or "帳號異常" in body:
            return "account_abnormal"
        if "操作频繁" in body or "操作頻繁" in body:
            return "rate_limited"
        if "访问受限" in body or "訪問受限" in body:
            return "access_restricted"

        # 404 / security redirect
        if "/404/" in url or "sec_" in url:
            return "security_redirect"

        # Login wall
        if "登录后查看" in body or "登錄後查看" in body:
            return "login_wall"

    except Exception:
        pass
    return None


def handle_risk_control(risk: str, page, context) -> bool:
    """
    Handle a detected risk control event.
    Returns True if we should continue (after recovery), False to abort this action.
    """
    if risk == "login_wall":
        log.info("    🔒 登录墙 — session 过期")
        return False  # Caller should trigger re-login

    if risk == "rate_limited":
        pause = 120 + random.random() * 180  # 2-5 minutes
        log.info(f"    ⚠️ 频率限制! 暂停 {pause:.0f}s...")
        time.sleep(pause)
        return True

    if risk == "captcha_challenge":
        log.info("    ⚠️ 验证码! 暂停 60s 等待手动处理...")
        time.sleep(60)
        return True

    if risk in ("account_abnormal", "access_restricted"):
        pause = 300 + random.random() * 300  # 5-10 minutes
        log.info(f"    🚨 账号异常/访问受限! 长时间暂停 {pause:.0f}s...")
        time.sleep(pause)
        return True

    if risk in ("security_redirect", "captcha_page"):
        pause = 60 + random.random() * 60
        log.info(f"    ⚠️ 安全重定向! 暂停 {pause:.0f}s...")
        time.sleep(pause)
        return True

    return True


def search_posts(
    page,
    keyword: str,
    max_posts: int = 15,
    sort: str = "general",
) -> list[dict]:
    """
    Search XHS for a keyword and collect post summaries.
    Returns list of {post_id, url, title, snippet}.
    """
    current_origin = session_origin(page)
    url = build_search_url(keyword, sort=sort, current_url=page.url, fallback=current_origin)

    log.info(f"      🔍 搜索: {keyword} (sort={sort})")

    try:
        page.goto(url, timeout=20000, wait_until="domcontentloaded")
        wait_for_network_settle(page, timeout_ms=18000)
        time.sleep(config.SEARCH_PAGE_SETTLE_MIN + random.random() * (config.SEARCH_PAGE_SETTLE_MAX - config.SEARCH_PAGE_SETTLE_MIN))
        human_mouse_move(page)
    except Exception as e:
        log.info(f"      ⚠️ Search page load failed: {e}")
        # Try once more with a fresh navigation
        try:
            page.goto(build_home_url(page.url, current_origin), timeout=10000, wait_until="domcontentloaded")
            wait_for_network_settle(page, timeout_ms=12000)
            time.sleep(3 + random.random() * 3)
            page.goto(url, timeout=20000, wait_until="domcontentloaded")
            wait_for_network_settle(page, timeout_ms=18000)
            time.sleep(config.SEARCH_PAGE_SETTLE_MIN + random.random() * (config.SEARCH_PAGE_SETTLE_MAX - config.SEARCH_PAGE_SETTLE_MIN))
        except Exception:
            return []

    # Check for "note unavailable" or blank content on search page
    try:
        body_text = page.evaluate("() => document.body.innerText.substring(0, 1000)")
        if "当前笔记暂时无法浏览" in body_text:
            log.info(f"      - 搜索页无法浏览，跳过")
            return []
        if not is_search_url(page.url):
            redirected_url = normalize_search_url(url, page.url)
            if redirected_url != url:
                log.info("      ℹ️ 搜索页被重定向，按当前站点重试一次")
                page.goto(redirected_url, timeout=20000, wait_until="domcontentloaded")
                wait_for_network_settle(page, timeout_ms=18000)
                time.sleep(config.SEARCH_PAGE_SETTLE_MIN + random.random() * (config.SEARCH_PAGE_SETTLE_MAX - config.SEARCH_PAGE_SETTLE_MIN))
    except Exception:
        pass

    wait_status = wait_for_search_results(page)
    if wait_status != "results":
        if wait_status in ("login_wall", "security_redirect", "captcha_page"):
            log.info(f"      ⚠️ 搜索页风控: {wait_status}")
            handle_risk_control(wait_status, page, None)
            if wait_status == "login_wall":
                return []
        else:
            log.info("      - 搜索结果加载超时，先按无结果处理")
        return []

    posts: list[dict] = []
    last_count = 0
    scroll_attempts = 0

    while len(posts) < max_posts and scroll_attempts < config.MAX_SCROLL_ATTEMPTS:
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
                    const match = href.match(/\\/explore\\/([^/?#]+)/);
                    if (match && !links.has(match[1])) {
                        links.add(match[1]);
                        const title = el.querySelector('.title, h3, [class*="title"]');
                        results.push({
                            post_id: match[1],
                            url: new URL(href, window.location.origin).toString(),
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

        # Human-like scrolling
        human_scroll(page)
        human_mouse_move(page)

        if len(posts) == last_count:
            scroll_attempts += 1
        else:
            scroll_attempts = 0
            last_count = len(posts)

    log.info(f"      搜索到 {len(posts[:max_posts])} 个帖子链接")
    return posts[:max_posts]


def fetch_post_detail(page, post_url: str) -> dict | None:
    """Navigate to a post and extract full content + metadata."""
    log.info(f"      📄 抓取帖子: ...{post_url[-20:]}")
    cooldown = config.DETAIL_NAVIGATION_COOLDOWN_MIN + random.random() * (
        config.DETAIL_NAVIGATION_COOLDOWN_MAX - config.DETAIL_NAVIGATION_COOLDOWN_MIN
    )
    log.info(f"      🕒 详情页前缓冲 {cooldown:.0f}s...")
    time.sleep(cooldown)
    post_url = normalize_url(post_url, page.url)
    for attempt in range(2):
        try:
            page.goto(post_url, timeout=25000, wait_until="domcontentloaded")
            wait_for_network_settle(page, timeout_ms=20000)
            time.sleep(config.DETAIL_PAGE_SETTLE_MIN + random.random() * (config.DETAIL_PAGE_SETTLE_MAX - config.DETAIL_PAGE_SETTLE_MIN))
            human_mouse_move(page)
        except Exception:
            return None

        wait_status = wait_for_detail_content(page)
        if wait_status == "content":
            break
        if wait_status in ("login_wall", "captcha_page"):
            recovered = handle_risk_control(wait_status, page, None)
            if wait_status == "login_wall" or not recovered:
                return None
        elif wait_status == "security_redirect":
            if attempt == 0:
                pause = config.SECURITY_REDIRECT_RETRY_WAIT_MIN + random.random() * (
                    config.SECURITY_REDIRECT_RETRY_WAIT_MAX - config.SECURITY_REDIRECT_RETRY_WAIT_MIN
                )
                log.info(f"      ⚠️ 详情页安全重定向，慢等 {pause:.0f}s 后放弃本条，避免连续撞详情...")
                time.sleep(pause)
            return None
        else:
            log.info("      - 详情页加载超时，跳过")
            return None
    else:
        return None

    body_text = page.evaluate("() => document.body ? document.body.innerText : ''")
    if "当前笔记暂时无法浏览" in body_text:
        log.info("      - 笔记无法浏览，跳过")
        return None
    if not is_explore_url(page.url):
        log.info("      - 未进入帖子详情页，跳过")
        return None

    # Scroll down a bit to simulate reading
    human_scroll(page, random.randint(200, 400))

    detail = page.evaluate("""() => {
        // Title
        const titleEl = document.querySelector(
            '#detail-title, .title, [class*="note-title"]'
        );
        const title = titleEl ? titleEl.innerText.trim() : '';

        // Content
        let content = '';
        try {
            const contentEl = document.querySelector(
                '#detail-desc, .note-content, div[class*="note-content"], [class*="desc"], [class*="content"]'
            );
            content = contentEl ? contentEl.innerText.trim() : '';
        } catch (e) {
            // ignore if content cannot be found
        }

        const metaTitle = document.querySelector('meta[property="og:title"], meta[name="og:title"]')?.content?.trim() || '';
        const metaDescription = document.querySelector('meta[property="og:description"], meta[name="description"]')?.content?.trim() || '';
        const pageTitle = document.title ? document.title.trim() : '';

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

        return { title, content, metaTitle, metaDescription, pageTitle, dateText, likes, collects, comments };
    }""")

    if not detail:
        return None

    title = (detail.get("title") or "").strip()
    content = (detail.get("content") or "").strip()
    meta_title = (detail.get("metaTitle") or "").strip()
    meta_description = (detail.get("metaDescription") or "").strip()
    page_title = (detail.get("pageTitle") or "").strip()

    if not title:
        title = meta_title or page_title

    # Fall back to meta description when DOM content is just shell text.
    if not content or looks_like_ui_shell_text(content):
        content = meta_description or content

    if (
        not title and not content
    ) or looks_like_ui_shell_text(content) or "当前笔记暂时无法浏览" in title:
        return None

    if len(content.strip()) < 20 and len(title.strip()) < 6:
        return None

    publish_date = parse_xhs_date(detail.get("dateText", ""))

    # Date filter: skip posts before MIN_DATE
    if publish_date and publish_date < config.MIN_DATE:
        return None

    return {
        "resolved_url": page.url,
        "title": title,
        "content": content,
        "publish_date": publish_date,
        "likes": detail.get("likes", 0),
        "collects": detail.get("collects", 0),
        "comments_count": detail.get("comments", 0),
    }


def scrape_comments(page, post_url: str, max_comments: int = 30) -> list[dict]:
    """Scrape comments from a post page (for Round 2 hot posts)."""
    post_url = normalize_url(post_url, page.url)
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
    round_num: int = 1,
) -> dict:
    """
    Scrape all posts for a single school.
    Returns the raw post data dict to be saved.
    """
    school_code = school_entry["school_code"]
    name_tc = school_entry["name_tc"]

    # Round-specific delay config
    delay_min = config.ROUND1_MIN_DELAY if round_num == 1 else config.ROUND2_MIN_DELAY
    delay_max = config.ROUND1_MAX_DELAY if round_num == 1 else config.ROUND2_MAX_DELAY

    all_posts: list[dict] = []
    local_ids: set[str] = set()

    # Search with different queries and sort modes
    queries_to_try = school_entry["search_queries"][:config.MAX_KEYWORDS_PER_SCHOOL]
    sort_modes = ["general", "popularity_descending"]

    for sort_mode in sort_modes:
        if len(all_posts) >= max_posts:
            break

        for query in queries_to_try:
            if len(all_posts) >= max_posts:
                break

            remaining = max_posts - len(all_posts)
            posts_per_kw = min(remaining + 3, config.MAX_POSTS_PER_KEYWORD)
            search_results = search_posts(
                page, query, max_posts=posts_per_kw, sort=sort_mode
            )
            detail_budget = min(len(search_results), config.POST_DETAIL_LIMIT_PER_QUERY)

            for sr in search_results[:detail_budget]:
                pid = sr["post_id"]
                if pid in seen_post_ids or pid in local_ids:
                    continue
                if len(all_posts) >= max_posts:
                    break

                # Random long pause before fetching detail
                maybe_long_pause("(detail fetch 前)")

                # Fetch full detail
                detail = fetch_post_detail(page, sr["url"])
                if not detail:
                    # Backoff on failure
                    random_delay(config.DETAIL_FAIL_BACKOFF_MIN, config.DETAIL_FAIL_BACKOFF_MAX)
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
                if match["match_confidence"] not in ("high", "medium"):
                    continue

                post_record = {
                    "post_id": pid,
                    "url": detail.get("resolved_url") or sr["url"],
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

                # Per-post delay (round-specific)
                random_delay(delay_min, delay_max)

            # Between keywords: slightly longer pause
            random_delay(delay_min * 1.5, delay_max * 1.5)

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
    batch_delay = config.ROUND2_BATCH_DELAY if args.round == 2 else config.ROUND1_BATCH_DELAY
    batch_size = config.BATCH_SIZE

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

    # ─── Print run parameters ────────────────────────────────────────
    remaining_targets = [t for t in targets if t["school_code"] not in completed]
    r = args.round
    delay_lo = config.ROUND1_MIN_DELAY if r == 1 else config.ROUND2_MIN_DELAY
    delay_hi = config.ROUND1_MAX_DELAY if r == 1 else config.ROUND2_MAX_DELAY

    log.info(f"Starting Round {r} scraping (慢爬模式 v2)...")
    log.info(f"  Targets: {len(remaining_targets)} schools (of {len(targets)} total)")
    log.info(f"  Max posts/school: {max_posts}")
    log.info(f"  Max keywords/school: {config.MAX_KEYWORDS_PER_SCHOOL}")
    log.info(f"  Max posts/keyword: {config.MAX_POSTS_PER_KEYWORD}")
    log.info(f"  Request delay: {delay_lo}-{delay_hi}s")
    log.info(f"  School cooldown: {config.SCHOOL_COOLDOWN_MIN}-{config.SCHOOL_COOLDOWN_MAX}s")
    log.info(f"  Batch: every {batch_size} schools, rest {batch_delay}s ({batch_delay/60:.0f}min)")
    log.info(f"  Random long pause: {config.RANDOM_LONG_PAUSE_PROBABILITY*100:.0f}% chance")
    log.info(f"  Session refresh: every {config.SESSION_REFRESH_EVERY} schools")
    log.info(f"  Comments: {'Yes' if fetch_comments else 'No'}")
    log.info("")

    # Launch browser
    pw, browser, context, page = ensure_login(headless=args.headless)

    # Warm up session to look like a real user opening the app
    warmup_session(page)

    consecutive_failures = 0
    MAX_CONSECUTIVE_FAILURES = 8
    schools_since_refresh = 0

    try:

        for i, target in enumerate(targets):
            code = target["school_code"]

            if code in completed:
                continue

            name = target["name_tc"]
            log.info(f"  [{i+1}/{len(targets)}] {name} ({code})")

            try:
                # Ensure page is still alive
                try:
                    page.url
                except Exception:
                    log.info("    🔄 Recreating page...")
                    try:
                        page = context.new_page()
                        page.add_init_script("""
                            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
                            window.chrome = { runtime: {} };
                        """)
                    except Exception as be:
                        log.info(f"    ❌ Browser context dead, restarting: {be}")
                        pw, browser, context, page = refresh_session(pw, browser, headless=args.headless)
                        warmup_session(page)

                group_schools = groups.get(target.get("group_name", ""))
                result = scrape_school(
                    page, target, max_posts, group_schools, fetch_comments,
                    round_num=args.round,
                )

                # Check if we got zero posts — might be login wall
                if result["total_posts"] == 0 and consecutive_failures >= 2:
                    if not check_login(page):
                        log.info("  🔒 Session expired! Re-authenticating...")
                        pw, browser, context, page = refresh_session(pw, browser, headless=args.headless)
                        warmup_session(page)
                        schools_since_refresh = 0
                        # Retry this school
                        result = scrape_school(
                            page, target, max_posts, group_schools, fetch_comments,
                            round_num=args.round,
                        )

                # Save raw posts
                save_json(result, config.RAW_POSTS_DIR / f"{code}.json")

                post_count = result["total_posts"]
                comment_count = sum(len(v) for v in result.get("comments", {}).values())
                log.info(f"    ✅ {post_count} posts, {comment_count} comments")

                if code not in progress["completed_schools"]:
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

            # ─── Session refresh (proactive, not just on failure) ─────
            schools_since_refresh += 1
            if schools_since_refresh >= config.SESSION_REFRESH_EVERY:
                log.info(f"  🔄 Proactive session refresh ({schools_since_refresh} schools done)...")
                try:
                    save_cookies(context)
                    pw, browser, context, page = refresh_session(pw, browser, headless=args.headless)
                    warmup_session(page)
                    schools_since_refresh = 0
                    log.info("  ✅ Session refreshed proactively")
                except Exception as e:
                    log.info(f"  ⚠️ Proactive refresh failed ({e}), continuing with current session")

            # ─── Consecutive failure handling ─────────────────────────
            if consecutive_failures >= MAX_CONSECUTIVE_FAILURES:
                log.info(f"  ❌❌ {MAX_CONSECUTIVE_FAILURES} consecutive zero-post schools — "
                         "attempting re-login before giving up...")
                try:
                    pw, browser, context, page = refresh_session(pw, browser, headless=args.headless)
                    warmup_session(page)
                    consecutive_failures = 0
                    schools_since_refresh = 0
                    log.info("  ✅ Re-login successful, continuing...")
                except Exception:
                    log.info("  ❌ Re-login failed. Stopping scraper.")
                    break

            # Save progress after every school
            save_progress(progress)

            # ─── Between-school cooldown ─────────────────────────────
            cooldown = config.SCHOOL_COOLDOWN_MIN + random.random() * (
                config.SCHOOL_COOLDOWN_MAX - config.SCHOOL_COOLDOWN_MIN
            )
            log.info(f"    💤 School cooldown {cooldown:.0f}s...")
            time.sleep(cooldown)

            # Random long pause
            maybe_long_pause("(between schools)")

            # ─── Summary & batch delay ───────────────────────────────
            completed_count = len(set(progress["completed_schools"]))
            if completed_count % 10 == 0 and completed_count > 0:
                elapsed_pct = completed_count / len(targets) * 100
                log.info(f"  📊 Progress: {completed_count}/{len(targets)} ({elapsed_pct:.1f}%), "
                         f"{progress['total_posts_fetched']} posts total, "
                         f"{len(progress['failed_schools'])} failed")

            if completed_count % batch_size == 0 and completed_count > 0:
                jitter = random.random() * 60  # ±1 minute jitter
                actual_delay = batch_delay + jitter
                log.info(f"  💤 Batch cooldown {actual_delay:.0f}s ({actual_delay/60:.1f}min)...")
                time.sleep(actual_delay)
                # Refresh cookies during batch break
                save_cookies(context)

        # Final save
        save_progress(progress)
        log.info(f"\n✅ Round {args.round} complete!")
        log.info(f"  Schools processed: {len(set(progress['completed_schools']))}")
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
