#!/usr/bin/env python3
"""
Shared configuration for the XHS (小红书) scraping pipeline.
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

# Round 1: every school, max posts per school
ROUND1_MAX_POSTS = 50

# Round 2: top schools, max posts per school
ROUND2_MAX_POSTS = 100

# Delay between requests (seconds) — randomized within range
MIN_DELAY = 2.0
MAX_DELAY = 4.0

# Delay between school batches
BATCH_DELAY = 5.0

# Number of comments per hot post (Round 2)
COMMENTS_PER_POST = 30

# Number of hot posts per school to fetch comments for
HOT_POSTS_FOR_COMMENTS = 10

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
