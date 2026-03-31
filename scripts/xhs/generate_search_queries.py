#!/usr/bin/env python3
"""
Phase 1: Generate search queries for all 873 kindergartens.

Reads data/schools_merged.json and produces data/xhs/search_queries.json
with aliases, search terms, and matching keywords for each school.

Usage:
    python -m scripts.xhs.generate_search_queries
"""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

# Allow running as both module and script
if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from scripts.xhs import config
from scripts.xhs.utils import (
    load_schools,
    save_json,
    split_name_and_branch,
    generate_aliases,
    extract_address_keywords,
)


def identify_school_groups(schools: list[dict]) -> dict[str, list[str]]:
    """
    Identify multi-branch school groups.
    Returns: {group_main_name: [code1, code2, ...]}
    """
    groups: dict[str, list[str]] = defaultdict(list)
    for school in schools:
        main_name, _ = split_name_and_branch(school["name_tc"])
        groups[main_name].append(school["code"])
    # Only keep groups with multiple branches
    return {k: v for k, v in groups.items() if len(v) > 1}


def build_search_entry(
    school: dict,
    is_multi_branch: bool,
    group_name: str | None,
) -> dict:
    """Build search query entry for a single school."""
    name_tc = school["name_tc"]
    name_en = school.get("name_en")
    address_tc = school.get("address_tc", "")
    district = school.get("district", "")

    aliases = generate_aliases(name_tc, name_en)
    main_name, branch = split_name_and_branch(name_tc)

    # ─── Build search queries ───────────────────────────
    # Strategy: use top aliases combined with "幼稚園 面試" and "幼稚園"
    search_queries: list[str] = []

    for alias in aliases[:4]:
        # Skip redundant queries where alias already contains "幼稚園"
        if "幼稚園" in alias or "幼兒" in alias:
            search_queries.append(f"{alias} 面試")
            search_queries.append(alias)
        else:
            search_queries.append(f"{alias} 幼稚園 面試")
            search_queries.append(f"{alias} 幼稚園")

    # For multi-branch: add branch-specific queries
    if is_multi_branch and branch:
        core = aliases[2] if len(aliases) > 2 else main_name
        search_queries.append(f"{core} {branch}")
        search_queries.append(f"{core} {branch} 面試")

    # Deduplicate while preserving order
    seen: set[str] = set()
    deduped: list[str] = []
    for q in search_queries:
        if q not in seen:
            seen.add(q)
            deduped.append(q)
    search_queries = deduped

    # ─── Build match keywords ───────────────────────────
    match_keywords: list[str] = [name_tc, main_name]
    if branch:
        match_keywords.append(branch)

    # Address keywords
    addr_kws = extract_address_keywords(address_tc)
    match_keywords.extend(addr_kws)

    # Deduplicate
    seen_kw: set[str] = set()
    deduped_kw: list[str] = []
    for kw in match_keywords:
        if kw not in seen_kw:
            seen_kw.add(kw)
            deduped_kw.append(kw)

    return {
        "school_code": school["code"],
        "name_tc": name_tc,
        "name_en": name_en,
        "district": district,
        "address_tc": address_tc,
        "aliases": aliases,
        "search_queries": search_queries,
        "match_keywords": deduped_kw,
        "group_name": group_name,
        "is_multi_branch": is_multi_branch,
    }


def main() -> None:
    print("Phase 1: Generating search queries...")

    schools = load_schools()
    print(f"  Loaded {len(schools)} schools from schools_merged.json")

    # Identify multi-branch groups
    groups = identify_school_groups(schools)
    multi_branch_codes: set[str] = set()
    code_to_group: dict[str, str] = {}
    for group_name, codes in groups.items():
        for code in codes:
            multi_branch_codes.add(code)
            code_to_group[code] = group_name

    print(f"  Found {len(groups)} multi-branch groups ({len(multi_branch_codes)} schools)")

    # Build search entries
    entries: list[dict] = []
    for school in schools:
        code = school["code"]
        is_multi = code in multi_branch_codes
        group_name = code_to_group.get(code)
        entry = build_search_entry(school, is_multi, group_name)
        entries.append(entry)

    # Save
    save_json(entries, config.SEARCH_QUERIES_PATH)
    print(f"  Saved {len(entries)} entries to {config.SEARCH_QUERIES_PATH}")

    # Stats
    total_queries = sum(len(e["search_queries"]) for e in entries)
    avg_queries = total_queries / len(entries)
    avg_aliases = sum(len(e["aliases"]) for e in entries) / len(entries)
    print(f"\n  Stats:")
    print(f"    Total search queries: {total_queries}")
    print(f"    Avg queries/school: {avg_queries:.1f}")
    print(f"    Avg aliases/school: {avg_aliases:.1f}")
    print(f"    Multi-branch groups: {len(groups)}")

    # Print a few examples
    print(f"\n  Examples:")
    for entry in entries[:3]:
        print(f"    {entry['name_tc']}")
        print(f"      aliases: {entry['aliases']}")
        print(f"      queries: {entry['search_queries'][:4]}")
        print(f"      match_kw: {entry['match_keywords'][:4]}")
        print(f"      multi: {entry['is_multi_branch']}, group: {entry['group_name']}")
        print()


if __name__ == "__main__":
    main()
