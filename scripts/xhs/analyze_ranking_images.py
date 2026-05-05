#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

from rapidocr_onnxruntime import RapidOCR

_project_root = str(Path(__file__).resolve().parents[2])
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from scripts.xhs import config
from scripts.xhs.utils import generate_aliases, load_json, split_name_and_branch


IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
OUTPUT_ANALYSIS = config.XHS_DIR / "ranking_image_analysis.json"
OUTPUT_BRAND = config.XHS_DIR / "ranking_brand_top100.json"
OUTPUT_BRANCH = config.XHS_DIR / "ranking_branch_top100.json"


def normalize_text(text: str) -> str:
    normalized = text or ""
    normalized = normalized.replace("（", "(").replace("）", ")")
    normalized = normalized.replace("﹝", "(").replace("﹞", ")")
    normalized = re.sub(r"\s+", "", normalized)
    normalized = re.sub(r"[•·・,，。:：;；'\"“”‘’!?！？【】\[\]{}]", "", normalized)
    return normalized.strip().lower()


def detect_flags(text: str) -> dict:
    return {
        "has_n_class": any(token in text for token in ["n班", "pn", "nursery"]),
        "has_k1": "k1" in text or "幼儿班" in text or "幼兒班" in text,
        "mentions_voucher": any(token in text for token in ["学券", "學券", "免费优质幼稚园计划", "免費優質幼稚園計劃"]),
        "mentions_non_profit": any(token in text for token in ["非牟利", "非营利", "nonprofit", "non-profit"]),
        "mentions_private": any(token in text for token in ["私立", "私校", "private"]),
        "mentions_international": any(token in text for token in ["国际", "國際", "international"]),
    }


def extract_tuition_values(text: str) -> list[str]:
    pattern = re.compile(r"(?:\$|hk\$|hkd)?\s?(\d{1,3}(?:,\d{3})+|\d{4,6})(?:/年|一年|每年|全年|學費|学费)?", re.I)
    values = []
    for match in pattern.finditer(text):
        value = match.group(1)
        if len(value.replace(",", "")) < 4:
            continue
        values.append(value)
    deduped = []
    seen = set()
    for value in values:
        if value not in seen:
            seen.add(value)
            deduped.append(value)
    return deduped[:5]


def list_images(image_dir: Path) -> list[Path]:
    return sorted(
        [path for path in image_dir.iterdir() if path.is_file() and path.suffix.lower() in IMAGE_EXTS],
        key=lambda path: path.name,
    )


def build_school_catalog() -> tuple[list[dict], dict[str, set[str]], dict[str, set[str]]]:
    schools = load_json(config.SCHOOLS_MERGED_PATH)
    branch_alias_map: dict[str, set[str]] = {}
    brand_alias_map: dict[str, set[str]] = defaultdict(set)

    for school in schools:
        branch_name = school["name_tc"]
        brand_name, branch_label = split_name_and_branch(branch_name)
        aliases = generate_aliases(school["name_tc"], school.get("name_en"))
        brand_aliases = {normalize_text(alias) for alias in aliases if alias and len(normalize_text(alias)) >= 2}
        brand_aliases.add(normalize_text(branch_name))
        brand_aliases.add(normalize_text(brand_name))

        branch_aliases = {normalize_text(branch_name)}
        if branch_label:
            branch_aliases.add(normalize_text(f"{brand_name}{branch_label}"))
            branch_aliases.add(normalize_text(branch_label))

        branch_alias_map[branch_name] = {alias for alias in branch_aliases if len(alias) >= 3}
        brand_alias_map[brand_name].update(brand_aliases)

    return schools, branch_alias_map, dict(brand_alias_map)


def match_entities(text: str, branch_alias_map: dict[str, set[str]], brand_alias_map: dict[str, set[str]]) -> tuple[list[str], list[str]]:
    branch_hits = []
    for branch_name, aliases in branch_alias_map.items():
        if any(alias and alias in text for alias in sorted(aliases, key=len, reverse=True)):
            branch_hits.append(branch_name)

    brand_hits = []
    for brand_name, aliases in brand_alias_map.items():
        if any(alias and alias in text for alias in sorted(aliases, key=len, reverse=True)):
            brand_hits.append(brand_name)

    return sorted(set(branch_hits)), sorted(set(brand_hits))


def analyze_images(image_dir: Path, limit: int | None = None) -> dict:
    engine = RapidOCR()
    schools, branch_alias_map, brand_alias_map = build_school_catalog()
    school_by_name = {school["name_tc"]: school for school in schools}

    images = list_images(image_dir)
    if limit:
        images = images[:limit]

    branch_counter = Counter()
    brand_counter = Counter()
    branch_image_hits: dict[str, list[str]] = defaultdict(list)
    brand_image_hits: dict[str, list[str]] = defaultdict(list)
    image_reports = []

    for image_path in images:
        result, _ = engine(str(image_path))
        lines = []
        if result:
            for item in result:
                if len(item) >= 2:
                    lines.append(item[1])
        merged_text = "\n".join(lines)
        normalized = normalize_text(merged_text)
        branch_hits, brand_hits = match_entities(normalized, branch_alias_map, brand_alias_map)
        flags = detect_flags(normalized)
        tuition_values = extract_tuition_values(merged_text)

        for branch_name in branch_hits:
            branch_counter[branch_name] += 1
            branch_image_hits[branch_name].append(image_path.name)
        for brand_name in brand_hits:
            brand_counter[brand_name] += 1
            brand_image_hits[brand_name].append(image_path.name)

        image_reports.append(
            {
                "image": image_path.name,
                "post_group": image_path.stem[:1],
                "ocr_text": merged_text[:4000],
                "branch_hits": branch_hits,
                "brand_hits": brand_hits,
                "flags": flags,
                "tuition_values": tuition_values,
            }
        )

    brand_top = []
    for brand_name, count in brand_counter.most_common(100):
        brand_top.append(
            {
                "brand_name": brand_name,
                "mention_count": count,
                "source_images": brand_image_hits[brand_name],
            }
        )

    branch_top = []
    for branch_name, count in branch_counter.most_common(100):
        school = school_by_name.get(branch_name, {})
        brand_name, _ = split_name_and_branch(branch_name)
        branch_top.append(
            {
                "school_name": branch_name,
                "brand_name": brand_name,
                "school_code": school.get("code"),
                "district": school.get("district"),
                "school_type": school.get("school_type"),
                "has_nursery": school.get("has_nursery"),
                "kep": school.get("kep"),
                "mention_count": count,
                "source_images": branch_image_hits[branch_name],
            }
        )

    return {
        "image_dir": str(image_dir),
        "image_count": len(images),
        "image_reports": image_reports,
        "brand_top100": brand_top,
        "branch_top100": branch_top,
    }


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="OCR ranking images and build internal Top100 school pools")
    parser.add_argument("--image-dir", type=Path, default=config.XHS_DIR / "ranking_images")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    payload = analyze_images(args.image_dir, limit=args.limit or None)
    write_json(OUTPUT_ANALYSIS, payload)
    write_json(OUTPUT_BRAND, payload["brand_top100"])
    write_json(OUTPUT_BRANCH, payload["branch_top100"])

    print(f"images={payload['image_count']}")
    print(f"brand_top={len(payload['brand_top100'])}")
    print(f"branch_top={len(payload['branch_top100'])}")
    if payload["branch_top100"]:
        print("top_branch=", payload["branch_top100"][0]["school_name"], payload["branch_top100"][0]["mention_count"])


if __name__ == "__main__":
    main()