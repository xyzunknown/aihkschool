#!/usr/bin/env python3
"""
Enrich private / international school profiles from official school websites.

What this script does:
1. Reads the private / international supplement roster from KGP CSVs.
2. Visits each official school website and a few likely admissions / fee pages.
3. Extracts:
   - better Chinese school name when available
   - application page and coarse status
   - open day / school tour info
   - fee snippets + a few fee numbers when they are clearly labelled
   - logo URL or a generated placeholder logo when no usable logo is found
4. Writes:
   - data/private_international_profile_enrichment.json
   - supabase/seed/004_private_international_profile_enrichment.sql

The script is safe to rerun. It uses only Python stdlib plus macOS `sips` for
image conversion when needed.
"""

from __future__ import annotations

import csv
import concurrent.futures
import html
import json
import mimetypes
import re
import subprocess
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
EN_CSV = ROOT / "data" / "KGP_2025_en.csv"
TC_CSV = ROOT / "data" / "KGP_2025_tc.csv"
PROFILE_CACHE_DIR = ROOT / "data" / "profile-cache"
RAW_LOGO_CACHE_DIR = ROOT / "data" / "logo-cache"
PUBLIC_LOGO_DIR = ROOT / "public" / "logos"
MANIFEST_PATH = ROOT / "data" / "private_international_profile_enrichment.json"
SQL_PATH = ROOT / "supabase" / "seed" / "004_private_international_profile_enrichment.sql"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
)

PRIVATE_CATEGORIES = {"Private Independent", "International"}
NAME_HINTS = ("幼稚園", "幼兒學校", "幼兒園", "學校", "國際", "學院")
APPLICATION_KEYWORDS = (
    "admission", "admissions", "apply", "application", "enrol", "enroll", "register",
    "招生", "報名", "申請", "入學", "收生", "幼兒班入學",
)
OPEN_DAY_KEYWORDS = (
    "open day", "open house", "school tour", "visit", "info session", "campus tour",
    "開放日", "校園參觀", "參觀", "簡介會", "體驗日", "開放參觀",
)
FEE_KEYWORDS = (
    "tuition", "school fee", "fees", "fee", "application fee", "registration fee",
    "學費", "收費", "報名費", "留位費", "註冊費",
)


@dataclass
class SchoolTarget:
    school_code: str
    name_en: str
    name_tc: str
    website: str
    school_category: str


def request_url(url: str, timeout: int = 8, accept: str | None = None) -> tuple[bytes | None, str | None]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": accept or "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-HK,zh-TW,zh;q=0.9,en;q=0.8",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status >= 400:
                return None, None
            return resp.read(), resp.headers.get_content_type()
    except Exception:
        return None, None


def normalize_website(url: str) -> str:
    parsed = urllib.parse.urlparse(url if "://" in url else f"https://{url}")
    scheme = parsed.scheme or "https"
    netloc = parsed.netloc or parsed.path
    path = parsed.path if parsed.netloc else ""
    return urllib.parse.urlunparse((scheme, netloc, path or "/", "", "", ""))


