#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
INTERNAL_BRANDS_PATH = ROOT / "data" / "xhs" / "internal_priority_brands.json"
BRANCH_TOP_PATH = ROOT / "data" / "xhs" / "ranking_branch_top100.json"
BRAND_TOP_PATH = ROOT / "data" / "xhs" / "ranking_brand_top100.json"
SCHOOLS_PATH = ROOT / "data" / "schools_merged.json"
OUTPUT_PATH = ROOT / "data" / "xhs" / "internal_priority_school_top100.json"

KINDERGARTEN_HINTS = (
    "幼稚園",
    "幼兒園",
    "幼兒學校",
    "kindergarten",
    "nursery",
    "preschool",
)
GENERIC_SUFFIXES = (
    "國際幼兒園",
    "國際幼稚園",
    "國際幼兒學校",
    "國際英文幼稚園",
    "英文幼稚園",
    "幼兒學校",
    "幼兒園",
    "幼稚園",
    "學校",
)


def load_json(path: Path) -> list | dict:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def normalize(text: str | None) -> str:
    if not text:
        return ""
    cleaned = re.sub(r"[\s\-_/()（）【】\[\]·,.，。:：'\"&]+", "", text)
    return cleaned.lower()


def is_kindergarten_school(school: dict) -> bool:
    tc = school.get("name_tc", "")
    en = (school.get("name_en") or "").lower()
    haystack = f"{tc} {en}"
    return any(hint in haystack for hint in KINDERGARTEN_HINTS)


def brand_variants(name: str) -> list[str]:
    variants: list[str] = []
    raw = normalize(name)
    if raw:
        variants.append(raw)
    core = raw
    changed = True
    while changed and core:
        changed = False
        for suffix in GENERIC_SUFFIXES:
            suffix_norm = normalize(suffix)
            if suffix_norm and core.endswith(suffix_norm):
                core = core[: -len(suffix_norm)]
                changed = True
                break
    if core and core not in variants:
        variants.append(core)
    return [variant for variant in variants if len(variant) >= 2]


def school_text(school: dict) -> str:
    return normalize((school.get("name_tc") or "") + " " + (school.get("name_en") or ""))


def school_matches_brand(school: dict, brand_name: str) -> bool:
    text = school_text(school)
    return any(variant in text for variant in brand_variants(brand_name))


def school_matches_branch_hint(school: dict, branch_hint: str) -> bool:
    return normalize(branch_hint) in school_text(school)


def build_brand_mention_lookup(brand_top: list[dict]) -> dict[str, int]:
    lookup: dict[str, int] = defaultdict(int)
    for row in brand_top:
        count = int(row.get("mention_count") or 0)
        for variant in brand_variants(row.get("brand_name", "")):
            lookup[variant] = max(lookup[variant], count)
    return dict(lookup)


def add_candidate(candidates: dict[str, dict], school: dict, score_delta: int, reason: str, source: str) -> None:
    code = str(school.get("code") or "").strip()
    if not code:
        return
    row = candidates.setdefault(
        code,
        {
            "school_code": code,
            "name_tc": school.get("name_tc"),
            "name_en": school.get("name_en"),
            "district": school.get("district"),
            "school_type": school.get("school_type"),
            "website": school.get("website"),
            "has_nursery": bool(school.get("has_nursery")),
            "kep": bool(school.get("kep")),
            "score": 0,
            "sources": [],
            "reasons": [],
        },
    )
    row["score"] += score_delta
    if source not in row["sources"]:
        row["sources"].append(source)
    if reason not in row["reasons"]:
        row["reasons"].append(reason)


