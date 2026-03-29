#!/usr/bin/env python3
"""Regenerate seed SQL from schools_merged.json with fixed addresses, sessions, lat/lng, has_nursery."""
import json
import datetime

def esc(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

def map_session_to_db(session_cn):
    """Map Chinese session to DB enum values."""
    m = {
        "上午": "am",
        "下午": "pm",
        "全日": "whole_day",
        "上午及下午": "am_pm",
        "全日及半日": "am_pm_whole_day",
    }
    return m.get(session_cn)

def main():
    with open("data/schools_merged.json") as f:
        schools = json.load(f)

    now = datetime.datetime.now().isoformat()
    lines = [
        f"-- HKSchoolPlace Seed: Schools + Vacancies",
        f"-- Source: EDB KGP 2025/26 + K1-K3 Vacancy 2026/27",
        f"-- Generated: {now}",
        f"-- Total: {len(schools)} schools",
        "",
        "-- 清理旧数据（按依赖顺序删除，避免外键冲突）",
        "DELETE FROM reminders;",
        "DELETE FROM favorites;",
        "DELETE FROM admission_intel;",
        "DELETE FROM vacancies;",
        "DELETE FROM schools;",
        "",
    ]

    for s in schools:
        session_db = map_session_to_db(s.get("session"))
        session_val = esc(session_db) if session_db else "NULL"
        lat = s.get("latitude")
        lng = s.get("longitude")
        lat_val = str(lat) if lat else "NULL"
        lng_val = str(lng) if lng else "NULL"
        has_nursery = "true" if s.get("has_nursery") else "false"
        logo_url = s.get("logo_url")

        lines.append(
            f"INSERT INTO schools (school_code, name_tc, name_en, district, address_tc, address_en, "
            f"phone, fax, website, school_type, kep_participant, session_type, "
            f"latitude, longitude, has_nursery, logo_url, "
            f"data_source, is_active, grades_offered) VALUES ("
            f"{esc(s['code'])}, {esc(s.get('name_tc'))}, {esc(s.get('name_en'))}, "
            f"{esc(s.get('district'))}, {esc(s.get('address_tc'))}, {esc(s.get('address_en'))}, "
            f"{esc(s.get('phone'))}, {esc(s.get('fax'))}, {esc(s.get('website'))}, "
            f"{esc(s.get('school_type'))}, {str(s.get('kep', False)).lower()}, {session_val}, "
            f"{lat_val}, {lng_val}, {has_nursery}, {esc(logo_url)}, "
            f"'edb', true, ARRAY['K1','K2','K3']"
            f") ON CONFLICT (school_code) DO UPDATE SET "
            f"address_tc = EXCLUDED.address_tc, address_en = EXCLUDED.address_en, "
            f"session_type = EXCLUDED.session_type, "
            f"latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude, "
            f"has_nursery = EXCLUDED.has_nursery, logo_url = EXCLUDED.logo_url;"
        )

    # Vacancy inserts
    lines.append("")
    lines.append("-- Vacancies (K1-K3 from EDB)")
    for s in schools:
        k1 = s.get("k1", "no_information")
        k2 = s.get("k2", "no_information")
        k3 = s.get("k3", "no_information")
        edb_date = s.get("edb_date")
        lines.append(
            f"INSERT INTO vacancies (school_id, academic_year, k1_vacancy, k2_vacancy, k3_vacancy, "
            f"edb_published_date, is_current) "
            f"SELECT id, '2026-27', '{k1}', '{k2}', '{k3}', "
            f"{'NULL' if not edb_date else esc(edb_date)}, true "
            f"FROM schools WHERE school_code = {esc(s['code'])} "
            f"ON CONFLICT DO NOTHING;"
        )

    with open("supabase/seed/001_schools.sql", "w") as f:
        f.write("\n".join(lines) + "\n")

    print(f"Generated seed with {len(schools)} schools")

if __name__ == "__main__":
    main()
