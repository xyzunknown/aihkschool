# 小红书数据抓取技术实现方案

## 项目背景

HKSchoolPlace 是一个帮助香港家长选择幼稚园的平台。现需要从小红书一次性抓取香港幼稚园的面试经验、费用信息、申请时间线等内容，经 AI 结构化提取后写入数据库，在前端展示。

**注意：这是一次性抓取任务，不是持续爬虫。**

---

## 一、整体流程

```
Phase 1：生成搜索词表
  scripts/xhs/generate_search_queries.py
  输入：data/schools_merged.json（873 所学校）
  输出：data/xhs/search_queries.json

Phase 2：抓取原始帖子
  scripts/xhs/scrape_posts.py
  输入：data/xhs/search_queries.json
  输出：data/xhs/raw_posts/（按 school_code 组织的 JSON 文件）

Phase 3：抓取热帖评论（仅第二轮重点学校）
  scripts/xhs/scrape_comments.py
  输入：第一轮热度排名 Top 60-80 学校的热帖列表
  输出：data/xhs/raw_comments/（按帖子 ID 组织）

Phase 4：AI 结构化提取
  scripts/xhs/extract_structured_data.py
  输入：raw_posts/ + raw_comments/ + schools_merged.json
  输出：data/xhs/extracted/（结构化 JSON）

Phase 5：聚合统计 + 入库
  scripts/xhs/aggregate_and_seed.py
  输入：data/xhs/extracted/
  输出：
    - data/xhs/social_summary.json（聚合统计）
    - supabase/seed/010_social_intel.sql（入库 SQL）
```

---

## 二、Phase 1：生成搜索词表

### 目标

从 873 所学校的 `name_tc`、`name_en`、`district`、`address_tc` 自动生成搜索关键词，解决同名学校、多分校、别名等问题。

### 输入文件

`data/schools_merged.json` — 每条记录格式：
```json
{
  "code": "619841",
  "name_tc": "迦南幼稚園（中環堅道）",
  "name_en": "CANNAN KINDERGARTEN (CENTRAL CAINE ROAD)",
  "district": "central_and_western",
  "address_tc": "香港中環堅道99號豐樂閣1樓前座",
  "school_type": "non_profit",
  "session": "上午及下午",
  ...
}
```

### 别名自动生成规则

对每所学校的 `name_tc` 按以下规则提取搜索词：

```python
# ===== 规则引擎 =====

def generate_aliases(name_tc: str, name_en: str | None) -> list[str]:
    """从官方校名生成搜索别名列表"""
    aliases = []

    # 0. 完整中文名永远是第一个
    aliases.append(name_tc)

    # 1. 分离主体名和括号内容
    #    支持三种括号：（）、﹝﹞、()
    main_name, branch = split_name_and_branch(name_tc)
    # 例："迦南幼稚園（小西灣）" → main="迦南幼稚園", branch="小西灣"
    # 例："培正小學（幼稚園部）" → main="培正小學", branch="幼稚園部"

    if main_name != name_tc:
        aliases.append(main_name)

    # 2. 去掉通用后缀，提取核心名
    SUFFIXES = [
        "國際幼兒園", "國際幼稚園", "國際學校",
        "中英文幼稚園", "英文幼稚園", "英文幼兒園",
        "幼稚園暨幼兒園", "幼稚園", "幼兒學校", "幼兒園",
        "幼兒中心", "學校", "學院",
    ]
    core = main_name
    for suffix in SUFFIXES:
        if core.endswith(suffix):
            core = core[:-len(suffix)]
            break

    # 3. 去掉机构前缀
    PREFIXES = [
        "中華基督教會", "基督教", "天主教", "聖公會",
        "東華三院", "保良局", "仁愛堂", "救世軍",
        "香港基督教服務處", "香港保護兒童會",
        "路德會", "禮賢會", "循道衛理聯合教會",
    ]
    core_no_prefix = core
    for prefix in PREFIXES:
        if core_no_prefix.startswith(prefix):
            core_no_prefix = core_no_prefix[len(prefix):]
            break

    # 4. 生成别名组合
    if core and core != main_name:
        aliases.append(core)  # 例："迦南"
        aliases.append(core + "幼稚園")  # 例："迦南幼稚園"

    if core_no_prefix and core_no_prefix != core:
        aliases.append(core_no_prefix)  # 例：去掉"聖公會"后的名字

    # 5. 特殊模式处理
    # 模式 A：「XX小學（幼稚園部）」
    if "小學" in main_name and branch and "幼" in branch:
        school_core = main_name.replace("小學", "")
        aliases.append(school_core + "幼")      # 例："培正幼"
        aliases.append(school_core + "幼稚園")   # 例："培正幼稚園"
        aliases.append(school_core)              # 例："培正"

    # 6. 英文简称（可选）
    if name_en:
        # 取英文名第一个实义词（跳过 THE/SAINT/ST）
        en_words = [w for w in name_en.split()
                    if w.upper() not in ("THE", "KINDERGARTEN", "NURSERY", "SCHOOL",
                                         "INTERNATIONAL", "CENTRE", "CENTER")]
        if en_words:
            aliases.append(en_words[0].title())  # 例："Victoria", "Cannan"

    # 7. 去重，保持顺序
    seen = set()
    result = []
    for a in aliases:
        a = a.strip()
        if a and a not in seen:
            seen.add(a)
            result.append(a)
    return result


def split_name_and_branch(name_tc: str) -> tuple[str, str | None]:
    """拆分校名和分校标识"""
    for open_b, close_b in [("（", "）"), ("﹝", "﹞"), ("(", ")")]:
        idx = name_tc.find(open_b)
        if idx > 0:
            end = name_tc.find(close_b, idx)
            if end > idx:
                main = name_tc[:idx]
                branch = name_tc[idx+1:end]
                return main, branch
    return name_tc, None
```

### 多分校学校识别

