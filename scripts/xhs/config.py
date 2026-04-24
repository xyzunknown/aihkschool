#!/usr/bin/env python3
"""
Shared configuration for the XHS (小红书) scraping pipeline.

v2 — "慢爬" 策略：大幅降速 + 模拟真人行为，降低封号风险。
     总耗时约 24-30 小时（可跑两晚），但安全性大幅提升。
"""
from pathlib import Path

# ─── Paths ───────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parents[2]  # newhkschoolplace/
DATA_DIR = ROOT / "data"
XHS_DIR = DATA_DIR / "xhs"
RAW_POSTS_DIR = XHS_DIR / "raw_posts"
RAW_COMMENTS_DIR = XHS_DIR / "raw_comments"
EXTRACTED_DIR = XHS_DIR / "extracted"
SEARCH_QUERIES_PATH = XHS_DIR / "search_queries.json"
PROGRESS_PATH = XHS_DIR / "progress.json"
COOKIES_PATH = XHS_DIR / "cookies.json"
SOCIAL_SUMMARY_PATH = XHS_DIR / "social_summary.json"
SCHOOLS_MERGED_PATH = DATA_DIR / "schools_merged.json"

# ─── Scraping parameters ────────────────────────────────────────────
# Time filter: only posts from 2022-01-01 onwards
MIN_DATE = "2022-01-01"

# Round 1: every school, max posts per school (旧值 50)
ROUND1_MAX_POSTS = 20

# Round 2: top schools, max posts per school (旧值 100)
ROUND2_MAX_POSTS = 50

# ─── 延迟参数（核心防封措施） ────────────────────────────────────────
# Round 1 请求间隔（秒），真实延迟 = uniform(MIN, MAX) + gauss jitter
# 旧值: 2-4s → 新值: 6-12s
ROUND1_MIN_DELAY = 6.0
ROUND1_MAX_DELAY = 12.0

# Round 2 请求间隔（秒）
# 旧值: 2-4s → 新值: 8-15s
ROUND2_MIN_DELAY = 8.0
ROUND2_MAX_DELAY = 15.0

# 每个学校之间的额外间隔（秒）
SCHOOL_COOLDOWN_MIN = 10.0
SCHOOL_COOLDOWN_MAX = 25.0

# 每批学校处理完后的长休息（秒）
# 旧值: 5s → 新值: Round1 10分钟 / Round2 12分钟
ROUND1_BATCH_DELAY = 600   # 10 minutes
ROUND2_BATCH_DELAY = 720   # 12 minutes

# 每批学校数（旧值 20 → 新值 10）
BATCH_SIZE = 10

# 兼容旧代码: 默认值指向 Round 1
MIN_DELAY = ROUND1_MIN_DELAY
MAX_DELAY = ROUND1_MAX_DELAY
BATCH_DELAY = ROUND1_BATCH_DELAY

# ─── 真人行为模拟 ───────────────────────────────────────────────────
# 随机长停顿概率（每次请求有此概率触发 30-90s 的"喝水/看手机"停顿）
RANDOM_LONG_PAUSE_PROBABILITY = 0.08   # 8%
RANDOM_LONG_PAUSE_MIN = 30.0
RANDOM_LONG_PAUSE_MAX = 90.0

# 每处理 N 所学校后，刷新一次 session（访问首页重新获取 cookies）
SESSION_REFRESH_EVERY = 30

# 详情页获取失败后的退避延迟（秒）
DETAIL_FAIL_BACKOFF_MIN = 18.0
DETAIL_FAIL_BACKOFF_MAX = 35.0

# 慢代理场景下的页面等待
SEARCH_PAGE_SETTLE_MIN = 7.0
SEARCH_PAGE_SETTLE_MAX = 12.0
SEARCH_RESULTS_WAIT_TIMEOUT = 35.0
SEARCH_RESULTS_POLL_INTERVAL = 2.5
DETAIL_PAGE_SETTLE_MIN = 8.0
DETAIL_PAGE_SETTLE_MAX = 14.0
DETAIL_CONTENT_WAIT_TIMEOUT = 30.0
DETAIL_CONTENT_POLL_INTERVAL = 2.5
SECURITY_REDIRECT_RETRY_WAIT_MIN = 20.0
SECURITY_REDIRECT_RETRY_WAIT_MAX = 35.0
DETAIL_NAVIGATION_COOLDOWN_MIN = 8.0
DETAIL_NAVIGATION_COOLDOWN_MAX = 16.0
POST_DETAIL_LIMIT_PER_QUERY = 8

