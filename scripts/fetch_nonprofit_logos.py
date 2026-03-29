#!/usr/bin/env python3
"""
Fetch logos for non-profit kindergartens using Google's favicon service.

This is much faster than scraping each website. For each school with a website,
it downloads a 128px favicon from Google's CDN, converts to PNG, and stores
under public/logos/{school_code}.png.

Updates data/schools_merged.json with logo_url fields.
Then regenerates the seed SQL.

Usage:
    python scripts/fetch_nonprofit_logos.py
"""

from __future__ import annotations

import json
import subprocess
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MERGED_PATH = ROOT / "data" / "schools_merged.json"
PUBLIC_DIR = ROOT / "public" / "logos"
CACHE_DIR = ROOT / "data" / "logo-cache"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

# Minimum file size in bytes to consider a valid logo (skip empty/broken)
MIN_LOGO_BYTES = 300


def request_url(url: str, timeout: int = 15) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status >= 400:
                return None
            return resp.read()
    except Exception:
        return None


def extract_domain(website: str) -> str:
    """Extract domain from a website URL."""
    if not website:
        return ""
    url = website if "://" in website else f"http://{website}"
    parsed = urllib.parse.urlparse(url)
    return parsed.netloc or parsed.path.split("/")[0]


def convert_to_png(source_path: Path, output_path: Path) -> bool:
    """Convert any image to 128px PNG using macOS sips."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            ["sips", "-s", "format", "png", "-Z", "128",
             str(source_path), "--out", str(output_path)],
            check=True, capture_output=True,
        )
        return output_path.exists() and output_path.stat().st_size > MIN_LOGO_BYTES
    except Exception:
        return False


def fetch_google_favicon(domain: str, school_code: str) -> str | None:
    """Download favicon from Google's service and save as PNG."""
    url = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
    data = request_url(url)
    if not data or len(data) < MIN_LOGO_BYTES:
        return None

    raw_path = CACHE_DIR / f"{school_code}-gfav.raw"
    png_path = PUBLIC_DIR / f"{school_code}.png"

    # Check if already exists and is valid
    if png_path.exists() and png_path.stat().st_size > MIN_LOGO_BYTES:
        return f"/logos/{school_code}.png"

    raw_path.write_bytes(data)
    if convert_to_png(raw_path, png_path):
        raw_path.unlink(missing_ok=True)
        return f"/logos/{school_code}.png"

    raw_path.unlink(missing_ok=True)
    return None


def try_apple_touch_icon(website: str, school_code: str) -> str | None:
    """Try to download apple-touch-icon which is often a better logo."""
    if not website:
        return None
    base = website if "://" in website else f"http://{website}"
    parsed = urllib.parse.urlparse(base)
    origin = f"{parsed.scheme}://{parsed.netloc}"

    for path in ["/apple-touch-icon.png", "/apple-touch-icon-precomposed.png"]:
        url = urllib.parse.urljoin(origin, path)
        data = request_url(url, timeout=8)
        if data and len(data) > MIN_LOGO_BYTES:
            raw_path = CACHE_DIR / f"{school_code}-ati.raw"
            png_path = PUBLIC_DIR / f"{school_code}.png"
            raw_path.write_bytes(data)
            if convert_to_png(raw_path, png_path):
                raw_path.unlink(missing_ok=True)
                return f"/logos/{school_code}.png"
            raw_path.unlink(missing_ok=True)

    return None


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    schools = json.loads(MERGED_PATH.read_text())

    # Filter to non-profit schools without logos
    targets = [
        s for s in schools
        if s.get("school_type") != "private_independent"
        and s.get("website")
        and not s.get("logo_url")
    ]

    total = len(targets)
    success = 0
    failed = 0

    print(f"Fetching logos for {total} non-profit schools...")

    for i, school in enumerate(targets):
        code = school["code"]
        website = school["website"]
        domain = extract_domain(website)

        if not domain:
            failed += 1
            continue

        # Progress
        if (i + 1) % 50 == 0 or i == 0:
            print(f"  [{i + 1}/{total}] Processing {code} ({domain})")

        # Try apple-touch-icon first (better quality), then Google favicon
        logo_url = try_apple_touch_icon(website, code)
        if not logo_url:
            logo_url = fetch_google_favicon(domain, code)

        if logo_url:
            school["logo_url"] = logo_url
            success += 1
        else:
            failed += 1

    # Save updated merged data
    MERGED_PATH.write_text(json.dumps(schools, ensure_ascii=False, indent=2) + "\n")

    print(f"\nDone! success={success} failed={failed} total={total}")
    print(f"Updated {MERGED_PATH}")


if __name__ == "__main__":
    main()