```python
def identify_school_groups(schools: list[dict]) -> dict[str, list[str]]:
    """
    识别同一集团/品牌下的多分校学校。
    返回：{group_name: [school_code1, school_code2, ...]}
    """
    groups = {}
    for school in schools:
        main_name, _ = split_name_and_branch(school["name_tc"])
        # 用去掉分校标识后的主体名作为 group key
        groups.setdefault(main_name, []).append(school["code"])

    # 只保留有多个分校的 group
    return {k: v for k, v in groups.items() if len(v) > 1}
```

### 搜索词生成

```python
def generate_search_queries(school: dict, is_multi_branch: bool) -> dict:
    """为一所学校生成搜索词和匹配关键词"""
    name_tc = school["name_tc"]
    name_en = school.get("name_en")
    aliases = generate_aliases(name_tc, name_en)
    main_name, branch = split_name_and_branch(name_tc)

    # 搜索词：每个别名 + "幼稚園" 限定（防止搜到小学）
    search_queries = []
    for alias in aliases[:4]:  # 最多取前 4 个别名
        search_queries.append(f"{alias} 幼稚園 面試")
        search_queries.append(f"{alias} 幼稚園")
    # 去重
    search_queries = list(dict.fromkeys(search_queries))

    # 匹配关键词：用于判断搜索结果是否属于这所学校（而非同名小学/其他学校）
    match_keywords = [name_tc, main_name]
    if branch:
        match_keywords.append(branch)
    # 加入地址中的地标
    address = school.get("address_tc", "")
    # 提取路名/屋苑名（地址中"號"之前的部分）
    addr_match = re.search(r"[^\d]+(?=\d+號)", address)
    if addr_match:
        match_keywords.append(addr_match.group().strip())

    return {
        "school_code": school["code"],
        "name_tc": name_tc,
        "name_en": name_en,
        "district": school["district"],
        "address_tc": address,
        "search_queries": search_queries,
        "match_keywords": match_keywords,
        "group_name": main_name if is_multi_branch else None,
        "is_multi_branch": is_multi_branch,
    }
```

### 输出格式

`data/xhs/search_queries.json`：
```json
[
  {
    "school_code": "619841",
    "name_tc": "迦南幼稚園（中環堅道）",
    "name_en": "CANNAN KINDERGARTEN (CENTRAL CAINE ROAD)",
    "district": "central_and_western",
    "address_tc": "香港中環堅道99號豐樂閣1樓前座",
    "search_queries": [
      "迦南幼稚園（中環堅道） 幼稚園 面試",
      "迦南幼稚園（中環堅道） 幼稚園",
      "迦南幼稚園 幼稚園 面試",
      "迦南幼稚園 幼稚園",
      "迦南 幼稚園 面試",
      "迦南 幼稚園"
    ],
    "match_keywords": ["迦南幼稚園（中環堅道）", "迦南幼稚園", "中環堅道", "堅道"],
    "group_name": "迦南幼稚園",
    "is_multi_branch": true
  }
]
```

---

## 三、Phase 2：抓取原始帖子

### 技术选择

小红书没有公开 API，需要模拟浏览器请求。两种方式：

**方式 A：HTTP 请求 + Cookie**（推荐，速度快）
- 从浏览器导出小红书登录后的 Cookie
- 用 `requests` 库发 HTTP 请求
- 调用小红书内部搜索 API：`https://edith.xiaohongshu.com/api/sns/web/v1/search/notes`

**方式 B：浏览器自动化**（更稳但更慢）
- 用 Playwright/Selenium 打开小红书网页版
- 模拟搜索、滚动加载、点击帖子
- 适合反爬严格时的降级方案

**建议先试方式 A，失败再切方式 B。**

### 方式 A 实现要点

```python
# 小红书搜索 API
SEARCH_URL = "https://edith.xiaohongshu.com/api/sns/web/v1/search/notes"

# 请求头（从浏览器 DevTools 复制）
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...",
    "Referer": "https://www.xiaohongshu.com/",
    "Origin": "https://www.xiaohongshu.com",
    "Content-Type": "application/json",
    "Cookie": "<从浏览器复制>",  # 关键：需要有效的登录 Cookie
    # 小红书有 X-s、X-t 签名参数，需要逆向或用浏览器控制台获取
}

# 搜索请求体
def search_notes(keyword: str, page: int = 1, page_size: int = 20):
    payload = {
        "keyword": keyword,
        "page": page,
        "page_size": page_size,
        "sort": "general",       # general=综合, time_descending=最新, popularity_descending=最热
        "note_type": 0,          # 0=全部, 1=图文, 2=视频
    }
    # ... 发送请求
```

**重要：小红书的 X-s 和 X-t 签名参数**

小红书 API 需要 `X-s` 和 `X-t` 请求头，这是前端 JS 动态生成的签名。获取方式：
1. 打开小红书网页版 → F12 → Network
2. 搜索任意关键词，找到 `search/notes` 请求
3. 复制完整的请求头（包括 Cookie、X-s、X-t、X-s-common）
4. X-s 和 X-t 有时效性，可能需要定期刷新

如果签名逆向太复杂，**直接用方式 B（Playwright）更稳妥**。

### 方式 B 实现要点

