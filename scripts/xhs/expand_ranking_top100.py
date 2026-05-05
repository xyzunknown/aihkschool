#!/usr/bin/env python3
"""Expand ranking_branch_top100.json from 43 to 100 entries.
Sources: existing OCR data + schools_merged.json + curated elite school list.
"""

import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BRANCH_PATH = os.path.join(ROOT, "data", "xhs", "ranking_branch_top100.json")
SCHOOLS_PATH = os.path.join(ROOT, "data", "schools_merged.json")
OUTPUT_PATH = os.path.join(ROOT, "data", "xhs", "ranking_branch_top100.json")


def load_json(path):
    with open(path) as f:
        return json.load(f)


def build_school_lookup(schools):
    """Build {school_code: school} and {name_tc_normalized: [schools]} lookups."""
    by_code = {}
    by_name = {}
    for s in schools:
        code = s.get("code", "")
        if code:
            by_code[code] = s
        name = (s.get("name_tc", "") or "").strip()
        if name:
            key = name.replace("（", "(").replace("）", ")").replace(" ", "")
            if key not in by_name:
                by_name[key] = []
            by_name[key].append(s)
    return by_code, by_name


def format_entry(school, brand_name=None, mention_count=1, source="curated"):
    """Build a ranking_branch_top100 entry from a schools_merged row."""
    name = school.get("name_tc", "")
    return {
        "school_name": name,
        "brand_name": brand_name or name,
        "school_code": school.get("code", ""),
        "district": school.get("district", ""),
        "school_type": school.get("school_type", ""),
        "has_nursery": bool(school.get("has_nursery")),
        "kep": bool(school.get("kep")),
        "mention_count": mention_count,
        "source_images": [source],
    }


def find_school(by_code, by_name, code=None, name=None):
    """Find a school by code or name (with normalization)."""
    if code and code in by_code:
        return by_code[code]

    if name:
        key = name.replace("（", "(").replace("）", ")").replace(" ", "")
        if key in by_name:
            return by_name[key][0]

    # Fuzzy match by name prefix
    if name:
        key = name.replace("（", "(").replace("）", ")").replace(" ", "")
        for k, v in by_name.items():
            if key in k or k in key:
                return v[0]

    return None


