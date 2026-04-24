#!/usr/bin/env python3
"""
Build official school-link enrichment from the EDB / KGP CSV.

Outputs:
- data/official_school_links.json
- supabase/seed/010_official_school_links.sql
"""
from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "KGP_2025_tc.csv"
VACANCY_CSV_PATH = ROOT / "data" / "K1-K3_vacancy_tc_202627.csv"
JSON_PATH = ROOT / "data" / "official_school_links.json"
SQL_PATH = ROOT / "supabase" / "seed" / "010_official_school_links.sql"

DISTRICT_VACANCY_PDFS = {
    "CENTRAL AND WESTERN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf",
    "Central and Western": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf",
    "EASTERN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf",
    "Hong Kong East": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf",
    "ISLANDS": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf",
    "Islands": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf",
    "SOUTHERN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf",
    "Southern": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf",
    "WAN CHAI": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf",
    "Wan Chai": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf",
    "KOWLOON CITY": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf",
    "Kowloon City": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf",
    "KWUN TONG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf",
    "Kwun Tong": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf",
    "SAI KUNG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf",
    "Sai Kung": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf",
    "SHAM SHUI PO": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf",
    "Sham Shui Po": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf",
    "WONG TAI SIN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf",
    "Wong Tai Sin": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf",
    "YAU TSIM MONG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf",
    "Yau Tsim and Mong Kok": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf",
    "KWAI TSING": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf",
    "Kwai Chung and Tsing Yi": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf",
    "TSUEN WAN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf",
    "Tsuen Wan": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf",
    "TUEN MUN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf",
    "Tuen Mun": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf",
    "YUEN LONG": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf",
    "Yuen Long": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf",
    "NORTH": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf",
    "North": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf",
    "SHA TIN": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf",
    "Sha Tin": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf",
    "TAI PO": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf",
    "Tai Po": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf",
}


def sql_string(value: str | None) -> str:
    if not value:
        return "NULL"
    return "'" + value.replace("'", "''") + "'"


def normalize_url(raw: str | None) -> str | None:
    value = (raw or "").strip()
    if not value or value in {"-", "不適用", "Not applicable"}:
        return None
    if "Not applicable" in value or "不適用" in value:
        return None
    if value.startswith("http://") or value.startswith("https://"):
        return value
    for part in value.split():
        if part.startswith("http://") or part.startswith("https://"):
            return part
    return None


def official_profile_url(school_code: str) -> str:
    return f"https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno={school_code}"


def normalize_date(raw: str | None) -> str | None:
    value = (raw or "").strip()
    if not value:
        return None
    parts = value.split("/")
    if len(parts) == 3:
        day, month, year = parts
        return f"{year}-{int(month):02d}-{int(day):02d}"
    return value


def main() -> None:
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f, delimiter="^"))
    with VACANCY_CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        vacancy_rows = list(csv.DictReader(f))

    vacancy_by_code = {
        (row.get("SCRN") or "").strip().split("-")[0]: {
            "district": (row.get("District") or "").strip(),
            "date": normalize_date(row.get("As At Date")),
        }
        for row in vacancy_rows
    }

    items: list[dict[str, str | None]] = []
    for row in rows:
        school_code = (row.get("學校編號") or "").strip()
        if not school_code:
            continue

        fee_certificate_url = normalize_url(row.get("收費證明書"))
        inspection_report_url = normalize_url(row.get("質素評核_中文 ")) or normalize_url(row.get("質素評核_英文 "))
        vacancy = vacancy_by_code.get(school_code, {})
        official_notice_url = DISTRICT_VACANCY_PDFS.get(vacancy.get("district", ""))

        items.append(
            {
                "school_code": school_code,
                "name_tc": (row.get("學校名稱") or "").strip() or None,
                "official_profile_url": official_profile_url(school_code),
                "official_notice_url": official_notice_url,
                "official_notice_updated_at": vacancy.get("date"),
                "fee_certificate_url": fee_certificate_url,
                "inspection_report_url": inspection_report_url,
                "source": "data/KGP_2025_tc.csv",
            }
        )

    JSON_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    lines = [
        "-- Official school link enrichment",
        "-- Source: data/KGP_2025_tc.csv",
        "-- CHSC/KGP profile surface is represented as official_profile_url.",
        "",
    ]
    for item in items:
        lines.extend(
            [
                f"-- {item['name_tc']} ({item['school_code']})",
                "UPDATE schools",
                "SET",
                f"  official_profile_url = {sql_string(item['official_profile_url'])},",
                f"  official_notice_url = {sql_string(item['official_notice_url'])},",
                f"  official_notice_updated_at = {sql_string(item['official_notice_updated_at'])}::date,",
                f"  fee_certificate_url = {sql_string(item['fee_certificate_url'])},",
                "  fee_certificate_updated_at = DATE '2025-10-16',",
                f"  inspection_report_url = {sql_string(item['inspection_report_url'])},",
                "  inspection_report_updated_at = CASE",
                f"    WHEN {sql_string(item['inspection_report_url'])} IS NULL THEN inspection_report_updated_at",
                "    ELSE DATE '2025-10-16'",
                "  END",
                f"WHERE school_code = {sql_string(item['school_code'])};",
                "",
            ]
        )

    SQL_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(items)} rows to {JSON_PATH.relative_to(ROOT)}")
    print(f"Wrote SQL to {SQL_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