```python
from playwright.sync_api import sync_playwright
import json
import time

def scrape_xhs_search(keyword: str, max_posts: int = 50):
    """用 Playwright 模拟小红书搜索"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # 首次用 headless=False 手动登录
        context = browser.new_context(
            user_agent="Mozilla/5.0 ...",
            viewport={"width": 1440, "height": 900},
        )
        # 加载已保存的登录状态
        context.add_cookies(load_cookies("data/xhs/cookies.json"))
        page = context.new_page()

        # 搜索
        search_url = f"https://www.xiaohongshu.com/search_result?keyword={keyword}&source=web_search_result_notes"
        page.goto(search_url)
        page.wait_for_selector(".note-item", timeout=10000)

        posts = []
        last_count = 0
        scroll_attempts = 0

        while len(posts) < max_posts and scroll_attempts < 20:
            # 提取当前页面上的帖子
            items = page.query_selector_all(".note-item")
            for item in items:
                post_data = extract_post_from_element(item)
                if post_data and post_data["id"] not in {p["id"] for p in posts}:
                    posts.append(post_data)

            # 滚动加载更多
            page.evaluate("window.scrollBy(0, 1000)")
            time.sleep(1.5 + random.random())  # 随机延迟

            if len(posts) == last_count:
                scroll_attempts += 1
            else:
                scroll_attempts = 0
                last_count = len(posts)

        browser.close()
        return posts[:max_posts]
```

### 帖子详情抓取

搜索结果只有标题和摘要，需要点进帖子获取完整正文：

```python
def fetch_post_detail(post_url: str, page) -> dict:
    """获取帖子完整内容"""
    page.goto(post_url)
    page.wait_for_selector(".note-content", timeout=8000)

    title = page.query_selector(".title")
    content = page.query_selector(".note-content")
    engagement = page.query_selector(".engage-bar")

    return {
        "title": title.inner_text() if title else "",
        "content": content.inner_text() if content else "",
        "likes": parse_engagement_number(engagement, ".like-count"),
        "collects": parse_engagement_number(engagement, ".collect-count"),
        "comments_count": parse_engagement_number(engagement, ".comment-count"),
        "publish_date": extract_publish_date(page),
    }
```

### 抓取控制参数

```python
# === 抓取配置 ===

# 时间限制：只取 2022-01-01 之后的帖子
MIN_DATE = "2022-01-01"

# 第一轮：每校帖子数上限
ROUND1_MAX_POSTS_PER_SCHOOL = 50

# 第二轮重点学校：每校帖子数上限
ROUND2_MAX_POSTS_PER_SCHOOL = 100

# 请求间隔（秒），随机化避免被检测
MIN_DELAY = 1.5
MAX_DELAY = 3.0

# 并发数：小红书反爬严格，建议单线程顺序执行
# 如果用多账号可以开 2-3 并发
CONCURRENCY = 1

# 搜索结果排序：先按热度（获取高互动帖子），再按时间（补充近期帖子）
SORT_MODES = ["popularity_descending", "time_descending"]
```

### 缓存与断点续传

```python
# 缓存目录结构
# data/xhs/
#   raw_posts/
#     619841.json          # 按 school_code 存储
#     322270.json
#   raw_comments/
#     post_abc123.json     # 按帖子 ID 存储
#   progress.json          # 断点续传记录
#   cookies.json           # 浏览器登录状态

# progress.json 格式：
{
  "last_school_index": 145,
  "completed_schools": ["619841", "322270", ...],
  "failed_schools": {"531898": "timeout", ...},
  "total_posts_fetched": 4280,
  "last_updated": "2026-03-29T15:30:00"
}
```

### 每条帖子存储的原始字段

```json
{
  "post_id": "abc123def456",
  "url": "https://www.xiaohongshu.com/explore/abc123def456",
  "title": "培正幼稚園K1面試全紀錄｜小組面試+家長面談",
  "content": "今天帶BB去培正面試啦...(完整正文)",
  "author": "港漂媽媽日記",
  "publish_date": "2025-10-15",
  "likes": 342,
  "collects": 218,
  "comments_count": 56,
  "search_keyword": "培正 幼稚園 面試",
  "matched_school_code": "xxxxxx",
  "fetch_timestamp": "2026-03-29T15:30:00"
}
```

### 幼稚园 vs 小学过滤

在抓取阶段做第一层过滤（帖子级别），丢弃明显不是幼稚园的帖子：

```python
# 幼稚园正向关键词
KG_POSITIVE = [
    "K1", "K2", "K3", "N班", "PN班", "幼稚園", "幼兒園", "幼兒班",
    "playgroup", "面試", "學前", "兩歲", "三歲", "四歲", "五歲",
    "BB", "小朋友入學", "幼園",
]

# 小学负向关键词
PRIMARY_NEGATIVE = [
    "P1", "小一", "小學", "升小", "直資小學", "叩門", "統一派位",
    "小一入學", "Primary",
]

def is_kindergarten_post(title: str, content: str) -> str:
    """
    判断帖子是否关于幼稚园。
    返回：'yes' / 'no' / 'uncertain'
    """
    text = title + " " + content
    has_kg_signal = any(kw.lower() in text.lower() for kw in KG_POSITIVE)
    has_primary_signal = any(kw.lower() in text.lower() for kw in PRIMARY_NEGATIVE)

    if has_kg_signal and not has_primary_signal:
        return "yes"
    elif has_primary_signal and not has_kg_signal:
        return "no"
    elif has_kg_signal and has_primary_signal:
        # 两种都提到了——可能是跨阶段的帖子（如"幼稚園升小一"）
        return "uncertain"
    else:
        # 都没提到——可能是泛泛讨论学校的帖子
        return "uncertain"
```

处理策略：
- `yes` → 保留
- `no` → 丢弃
- `uncertain` → 保留，但标记 `kg_confidence: "uncertain"`，后续 AI 提取时再判断

### 多分校匹配逻辑

