#!/usr/bin/env python3
"""
Infer private / international school vacancy signals from official school websites.

This script is intentionally conservative:
- only explicit grade-level signals become K1/K2/K3/N vacancy statuses
- generic admissions / apply-now signals become `check_school`
- if a site is unreachable and no admissions signal exists, statuses remain `no_information`

Improvements (2026-05):
- Method 1: http→https upgrade + SSL cert tolerance to recover unreachable sites
- Method 2: fixed-path probing (/admissions, /apply, /enrolment, …) when homepage
            link discovery finds nothing
- Method 3: noise-snippet filter tightened; waitlist detection made more aggressive
- Method 4: AI fallback (OpenAI-compatible API) for schools that are still
            check_school / no_information after regex extraction

Outputs:
- data/private_international_vacancy_enrichment.json
- supabase/seed/006_private_international_vacancy_enrichment.sql
"""

from __future__ import annotations

import concurrent.futures
import csv
import html
import json
import os
import re
import ssl
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
EN_CSV = ROOT / "data" / "KGP_2025_en.csv"
TC_CSV = ROOT / "data" / "KGP_2025_tc.csv"
PROFILE_MANIFEST_PATH = ROOT / "data" / "private_international_profile_enrichment.json"
PRIVATE_SEED_PATH = ROOT / "supabase" / "seed" / "002_private_international_schools.sql"
PROFILE_CACHE_DIR = ROOT / "data" / "profile-cache"
MANIFEST_PATH = ROOT / "data" / "private_international_vacancy_enrichment.json"
SQL_PATH = ROOT / "supabase" / "seed" / "006_private_international_vacancy_enrichment.sql"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
)

PRIVATE_CATEGORIES = {"Private Independent", "International"}
ACADEMIC_YEAR = "2026/27"
STATUS_ORDER = {
    "has_vacancy": 5,
    "waiting_list": 4,
    "no_vacancy": 4,
    "check_school": 2,
    "no_information": 1,
}
GRADE_KEYS = ("n", "k1", "k2", "k3")
VACANCY_TERMS = (
    "vacancy",
    "vacancies",
    "space available",
    "spaces available",
    "place available",
    "places available",
    "limited spaces",
    "waitlist",
    "waiting list",
    "full",
    "額滿",
    "已滿",
    "满额",
    "已满",
)
CHECK_TERMS = (
    "admissions open",
    "apply now",
    "now accepting",
    "accepting applications",
    "accepting enrolment",
    "accepting enrollment",
    "rolling admission",
    "year round",
    "throughout the year",
    "招生中",
    "接受申請",
    "全年接受申請",
    "全年招生",
)
APPLICATION_KEYWORDS = (
    "admission", "admissions", "apply", "application", "enrol", "enroll", "register",
    "招生", "報名", "申請", "入學", "收生", "幼兒班入學",
)

# Method 2: fixed sub-paths to probe when homepage link discovery finds nothing.
# Ordered by likelihood of containing vacancy / admissions content.
FIXED_ADMISSIONS_PATHS = (
    "/admissions",
    "/admission",
    "/admissions/apply",
    "/admissions/how-to-apply",
    "/apply",
    "/enrolment",
    "/enrollment",
    "/how-to-apply",
    "/application",
    "/vacancies",
    "/vacancy",
    "/join-us",
    "/registration",
    "/intake",
    "/en/admissions",
    "/en/admission",
    "/en/apply",
    "/en/enrolment",
)

# ─── Method 4: AI extraction config ──────────────────────────────────────────
# Uses the OpenAI-compatible proxy already configured in .env.local.
# Env vars read at runtime (not import time) so the script still works without them.
#
# OPENAI_API_KEY      — required for AI extraction
# OPENAI_BASE_URL     — proxy base URL (default: https://api.openai.com)
# OPENAI_MODEL        — model name (default: gpt-4o-mini for cost efficiency)
# VAC_AI_ENABLED      — set to "0" to disable AI extraction entirely
# VAC_AI_MAX_SCHOOLS  — max schools to send to AI per run (default: 165, i.e. all)