def main() -> None:
    internal_brands = load_json(INTERNAL_BRANDS_PATH)
    branch_top = load_json(BRANCH_TOP_PATH)
    brand_top = load_json(BRAND_TOP_PATH)
    schools = load_json(SCHOOLS_PATH)

    schools_by_code = {
        str(school.get("code") or "").strip(): school
        for school in schools
        if school.get("code") and school.get("website") and is_kindergarten_school(school)
    }
    kindergarten_schools = list(schools_by_code.values())
    brand_mentions = build_brand_mention_lookup(brand_top)

    candidates: dict[str, dict] = {}

    for row in branch_top:
        code = str(row.get("school_code") or "").strip()
        school = schools_by_code.get(code)
        if not school:
            continue
        mention_count = int(row.get("mention_count") or 0)
        add_candidate(
            candidates,
            school,
            100000 + mention_count * 100,
            f"OCR 分校榜直接命中，mention_count={mention_count}",
            "ocr_branch_top",
        )

    curated_matches = 0
    for brand in internal_brands.get("top_brands", []):
        priority = int(brand.get("priority") or 999)
        brand_name = brand.get("brand_name", "")
        focus_branches = [item for item in brand.get("focus_branches", []) if item]
        brand_score = max(0, 50000 - priority * 1200)
        mention_bonus = 0
        for variant in brand_variants(brand_name):
            mention_bonus = max(mention_bonus, brand_mentions.get(variant, 0) * 30)

        for school in kindergarten_schools:
            if not school_matches_brand(school, brand_name):
                continue

            branch_bonus = 0
            matched_branches: list[str] = []
            for branch_hint in focus_branches:
                if school_matches_branch_hint(school, branch_hint):
                    branch_bonus += 1200
                    matched_branches.append(branch_hint)

            tag_bonus = 0
            tags = brand.get("tags", [])
            if "has_nursery" in tags and school.get("has_nursery"):
                tag_bonus += 300
            if "non_profit" in tags and school.get("school_type") == "non_profit":
                tag_bonus += 150
            if "private" in tags and school.get("school_type") == "private_independent":
                tag_bonus += 150

            reason = f"人工优先品牌池 priority={priority} brand={brand_name}"
            if matched_branches:
                reason += f" focus_branch={','.join(matched_branches)}"
            add_candidate(
                candidates,
                school,
                brand_score + mention_bonus + branch_bonus + tag_bonus,
                reason,
                "curated_brand_pool",
            )
            curated_matches += 1

    for row in brand_top:
        brand_name = row.get("brand_name", "")
        mention_count = int(row.get("mention_count") or 0)
        if mention_count <= 0:
            continue
        for school in kindergarten_schools:
            if not school_matches_brand(school, brand_name):
                continue
            add_candidate(
                candidates,
                school,
                800 + mention_count * 40,
                f"OCR 品牌榜补充命中 brand={brand_name} mention_count={mention_count}",
                "ocr_brand_top",
            )

    ranked = sorted(
        candidates.values(),
        key=lambda item: (
            item["score"],
            1 if item.get("has_nursery") else 0,
            item.get("name_tc") or "",
        ),
        reverse=True,
    )

    top100 = []
    for index, item in enumerate(ranked[:100], start=1):
        top100.append(
            {
                "rank": index,
                "school_code": item["school_code"],
                "name_tc": item["name_tc"],
                "name_en": item["name_en"],
                "district": item["district"],
                "school_type": item["school_type"],
                "website": item["website"],
                "has_nursery": item["has_nursery"],
                "kep": item["kep"],
                "priority_score": item["score"],
                "sources": item["sources"],
                "reasons": item["reasons"],
            }
        )

    payload = {
        "generated_at": str(date.today()),
        "source_files": [
            str(INTERNAL_BRANDS_PATH.relative_to(ROOT)),
            str(BRANCH_TOP_PATH.relative_to(ROOT)),
            str(BRAND_TOP_PATH.relative_to(ROOT)),
            str(SCHOOLS_PATH.relative_to(ROOT)),
        ],
        "selection_rules": [
            "先用 OCR 分校榜直接命中的 school_code 作为高优先种子。",
            "再按人工整理的内部品牌池扩充分校，focus_branches 优先。",
            "最后用 OCR 品牌榜补足，输出可抓官网的前 100 所幼稚园相关学校。",
            "过滤掉无官网或非幼稚园/幼儿学校记录。",
        ],
        "candidate_counts": {
            "kindergarten_schools_with_website": len(kindergarten_schools),
            "ocr_branch_rows": len(branch_top),
            "ocr_brand_rows": len(brand_top),
            "curated_brand_rows": len(internal_brands.get("top_brands", [])),
            "matched_candidates": len(candidates),
            "curated_match_events": curated_matches,
            "selected": len(top100),
        },
        "schools": top100,
    }
    save_json(OUTPUT_PATH, payload)
    print(f"wrote={OUTPUT_PATH} selected={len(top100)} candidates={len(candidates)}")


if __name__ == "__main__":
    main()