```python
def match_post_to_school(
    post: dict,
    school_query: dict,
    all_schools_in_group: list[dict] | None
) -> dict:
    """
    将帖子匹配到具体学校。

    返回：{
        "school_code": "619841",
        "branch_identified": True/False,
        "match_confidence": "high"/"medium"/"low"
    }
    """
    text = post["title"] + " " + post["content"]

    # 1. 完整校名匹配（含分校标识）
    if school_query["name_tc"] in text:
        return {
            "school_code": school_query["school_code"],
            "branch_identified": True,
            "match_confidence": "high"
        }

    # 2. 如果不是多分校学校，主体名匹配即可
    if not school_query["is_multi_branch"]:
        main_name, _ = split_name_and_branch(school_query["name_tc"])
        if main_name in text:
            return {
                "school_code": school_query["school_code"],
                "branch_identified": True,
                "match_confidence": "high"
            }

    # 3. 多分校学校：尝试用分校标识和地址关键词区分
    if school_query["is_multi_branch"] and all_schools_in_group:
        for sibling in all_schools_in_group:
            _, branch = split_name_and_branch(sibling["name_tc"])
            if branch and branch in text:
                return {
                    "school_code": sibling["code"],
                    "branch_identified": True,
                    "match_confidence": "high"
                }
            # 用地址关键词匹配
            addr = sibling.get("address_tc", "")
            addr_keywords = extract_address_keywords(addr)
            for kw in addr_keywords:
                if kw in text and len(kw) >= 2:
                    return {
                        "school_code": sibling["code"],
                        "branch_identified": True,
                        "match_confidence": "medium"
                    }

        # 无法确定分校 → 挂到集团层面
        return {
            "school_code": school_query["school_code"],  # 用搜索时的学校作为默认
            "branch_identified": False,
            "match_confidence": "low",
            "group_name": school_query["group_name"]
        }

    # 4. 兜底
    return {
        "school_code": school_query["school_code"],
        "branch_identified": not school_query["is_multi_branch"],
        "match_confidence": "medium"
    }


def extract_address_keywords(address_tc: str) -> list[str]:
    """从地址提取可用于匹配的地标关键词"""
    keywords = []
    # 提取路名：XX路/XX道/XX街
    roads = re.findall(r"[\u4e00-\u9fff]{2,}(?:路|道|街|徑|里|巷|坊)", address_tc)
    keywords.extend(roads)
    # 提取屋苑/大厦名：XX閣/XX苑/XX花園/XX中心
    estates = re.findall(r"[\u4e00-\u9fff]{2,}(?:閣|苑|花園|中心|邨|大廈|大厦|廣場)", address_tc)
    keywords.extend(estates)
    # 提取区域名
    areas = re.findall(r"(堅尼地城|西營盤|中環|上環|灣仔|銅鑼灣|北角|鰂魚涌|太古|西灣河|筲箕灣|柴灣|小西灣|薄扶林|香港仔|黃竹坑|赤柱|深水埗|長沙灣|旺角|大角咀|九龍塘|九龍城|黃大仙|鑽石山|牛頭角|觀塘|藍田|油塘|將軍澳|沙田|大圍|火炭|馬鞍山|大埔|粉嶺|上水|元朗|天水圍|屯門|荃灣|葵涌|青衣|東涌)", address_tc)
    keywords.extend(areas)
    return keywords
```

### 去重策略

同一篇帖子可能被多个搜索词命中（比如搜「迦南幼稚園」和「迦南 面試」都能搜到同一篇帖子）：

```python
# 全局帖子 ID 集合，用于跨学校去重
seen_post_ids: set[str] = set()

def should_skip_post(post_id: str) -> bool:
    if post_id in seen_post_ids:
        return True
    seen_post_ids.add(post_id)
    return False
```

但注意：一篇帖子可能同时提到多所学校（如「對比了迦南和維多利亞」）。去重只在抓取阶段，AI 提取阶段允许一篇帖子生成多条提取记录（分别对应不同学校）。

---

## 四、Phase 3：抓取热帖评论

### 触发条件

只在第二轮（重点学校）执行。判断标准：

```python
# 第一轮跑完后，计算每校的热度分
def calculate_heat_score(school_posts: list[dict]) -> float:
    total_engagement = sum(
        p["likes"] + p["collects"] + p["comments_count"]
        for p in school_posts
    )
    return total_engagement

# 进入第二轮的条件（满足任一）：
# 1. 该校帖子数 >= 20
# 2. 总互动量排名前 50
# 3. 面试相关帖子 >= 5（标题或内容含"面試"）
```

### 评论抓取

```python
def scrape_comments(post_url: str, page, max_comments: int = 30) -> list[dict]:
    """获取帖子评论"""
    page.goto(post_url)
    page.wait_for_selector(".comment-item", timeout=8000)

    # 展开"查看更多评论"
    while True:
        more_btn = page.query_selector(".show-more-comment")
        if not more_btn:
            break
        more_btn.click()
        time.sleep(1)
        if len(page.query_selector_all(".comment-item")) >= max_comments:
            break

    comments = []
    for item in page.query_selector_all(".comment-item")[:max_comments]:
        comments.append({
            "comment_id": extract_comment_id(item),
            "content": item.query_selector(".comment-text").inner_text(),
            "likes": parse_number(item.query_selector(".like-count")),
            "is_reply": item.query_selector(".reply-to") is not None,
            "publish_date": extract_comment_date(item),
        })

    return comments
```

### 每校只抓哪些帖子的评论

```python
# 每校取互动量最高的 10 篇帖子的评论
def select_posts_for_comments(school_posts: list[dict], top_n: int = 10) -> list[dict]:
    sorted_posts = sorted(
        school_posts,
        key=lambda p: p["likes"] + p["collects"] + p["comments_count"],
        reverse=True
    )
    # 只选有评论的帖子
    return [p for p in sorted_posts if p["comments_count"] > 0][:top_n]
```

---

## 五、Phase 4：AI 结构化提取

### 使用 Claude API

