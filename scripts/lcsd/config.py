# ============================================================
# LCSD SmartPLAY 爬蟲配置
# ============================================================

# ── 延遲參數（低頻策略，避免 WAF） ──
SCRAPE_CONFIG = {
    # 請求間隔：模擬真實用戶瀏覽節奏
    "min_delay_seconds": 8,
    "max_delay_seconds": 15,

    # 頁面間冷卻
    "page_cooldown_min": 5,
    "page_cooldown_max": 12,

    # 批次延遲（每 N 個課程暫停一次）
    "batch_size": 20,
    "batch_delay_minutes": 5,

    # 滾動延遲
    "scroll_delay_min": 1.5,
    "scroll_delay_max": 3.5,

    # 最大重試
    "max_retries": 3,

    # 連續失敗上限（超過則暫停）
    "max_consecutive_failures": 5,
    "failure_pause_minutes": 10,
}

# ── User-Agent（可識別，不偽裝瀏覽器） ──
USER_AGENT = "HKSchoolPlace-Programme-Monitor/1.0 (contact@hkschoolplace.com)"

# ── SmartPLAY 目標 URL ──
SMARTPLAY_BASE_URL = "https://www.smartplay.lcsd.gov.hk"
SMARTPLAY_SEARCH_URL = f"{SMARTPLAY_BASE_URL}/smart/search"

# ── 目標年齡範圍（K1-K3 適齡 + 親子） ──
TARGET_AGE_RANGES = [
    {"label": "幼兒 (2-3歲)", "min": 2, "max": 3},
    {"label": "幼稚園 (3-6歲)", "min": 3, "max": 6},
    {"label": "親子 (2-5歲)", "min": 2, "max": 5},
]

# ── 目標類別關鍵詞 ──
CATEGORY_KEYWORDS = {
    "swimming": ["游泳", "嬉水", "Water Fun", "Swimming", "親子游泳"],
    "music": ["音樂", "Music", "律動", "節奏", "唱遊"],
    "dance": ["舞蹈", "Dance", "芭蕾", "Ballet", "律動"],
    "art": ["繪畫", "美術", "Art", "手工藝", "創意"],
    "sport": ["體操", "球類", "運動", "Gym", "Sport", "武術", "跆拳道"],
    "parent_child": ["親子", "Parent-child", "幼兒與家長"],
}

# ── 地區映射（SmartPLAY 場地名 → 系統地區碼） ──
DISTRICT_MAP = {
    "中西區": "central_and_western",
    "東區": "eastern",
    "南區": "southern",
    "灣仔": "wan_chai",
    "九龍城": "kowloon_city",
    "觀塘": "kwun_tong",
    "深水埗": "sham_shui_po",
    "黃大仙": "wong_tai_sin",
    "油尖旺": "yau_tsim_mong",
    "離島": "islands",
    "葵青": "kwai_tsing",
    "北區": "north",
    "西貢": "sai_kung",
    "沙田": "sha_tin",
    "大埔": "tai_po",
    "荃灣": "tsuen_wan",
    "屯門": "tuen_mun",
    "元朗": "yuen_long",
}

# ── 瀏覽器視窗尺寸（模擬不同設備） ──
VIEWPORT_SIZES = [
    {"width": 1920, "height": 1080},
    {"width": 1440, "height": 900},
    {"width": 1366, "height": 768},
]

# ── 輸出 ──
OUTPUT_DIR = "data/lcsd"
OUTPUT_FILE = "programmes.json"
PROGRESS_FILE = "scrape_progress.json"