AI_SYSTEM_PROMPT = """You are a JSON-only extractor. Output ONLY a JSON object, nothing else.

Format: {"n":"STATUS","k1":"STATUS","k2":"STATUS","k3":"STATUS","summary":"EVIDENCE"}

STATUS must be exactly one of:
- has_vacancy (explicit: spaces/places available now)
- waiting_list (waitlist or 候補 mentioned)
- no_vacancy (full / 額滿 / no vacancy)
- check_school (apply now / admissions open / rolling / year-round — no vacancy info)
- no_information (no admissions content found)
- not_offered (grade not offered by this school)

Do not output any explanation. Output the JSON object only."""


def _load_env_local() -> None:
    """Load .env.local into os.environ if not already set (mirrors JS dotenv behaviour)."""
    env_path = ROOT / ".env.local"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        eq = line.find("=")
        if eq < 0:
            continue
        key = line[:eq].strip()
        val = line[eq + 1:].strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = val


def _ai_call(text_content: str, school_name: str, grades_offered: list[str]) -> dict | None:
    """Call the OpenAI-compatible API and return parsed vacancy dict, or None on failure.

    Method 4: AI extraction for schools where regex found no concrete signal.
    Uses OPENAI_API_KEY / OPENAI_BASE_URL / OPENAI_MODEL_VACANCY (or OPENAI_MODEL) from environment.
    Default model: minimax-m2.5 (non-reasoning, fast, reliable JSON output).
    Includes retry logic for 429 rate-limit responses.
    """
    _load_env_local()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or os.environ.get("VAC_AI_ENABLED", "0") == "0":
        return None

    base_url = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com").rstrip("/")
    model = os.environ.get("OPENAI_MODEL_VACANCY", "minimax-m2.5")

    grades_str = ", ".join(grades_offered) if grades_offered else "K1, K2, K3"
    user_msg = (
        f"School: {school_name}\n"
        f"Grades offered: {grades_str}\n\n"
        f"--- Website text (truncated to 1500 chars) ---\n"
        f"{text_content[:1500]}"
    )

    payload = json.dumps({
        "model": model,
        "max_tokens": 400,  # minimax-m2.5: non-reasoning, ~100 output tokens sufficient
        "temperature": 0,
        "messages": [
            {"role": "system", "content": AI_SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ],
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{base_url}/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            # Browser-like headers required for Cloudflare-protected proxies
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
            ),
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            "Origin": base_url.split("/v")[0] if "/v" in base_url else base_url,
            "Referer": base_url.split("/v")[0] + "/" if "/v" in base_url else base_url + "/",
        },
        method="POST",
    )

    import time as _time
    ctx = ssl.create_default_context()

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                body = json.loads(resp.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as exc:
            if exc.code == 429:
                wait = 20 * (attempt + 1)  # 20s, 40s, 60s back-off
                print(f"    [AI] 429 rate-limit, waiting {wait}s (attempt {attempt+1}/3)", flush=True)
                _time.sleep(wait)
                continue
            print(f"    [AI] HTTP {exc.code}: {exc.read().decode()[:120]}", flush=True)
            return None
        except Exception as exc:
            print(f"    [AI] API error: {exc}", flush=True)
            if attempt < 2:
                _time.sleep(10)
                continue
            return None
    else:
        return None

    raw = body.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
    finish_reason = body.get("choices", [{}])[0].get("finish_reason", "unknown")
    if not raw:
        print(f"    [AI] empty response (finish={finish_reason}, model={model})", flush=True)
        return None
    # Strip markdown code fences if present
    raw = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw, flags=re.S).strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        # Model may have output reasoning text before/after JSON — try to extract JSON block
        json_match = re.search(r'\{[^{}]*"(?:n|k1|k2|k3)"[^{}]*\}', raw, re.S)
        if json_match:
            try:
                result = json.loads(json_match.group())
            except json.JSONDecodeError:
                print(f"    [AI] JSON parse error: {raw[:120]}", flush=True)
                return None
        else:
            print(f"    [AI] JSON parse error: {raw[:120]}", flush=True)
            return None

    # Validate: must have at least one grade key
    valid_statuses = {"has_vacancy", "waiting_list", "no_vacancy", "check_school", "no_information", "not_offered"}
    grade_keys = {"n", "k1", "k2", "k3"}
    if not any(k in result for k in grade_keys):
        print(f"    [AI] unexpected response shape: {raw[:120]}", flush=True)
        return None
    # Sanitise: reject any status value not in our enum
    for k in grade_keys:
        if k in result and result[k] not in valid_statuses:
            result[k] = "no_information"

    return result