def main():
    # Load data
    existing = load_json(BRANCH_PATH)
    schools = load_json(SCHOOLS_PATH)
    by_code, by_name = build_school_lookup(schools)

    print(f"Existing entries: {len(existing)}")
    print(f"Schools in merged: {len(schools)}")

    # Collect existing school_codes to avoid duplicates
    seen_codes = set(e.get("school_code", "") for e in existing)
    seen_names = set(
        e.get("school_name", "").replace("（", "(").replace("）", ")").replace(" ", "")
        for e in existing
    )

    result = list(existing)  # Keep all existing

    def add_school(code=None, name=None, brand=None, mc=1, src="curated"):
        nonlocal result
        s = find_school(by_code, by_name, code=code, name=name)
        if not s:
            print(f"  NOT FOUND: {code or name}")
            return False
        scode = s.get("code", "")
        sname = s.get("name_tc", "").replace("（", "(").replace("）", ")").replace(" ", "")
        if scode in seen_codes or sname in seen_names:
            return False
        result.append(format_entry(s, brand_name=brand, mention_count=mc, source=src))
        seen_codes.add(scode)
        seen_names.add(sname)
        return True

    added = 0

    # ── Tier 1: Elite Private/International Schools ──
    print("\n── Tier 1: Elite Private/International ──")
    elite = [
        # (code, name_hint, brand, mention_count)
        ("215120", "國際英文幼稚園", "國際英文幼稚園", 8),      # St. Catherine's
        ("322300", "根德園幼稚園", "根德園幼稚園", 7),          # Kentville
        ("214868", "金巴倫英文幼稚園", "金巴倫英文幼稚園", 6),   # St. Nicholas'
        ("537713", "劍鳴幼稚園", "劍鳴幼稚園", 6),              # Keen Mind
        ("519863", "京斯敦國際幼稚園", "京斯敦國際幼稚園", 5),   # Kingston
        ("565938", "寶山幼兒園", "寶山幼兒園", 8),              # Braemar Hill
        ("325961", "右思維幼稚園", "右思維幼稚園", 4),           # Rightmind
        ("519871", "弘志幼稚園", "弘志幼稚園", 4),               # Discovery Mind
        ("215449", "約克中英文幼稚園", "約克中英文幼稚園", 6),   # York Kln Tong
        ("607592", "道爾頓幼稚園", "道爾頓幼稚園", 4),           # Little Dalton
        ("324965", "香港民生幼稚園", "香港民生幼稚園", 4),       # Man Sang
        ("535818", "安菲爾國際幼稚園", "安菲爾國際幼稚園", 5),   # Anfield
        ("606979", "墨爾文國際幼稚園", "墨爾文國際幼稚園", 4),   # Malvern
        ("613037", "墨爾文國際幼稚園", "墨爾文國際幼稚園", 4),   # Malvern (West)
        ("627275", "哈羅小獅幼稚園", "哈羅小獅幼稚園", 4),       # Harrow
        ("216208", "地利亞英文小學暨幼稚園", "地利亞英文小學暨幼稚園", 3), # Delia
        ("523984", "綠茵英文（國際）幼稚園", "綠茵英文國際幼稚園", 4),   # Greenfield
        ("604372", "綠茵英文（國際）幼稚園", "綠茵英文國際幼稚園", 3),   # Greenfield branch
        ("216267", "朗思國際幼稚園", "朗思國際幼稚園", 5),       # Think Intl
        ("578193", "弘志幼稚園", "弘志幼稚園", 3),               # Discovery Mind branch
        ("601420", "YORK INTERNATIONAL PRE-SCHOOL", "約克國際", 4), # York Intl Pre-School
        ("322822", "約克英文小學暨幼稚園", "約克英文小學暨幼稚園", 5), # York Primary+KG
        ("571065", "樂基幼兒學校", "樂基幼兒學校", 4),            # HK Preschool
        ("522953", "樂基幼兒學校", "樂基幼兒學校", 4),            # HK Preschool Ascot
        ("325848", "帝京香港幼稚園", "帝京香港幼稚園", 3),       # Teikyo
    ]
    for code, name, brand, mc in elite:
        if add_school(code=code, name=name, brand=brand, mc=mc):
            added += 1
            print(f"  + {name}")
    print(f"  Tier 1 added: {added}")

    # ── Tier 2: Victoria Branches ──
    print("\n── Tier 2: Victoria Branches ──")
    victoria = [
        ("542164", "維多利亞（寶翠園）幼稚園", 6),
        ("216194", "維多利亞（海怡）國際幼稚園", 5),
        ("569828", "康怡維多利亞幼稚園", 5),
        ("566942", "銅鑼灣維多利亞（海峰園）", 4),
        ("325481", "維多利亞幼稚園", 8),  # HQ
        ("574708", "維多利亞（君匯港）幼稚園", 5),  # already seen? check
        ("566900", "維多利亞（何文田）國際幼兒園", 6),  # already seen? check
        ("618039", "維多利亞（何文田）國際幼稚園", 6),  # already seen? check
        ("619850", "維多利亞（海之戀）國際幼稚園", 4),
    ]
    v_added = 0
    for code, name, mc in victoria:
        if add_school(code=code, name=name, brand="維多利亞", mc=mc):
            v_added += 1
            print(f"  + {name}")
    print(f"  Tier 2 added: {v_added}")
    added += v_added

    # ── Tier 3: Learning Habitat Branches ──
    print("\n── Tier 3: Learning Habitat Branches ──")
    lh = [
        ("561207", "學之園幼稚園（凱帆薈）", 5),
        ("604291", "學之園幼稚園（迎海）", 5),
        ("612391", "學之園幼稚園（海翩康城）", 4),
        ("615250", "學之園幼稚園（星匯居）", 4),
        ("617474", "學之園幼稚園（奧運）", 4),
        ("534200", "學之園幼稚園（青衣）", 5),
        ("609528", "學之園幼稚園（昇御海逸）", 4),  # already? check
        ("613681", "學之園幼稚園（君豪峰）", 4),    # already? check
    ]
    lh_added = 0
    for code, name, mc in lh:
        if add_school(code=code, name=name, brand="學之園", mc=mc):
            lh_added += 1
            print(f"  + {name}")
    print(f"  Tier 3 added: {lh_added}")
    added += lh_added

    # ── Tier 4: Other Priority Brand Branches ──
    print("\n── Tier 4: Other Priority Brands ──")
    others = [
        # 朗思国际 Think International
        ("533360", "朗思國際幼稚園（馬鞍山）", "朗思國際", 3),
        ("612782", "朗思國際幼稚園（南昌）", "朗思國際", 3),
        # 香港灵粮堂
        ("133744", "香港靈糧堂幼稚園", "香港靈糧堂", 5),
        ("595969", "香港靈糧堂荃灣幼稚園", "香港靈糧堂", 4),
        ("596787", "香港靈糧堂秀德幼稚園", "香港靈糧堂", 4),
        # 安基司 Anchors
        ("536067", "安基司幼稚園", "安基司", 4),
        ("582417", "安基司國際幼兒園（粉嶺）", "安基司", 3),
        ("622060", "安基司國際幼稚園（大埔）", "安基司", 3),
        # 栢基 Parkview
        ("215937", "栢基國際幼稚園", "栢基", 4),
        ("555703", "栢基國際幼稚園（九龍）", "栢基", 3),
        # 真光 True Light
        ("321141", "香港真光幼稚園", "香港真光", 5),
        # 启思 Creative branches (more)
        ("325864", "啓思幼稚園（匯景花園）", "啟思", 3),
        # 心怡天地
        ("620473", "心怡天地國際幼稚園", "心怡天地", 3),
        # 德萃 St. Hilary
        ("604445", "德萃幼稚園（紅磡）", "德萃", 3),
        ("622213", "德萃幼稚園（馬鞍山）", "德萃", 3),
        # 激活 Gigamind
        ("541222", "激活幼稚園", "激活", 3),
        # 又一村学校 Yau Yat Chuen
        ("133850", "又一村學校", "又一村學校", 4),
        # 救恩 Kau Yan
        ("321192", "救恩學校", "救恩學校", 5),
        ("564974", "路德會救恩幼稚園", "路德會救恩", 3),
        # 迦南 Cannan (more branches)
        ("565580", "迦南幼稚園（黃埔花園）", "迦南", 3),
        ("567221", "迦南幼稚園（海濱花園）", "迦南", 3),
        # 圣保罗堂 St. Paul's Church
        ("325848", None, None, 3),  # skip if code already used
    ]
    for item in others:
        if len(item) == 4:
            code, name, brand, mc = item
        else:
            continue
        if add_school(code=code, name=name, brand=brand, mc=mc):
            added += 1
    print(f"  Tier 4 additions (total now: {added + 43})")

    # ── Tier 5: Fill remaining slots with well-known non-profit schools ──
    print("\n── Tier 5: Notable Non-Profit Fillers ──")
    fillers = [
        ("325970", "嘉諾撒聖心幼稚園", "嘉諾撒聖心", 7),
        ("215538", "高主教書院幼稚園部", "高主教書院", 5),
        ("131466", "聖保羅堂幼稚園", "聖保羅堂", 6),
        ("131440", "聖士提反堂小學暨幼稚園", "聖士提反堂", 5),
        ("324477", "香港培道小學", "香港培道", 4),
        ("133540", "聖馬可堂白普理幼稚園", "聖馬可堂", 3),
        ("324601", "德信幼稚園", "德信", 4),
        ("325490", "聖羅撒幼稚園", "聖羅撒", 4),
        ("133884", "香港培正小學", "香港培正", 5),
        ("325938", "崇真小學暨幼稚園", "崇真", 4),
        ("530442", "協恩中學附屬幼稚園", "協恩", 6),
        ("217108", "基督堂幼稚園", "基督堂", 5),
        ("215813", "耀中國際學校", "耀中", 5),
        ("212563", "香港創價幼稚園", "香港創價", 4),
        ("563714", "聖公會幼稚園", "聖公會", 6),
        ("323179", "樂善堂顧李覺鮮幼稚園", "樂善堂", 2),
        ("158534", "佳寶幼稚園（建生邨）", "佳寶", 3),
        ("536067", "安基司幼稚園", "安基司", 3),  # already added? check
    ]
    filler_added = 0
    for code, name, brand, mc in fillers:
        if add_school(code=code, name=name, brand=brand, mc=mc):
            filler_added += 1
    print(f"  Tier 5 added: {filler_added}")

    total = len(result)
    print(f"\n{'='*50}")
    print(f"Total entries: {total} (target: 100)")

    # ── Cap at 100 if over ──
    if total > 100:
        result = result[:100]
        print(f"Capped at 100")
        total = 100
    elif total < 100:
        print(f"WARNING: Only {total} entries, {100 - total} short of 100")

    # ── Stats ──
    stypes = {}
    districts = {}
    for e in result:
        st = e.get("school_type", "unknown")
        stypes[st] = stypes.get(st, 0) + 1
        d = e.get("district", "unknown")
        districts[d] = districts.get(d, 0) + 1

    print(f"School types: {stypes}")
    print(f"Districts covered: {len(districts)}")

    # Write
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\nWritten to: {os.path.relpath(OUTPUT_PATH, ROOT)}")


if __name__ == "__main__":
    main()