def cache_key(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", (parsed.path or "root").strip("/")) or "root"
    return slug[:80]


def fetch_html(url: str, school_code: str) -> str | None:
    PROFILE_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = PROFILE_CACHE_DIR / f"{school_code}-{cache_key(url)}.html"
    if cache_path.exists():
        return cache_path.read_text(encoding="utf-8", errors="replace")

    payload, content_type = request_url(url)
    if not payload:
        return None

    if content_type and "html" not in content_type and "xml" not in content_type:
        return None

    html_text = payload.decode("utf-8", errors="replace")
    cache_path.write_text(html_text, encoding="utf-8")
    return html_text


def strip_html(raw_html: str) -> str:
    text = re.sub(r"<script.*?</script>|<style.*?</style>|<noscript.*?</noscript>", " ", raw_html, flags=re.I | re.S)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"</p>|</div>|</li>|</section>|</article>|</h[1-6]>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    text = re.sub(r"\n+", "\n", text)
    return text.strip()


def parse_links(raw_html: str, base_url: str) -> list[tuple[str, str]]:
    links: list[tuple[str, str]] = []
    for href, text in re.findall(r"<a[^>]+href=[\"']([^\"']+)[\"'][^>]*>(.*?)</a>", raw_html, re.I | re.S):
        try:
            absolute = urllib.parse.urljoin(base_url, html.unescape(href.strip()))
        except ValueError:
            continue
        plain = strip_html(text)
        links.append((absolute, plain))
    return links


def score_link(url: str, text: str, keywords: Iterable[str]) -> int:
    haystack = f"{url} {text}".lower()
    score = 0
    for keyword in keywords:
        if keyword.lower() in haystack:
            score += 2 if keyword.lower() in text.lower() else 1
    return score


def unique(seq: Iterable[str]) -> list[str]:
    seen = set()
    out = []
    for item in seq:
        if item not in seen:
            out.append(item)
            seen.add(item)
    return out


def candidate_pages(website: str, raw_html: str) -> dict[str, list[str]]:
    base = normalize_website(website)
    links = parse_links(raw_html, base)

    admissions = sorted(
        links,
        key=lambda item: score_link(item[0], item[1], APPLICATION_KEYWORDS),
        reverse=True,
    )
    open_days = sorted(
        links,
        key=lambda item: score_link(item[0], item[1], OPEN_DAY_KEYWORDS),
        reverse=True,
    )
    fees = sorted(
        links,
        key=lambda item: score_link(item[0], item[1], FEE_KEYWORDS),
        reverse=True,
    )

    return {
        "admissions": unique([url for url, text in admissions if score_link(url, text, APPLICATION_KEYWORDS) > 0])[:3],
        "open_days": unique([url for url, text in open_days if score_link(url, text, OPEN_DAY_KEYWORDS) > 0])[:2],
        "fees": unique([url for url, text in fees if score_link(url, text, FEE_KEYWORDS) > 0])[:2],
    }


def extract_titles(raw_html: str) -> list[str]:
    titles: list[str] = []
    for pattern in [
        r"<title[^>]*>(.*?)</title>",
        r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\']',
        r"<h1[^>]*>(.*?)</h1>",
        r"<h2[^>]*>(.*?)</h2>",
    ]:
        for match in re.findall(pattern, raw_html, re.I | re.S):
            cleaned = strip_html(match)
            if cleaned:
                titles.append(cleaned)
    return unique(titles)


def contains_cjk(text: str) -> bool:
    return bool(re.search(r"[\u3400-\u9fff]", text))


def clean_school_name(text: str) -> str:
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s*[|｜\-–—].*$", "", text).strip()
    return text


def pick_chinese_name(current_name_tc: str, raw_html_pages: list[str]) -> str | None:
    candidates: list[str] = []
    for raw_html in raw_html_pages:
        for title in extract_titles(raw_html):
            cleaned = clean_school_name(title)
            if contains_cjk(cleaned) and any(hint in cleaned for hint in NAME_HINTS):
                candidates.append(cleaned)

    candidates = unique(candidates)
    if contains_cjk(current_name_tc):
        for candidate in candidates:
            if current_name_tc in candidate:
                return current_name_tc
    if candidates:
        candidates.sort(key=len, reverse=True)
        return candidates[0]

    return current_name_tc if contains_cjk(current_name_tc) else None


def compact_excerpt(text: str, keywords: Iterable[str], window: int = 140) -> str | None:
    chunks = [re.sub(r"\s+", " ", chunk).strip(" -:：,，。") for chunk in re.split(r"\n|(?<=[。.!?])\s+", text)]
    chunks = [chunk for chunk in chunks if 20 <= len(chunk) <= 240]
    for keyword in keywords:
        for chunk in chunks:
            if keyword.lower() in chunk.lower():
                return chunk

    lower_text = text.lower()
    for keyword in keywords:
        pos = lower_text.find(keyword.lower())
        if pos == -1:
            continue
        start = max(0, pos - 40)
        end = min(len(text), pos + window)
        snippet = text[start:end].strip(" -:：,，。")
        snippet = re.sub(r"\s+", " ", snippet)
        if len(snippet) > 16:
            return snippet[:220]
    return None


def find_amount(snippet: str, labels: Iterable[str]) -> float | None:
    lowered = snippet.lower()
    if not any(label.lower() in lowered for label in labels):
        return None
    match = re.search(r"(?:HK\$|HKD|\$)\s*([0-9][0-9,]*(?:\.\d{1,2})?)", snippet, re.I)
    if not match:
        return None
    return float(match.group(1).replace(",", ""))


def extract_fee_info(texts: list[str]) -> dict:
    fee_snippets: list[str] = []
    monthly_fee = None
    annual_fee = None
    application_fee = None
    registration_fee = None

    for text in texts:
        sentences = re.split(r"(?<=[。.!?])\s+|\n", text)
        for sentence in sentences:
            compact = re.sub(r"\s+", " ", sentence).strip()
            if len(compact) < 8:
                continue
            if any(keyword in compact.lower() for keyword in FEE_KEYWORDS) or re.search(r"(?:HK\$|HKD|\$)\s*[0-9]", compact):
                if compact not in fee_snippets:
                    fee_snippets.append(compact[:220])

                if monthly_fee is None and re.search(r"monthly|per month|每月|月費", compact, re.I):
                    monthly_fee = find_amount(compact, ("monthly", "per month", "每月", "月費", "學費"))
                if annual_fee is None and re.search(r"annual|per year|annum|全年|每年", compact, re.I):
                    annual_fee = find_amount(compact, ("annual", "annum", "per year", "全年", "每年", "學費"))
                if application_fee is None:
                    application_fee = find_amount(compact, ("application fee", "報名費", "申請費"))
                if registration_fee is None:
                    registration_fee = find_amount(compact, ("registration fee", "留位費", "註冊費", "注册费"))

    return {
        "fee_notes": " / ".join(fee_snippets[:3]) or None,
        "other_fees_note": " / ".join(fee_snippets[3:5]) or None,
        "fee_monthly_hkd": monthly_fee,
        "fee_annual_hkd": annual_fee,
        "application_fee_hkd": application_fee,
        "registration_fee_hkd": registration_fee,
    }


def extract_application_status(texts: list[str]) -> str | None:
    haystack = " ".join(texts).lower()
    if re.search(r"全年接受申請|throughout the year|year round|rolling admission", haystack, re.I):
        return "year_round"
    if re.search(r"招生中|現正招生|admissions open|now accepting|apply now|enrol now|enroll now", haystack, re.I):
        return "open"
    if re.search(r"截止|closed|application closed|報名已截止", haystack, re.I):
        return "closed"
    if re.search(r"admission|apply|enrol|enroll|報名|招生|入學", haystack, re.I):
        return "website"
    return None


def parse_icon_links(raw_html: str, base_url: str, school_name: str) -> list[str]:
    urls: list[str] = []

    for content in re.findall(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', raw_html, re.I):
        urls.append(urllib.parse.urljoin(base_url, html.unescape(content)))

    for href in re.findall(r'<link[^>]+href=["\']([^"\']+)["\'][^>]*>', raw_html, re.I):
        lower = href.lower()
        tag = re.search(
            rf'<link[^>]+href=["\']{re.escape(href)}["\'][^>]*>',
            raw_html,
            re.I,
        )
        tag_text = tag.group(0).lower() if tag else ""
        if "icon" in tag_text or "logo" in lower:
            urls.append(urllib.parse.urljoin(base_url, html.unescape(href)))

    for attrs in re.findall(r"<img([^>]+)>", raw_html, re.I):
        src_match = re.search(r'src=["\']([^"\']+)["\']', attrs, re.I)
        if not src_match:
            continue
        src = html.unescape(src_match.group(1))
        lower_attrs = attrs.lower()
        if "logo" in lower_attrs or "brand" in lower_attrs or school_name.lower().split(" ")[0] in lower_attrs:
            urls.append(urllib.parse.urljoin(base_url, src))

    return unique(urls)


def write_placeholder_logo(school_code: str, display_name: str) -> str:
    PUBLIC_LOGO_DIR.mkdir(parents=True, exist_ok=True)
    first_char = (display_name.strip() or "?")[0]
    output_path = PUBLIC_LOGO_DIR / f"{school_code}.svg"
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <circle cx="128" cy="128" r="120" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="4" />
  <text x="128" y="144" text-anchor="middle" font-size="108" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#475569">{html.escape(first_char)}</text>
</svg>
"""
    output_path.write_text(svg, encoding="utf-8")
    return f"/logos/{school_code}.svg"


def convert_to_png(source_path: Path, output_path: Path) -> bool:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            ["sips", "-s", "format", "png", "-Z", "256", str(source_path), "--out", str(output_path)],
            check=True,
            capture_output=True,
        )
        return output_path.exists() and output_path.stat().st_size > 0
    except Exception:
        return False


def fetch_logo(school: SchoolTarget, raw_html: str, display_name: str) -> tuple[str, str]:
    RAW_LOGO_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_LOGO_DIR.mkdir(parents=True, exist_ok=True)
    base = normalize_website(school.website)
    ext_candidates = parse_icon_links(raw_html, base, school.name_en or school.name_tc)
    ext_candidates.extend([
        urllib.parse.urljoin(base, "/favicon.ico"),
        urllib.parse.urljoin(base, "/apple-touch-icon.png"),
        urllib.parse.urljoin(base, "/favicon.png"),
    ])

    for index, candidate in enumerate(unique(ext_candidates)):
        payload, content_type = request_url(candidate, accept="image/*,*/*;q=0.8")
        if not payload or len(payload) < 120:
            continue

        guessed_ext = mimetypes.guess_extension(content_type or "") if content_type else None
        ext = guessed_ext or Path(urllib.parse.urlparse(candidate).path).suffix or ".raw"
        if ext == ".jpe":
            ext = ".jpg"

        if "svg" in (content_type or "") or ext.lower() == ".svg":
            output_path = PUBLIC_LOGO_DIR / f"{school.school_code}.svg"
            output_path.write_bytes(payload)
            return f"/logos/{school.school_code}.svg", candidate

        raw_path = RAW_LOGO_CACHE_DIR / f"{school.school_code}-{index}{ext}"
        raw_path.write_bytes(payload)
        png_path = PUBLIC_LOGO_DIR / f"{school.school_code}.png"
        if convert_to_png(raw_path, png_path):
            return f"/logos/{school.school_code}.png", candidate

    return write_placeholder_logo(school.school_code, display_name), "generated_placeholder"


def sql_string(value: str | None) -> str:
    if value is None:
        return "NULL"
    return "'" + value.replace("'", "''") + "'"


def sql_number(value: float | None) -> str:
    if value is None:
        return "NULL"
    if value.is_integer():
        return str(int(value))
    return f"{value:.2f}"


def load_targets() -> list[SchoolTarget]:
    with EN_CSV.open(encoding="utf-16", newline="") as f:
        en_rows = list(csv.DictReader(f, delimiter="^"))
    with TC_CSV.open(encoding="utf-8-sig", newline="") as f:
        tc_rows = list(csv.DictReader(f, delimiter="^"))

    tc_by_key = {(row["學校編號"], row["校址編號"]): row for row in tc_rows}
    targets: list[SchoolTarget] = []
    seen_codes = set()

    for row in en_rows:
        if row["school_category"] not in PRIVATE_CATEGORIES:
            continue
        school_code = row["school_no"].strip()
        if not school_code or school_code in seen_codes:
            continue
        website = (row.get("school_website") or "").strip()
        if not website or website == "-":
            continue
        tc_row = tc_by_key.get((row["school_no"], row["location_no"]))
        name_tc = (tc_row["學校名稱"].strip() if tc_row else row["school_name"].strip())
        targets.append(
            SchoolTarget(
                school_code=school_code,
                name_en=row["school_name"].strip(),
                name_tc=name_tc,
                website=website,
                school_category=row["school_category"].strip(),
            )
        )
        seen_codes.add(school_code)

    return targets


def enrich_school(target: SchoolTarget) -> dict:
    home_url = normalize_website(target.website)
    home_html = fetch_html(home_url, target.school_code)
    if not home_html:
        display_name = target.name_tc if contains_cjk(target.name_tc) else target.name_en
        logo_url = write_placeholder_logo(target.school_code, display_name)
        return {
            "school_code": target.school_code,
            "name_tc": target.name_tc if contains_cjk(target.name_tc) else None,
            "name_en": target.name_en,
            "website": target.website,
            "logo_url": logo_url,
            "logo_source_url": "generated_placeholder",
            "application_status": None,
            "application_details": None,
            "application_url": None,
            "open_day_details": None,
            "open_day_url": None,
            "fee_monthly_hkd": None,
            "fee_annual_hkd": None,
            "application_fee_hkd": None,
            "registration_fee_hkd": None,
            "fee_notes": None,
            "other_fees_note": None,
            "scrape_status": "homepage_unreachable",
        }

    pages = candidate_pages(target.website, home_html)
    page_urls = unique([home_url] + pages["admissions"] + pages["fees"] + pages["open_days"])[:6]
    raw_pages: list[str] = []
    page_texts: list[str] = []
    scraped_pages: list[str] = []

    for page_url in page_urls:
        page_html = home_html if page_url == home_url else fetch_html(page_url, target.school_code)
        if not page_html:
            continue
        raw_pages.append(page_html)
        page_texts.append(strip_html(page_html))
        scraped_pages.append(page_url)

    better_name_tc = target.name_tc if contains_cjk(target.name_tc) else pick_chinese_name(target.name_tc, raw_pages)
    display_name = better_name_tc or target.name_en

    application_url = next(iter(pages["admissions"]), None)
    open_day_url = next(iter(pages["open_days"]), None)
    admission_texts = page_texts[:]

    application_details = None
    open_day_details = None
    for text in admission_texts:
        if application_details is None:
            application_details = compact_excerpt(text, APPLICATION_KEYWORDS)
        if open_day_details is None:
            open_day_details = compact_excerpt(text, OPEN_DAY_KEYWORDS)

    fee_info = extract_fee_info(page_texts)
    application_status = extract_application_status(page_texts)
    logo_url, logo_source_url = fetch_logo(target, home_html, display_name)

    return {
        "school_code": target.school_code,
        "name_tc": better_name_tc,
        "name_en": target.name_en,
        "website": target.website,
        "logo_url": logo_url,
        "logo_source_url": logo_source_url,
        "application_status": application_status,
        "application_details": application_details,
        "application_url": application_url,
        "open_day_details": open_day_details,
        "open_day_url": open_day_url,
        "fee_monthly_hkd": fee_info["fee_monthly_hkd"],
        "fee_annual_hkd": fee_info["fee_annual_hkd"],
        "application_fee_hkd": fee_info["application_fee_hkd"],
        "registration_fee_hkd": fee_info["registration_fee_hkd"],
        "fee_notes": fee_info["fee_notes"],
        "other_fees_note": fee_info["other_fees_note"],
        "scrape_status": "ok",
        "scraped_pages": scraped_pages,
    }


def write_sql(records: list[dict]) -> None:
    lines = [
        "-- Private / international school profile enrichment from official school websites",
    ]
    for item in records:
        assignments = [
            f"name_tc = COALESCE({sql_string(item['name_tc'])}, name_tc)",
            f"logo_url = {sql_string(item['logo_url'])}",
            f"fee_monthly_hkd = {sql_number(item['fee_monthly_hkd'])}",
            f"fee_annual_hkd = {sql_number(item['fee_annual_hkd'])}",
            f"application_fee_hkd = COALESCE({sql_number(item['application_fee_hkd'])}, application_fee_hkd)",
            f"registration_fee_hkd = COALESCE({sql_number(item['registration_fee_hkd'])}, registration_fee_hkd)",
            f"fee_notes = {sql_string(item['fee_notes'])}",
            f"other_fees_note = {sql_string(item['other_fees_note'])}",
            f"application_status = {sql_string(item['application_status'])}",
            f"application_details = {sql_string(item['application_details'])}",
            f"application_url = {sql_string(item['application_url'])}",
            f"open_day_details = {sql_string(item['open_day_details'])}",
            f"open_day_url = {sql_string(item['open_day_url'])}",
            "last_profile_scraped_at = now()",
        ]
        lines.append(
            "UPDATE schools SET\n  " + ",\n  ".join(assignments) +
            f"\nWHERE school_code = '{item['school_code']}';"
        )
    SQL_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    targets = load_targets()
    records: list[dict | None] = [None] * len(targets)

    def work(item: tuple[int, SchoolTarget]) -> tuple[int, dict]:
        idx, target = item
        print(f"[{idx + 1}/{len(targets)}] {target.school_code} {target.name_en}", flush=True)
        try:
            return idx, enrich_school(target)
        except Exception as exc:
            display_name = target.name_tc if contains_cjk(target.name_tc) else target.name_en
            return idx, {
                "school_code": target.school_code,
                "name_tc": target.name_tc if contains_cjk(target.name_tc) else None,
                "name_en": target.name_en,
                "website": target.website,
                "logo_url": write_placeholder_logo(target.school_code, display_name),
                "logo_source_url": "generated_placeholder",
                "application_status": None,
                "application_details": None,
                "application_url": None,
                "open_day_details": None,
                "open_day_url": None,
                "fee_monthly_hkd": None,
                "fee_annual_hkd": None,
                "application_fee_hkd": None,
                "registration_fee_hkd": None,
                "fee_notes": None,
                "other_fees_note": f"抓取失敗：{str(exc)[:160]}",
                "scrape_status": "failed",
                "scraped_pages": [],
            }

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        completed = 0
        for idx, record in executor.map(work, list(enumerate(targets))):
            records[idx] = record
            completed += 1
            if completed % 10 == 0:
                snapshot = [item for item in records if item is not None]
                MANIFEST_PATH.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                write_sql(snapshot)

    final_records = [item for item in records if item is not None]
    MANIFEST_PATH.write_text(json.dumps(final_records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write_sql(final_records)

    placeholders = sum(1 for item in final_records if item["logo_source_url"] == "generated_placeholder")
    print(f"processed={len(final_records)} placeholders={placeholders}", flush=True)


if __name__ == "__main__":
    main()