def ai_extract_vacancy(
    target: "SchoolTarget",
    scraped_texts: list[str],
    record: dict,
    ai_semaphore: "threading.Semaphore | None" = None,
) -> dict:
    """Apply AI extraction to a record that still has weak signals.

    Only called when the record has no concrete grade-level signal after regex.
    Updates grade vacancy fields and evidence in-place and returns the record.
    ai_semaphore: optional threading.Semaphore to limit concurrent AI calls.
    """
    CONCRETE = {"has_vacancy", "waiting_list", "no_vacancy"}

    # Skip if regex already found concrete signals for all offered grades
    needs_ai = any(
        record.get(f"{g}_vacancy") not in CONCRETE
        for g in ("n", "k1", "k2", "k3")
        if (g.upper() if g != "n" else "N") in target.grades_offered
    )
    if not needs_ai:
        return record

    # Combine all scraped page texts, deduplicated, up to 1500 chars total
    combined = "\n\n".join(dict.fromkeys(scraped_texts))[:1500]
    if not combined.strip():
        return record

    if ai_semaphore:
        ai_semaphore.acquire()
    try:
        ai_result = _ai_call(combined, target.name_en, target.grades_offered)
    finally:
        if ai_semaphore:
            ai_semaphore.release()

    if not ai_result:
        return record

    summary = ai_result.get("summary", "")
    improved = False

    for grade in ("n", "k1", "k2", "k3"):
        field = f"{grade}_vacancy"
        code_grade = grade.upper() if grade != "n" else "N"
        if code_grade not in target.grades_offered:
            continue
        ai_status = ai_result.get(grade)
        if not ai_status or ai_status == "not_offered":
            continue
        current = record.get(field, "no_information")
        # Only upgrade: concrete > check_school > no_information
        # Never downgrade a concrete signal already found by regex
        if current in CONCRETE:
            continue
        if ai_status in CONCRETE or (ai_status == "check_school" and current == "no_information"):
            record[field] = ai_status
            record["evidence"][grade] = {
                "summary": summary,
                "url": record.get("source_url", ""),
                "method": "ai",
            }
            improved = True

    if improved:
        # Recompute overall_status from grade fields
        grade_statuses = [
            record.get(f"{g}_vacancy")
            for g in ("n", "k1", "k2", "k3")
            if (g.upper() if g != "n" else "N") in target.grades_offered
        ]
        status_priority = {"has_vacancy": 5, "waiting_list": 4, "no_vacancy": 3,
                           "check_school": 2, "no_information": 1}
        best = max(grade_statuses, key=lambda s: status_priority.get(s, 0), default="no_information")
        record["overall_status"] = best
        if not record.get("overall_summary"):
            record["overall_summary"] = summary
        record["scrape_status"] = record.get("scrape_status", "ok") + "+ai"

    return record


@dataclass
class SchoolTarget:
    school_code: str
    name_en: str
    name_tc: str
    website: str
    school_category: str
    grades_offered: list[str]
    application_status: str | None
    application_details: str | None
    application_url: str | None


