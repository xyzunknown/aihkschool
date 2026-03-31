#!/usr/bin/env python3
"""
Shared utilities for the XHS scraping pipeline.
"""
from __future__ import annotations

import json
import re
import time
import random
from pathlib import Path
from collections import Counter
from datetime import datetime

from . import config


# ─── File I/O ────────────────────────────────────────────────────────

def load_json(path: Path) -> list | dict:
    """Load JSON file, return empty list if not found."""
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(data: list | dict, path: Path) -> None:
    """Save JSON file, create parent directories if needed."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def load_schools() -> list[dict]:
    """Load schools_merged.json."""
    return load_json(config.SCHOOLS_MERGED_PATH)


# ─── Name parsing ────────────────────────────────────────────────────

def split_name_and_branch(name_tc: str) -> tuple[str, str | None]:
    """
    Split school name into main name and branch identifier.
    
    "迦南幼稚園（小西灣）" → ("迦南幼稚園", "小西灣")
    "培正小學（幼稚園部）" → ("培正小學", "幼稚園部")
    "維多利亞幼稚園" → ("維多利亞幼稚園", None)
    """
    for open_b, close_b in [("（", "）"), ("﹝", "﹞"), ("(", ")")]:
        idx = name_tc.find(open_b)
        if idx > 0:
            end = name_tc.find(close_b, idx)
            if end > idx:
                main = name_tc[:idx]
                branch = name_tc[idx + 1 : end]
                return main, branch
    return name_tc, None


def extract_core_name(main_name: str) -> str:
    """Strip generic suffixes from main name to get core name."""
    core = main_name
    for suffix in config.NAME_SUFFIXES:
        if core.endswith(suffix):
            core = core[: -len(suffix)]
            break
    return core


def strip_prefix(core: str) -> str:
    """Strip institutional prefixes."""
    for prefix in config.NAME_PREFIXES:
        if core.startswith(prefix):
            return core[len(prefix) :]
    return core


def generate_aliases(name_tc: str, name_en: str | None) -> list[str]:
    """
    Generate search aliases from official school name.
    Returns ordered list of aliases (most specific first).
    """
    aliases: list[str] = []

    # 0. Full name always first
    aliases.append(name_tc)

    # 1. Split main and branch
    main_name, branch = split_name_and_branch(name_tc)
    if main_name != name_tc:
        aliases.append(main_name)

    # 2. Extract core name (strip suffix)
    core = extract_core_name(main_name)

    # 3. Strip prefix
    core_no_prefix = strip_prefix(core)

    # 4. Add core name variants
    if core and core != main_name:
        aliases.append(core)
        aliases.append(core + "幼稚園")

    if core_no_prefix and core_no_prefix != core and len(core_no_prefix) >= 2:
        aliases.append(core_no_prefix)

    # 5. Special patterns
    # Pattern A: "XX小學（幼稚園部）"
    if "小學" in main_name and branch and "幼" in branch:
        school_core = main_name.replace("小學", "")
        aliases.append(school_core + "幼")
        aliases.append(school_core + "幼稚園")
        aliases.append(school_core)

    # Pattern B: "XX英文幼稚園" — add version without "英文"
    if "英文" in main_name:
        aliases.append(main_name.replace("英文", ""))

    # 6. English short name
    if name_en:
        words = [
            w for w in name_en.split()
            if w.upper() not in config.EN_NOISE_WORDS
        ]
        if words:
            aliases.append(words[0].title())

    # 7. Deduplicate, preserve order
    seen: set[str] = set()
    result: list[str] = []
    for a in aliases:
        a = a.strip()
        if a and a not in seen:
            seen.add(a)
            result.append(a)
    return result


# ─── Address keywords ────────────────────────────────────────────────

_AREA_NAMES = (
    "堅尼地城|西營盤|中環|上環|灣仔|銅鑼灣|北角|鰂魚涌|太古|西灣河|"
    "筲箕灣|柴灣|小西灣|薄扶林|香港仔|黃竹坑|赤柱|深水埗|長沙灣|"
    "旺角|大角咀|九龍塘|九龍城|黃大仙|鑽石山|牛頭角|觀塘|藍田|油塘|"
    "將軍澳|沙田|大圍|火炭|馬鞍山|大埔|粉嶺|上水|元朗|天水圍|屯門|"
    "荃灣|葵涌|青衣|東涌|何文田|紅磡|土瓜灣|石硤尾|美孚|荔枝角|"
    "彩虹|慈雲山|樂富|新蒲崗|啟德|調景嶺|寶林|坑口|西貢|清水灣|"
    "沙田圍|禾輋|石門|愉翠|大水坑|烏溪沙|太和|大埔墟|"
    "粉嶺南|上水圍|古洞|落馬洲|洪水橋|錦田|朗屏|"
    "青山灣|蝴蝶邨|良景|兆康|大興|友愛|安定|"
    "梨木樹|大窩口|深井|馬灣|"
    "葵芳|葵興|石籬|荔景|"
    "逸東|映灣園|昂坪|"
    "半山|山頂|跑馬地|大坑|天后|炮台山|"
    "鶴咀|赤柱|淺水灣|壽臣山|田灣|石排灣"
)

_AREA_PATTERN = re.compile(f"({_AREA_NAMES})")


def extract_address_keywords(address_tc: str) -> list[str]:
    """Extract matchable location keywords from address."""
    keywords: list[str] = []
    # Road/street names
    roads = re.findall(r"[\u4e00-\u9fff]{2,}(?:路|道|街|徑|里|巷|坊)", address_tc)
    keywords.extend(roads)
    # Estate/building names
    estates = re.findall(
        r"[\u4e00-\u9fff]{2,}(?:閣|苑|花園|中心|邨|大廈|大厦|廣場|城)",
        address_tc,
    )
    keywords.extend(estates)
    # Known area names
    areas = _AREA_PATTERN.findall(address_tc)
    keywords.extend(areas)
    return keywords


# ─── KG / Primary filtering ─────────────────────────────────────────

def classify_kg_post(title: str, content: str) -> str:
    """
    Classify whether a post is about kindergarten.
    Returns: 'yes' / 'no' / 'uncertain'
    """
    text = (title + " " + content).lower()
    has_kg = any(kw.lower() in text for kw in config.KG_POSITIVE_KEYWORDS)
    has_primary = any(kw.lower() in text for kw in config.PRIMARY_NEGATIVE_KEYWORDS)

    if has_kg and not has_primary:
        return "yes"
    elif has_primary and not has_kg:
        return "no"
    elif has_kg and has_primary:
        return "uncertain"
    else:
        return "uncertain"


# ─── Multi-branch matching ───────────────────────────────────────────

def match_post_to_school(
    post: dict,
    school_query: dict,
    group_schools: list[dict] | None,
) -> dict:
    """
    Match a post to a specific school (handling multi-branch).
    
    Returns: {school_code, branch_identified, match_confidence}
    """
    text = post.get("title", "") + " " + post.get("content", "")

    # 1. Exact full name match
    if school_query["name_tc"] in text:
        return {
            "school_code": school_query["school_code"],
            "branch_identified": True,
            "match_confidence": "high",
        }

    # 2. Non-multi-branch: main name match is enough
    if not school_query["is_multi_branch"]:
        main_name, _ = split_name_and_branch(school_query["name_tc"])
        if main_name in text:
            return {
                "school_code": school_query["school_code"],
                "branch_identified": True,
                "match_confidence": "high",
            }

    # 3. Multi-branch: try branch identifiers and address keywords
    if school_query["is_multi_branch"] and group_schools:
        for sibling in group_schools:
            _, branch = split_name_and_branch(sibling["name_tc"])
            if branch and branch in text:
                return {
                    "school_code": sibling["code"],
                    "branch_identified": True,
                    "match_confidence": "high",
                }
            addr = sibling.get("address_tc", "")
            for kw in extract_address_keywords(addr):
                if kw in text and len(kw) >= 2:
                    return {
                        "school_code": sibling["code"],
                        "branch_identified": True,
                        "match_confidence": "medium",
                    }

        # Can't determine branch → low confidence
        return {
            "school_code": school_query["school_code"],
            "branch_identified": False,
            "match_confidence": "low",
            "group_name": school_query.get("group_name"),
        }

    # 4. Fallback
    return {
        "school_code": school_query["school_code"],
        "branch_identified": not school_query["is_multi_branch"],
        "match_confidence": "medium",
    }


# ─── Progress tracking ──────────────────────────────────────────────

def load_progress() -> dict:
    """Load scraping progress for resume support."""
    data = load_json(config.PROGRESS_PATH)
    if not data:
        return {
            "last_school_index": 0,
            "completed_schools": [],
            "failed_schools": {},
            "total_posts_fetched": 0,
            "round": 1,
            "last_updated": None,
        }
    return data


def save_progress(progress: dict) -> None:
    """Save scraping progress."""
    progress["last_updated"] = datetime.now().isoformat()
    save_json(progress, config.PROGRESS_PATH)


# ─── Misc ────────────────────────────────────────────────────────────

def random_delay(min_s: float | None = None, max_s: float | None = None) -> None:
    """Sleep for a random duration."""
    lo = min_s or config.MIN_DELAY
    hi = max_s or config.MAX_DELAY
    time.sleep(lo + random.random() * (hi - lo))


def parse_date(date_str: str | None) -> str | None:
    """
    Normalize various date formats to YYYY-MM-DD.
    Returns None if unparseable or before MIN_DATE.
    """
    if not date_str:
        return None
    # Try common formats
    for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%Y年%m月%d日"):
        try:
            dt = datetime.strptime(date_str.strip(), fmt)
            result = dt.strftime("%Y-%m-%d")
            if result < config.MIN_DATE:
                return None
            return result
        except ValueError:
            continue
    return None


def chunk_list(lst: list, size: int):
    """Split list into chunks of given size."""
    for i in range(0, len(lst), size):
        yield lst[i : i + size]
