#!/usr/bin/env python3
"""
Fetch logo-like assets for supplemented international schools.

This script tries official school websites first. It downloads the best candidate
image it can find, converts it to PNG, stores it under public/logos/, and writes:

- data/international_school_logos.json
- supabase/seed/003_school_logos.sql

It is designed to be rerun safely.
"""

from __future__ import annotations

import csv
import json
import re
import subprocess
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_CSV = ROOT / "data" / "KGP_2025_en.csv"
TC_CSV = ROOT / "data" / "KGP_2025_tc.csv"
PUBLIC_DIR = ROOT / "public" / "logos"
CACHE_DIR = ROOT / "data" / "logo-cache"
MANIFEST_PATH = ROOT / "data" / "international_school_logos.json"
SQL_PATH = ROOT / "supabase" / "seed" / "003_school_logos.sql"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)


@dataclass
class SchoolTarget:
    school_code: str
    name_en: str
    name_tc: str
    website: str


def request_url(url: str, timeout: int = 20) -> bytes | None:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9,zh-HK;q=0.8",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status >= 400:
                return None
            return resp.read()
    except Exception:
        return None


def parse_icon_links(html: str, base_url: str) -> list[str]:
    links: list[str] = []

    for href in re.findall(r'<link[^>]+href=["\']([^"\']+)["\'][^>]*>', html, re.IGNORECASE):
        tag_match = re.search(
            rf'<link[^>]+href=["\']{re.escape(href)}["\'][^>]*rel=["\']([^"\']+)["\']|'
            rf'<link[^>]+rel=["\']([^"\']+)["\'][^>]*href=["\']{re.escape(href)}["\']',
            html,
            re.IGNORECASE,
        )
        rel = " ".join(g for g in (tag_match.group(1), tag_match.group(2)) if g) if tag_match else ""
        rel_lower = rel.lower()
        href_lower = href.lower()
        if "icon" in rel_lower or "logo" in href_lower:
            links.append(urllib.parse.urljoin(base_url, href))

    for src in re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html, re.IGNORECASE):
        src_lower = src.lower()
        if "logo" in src_lower or "brand" in src_lower:
            links.append(urllib.parse.urljoin(base_url, src))

    deduped: list[str] = []
    seen = set()
    for link in links:
        if link not in seen:
            deduped.append(link)
            seen.add(link)
    return deduped


def find_candidate_urls(website: str) -> list[str]:
    parsed = urllib.parse.urlparse(website if "://" in website else f"https://{website}")
    base = f"{parsed.scheme or 'https'}://{parsed.netloc or parsed.path}"

    candidates = [
        urllib.parse.urljoin(base, "/favicon.ico"),
        urllib.parse.urljoin(base, "/apple-touch-icon.png"),
        urllib.parse.urljoin(base, "/apple-touch-icon-precomposed.png"),
    ]

    html_bytes = request_url(base)
    if html_bytes:
        html = html_bytes.decode("utf-8", errors="replace")
        candidates = parse_icon_links(html, base) + candidates

    deduped: list[str] = []
    seen = set()
    for url in candidates:
        if url not in seen:
            deduped.append(url)
            seen.add(url)
    return deduped


def convert_to_png(source_path: Path, output_path: Path) -> bool:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            [
                "sips",
                "-s",
                "format",
                "png",
                "-Z",
                "256",
                str(source_path),
                "--out",
                str(output_path),
            ],
            check=True,
            capture_output=True,
        )
        return output_path.exists() and output_path.stat().st_size > 0
    except Exception:
        return False


def download_logo(target: SchoolTarget) -> dict:
    raw_path = CACHE_DIR / f"{target.school_code}.raw"
    png_path = PUBLIC_DIR / f"{target.school_code}.png"

    for candidate in find_candidate_urls(target.website):
        payload = request_url(candidate)
        if not payload or len(payload) < 200:
            continue

        raw_path.write_bytes(payload)
        if convert_to_png(raw_path, png_path):
            return {
                "school_code": target.school_code,
                "name_tc": target.name_tc,
                "name_en": target.name_en,
                "website": target.website,
                "source_url": candidate,
                "logo_url": f"/logos/{target.school_code}.png",
                "status": "downloaded",
            }

    return {
        "school_code": target.school_code,
        "name_tc": target.name_tc,
        "name_en": target.name_en,
        "website": target.website,
        "source_url": None,
        "logo_url": None,
        "status": "pending_manual_review",
    }


def load_targets() -> list[SchoolTarget]:
    with EN_CSV.open(encoding="utf-16", newline="") as f:
        en_rows = list(csv.DictReader(f, delimiter="^"))
    with TC_CSV.open(encoding="utf-8-sig", newline="") as f:
        tc_rows = list(csv.DictReader(f, delimiter="^"))

    tc_by_key = {(row["學校編號"], row["校址編號"]): row for row in tc_rows}

    targets: list[SchoolTarget] = []
    seen_codes = set()
    for row in en_rows:
        if row["school_category"] != "Private Independent":
            continue
        name_en = row["school_name"].strip()
        if "INTERNATIONAL" not in name_en.upper():
            continue
        code = row["school_no"].strip()
        if code in seen_codes:
            continue
        tc_row = tc_by_key.get((row["school_no"], row["location_no"]))
        if not tc_row:
            continue

        targets.append(
            SchoolTarget(
                school_code=code,
                name_en=name_en,
                name_tc=tc_row["學校名稱"].strip(),
                website=row["school_website"].strip(),
            )
        )
        seen_codes.add(code)
    return targets


def write_sql(manifest: list[dict]) -> None:
    lines = [
        "-- Logo URLs for international schools fetched into local static assets",
    ]
    for item in manifest:
        if not item["logo_url"]:
            continue
        lines.append(
            "UPDATE schools "
            f"SET logo_url = '{item['logo_url']}' "
            f"WHERE school_code = '{item['school_code']}';"
        )
    SQL_PATH.write_text("\n".join(lines) + "\n")


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    manifest = [download_logo(target) for target in load_targets()]
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    write_sql(manifest)

    downloaded = sum(1 for item in manifest if item["status"] == "downloaded")
    pending = len(manifest) - downloaded
    print(f"downloaded={downloaded} pending={pending}")


if __name__ == "__main__":
    main()
