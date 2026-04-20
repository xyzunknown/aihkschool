#!/usr/bin/env python3
"""
Shared XHS/Rednote site helpers.
"""
from __future__ import annotations

from urllib.parse import parse_qsl, quote, urlencode, urlparse, urlunparse

SUPPORTED_ORIGINS = (
    "https://www.xiaohongshu.com",
    "https://www.rednote.com",
)
DEFAULT_ORIGIN = SUPPORTED_ORIGINS[0]
COOKIE_DOMAINS = ("xiaohongshu.com", "rednote.com")
SESSION_COOKIE_NAMES = (
    "web_session",
    "xsecappid",
    "a1",
    "webId",
    "galaxy_creator_session_id",
    "customerClientId",
)


def is_supported_host(host: str | None) -> bool:
    if not host:
        return False
    normalized = host.lower()
    return any(
        normalized == domain or normalized.endswith(f".{domain}")
        for domain in COOKIE_DOMAINS
    )


def origin_from_url(url: str | None) -> str | None:
    if not url:
        return None
    parsed = urlparse(url)
    if not parsed.scheme or not parsed.netloc or not is_supported_host(parsed.hostname):
        return None
    return f"{parsed.scheme}://{parsed.netloc}"


def choose_origin(current_url: str | None = None, fallback: str | None = None) -> str:
    for candidate in (current_url, fallback, DEFAULT_ORIGIN):
        origin = origin_from_url(candidate)
        if origin:
            return origin
    return DEFAULT_ORIGIN


def build_home_url(current_url: str | None = None, fallback: str | None = None) -> str:
    origin = choose_origin(current_url, fallback)
    if origin.endswith("rednote.com"):
        return f"{origin}/explore"
    return f"{origin}/"


def build_search_url(
    keyword: str,
    sort: str = "general",
    current_url: str | None = None,
    fallback: str | None = None,
) -> str:
    origin = choose_origin(current_url, fallback)
    query = {
        "keyword": keyword,
        "source": "web_search_result_notes",
    }
    if sort == "popularity_descending":
        query["sort"] = "popularity_descending"
    elif sort == "time_descending":
        query["sort"] = "time_descending"
    return f"{origin}/search_result?{urlencode(query, quote_via=quote)}"


def build_post_url(
    post_id: str,
    current_url: str | None = None,
    fallback: str | None = None,
) -> str:
    origin = choose_origin(current_url, fallback)
    return f"{origin}/explore/{post_id}"


def normalize_url(url: str, fallback: str | None = None) -> str:
    parsed = urlparse(url)
    if parsed.scheme and parsed.netloc and is_supported_host(parsed.hostname):
        return url
    if url.startswith("/"):
        origin = choose_origin(fallback)
        return f"{origin}{url}"
    return url


def extract_post_id(url_or_path: str | None) -> str | None:
    if not url_or_path:
        return None
    parsed = urlparse(url_or_path)
    path = parsed.path or url_or_path
    parts = [part for part in path.split("/") if part]
    if "explore" not in parts:
        return None
    try:
        idx = parts.index("explore")
        post_id = parts[idx + 1]
    except (ValueError, IndexError):
        return None
    post_id = post_id.split("?")[0].split("#")[0].strip()
    return post_id or None


def is_explore_url(url: str | None) -> bool:
    return extract_post_id(url) is not None


def is_search_url(url: str | None) -> bool:
    if not url:
        return False
    parsed = urlparse(url)
    return is_supported_host(parsed.hostname) and parsed.path.rstrip("/") == "/search_result"


def normalize_search_url(url: str, fallback: str | None = None) -> str:
    parsed = urlparse(url)
    origin = choose_origin(fallback, url)
    origin_parts = urlparse(origin)
    qs = dict(parse_qsl(parsed.query, keep_blank_values=True))
    return urlunparse(
        (
            origin_parts.scheme,
            origin_parts.netloc,
            "/search_result",
            "",
            urlencode(qs, quote_via=quote),
            "",
        )
    )


def is_session_cookie(cookie: dict) -> bool:
    domain = (cookie.get("domain") or "").lstrip(".").lower()
    name = cookie.get("name") or ""
    return (
        name in SESSION_COOKIE_NAMES
        and any(domain == d or domain.endswith(f".{d}") for d in COOKIE_DOMAINS)
    )


def has_session_cookie(cookies: list[dict]) -> bool:
    return any(
        is_session_cookie(cookie) and cookie.get("name") == "web_session"
        for cookie in cookies
    )