def request_url(url: str, timeout: int = 10) -> tuple[bytes | None, str | None]:
    """Fetch a URL, following redirects and auto-upgrading http→https on failure.

    Method 1 fixes:
    - http→https upgrade: retry with https if http fails
    - SSL certificate errors: fall back to unverified context for .edu.hk sites
      that have self-signed or chain-incomplete certificates
    - Follow redirects automatically (urllib default)
    """

    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-HK,zh-TW,zh;q=0.9,en;q=0.8",
    }

    def _try(target_url: str, verify_ssl: bool = True) -> tuple[bytes | None, str | None]:
        req = urllib.request.Request(target_url, headers=headers)
        ctx = None if verify_ssl else ssl.create_default_context()
        if not verify_ssl and ctx:
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
                if resp.status >= 400:
                    return None, None
                return resp.read(), resp.headers.get_content_type()
        except ssl.SSLError:
            return None, None
        except Exception:
            return None, None

    # First attempt: normal verified request
    payload, ct = _try(url)
    if payload is not None:
        return payload, ct

    # Method 1a: retry with https if original was http
    if url.startswith("http://"):
        https_url = "https://" + url[len("http://"):]
        payload, ct = _try(https_url)
        if payload is not None:
            return payload, ct
        # Method 1b: https but with SSL verification disabled (self-signed certs)
        payload, ct = _try(https_url, verify_ssl=False)
        if payload is not None:
            return payload, ct

    # Method 1b for original https: SSL cert issue on the original URL
    if url.startswith("https://"):
        payload, ct = _try(url, verify_ssl=False)
        if payload is not None:
            return payload, ct

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


def candidate_pages(website: str, raw_html: str) -> list[str]:
    """Return up to 6 admissions-relevant sub-page URLs for a school.

    Method 2: in addition to link-discovery from the homepage, we probe a set
    of well-known fixed paths (/admissions, /apply, /enrolment, …).  This
    recovers schools whose homepage has no visible admissions link (e.g. SPAs,
    image-heavy sites, or sites where the nav is rendered by JS).

    Fixed-path URLs are appended *after* link-discovered URLs so that pages
    found via explicit links (higher confidence) are scraped first.
    """
    base = normalize_website(website)
    parsed_base = urllib.parse.urlparse(base)
    origin = f"{parsed_base.scheme}://{parsed_base.netloc}"

    # Link-discovery from homepage HTML
    links = parse_links(raw_html, base)
    discovered = sorted(
        links,
        key=lambda item: score_link(item[0], item[1], APPLICATION_KEYWORDS),
        reverse=True,
    )
    discovered_urls = [url for url, text in discovered if score_link(url, text, APPLICATION_KEYWORDS) > 0]

    # Fixed-path probes (Method 2)
    fixed_urls = [origin + path for path in FIXED_ADMISSIONS_PATHS]

    # Merge: discovered first, then fixed paths not already in discovered set
    all_candidates = unique(discovered_urls + fixed_urls)
    return all_candidates[:8]  # increased cap from 4 to 8 to allow fixed paths


def load_profile_manifest() -> dict[str, dict]:
    if not PROFILE_MANIFEST_PATH.exists():
        return {}
    rows = json.loads(PROFILE_MANIFEST_PATH.read_text(encoding="utf-8"))
    return {row["school_code"]: row for row in rows if row.get("school_code")}


def load_grades_offered() -> dict[str, list[str]]:
    text = PRIVATE_SEED_PATH.read_text(encoding="utf-8")
    grades_by_code: dict[str, list[str]] = {}
    pattern = re.compile(r"VALUES\s*\('(?P<code>\d+)'.*?ARRAY\[(?P<grades>[^\]]*)\]\)", re.S)
    for match in pattern.finditer(text):
        grades = [item.strip().strip("'") for item in match.group("grades").split(",") if item.strip()]
        grades_by_code[match.group("code")] = grades
    return grades_by_code


def load_targets() -> list[SchoolTarget]:
    with EN_CSV.open(encoding="utf-16", newline="") as f:
        en_rows = list(csv.DictReader(f, delimiter="^"))
    with TC_CSV.open(encoding="utf-8-sig", newline="") as f:
        tc_rows = list(csv.DictReader(f, delimiter="^"))

    grades_by_code = load_grades_offered()
    profile_by_code = load_profile_manifest()
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
        profile = profile_by_code.get(school_code, {})
        targets.append(
            SchoolTarget(
                school_code=school_code,
                name_en=row["school_name"].strip(),
                name_tc=(tc_row["學校名稱"].strip() if tc_row else row["school_name"].strip()),
                website=website,
                school_category=row["school_category"].strip(),
                grades_offered=grades_by_code.get(school_code, ["K1", "K2", "K3"]),
                application_status=profile.get("application_status"),
                application_details=profile.get("application_details"),
                application_url=profile.get("application_url"),
            )
        )
        seen_codes.add(school_code)
    return targets