```python
import anthropic

client = anthropic.Anthropic(api_key="YOUR_API_KEY")

def extract_structured_data(
    post: dict,
    school_info: dict,
    comments: list[dict] | None = None
) -> dict:
    """用 Claude 从帖子中提取结构化信息"""

    # 拼装输入
    input_text = f"""帖子标题：{post['title']}
帖子正文：{post['content']}
发布日期：{post['publish_date']}
"""
    if comments:
        input_text += "\n评论：\n"
        for c in comments:
            input_text += f"- {c['content']}\n"

    input_text += f"""
目标学校：{school_info['name_tc']}
学校地区：{school_info['district']}
学校地址：{school_info['address_tc']}
学校类型：{school_info['school_type']}
"""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{"role": "user", "content": input_text}],
        system=EXTRACTION_PROMPT,  # 见下方
    )

    return json.loads(response.content[0].text)
```

### AI 提取 Prompt

```python
EXTRACTION_PROMPT = """你是一个香港幼稚园信息提取助手。你的任务是从小红书帖子中提取结构化信息。

## 规则

1. 只提取帖子中**明确提到的事实**，不要推断或编造。
2. 如果帖子讨论的不是目标幼稚园，返回 {"relevant": false}。
3. 如果帖子讨论的是小学（提到 P1/小一/升小/统一派位），返回 {"relevant": false}。
4. 对于多分校学校，如果帖子中有具体分校线索（地名/地址），填入 branch_hint 字段。
5. 一篇帖子可能包含多种类型的信息（面试+费用+时间线），全部提取。
6. 评论中的信息和正文同等重要，同样提取。每条有价值的评论单独生成一条 extracted_items。

## 输出格式

返回严格的 JSON，格式如下：

```json
{
  "relevant": true,
  "is_kindergarten": true,
  "branch_hint": "小西灣" 或 null,
  "extracted_items": [
    {
      "content_type": "interview",
      "interview_year": "2025",
      "interview_grade": "K1",
      "interview_format": "group",
      "interview_group_size": 6,
      "interview_duration_minutes": 20,
      "interview_keywords": ["积木", "拼图", "英文颜色"],
      "parent_involved": false,
      "result": "admitted",
      "result_wait_days": 7,
      "source_type": "post"
    },
    {
      "content_type": "fee",
      "fee_type": "textbook",
      "fee_amount_low": 500,
      "fee_amount_high": 800,
      "fee_period": "yearly",
      "fee_year": "2025",
      "source_type": "comment"
    },
    {
      "content_type": "timeline",
      "timeline_year": "2025",
      "event_type": "interview_notice",
      "event_month": 10,
      "event_day": 15,
      "source_type": "post"
    },
    {
      "content_type": "general",
      "positive_keywords": ["老师有爱心", "活动丰富"],
      "negative_keywords": ["等候时间长"],
      "source_type": "comment"
    }
  ],
  "competition_signals": {
    "multi_round": true,
    "high_applicant_count": true,
    "mentioned_ratio": "报了300个收30个",
    "waitlist_position": null
  }
}
```

## content_type 枚举

- interview：面试经验（形式、时长、内容、结果）
- fee：费用信息（教材费、校服费、活动费、茶点费、校巴费等）
- timeline：时间线数据点（报名开始/截止、面试通知、面试日期、放榜日期）
- general：一般性评价（正面/负面关键词）

## interview_format 枚举

- individual：一对一
- group：小组
- parent_interview：家长面谈
- observation：观察活动/游戏
- mixed：混合形式

## fee_type 枚举

- textbook：教材费
- uniform：校服费
- activity：活动费
- snack：茶点费
- bus：校巴费
- registration：报名费/注册费
- deposit：留位费
- other：其他

## event_type 枚举

- application_open：报名开始
- application_close：报名截止
- interview_notice：面试通知
- interview：面试日期
- result：放榜/结果通知
- offer_deadline：回复 offer 截止

## result 枚举

- admitted：录取
- waitlist：候补
- rejected：未录取
- pending：等待中
- unknown：未提及

## 重要提醒

- interview_year 是面试发生的年份，不是帖子发布的年份（虽然通常相同）
- fee_amount 用港币 HKD，如果原文写"大概五六百"，low=500, high=600
- 如果信息不够明确无法填入某个字段，该字段设为 null，不要猜测
- source_type 区分信息来自正文 (post) 还是评论 (comment)
- 评论里的每条有价值的信息（面试经历/费用数据/时间点）都要单独提取为一条 extracted_item
"""
```

### 批处理优化

不要一条帖子调一次 API，而是将同一学校的多条帖子批量发送：

```python
def batch_extract(school_code: str, posts: list[dict], comments_map: dict) -> list[dict]:
    """批量处理同一学校的帖子，减少 API 调用次数"""
    results = []

    # 每批 5 条帖子（避免单次 token 过长）
    for batch in chunk_list(posts, 5):
        batch_input = []
        for post in batch:
            post_comments = comments_map.get(post["post_id"], [])
            batch_input.append({
                "post_id": post["post_id"],
                "title": post["title"],
                "content": post["content"][:2000],  # 截断超长内容
                "publish_date": post["publish_date"],
                "engagement": {
                    "likes": post["likes"],
                    "collects": post["collects"],
                    "comments": post["comments_count"]
                },
                "comments": [c["content"] for c in post_comments[:20]],
            })

        # 修改 prompt 为批量模式
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            messages=[{
                "role": "user",
                "content": f"学校信息：{json.dumps(school_info, ensure_ascii=False)}\n\n"
                           f"以下是 {len(batch_input)} 篇帖子，请逐一提取：\n\n"
                           f"{json.dumps(batch_input, ensure_ascii=False)}"
            }],
            system=BATCH_EXTRACTION_PROMPT,
        )

        batch_results = json.loads(response.content[0].text)
        results.extend(batch_results)

    return results
```

### 提取结果存储

每所学校一个 JSON 文件：`data/xhs/extracted/{school_code}.json`

