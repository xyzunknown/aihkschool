#!/usr/bin/env python3
"""
Extract fee / KEP participation data from the EDB Kindergarten Profile CSV.

Outputs:
- data/edb_fee_enrichment.json
- supabase/seed/005_edb_fee_enrichment.sql
"""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "KGP_2025_tc.csv"
JSON_PATH = ROOT / "data" / "edb_fee_enrichment.json"
SQL_PATH = ROOT / "supabase" / "seed" / "005_edb_fee_enrichment.sql"


def parse_money(raw: str | None) -> float | None:
    if raw is None:
        return None
    text = raw.strip()
    if not text:
        return None
    if text == "-":
        return 0.0

    match = re.search(r"(\d[\d,]*)", text)
    if not match:
        return None
    return float(match.group(1).replace(",", ""))


def format_money(value: float | None) -> str | None:
    if value is None:
      return None
    if value.is_integer():
      return f"HK${int(value):,}"
    return f"HK${value:,.2f}"


def sql_string(value: str | None) -> str:
    if value is None:
        return "NULL"
    escaped = value.replace("'", "''")
    return f"'{escaped}'"


def sql_number(value: float | None) -> str:
    if value is None:
        return "NULL"
    if value.is_integer():
        return str(int(value))
    return f"{value:.2f}"


def plan_label(raw: str) -> str:
    text = (raw or "").strip()
    if text == "有參加":
        return "已參加幼稚園教育計劃"
    if text == "申請審核中":
        return "幼稚園教育計劃申請審核中"
    return "未參加幼稚園教育計劃"


def main() -> None:
    with CSV_PATH.open(encoding="utf-8-sig") as f:
        reader = csv.DictReader(f, delimiter="^")
        rows = list(reader)

    items: list[dict] = []

    for row in rows:
        school_code = (row.get("學校編號") or "").strip()
        school_name = (row.get("學校名稱") or "").strip()
        school_type = (row.get("學校類別") or "").strip()

        if school_type not in {"非牟利", "私立獨立"}:
            continue

        half_day_fee = parse_money(row.get("收費水平_全年_半日"))
        whole_day_fee = parse_money(row.get("收費水平_全年_全日"))
        application_fee = parse_money(row.get("其他核准收費_報名費"))
        reg_fee_half = parse_money(row.get("註冊費_半日班"))
        reg_fee_whole = parse_money(row.get("註冊費_全日班"))
        plan_raw = (row.get("參加幼稚園教育計劃") or "").strip()

        fee_note_parts = []
        if half_day_fee is not None:
            fee_note_parts.append(f"半日班：全年 {format_money(half_day_fee)}")
        if whole_day_fee is not None:
            fee_note_parts.append(f"全日班：全年 {format_money(whole_day_fee)}")

        other_fee_parts = [plan_label(plan_raw)]
        if application_fee is not None:
            other_fee_parts.append(f"報名費：{format_money(application_fee)}")
        if reg_fee_half is not None:
            other_fee_parts.append(f"註冊費（半日班）：{format_money(reg_fee_half)}")
        if reg_fee_whole is not None:
            other_fee_parts.append(f"註冊費（全日班）：{format_money(reg_fee_whole)}")

        primary_annual_fee = next(
            (value for value in [half_day_fee, whole_day_fee] if value is not None),
            None,
        )
        primary_registration_fee = next(
            (value for value in [reg_fee_half, reg_fee_whole] if value is not None),
            None,
        )

        items.append(
            {
                "school_code": school_code,
                "name_tc": school_name,
                "school_type": school_type,
                "kep_participant": plan_raw == "有參加",
                "kep_status_label": plan_label(plan_raw),
                "fee_annual_hkd": primary_annual_fee,
                "fee_notes": "；".join(fee_note_parts) or None,
                "application_fee_hkd": application_fee,
                "registration_fee_hkd": primary_registration_fee,
                "other_fees_note": "；".join(other_fee_parts) or None,
                "website": (row.get("學校網址") or "").strip() or None,
            }
        )

    JSON_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")

    sql_lines = [
        "-- EDB kindergarten profile fee enrichment",
        "-- Source: data/KGP_2025_tc.csv",
        "",
    ]
    for item in items:
        sql_lines.extend(
            [
                f"-- {item['name_tc']} ({item['school_code']})",
                "UPDATE schools",
                "SET",
                f"  kep_participant = {'true' if item['kep_participant'] else 'false'},",
                f"  fee_annual_hkd = {sql_number(item['fee_annual_hkd'])},",
                f"  application_fee_hkd = COALESCE({sql_number(item['application_fee_hkd'])}, application_fee_hkd),",
                f"  registration_fee_hkd = COALESCE({sql_number(item['registration_fee_hkd'])}, registration_fee_hkd),",
                f"  fee_notes = {sql_string(item['fee_notes'])},",
                f"  other_fees_note = {sql_string(item['other_fees_note'])}",
                f"WHERE school_code = {sql_string(item['school_code'])};",
                "",
            ]
        )

    SQL_PATH.write_text("\n".join(sql_lines), encoding="utf-8")
    print(f"Wrote {len(items)} rows to {JSON_PATH.relative_to(ROOT)}")
    print(f"Wrote SQL to {SQL_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