def normalize_text(text: str) -> str:
    text = html.unescape(text)
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def split_snippets(text: str) -> list[str]:
    parts = re.split(r"\n|(?<=[。.!?])\s+", text)
    snippets: list[str] = []
    for part in parts:
        compact = normalize_text(part)
        if 8 <= len(compact) <= 260:
            snippets.append(compact)
    return snippets


def is_noise_snippet(snippet: str) -> bool:
    """Return True for snippets that carry no vacancy signal.

    Method 3 additions:
    - Pure button / CTA text (≤ 25 chars) that matches generic admissions words
      is almost always a nav label or button, not content.
    - Navigation-bar fragments: multiple words separated by / or | are menus.
    - Snippets that are just a list of page names (e.g. "Admissions Gallery
      Contact Careers") with no sentence structure.
    """
    lowered = snippet.lower()

    # Original noise filters
    if "available online soon" in lowered:
        return True
    if "summer camp" in lowered or "winter camp" in lowered or "spring camp" in lowered:
        return True
    if "autumn camp" in lowered or "lunar new year camp" in lowered:
        return True
    if "open day" in lowered or "school tour" in lowered:
        return True
    if "seminar replay" in lowered:
        return True
    if "報名日期" in snippet and ("額滿即止" in snippet or "名額有限" in snippet):
        return True
    if "workshop" in lowered or "trial class" in lowered:
        return True

    # Method 3: pure button / CTA text — too short to be real content
    # e.g. "Apply Now", "Admissions", "Register Here"
    if len(snippet) <= 25 and re.search(
        r"^(apply now|admissions?|register|enrol|enroll|contact us|learn more|find out more|click here)$",
        snippet.strip(),
        re.I,
    ):
        return True

    # Method 3: navigation-bar fragments — slash/pipe-separated page names
    # e.g. "Admissions / Gallery / Contact" or "Home | About | Apply"
    if re.search(r"\b\w+\b\s*[/|]\s*\b\w+\b\s*[/|]\s*\b\w+\b", snippet):
        return True

    # Method 3: snippet looks like a pure nav menu (≥ 3 capitalised words, no verb)
    # e.g. "Admissions Gallery Testimonials Contact Careers"
    words = snippet.split()
    if (
        len(words) >= 3
        and len(snippet) <= 80
        and sum(1 for w in words if w and w[0].isupper()) >= len(words) * 0.8
        and not re.search(r"\b(is|are|was|were|have|has|will|can|please|we|our|your|the)\b", lowered)
    ):
        return True

    return False


def detect_status(snippet: str) -> str | None:
    """Classify a text snippet into a vacancy status.

    Method 3 fixes:
    - Standalone "waitlist" / "waiting list" now defaults to waiting_list
      (previously required extra context to avoid check_school).
    - "Waitlist: …" prefix pattern explicitly mapped to waiting_list.
    - Conditional phrasing ("if placed on waiting list") stays check_school.
    - "limited places remaining" / "places still available" → has_vacancy.
    """
    lowered = snippet.lower()

    # Strong waiting-list signals
    if re.search(
        r"long waiting list|placed on our waiting list|currently.*waiting list"
        r"|候補生|候補名單|候补生|候补名单"
        r"|waitlist:\s|waiting list:",
        snippet, re.I,
    ):
        return "waiting_list"

    if re.search(r"waiting list|waitlist|候補|候补", snippet, re.I):
        # Conditional / hypothetical phrasing → check_school
        if re.search(
            r"\bif\b.*wait|option to.*wait|join the waitlist|can place you"
            r"|how long is the waitlist|waitlist duration|varies by campus"
            r"|\?",
            lowered, re.I,
        ):
            return "check_school"
        # Everything else with "waiting list" / "waitlist" → waiting_list
        return "waiting_list"

    if re.search(r"no vacancy|does not have a vacancy|classes? (?:are )?full|已滿|已满|額滿|满额", snippet, re.I):
        return "no_vacancy"

    if re.search(
        r"\bif there are spaces? available\b"
        r"|in case there are more applicants than vacancies"
        r"|if we have school places available",
        lowered, re.I,
    ):
        return "check_school"

    if re.search(
        r"limited spaces? (?:are )?(?:still )?available"
        r"|spaces? available in|places? available in"
        r"|space available -|places? are available"
        r"|vacancies available|vacancy available"
        r"|limited places remaining|places still available"
        r"|有位|空缺",
        snippet, re.I,
    ):
        return "has_vacancy"

    if re.search(
        r"admissions? open|now accepting|accepting applications"
        r"|accepting enrolment|accepting enrollment"
        r"|rolling admission|year round|throughout the year"
        r"|招生中|接受申請|全年接受申請|全年招生",
        snippet, re.I,
    ):
        return "check_school"

    if any(term in lowered for term in CHECK_TERMS):
        return "check_school"

    return None