# ─── 搜索参数 ────────────────────────────────────────────────────────
# 每个关键词最多抓取帖子数（旧值 30 → 新值 15）
MAX_POSTS_PER_KEYWORD = 15

# 每所学校最多尝试关键词数（旧值 6 → 新值 4）
MAX_KEYWORDS_PER_SCHOOL = 4

# 滚动翻页时的最大滚动次数（旧值 15 → 新值 8）
MAX_SCROLL_ATTEMPTS = 8

# Number of comments per hot post (Round 2)
COMMENTS_PER_POST = 30

# Number of hot posts per school to fetch comments for
HOT_POSTS_FOR_COMMENTS = 10

# ─── User-Agent 轮换池 ──────────────────────────────────────────────
USER_AGENTS = [
    # Chrome on macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    # Chrome on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    # Edge on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
]

# Viewport 随机范围（模拟不同屏幕分辨率）
VIEWPORT_OPTIONS = [
    {"width": 1440, "height": 900},
    {"width": 1536, "height": 864},
    {"width": 1920, "height": 1080},
    {"width": 1366, "height": 768},
    {"width": 1280, "height": 800},
]

# ─── AI extraction ──────────────────────────────────────────────────
# Posts per Claude API batch call
EXTRACTION_BATCH_SIZE = 5

# Max content length per post (characters) sent to Claude
MAX_CONTENT_LENGTH = 2000

# Claude model
CLAUDE_MODEL = "claude-sonnet-4-20250514"

# ─── KG / Primary filtering ────────────────────────────────────────
KG_POSITIVE_KEYWORDS = [
    "K1", "K2", "K3", "N班", "PN班", "幼稚園", "幼兒園", "幼兒班",
    "playgroup", "面試", "學前", "兩歲", "三歲", "四歲", "五歲",
    "BB", "小朋友入學", "幼園", "幼稚",
]

PRIMARY_NEGATIVE_KEYWORDS = [
    "P1", "小一", "小學", "升小", "直資小學", "叩門", "統一派位",
    "小一入學", "Primary",
]

# ─── Alias generation ───────────────────────────────────────────────
# Common suffixes to strip from school name to get core name
NAME_SUFFIXES = [
    "國際幼兒園", "國際幼稚園", "國際學校",
    "中英文幼稚園", "英文幼稚園", "英文幼兒園",
    "幼稚園暨幼兒園", "幼稚園", "幼兒學校", "幼兒園",
    "幼兒中心", "學校", "學院",
]

# Institutional prefixes to strip
NAME_PREFIXES = [
    "中華基督教會", "基督教", "天主教", "聖公會",
    "東華三院", "保良局", "仁愛堂", "救世軍",
    "香港基督教服務處", "香港保護兒童會",
    "路德會", "禮賢會", "循道衛理聯合教會",
    "香港聖公會", "明愛",
]

# English noise words to skip
EN_NOISE_WORDS = frozenset({
    "THE", "KINDERGARTEN", "NURSERY", "SCHOOL", "INTERNATIONAL",
    "CENTRE", "CENTER", "AND", "OF", "FOR", "HONG", "KONG",
    "KOWLOON", "N.T.", "N.T",
})

# ─── Round 2 selection criteria ─────────────────────────────────────
# A school enters Round 2 if it meets ANY of these:
ROUND2_MIN_POSTS = 20
ROUND2_TOP_ENGAGEMENT = 50  # top N by engagement
ROUND2_MIN_INTERVIEW_POSTS = 5
ROUND2_MAX_SCHOOLS = 100

# ─── Aggregation thresholds ─────────────────────────────────────────
AGG_MIN_FEE_COUNT = 3  # min data points per fee type
AGG_MIN_TIMELINE_COUNT = 3  # min data points per event type
AGG_MIN_KEYWORD_FREQ = 2  # min freq for interview keywords
AGG_COMPETITION_HIGH_THRESHOLD = 3
AGG_COMPETITION_MEDIUM_THRESHOLD = 1
