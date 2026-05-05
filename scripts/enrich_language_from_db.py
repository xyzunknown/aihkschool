#!/usr/bin/env python3
"""Apply language_primary directly to production DB by matching school_codes."""

import csv
import os
import psycopg2

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, "data", "KGP_2025_tc.csv")

DB_URL = "postgresql://postgres.ordaiibaaqkdsiqparqe:Eyang521!!!@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"


def load_kgp_language():
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
    name = name_tc or ""
    is_intl = any(w in name for w in ["國際", "International"])
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
    print("Loading KGP CSV...")
    mapping = load_kgp_language()
    print(f"  {len(mapping)} entries")

    print("Connecting to DB...")
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    # Get all schools with NULL language_primary
    cur.execute("SELECT school_code, name_tc FROM schools WHERE language_primary IS NULL")
    null_schools = cur.fetchall()
    print(f"  {len(null_schools)} schools with NULL language_primary")

    updated = 0
    not_found = 0
    for code, name in null_schools:
        code = str(code)
        if code in mapping:
            cat, kgp_name = mapping[code]
            lang = infer_language(cat, name or kgp_name)
            if lang:
                cur.execute(
                    "UPDATE schools SET language_primary = %s WHERE school_code = %s",
                    (lang, code),
                )
                updated += 1
            else:
                not_found += 1
        else:
            not_found += 1

    conn.commit()
    print(f"  Updated: {updated}")
    print(f"  No KGP match: {not_found}")

    cur.execute("SELECT COUNT(*) FROM schools WHERE language_primary IS NOT NULL")
    total = cur.fetchone()[0]
    print(f"\nTotal with language_primary: {total} / 868")

    conn.close()


if __name__ == "__main__":
    main()