def mentioned_grades(snippet: str, offered_grades: list[str]) -> set[str]:
    lowered = snippet.lower()
    found: set[str] = set()

    grade_patterns = {
        "n": [r"\bpn\b", r"pre[\s-]?nursery", r"\bnursery\b", r"2\s*(?:-|–|to)\s*3"],
        "k1": [r"\bk1\b", r"\bkg1\b", r"kindergarten 1", r"lower kindergarten", r"\blkg\b"],
        "k2": [r"\bk2\b", r"\bkg2\b", r"kindergarten 2", r"middle kindergarten", r"\bmk\b"],
        "k3": [r"\bk3\b", r"\bkg3\b", r"kindergarten 3", r"upper kindergarten", r"\bukg\b"],
    }
    offered_lookup = {grade.lower() for grade in offered_grades}

    for grade, patterns in grade_patterns.items():
        if grade not in offered_lookup:
            continue
        if any(re.search(pattern, lowered, re.I) for pattern in patterns):
            found.add(grade)

    if not found and re.search(r"pre[\s-]?nursery and kindergarten|pn.+kindergarten|nursery and kindergarten", lowered, re.I):
        if "n" in offered_lookup:
            found.add("n")
        for grade in ("k1", "k2", "k3"):
            if grade in offered_lookup:
                found.add(grade)

    if not found and re.search(r"\bkindergarten\b|幼稚園|幼兒班|all grades|each grade", snippet, re.I):
        for grade in ("k1", "k2", "k3"):
            if grade in offered_lookup:
                found.add(grade)

    return found


def candidate_score(status: str, explicit_grades: bool, url: str, snippet: str) -> int:
    score = STATUS_ORDER.get(status, 0) * 10
    if explicit_grades:
        score += 15
    if re.search(r"2026/?27|2025/?26", snippet):
        score += 6
    if re.search(r"admission|apply|招生|申請|報名", url, re.I):
        score += 5
    if status in {"waiting_list", "no_vacancy"}:
        score += 4
    return score


def sql_string(value: str | None) -> str:
    if value is None:
        return "NULL"
    return "'" + value.replace("'", "''") + "'"


def best_status(existing: dict | None, candidate: dict) -> dict:
    if existing is None:
        return candidate
    if candidate["score"] > existing["score"]:
        return candidate
    return existing


def build_default_record(target: SchoolTarget, scrape_status: str = "ok") -> dict:
    return {
        "school_code": target.school_code,
        "name_tc": target.name_tc,
        "name_en": target.name_en,
        "website": target.website,
        "school_type": "international" if target.school_category == "International" else "private_independent",
        "academic_year": ACADEMIC_YEAR,
        "grades_offered": target.grades_offered,
        "n_vacancy": "not_offered" if "N" not in target.grades_offered else "no_information",
        "k1_vacancy": "not_offered" if "K1" not in target.grades_offered else "no_information",
        "k2_vacancy": "not_offered" if "K2" not in target.grades_offered else "no_information",
        "k3_vacancy": "not_offered" if "K3" not in target.grades_offered else "no_information",
        "overall_status": "no_information",
        "overall_summary": None,
        "source_url": target.application_url or normalize_website(target.website),
        "scraped_pages": [],
        "scrape_status": scrape_status,
        "evidence": {},
    }