```json
{
  "school_code": "619841",
  "name_tc": "迦南幼稚園（中環堅道）",
  "total_posts_processed": 28,
  "total_comments_processed": 156,
  "extraction_timestamp": "2026-03-30T10:00:00",
  "items": [
    {
      "post_id": "abc123",
      "source_url": "https://www.xiaohongshu.com/explore/abc123",
      "source_date": "2025-10-15",
      "engagement_score": 616,
      "branch_identified": true,
      "match_confidence": "high",
      "kg_confidence": "yes",
      "content_type": "interview",
      "structured_data": {
        "interview_year": "2025",
        "interview_grade": "K1",
        "interview_format": "group",
        "interview_group_size": 6,
        "interview_duration_minutes": 20,
        "interview_keywords": ["积木", "拼图", "英文颜色"],
        "parent_involved": false,
        "result": "admitted",
        "result_wait_days": 7
      },
      "sentiment": "positive",
      "positive_keywords": ["老师有爱心"],
      "negative_keywords": [],
      "competition_signals": {
        "multi_round": false,
        "high_applicant_count": false
      },
      "source_type": "post"
    }
  ]
}
```

---

## 六、Phase 5：聚合统计 + 入库

### 聚合逻辑

```python
def aggregate_school_data(school_code: str, items: list[dict]) -> dict:
    """将单条提取结果聚合为学校级别的统计"""

    # 只用 high + medium confidence 的数据
    valid_items = [i for i in items if i["match_confidence"] in ("high", "medium")]

    # === 热度统计 ===
    total_posts = len(set(i["post_id"] for i in valid_items))
    total_engagement = sum(i["engagement_score"] for i in valid_items)

    # === 面试统计 ===
    interview_items = [i for i in valid_items if i["content_type"] == "interview"]
    interview_posts = len(set(i["post_id"] for i in interview_items))

    # 面试关键词频次
    keyword_counter = Counter()
    for item in interview_items:
        for kw in item["structured_data"].get("interview_keywords", []):
            keyword_counter[kw] += 1
    top_keywords = keyword_counter.most_common(10)

    # 面试形式分布
    format_counter = Counter(
        i["structured_data"]["interview_format"]
        for i in interview_items
        if i["structured_data"].get("interview_format")
    )

    # 平均面试时长
    durations = [
        i["structured_data"]["interview_duration_minutes"]
        for i in interview_items
        if i["structured_data"].get("interview_duration_minutes")
    ]
    avg_duration = round(sum(durations) / len(durations)) if durations else None

    # 家长面谈比例
    parent_involved_count = sum(
        1 for i in interview_items
        if i["structured_data"].get("parent_involved") is True
    )
    parent_interview_pct = round(parent_involved_count / len(interview_items) * 100) if interview_items else None

    # === 情感分布 ===
    sentiment_dist = Counter(i.get("sentiment", "neutral") for i in valid_items)

    # 正面/负面关键词聚合（频次 >= 3 才保留）
    pos_counter = Counter()
    neg_counter = Counter()
    for item in valid_items:
        for kw in item.get("positive_keywords", []):
            pos_counter[kw] += 1
        for kw in item.get("negative_keywords", []):
            neg_counter[kw] += 1
    positive_keywords = {k: v for k, v in pos_counter.most_common(10) if v >= 3}
    negative_keywords = {k: v for k, v in neg_counter.most_common(10) if v >= 3}

    # === 费用统计 ===
    fee_items = [i for i in valid_items if i["content_type"] == "fee"]
    fee_estimates = {}
    for item in fee_items:
        fee_type = item["structured_data"]["fee_type"]
        low = item["structured_data"].get("fee_amount_low")
        high = item["structured_data"].get("fee_amount_high")
        if low is not None:
            fee_estimates.setdefault(fee_type, []).append({"low": low, "high": high or low})

    # 每种费用取 P25-P75 范围
    fee_summary = {}
    for fee_type, values in fee_estimates.items():
        if len(values) >= 3:  # 至少 3 条数据才展示
            all_lows = sorted(v["low"] for v in values)
            all_highs = sorted(v["high"] for v in values)
            fee_summary[fee_type] = {
                "low": all_lows[len(all_lows) // 4],       # P25
                "high": all_highs[3 * len(all_highs) // 4], # P75
                "count": len(values)
            }

    # === 时间线统计 ===
    timeline_items = [i for i in valid_items if i["content_type"] == "timeline"]
    timeline_data = {}
    for item in timeline_items:
        event_type = item["structured_data"]["event_type"]
        month = item["structured_data"].get("event_month")
        if month:
            timeline_data.setdefault(event_type, []).append(month)

    # 每种事件取众数月份
    timeline_summary = {}
    for event_type, months in timeline_data.items():
        if len(months) >= 3:
            most_common_month = Counter(months).most_common(1)[0][0]
            timeline_summary[event_type] = {
                "typical_month": most_common_month,
                "count": len(months)
            }

    # === 竞争度 ===
    competition_signals = [i.get("competition_signals", {}) for i in valid_items]
    multi_round_count = sum(1 for s in competition_signals if s.get("multi_round"))
    high_applicant_count = sum(1 for s in competition_signals if s.get("high_applicant_count"))

    if multi_round_count >= 3 or high_applicant_count >= 3:
        competition_level = "high"
    elif multi_round_count >= 1 or high_applicant_count >= 1:
        competition_level = "medium"
    else:
        competition_level = "low"

    return {
        "school_code": school_code,
        "total_posts": total_posts,
        "total_engagement": total_engagement,
        "interview_posts": interview_posts,
        "top_interview_keywords": top_keywords,
        "interview_format_distribution": dict(format_counter),
        "avg_interview_duration": avg_duration,
        "parent_interview_pct": parent_interview_pct,
        "sentiment_distribution": dict(sentiment_dist),
        "positive_keywords": positive_keywords,
        "negative_keywords": negative_keywords,
        "fee_estimates": fee_summary,
        "timeline_summary": timeline_summary,
        "competition_level": competition_level,
        "data_year_range": extract_year_range(valid_items),
    }
```

### 热度排名

