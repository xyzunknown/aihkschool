#!/usr/bin/env python3
"""Extract language_primary from EDB KGP CSV 課程類別 + school name heuristics."""

import csv
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, "data", "KGP_2025_tc.csv")
OUTPUT_SQL = os.path.join(ROOT, "supabase", "seed", "012_language_primary.sql")


def load_kgp_language():
    """Read KGP CSV, return {school_code: 課程類別}."""
    mapping = {}
    with open(CSV_PATH, encoding="utf-8-sig") as f:
        reader = csv.reader(f, delimiter="^")
        header = next(reader)
        code_idx = header.index("學校編號")
        cat_idx = header.index("課程類別")
        name_idx = header.index("學校名稱")
        for row in reader:
            code = row[code_idx].strip()
            cat = row[cat_idx].strip()
            name = row[name_idx].strip()
            if code:
                mapping[code] = (cat, name)
    return mapping


def infer_language(category, name_tc):
    """Map 課程類別 + name heuristics to language_primary value."""
    name = name_tc or ""

    is_intl = any(w in name for w in ["國際", "國際幼稚園", "International"])
    is_eng = any(w in name for w in ["英文", "英語", "English"])
    is_mand = any(w in name for w in ["普通話", "Mandarin", "Putonghua"])
    is_bilingual_hint = is_intl or is_eng or is_mand

    if category == "非本地":
        return "english"
    elif category == "本地及非本地":
        return "bilingual"
    elif category == "本地":
        if is_bilingual_hint:
            return "bilingual"
        return "chinese"
    return None


def main():
    print("Loading KGP CSV language data...")
    mapping = load_kgp_language()
    print(f"  {len(mapping)} school codes loaded")

    lines = [
        "-- Language of instruction enrichment",
        "-- Source: EDB KGP 2025 課程類別 + school name heuristics",
        f"-- Generated: 2026-05-05",
        "",
    ]

    stats = {}
    for code in sorted(mapping.keys()):
        cat, name = mapping[code]
        lang = infer_language(cat, name)
        if lang is None:
            continue
        stats[lang] = stats.get(lang, 0) + 1
        # Only update if language_primary is currently NULL
        lines.append(
            f"UPDATE schools SET language_primary = '{lang}' "
            f"WHERE school_code = '{code}' AND language_primary IS NULL;"
        )

    os.makedirs(os.path.dirname(OUTPUT_SQL), exist_ok=True)
    with open(OUTPUT_SQL, "w") as f:
        f.write("\n".join(lines) + "\n")

    print(f"\nSeed SQL → {os.path.relpath(OUTPUT_SQL, ROOT)}")
    print(f"Distribution: {stats}")
    print(f"Total UPDATEs: {sum(stats.values())}")


if __name__ == "__main__":
    main()