def enrich_school(target: SchoolTarget, ai_semaphore: "threading.Semaphore | None" = None) -> dict:
    home_url = normalize_website(target.website)
    home_html = fetch_html(home_url, target.school_code)
    if not home_html:
        record = build_default_record(target, "homepage_unreachable")
        if target.application_status or target.application_details or target.application_url:
            for grade in ("n", "k1", "k2", "k3"):
                key = grade.upper() if grade != "n" else "N"
                field = f"{grade}_vacancy"
                if key in target.grades_offered:
                    record[field] = "check_school"
            record["overall_status"] = "check_school"
            record["overall_summary"] = target.application_details or target.application_status
            record["source_url"] = target.application_url or target.website
        return record

    page_urls = unique([home_url, *(candidate_pages(target.website, home_html)), *( [target.application_url] if target.application_url else [] )])[:10]
    offered_lookup = {grade.lower() for grade in target.grades_offered}

    grade_best: dict[str, dict | None] = {grade: None for grade in GRADE_KEYS}
    overall_best: dict | None = None
    scraped_pages: list[str] = []

    for page_url in page_urls:
        raw_html = home_html if page_url == home_url else fetch_html(page_url, target.school_code)
        if not raw_html:
            continue
        scraped_pages.append(page_url)
        text = strip_html(raw_html)
        for snippet in split_snippets(text):
            if is_noise_snippet(snippet):
                continue
            status = detect_status(snippet)
            if not status:
                continue
            grades = mentioned_grades(snippet, target.grades_offered)
            score = candidate_score(status, bool(grades), page_url, snippet)
            candidate = {
                "status": status,
                "snippet": snippet[:220],
                "url": page_url,
                "score": score,
            }
            if grades:
                for grade in grades:
                    grade_best[grade] = best_status(grade_best[grade], candidate)
            else:
                overall_best = best_status(overall_best, candidate)

    record = build_default_record(target)
    record["scraped_pages"] = scraped_pages

    for grade in GRADE_KEYS:
        field = f"{grade}_vacancy"
        code_grade = grade.upper() if grade != "n" else "N"
        if code_grade not in target.grades_offered:
            record[field] = "not_offered"
            continue
        chosen = grade_best[grade]
        if chosen:
            record[field] = chosen["status"]
            record["evidence"][grade] = {"summary": chosen["snippet"], "url": chosen["url"]}

    if overall_best:
        record["overall_status"] = overall_best["status"]
        record["overall_summary"] = overall_best["snippet"]
        record["source_url"] = overall_best["url"]

        # Apply cautious fallback only for strong whole-school negative signals.
        if overall_best["status"] in {"waiting_list", "no_vacancy"}:
            for grade in GRADE_KEYS:
                field = f"{grade}_vacancy"
                code_grade = grade.upper() if grade != "n" else "N"
                if code_grade not in target.grades_offered:
                    continue
                # Upgrade both no_information AND check_school to the concrete signal
                if record[field] in {"no_information", "check_school"}:
                    record[field] = overall_best["status"]
                    record["evidence"][grade] = {"summary": overall_best["snippet"], "url": overall_best["url"]}

    has_any_reliable = any(record[f"{grade}_vacancy"] in {"has_vacancy", "waiting_list", "no_vacancy"} for grade in GRADE_KEYS)
    has_any_check = any(record[f"{grade}_vacancy"] == "check_school" for grade in GRADE_KEYS)

    if not has_any_reliable and not has_any_check:
        if target.application_status or target.application_details or target.application_url or overall_best:
            for grade in GRADE_KEYS:
                field = f"{grade}_vacancy"
                code_grade = grade.upper() if grade != "n" else "N"
                if code_grade in target.grades_offered and record[field] == "no_information":
                    record[field] = "check_school"
            record["overall_status"] = record["overall_status"] if record["overall_status"] != "no_information" else "check_school"
            if not record["overall_summary"]:
                record["overall_summary"] = target.application_details or target.application_status
            if target.application_url:
                record["source_url"] = target.application_url

    # Combine all scraped page texts to pass to the AI.
    # Prioritise admissions-related pages; cap total at 1500 chars to keep
    # prompt small enough for flash model (avoids finish=length truncation).
    scraped_texts: list[str] = []
    for page_url in scraped_pages:
        raw = home_html if page_url == home_url else fetch_html(page_url, target.school_code)
        if raw:
            page_text = strip_html(raw)
            # Prioritise admissions pages by putting them first
            if re.search(r"admission|apply|enrol|vacancy|招生|申請", page_url, re.I):
                scraped_texts.insert(0, page_text[:800])
            else:
                scraped_texts.append(page_text[:400])
    record = ai_extract_vacancy(target, scraped_texts, record, ai_semaphore)

    return record