```python
def calculate_heat_rankings(all_summaries: list[dict]) -> list[dict]:
    """计算全港和分区热度排名"""
    # 按总互动量排序
    sorted_by_heat = sorted(all_summaries, key=lambda s: s["total_engagement"], reverse=True)
    for rank, summary in enumerate(sorted_by_heat, 1):
        summary["heat_rank_overall"] = rank

    # 按区排名
    by_district = defaultdict(list)
    for summary in all_summaries:
        by_district[summary["district"]].append(summary)
    for district, schools in by_district.items():
        sorted_district = sorted(schools, key=lambda s: s["total_engagement"], reverse=True)
        for rank, summary in enumerate(sorted_district, 1):
            summary["heat_rank_district"] = rank

    return sorted_by_heat
```

---

## 七、数据库表设计

### 新增 migration

文件：`supabase/migrations/011_create_social_intel.sql`

```sql
-- ============================================================
-- 社交平台信息表
-- ============================================================

-- 单条提取记录（帖子/评论级别）
CREATE TABLE social_intel (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    school_code     text NOT NULL,

    -- 来源信息
    source_url      text NOT NULL,
    source_date     date,
    source_type     text NOT NULL CHECK (source_type IN ('post', 'comment')),
    engagement_score integer DEFAULT 0,

    -- 匹配信息
    branch_identified boolean DEFAULT false,
    match_confidence  text NOT NULL CHECK (match_confidence IN ('high', 'medium', 'low')),

    -- 内容分类
    content_type    text NOT NULL CHECK (content_type IN ('interview', 'fee', 'timeline', 'general')),
    sentiment       text CHECK (sentiment IN ('positive', 'neutral', 'negative')),

    -- 结构化数据（不同 content_type 有不同字段）
    structured_data jsonb NOT NULL DEFAULT '{}',

    -- 关键词
    positive_keywords text[] DEFAULT '{}',
    negative_keywords text[] DEFAULT '{}',

    -- 竞争度信号
    competition_signals jsonb DEFAULT '{}',

    created_at      timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX idx_social_intel_school_id ON social_intel(school_id);
CREATE INDEX idx_social_intel_school_code ON social_intel(school_code);
CREATE INDEX idx_social_intel_content_type ON social_intel(content_type);
CREATE INDEX idx_social_intel_confidence ON social_intel(match_confidence);

-- RLS：所有人可读，只有 service_role 可写
ALTER TABLE social_intel ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_intel_read_all"
    ON social_intel FOR SELECT
    USING (match_confidence IN ('high', 'medium'));

CREATE POLICY "social_intel_insert_service"
    ON social_intel FOR INSERT
    WITH CHECK (true);  -- service_role only (no anon insert)


-- ============================================================
-- 学校社交平台聚合统计表
-- ============================================================

CREATE TABLE social_summary (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    school_code     text NOT NULL UNIQUE,

    -- 热度数据
    total_posts     integer DEFAULT 0,
    total_engagement integer DEFAULT 0,
    heat_rank_overall integer,
    heat_rank_district integer,

    -- 面试统计
    interview_posts integer DEFAULT 0,
    top_interview_keywords jsonb DEFAULT '[]',
    interview_format_distribution jsonb DEFAULT '{}',
    avg_interview_duration integer,      -- 分钟
    parent_interview_pct integer,        -- 百分比 0-100
    interview_contributor_count integer DEFAULT 0,  -- X 位家长分享

    -- 情感分布
    sentiment_distribution jsonb DEFAULT '{}',
    positive_keywords jsonb DEFAULT '{}',
    negative_keywords jsonb DEFAULT '{}',

    -- 费用估算
    fee_estimates jsonb DEFAULT '{}',
    -- 格式：{"textbook": {"low": 500, "high": 800, "count": 5}, ...}

    -- 时间线
    timeline_summary jsonb DEFAULT '{}',
    -- 格式：{"interview_notice": {"typical_month": 10, "count": 6}, ...}

    -- 竞争度
    competition_level text CHECK (competition_level IN ('high', 'medium', 'low')),

    -- 数据范围
    data_year_range text,  -- 例："2022-2025"

    -- 元数据
    last_updated    timestamptz DEFAULT now(),
    created_at      timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX idx_social_summary_school_id ON social_summary(school_id);
CREATE INDEX idx_social_summary_heat_rank ON social_summary(heat_rank_overall);
CREATE INDEX idx_social_summary_competition ON social_summary(competition_level);

-- RLS：所有人可读
ALTER TABLE social_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_summary_read_all"
    ON social_summary FOR SELECT
    USING (true);

CREATE POLICY "social_summary_write_service"
    ON social_summary FOR ALL
    WITH CHECK (true);  -- service_role only
```

### Seed SQL 生成

`scripts/xhs/aggregate_and_seed.py` 最终输出 `supabase/seed/010_social_intel.sql`：

```sql
-- 聚合数据写入（用 school_code 关联）
INSERT INTO social_summary (
    school_id, school_code,
    total_posts, total_engagement, heat_rank_overall, heat_rank_district,
    interview_posts, top_interview_keywords, interview_format_distribution,
    avg_interview_duration, parent_interview_pct, interview_contributor_count,
    sentiment_distribution, positive_keywords, negative_keywords,
    fee_estimates, timeline_summary, competition_level, data_year_range
)
SELECT
    s.id, '619841',
    28, 4560, 15, 3,
    12, '[["积木",9],["拼图",7],["英文认知",5]]'::jsonb,
    '{"group":9,"individual":2,"parent_interview":4}'::jsonb,
    20, 60, 12,
    '{"positive":8,"neutral":3,"negative":2}'::jsonb,
    '{"老师有爱心":8,"活动丰富":6}'::jsonb,
    '{"等候时间长":3}'::jsonb,
    '{"textbook":{"low":500,"high":800,"count":5}}'::jsonb,
    '{"interview_notice":{"typical_month":10,"count":6}}'::jsonb,
    'high', '2022-2025'
FROM schools s WHERE s.school_code = '619841'
ON CONFLICT (school_code) DO UPDATE SET
    total_posts = EXCLUDED.total_posts,
    total_engagement = EXCLUDED.total_engagement,
    -- ... 其他字段
    last_updated = now();
```

