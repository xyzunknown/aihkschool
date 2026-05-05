#!/usr/bin/env python3
"""Extract lat/lng from SCH_LOC_EDB.json for private/international schools
and generate an UPDATE-only seed SQL file.

SCHOOL NO. is 12 digits; school_code is the first 6 digits.
When multiple entries exist for the same school_code, prefer KINDERGARTEN
or KINDERGARTEN-CUM-CHILD CARE CENTRES over PRIMARY/SECONDARY.
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCH_LOC_PATH = os.path.join(ROOT, "data", "SCH_LOC_EDB.json")
SEED_002_PATH = os.path.join(ROOT, "supabase", "seed", "002_private_international_schools.sql")
OUTPUT_SQL = os.path.join(ROOT, "supabase", "seed", "011_private_international_geo.sql")


def esc_sql(val):
    if val is None:
        return "NULL"
    return str(val)


def load_sch_loc():
    with open(SCH_LOC_PATH) as f:
        return json.load(f)


def extract_school_codes_from_seed():
    """Parse 002 seed SQL to extract all school_code values."""
    codes = []
    with open(SEED_002_PATH) as f:
        for line in f:
            m = re.search(r"school_code = '(\d+)'", line)
            if m:
                codes.append(m.group(1))
    return sorted(set(codes))


def build_lookup(sch_loc_data):
    """Build school_code -> (lat, lng, level) lookup from SCH_LOC_EDB.
    Prefer kindergarten-level entries."""
    lookup = {}
    for entry in sch_loc_data:
        school_no = str(entry.get("SCHOOL NO.", ""))
        if not school_no or len(school_no) < 6:
            continue
        school_code = school_no[:6]
        lat = entry.get("LATITUDE")
        lng = entry.get("LONGITUDE")
        if lat is None or lng is None:
            continue
        level = (entry.get("SCHOOL LEVEL") or "").upper()

        if school_code not in lookup:
            lookup[school_code] = (lat, lng, level)
        else:
            _, _, existing_level = lookup[school_code]
            new_is_kg = "KINDERGARTEN" in level
            old_is_kg = "KINDERGARTEN" in existing_level
            if new_is_kg and not old_is_kg:
                lookup[school_code] = (lat, lng, level)

    return lookup


def main():
    print(f"Loading SCH_LOC_EDB.json...")
    sch_loc = load_sch_loc()
    print(f"  {len(sch_loc)} entries loaded")

    print(f"Extracting private/international school codes from seed 002...")
    pi_codes = extract_school_codes_from_seed()
    print(f"  {len(pi_codes)} unique school codes found")

    print(f"Building geo lookup...")
    lookup = build_lookup(sch_loc)
    print(f"  {len(lookup)} schools with coordinates in SCH_LOC_EDB")

    matched = []
    unmatched = []
    for code in pi_codes:
        if code in lookup:
            lat, lng, level = lookup[code]
            matched.append((code, lat, lng, level))
        else:
            unmatched.append(code)

    print(f"  Matched: {len(matched)}")
    print(f"  Unmatched: {len(unmatched)}")
    if unmatched:
        print(f"  Unmatched codes: {unmatched}")

    now = "2026-05-05"

    lines = [
        "-- Private / International school geo coordinates enrichment",
        f"-- Source: SCH_LOC_EDB.json (EDB school location data)",
        f"-- Generated: {now}",
        f"-- Matched: {len(matched)} / {len(pi_codes)} schools",
    ]
    if unmatched:
        lines.append(f"-- Unmatched: {', '.join(unmatched)}")
        lines.append("-- These need manual geocoding via Google Geocoding API or other source")
    lines.append("")

    for code, lat, lng, level in matched:
        lines.append(
            f"UPDATE schools SET latitude = {esc_sql(lat)}, longitude = {esc_sql(lng)} "
            f"WHERE school_code = '{code}' AND (latitude IS NULL OR longitude IS NULL);"
        )

    os.makedirs(os.path.dirname(OUTPUT_SQL), exist_ok=True)
    with open(OUTPUT_SQL, "w") as f:
        f.write("\n".join(lines) + "\n")

    print(f"\nSeed SQL written to: {os.path.relpath(OUTPUT_SQL, ROOT)}")
    if unmatched:
        print(f"\n⚠️  {len(unmatched)} schools need manual geocoding:")
        for code in unmatched:
            print(f"   - {code}")


if __name__ == "__main__":
    main()