def write_sql(records: list[dict]) -> None:
    lines = ["-- Private / international school vacancy enrichment from official school websites"]
    for item in records:
        assignments = [
            f"n_vacancy = {sql_string(item['n_vacancy'])}",
            f"k1_vacancy = {sql_string(item['k1_vacancy'])}",
            f"k2_vacancy = {sql_string(item['k2_vacancy'])}",
            f"k3_vacancy = {sql_string(item['k3_vacancy'])}",
            f"edb_source_url = {sql_string(item['source_url'])}",
        ]
        lines.append(
            "UPDATE vacancies\nSET\n  " + ",\n  ".join(assignments) +
            "\nFROM schools\n"
            f"WHERE vacancies.school_id = schools.id AND schools.school_code = '{item['school_code']}' "
            f"AND vacancies.academic_year = '{item['academic_year']}' AND vacancies.is_current = true;"
        )
        lines.append(
            "INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)\n"
            f"SELECT id, '{item['academic_year']}', {sql_string(item['n_vacancy'])}, {sql_string(item['k1_vacancy'])}, "
            f"{sql_string(item['k2_vacancy'])}, {sql_string(item['k3_vacancy'])}, {sql_string(item['source_url'])}, true\n"
            "FROM schools\n"
            f"WHERE school_code = '{item['school_code']}' AND NOT EXISTS (\n"
            "  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id "
            f"AND vacancies.academic_year = '{item['academic_year']}' AND vacancies.is_current = true\n"
            ");"
        )
    SQL_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    import threading
    targets = load_targets()
    records: list[dict | None] = [None] * len(targets)

    # Limit concurrent AI calls to 3 to avoid 429 rate-limit errors.
    # Web scraping still runs at full concurrency (max_workers=6).
    ai_semaphore = threading.Semaphore(3)

    def work(item: tuple[int, SchoolTarget]) -> tuple[int, dict]:
        idx, target = item
        print(f"[{idx + 1}/{len(targets)}] {target.school_code} {target.name_en}", flush=True)
        try:
            return idx, enrich_school(target, ai_semaphore)
        except Exception as exc:
            record = build_default_record(target, "failed")
            record["overall_summary"] = f"抓取失敗：{str(exc)[:160]}"
            if target.application_status or target.application_details or target.application_url:
                for grade in GRADE_KEYS:
                    field = f"{grade}_vacancy"
                    code_grade = grade.upper() if grade != "n" else "N"
                    if code_grade in target.grades_offered:
                        record[field] = "check_school"
            return idx, record

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        completed = 0
        for idx, record in executor.map(work, list(enumerate(targets))):
            records[idx] = record
            completed += 1
            if completed % 15 == 0:
                snapshot = [item for item in records if item is not None]
                MANIFEST_PATH.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                write_sql(snapshot)

    final_records = [item for item in records if item is not None]
    MANIFEST_PATH.write_text(json.dumps(final_records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write_sql(final_records)

    summary = {status: 0 for status in ["has_vacancy", "waiting_list", "no_vacancy", "check_school", "no_information", "not_offered"]}
    for row in final_records:
        for grade in GRADE_KEYS:
            summary[row[f"{grade}_vacancy"]] = summary.get(row[f"{grade}_vacancy"], 0) + 1
    print(f"processed={len(final_records)} summary={summary}", flush=True)


if __name__ == "__main__":
    main()