---

## 八、前端数据读取（供前端开发参考）

### 新增 DB 查询函数

文件：`src/lib/db/socialIntel.ts`

```typescript
// 获取学校的社交平台聚合数据
export async function fetchSocialSummary(schoolId: string) { ... }

// 获取热度排行（首页 + 排行页）
export async function fetchHeatRanking(options: {
  district?: string;
  limit?: number;
  offset?: number;
}) { ... }

// 获取学校的面试详情（详情页 Section 4）
export async function fetchInterviewIntel(schoolId: string) { ... }
```

### 前端展示阈值规则

| 模块 | 最低数据要求 | 不满足时处理 |
|------|-------------|-------------|
| 首页热度榜 | 至少 10 所学校有数据 | 不显示该 section |
| 学校卡片热门标签 | heat_rank_overall <= 50 | 不显示标签 |
| 学校卡片家长预估费用 | fee_estimates 中某项 count >= 3 | 不显示 |
| 详情页面试资讯（Section 4） | interview_posts >= 3 | 不显示该 section |
| 面试概况卡片 | 同上 | - |
| 面试关键词 | 至少 3 个关键词频次 >= 2 | 不显示 |
| 情感分布 | total_posts >= 5 | 不显示 |
| 负面/需留意关键词 | 单词频次 >= 3 | 该词不显示 |
| 详情页时间线（Section 5） | timeline_summary 至少 3 个事件有数据 | 不显示该 section |
| 竞争度标签 | competition_signals 数据 >= 3 条 | 不显示 |
| 家长预估费用详情 | 每种费用类型 count >= 3 | 该费用类型不显示 |

### 展示文案

- 数据来源标注统一为：「數據來源：網絡公開內容整理，僅供參考」
- 面试分享数量：「X 位家長分享」（不是 X 篇）
- 费用标题：「家長預估費用」
- 热度榜标题：「社交平台熱度榜」（无副标题）
- 未指定分校的数据：标注「此分享未指定具體分校」

---

## 九、文件结构总览

```
scripts/xhs/
  generate_search_queries.py    # Phase 1：生成搜索词
  scrape_posts.py               # Phase 2：抓取帖子
  scrape_comments.py            # Phase 3：抓取评论
  extract_structured_data.py    # Phase 4：AI 提取
  aggregate_and_seed.py         # Phase 5：聚合 + 生成 SQL
  utils.py                      # 公共工具函数
  config.py                     # 配置常量

data/xhs/
  search_queries.json           # 搜索词表
  cookies.json                  # 小红书登录状态（.gitignore）
  progress.json                 # 断点续传
  raw_posts/                    # 原始帖子（按 school_code）
    619841.json
    ...
  raw_comments/                 # 评论（按 post_id）
    abc123.json
    ...
  extracted/                    # AI 提取结果
    619841.json
    ...
  social_summary.json           # 最终聚合统计

supabase/
  migrations/
    011_create_social_intel.sql  # 新表
  seed/
    010_social_intel.sql         # 数据入库
```

### .gitignore 追加

```
data/xhs/cookies.json
data/xhs/raw_posts/
data/xhs/raw_comments/
data/xhs/progress.json
```

---

## 十、执行步骤

```bash
# 1. 生成搜索词
python scripts/xhs/generate_search_queries.py

# 2. 手动登录小红书，保存 Cookie
#    浏览器打开 xiaohongshu.com → 登录 → F12 → Application → Cookies
#    复制到 data/xhs/cookies.json

# 3. 第一轮抓取（所有学校）
python scripts/xhs/scrape_posts.py --round 1

# 4. AI 提取（第一轮）
python scripts/xhs/extract_structured_data.py

# 5. 查看热度排名，确定重点学校
python scripts/xhs/aggregate_and_seed.py --preview

# 6. 第二轮抓取（重点学校 + 评论）
python scripts/xhs/scrape_posts.py --round 2
python scripts/xhs/scrape_comments.py

# 7. AI 提取（第二轮）
python scripts/xhs/extract_structured_data.py --include-comments

# 8. 最终聚合 + 生成 SQL
python scripts/xhs/aggregate_and_seed.py

# 9. 人工抽查
#    检查 data/xhs/extracted/ 中 20-30 所学校的提取结果

# 10. 应用 migration + seed
supabase migration new create_social_intel
#  复制 011_create_social_intel.sql 内容
supabase db push
#  执行 seed SQL
node scripts/apply_school_enrichment.mjs  # 或直接在 Supabase Dashboard 执行
```

---

## 十一、风险与注意事项

1. **反爬检测**：小红书反爬较严格，单 IP 高频请求可能触发验证码。建议控制速率（每次请求间隔 1.5-3 秒），如果被封可以换 IP 或等待几小时后重试。
2. **Cookie 有效期**：小红书登录 Cookie 通常有效期 7-14 天。如果抓取周期超过一周，需要中途刷新 Cookie。
3. **数据质量**：AI 提取不可能 100% 准确。必须人工抽查。重点检查：学校匹配是否正确、面试年份是否合理、费用数字是否在合理范围。
4. **法律风险**：只存储结构化提取数据和原帖链接，不存储原文。标注「數據來源：網絡公開內容整理」。
5. **存储空间**：原始数据存本地，只有结构化结果和聚合统计入数据库。social_intel + social_summary 预计占用 10-30MB，远在 Supabase 500MB 限制内。
6. **API 费用**：Claude API 处理约 3 万条内容，使用 claude-sonnet-4-20250514，预计费用 $30-80 左右（取决于内容长度和批处理效率）。
