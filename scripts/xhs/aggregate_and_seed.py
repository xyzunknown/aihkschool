#!/usr/bin/env python3
"""
Phase 5: Aggregation + SQL seed generation.

Reads extracted/ data, aggregates per-school statistics,
calculates rankings, and generates social_summary.json + SQL seed.

Usage:
    python -m scripts.xhs.aggregate_and_seed --preview
    python -m scripts.xhs.aggregate_and_seed
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from scripts.xhs import config
from scripts.xhs.utils import load_json, save_json


# ─── Aggregation ─────────────────────────────────────────────────────

def extract_year_range(items: list[dict]) -> str:
    """Get min-max year range from source_date fields."""
    years: set[int] = set()
    for item in items:
        d = item.get("source_date") or ""
        if len(d) >= 4:
            try:
                years.add(int(d[:4]))
            except ValueError:
                pass
    if not years:
        return "N/A"
    return f"{min(years)}-{max(years)}"


def aggregate_school_data(school_code: str, items: list[dict]) -> dict:
    """Aggregate extracted items into school-level statistics."""

    # Only use high + medium confidence data
    valid_items = [
        i for i in items
        if i.get("match_confidence", "medium") in ("high", "medium")
    ]
    if not valid_items:
        return None

    # === Heat stats ===
    total_posts = len(set(i.get("post_id", "") for i in valid_items))
    total_engagement = sum(i.get("engagement_score", 0) for i in valid_items)
    # Deduplicate engagement by post_id (don't double-count multi-item posts)
    seen_posts = {}
    for i in valid_items:
        pid = i.get("post_id", "")
        if pid not in seen_posts:
            seen_posts[pid] = i.get("engagement_score", 0)
    total_engagement = sum(seen_posts.values())

    # === Interview stats ===
    interview_items = [i for i in valid_items if i.get("content_type") == "interview"]
    interview_posts = len(set(i.get("post_id", "") for i in interview_items))

    # Interview keywords frequency
    keyword_counter: Counter = Counter()
    for item in interview_items:
        sd = item.get("structured_data", {})
        for kw in sd.get("interview_keywords", []):
            keyword_counter[kw] += 1
    top_keywords = keyword_counter.most_common(10)

    # Interview format distribution
    format_counter: Counter = Counter()
    for i in interview_items:
        fmt = i.get("structured_data", {}).get("interview_format")
        if fmt:
            format_counter[fmt] += 1

    # Average interview duration
    durations = [
        i["structured_data"]["interview_duration_minutes"]
        for i in interview_items
        if i.get("structured_data", {}).get("interview_duration_minutes")
    ]
    avg_duration = round(sum(durations) / len(durations)) if durations else None

    # Parent interview percentage
    parent_count = sum(
        1 for i in interview_items
        if i.get("structured_data", {}).get("parent_involved") is True
    )
    parent_pct = (
        round(parent_count / len(interview_items) * 100) if interview_items else None
    )

    # Interview contributor count (unique post_id with source_type="post")
    interview_contributors = len(set(
        i.get("post_id") for i in interview_items if i.get("source_type") == "post"
    ))

    # === Sentiment distribution ===
    sentiment_dist = Counter(
        i.get("sentiment", "neutral") for i in valid_items
    )

    # Positive / negative keywords (freq >= threshold)
    pos_counter: Counter = Counter()
    neg_counter: Counter = Counter()
    for item in valid_items:
        for kw in item.get("positive_keywords", []):
            pos_counter[kw] += 1
        for kw in item.get("negative_keywords", []):
            neg_counter[kw] += 1
    positive_keywords = {
        k: v for k, v in pos_counter.most_common(10)
        if v >= config.AGG_MIN_KEYWORD_FREQ
    }
    negative_keywords = {
        k: v for k, v in neg_counter.most_common(10)
        if v >= config.AGG_MIN_KEYWORD_FREQ
    }

    # === Fee estimates ===
    fee_items = [i for i in valid_items if i.get("content_type") == "fee"]
    fee_bucket: dict[str, list] = {}
    for item in fee_items:
        sd = item.get("structured_data", {})
        ft = sd.get("fee_type")
        low = sd.get("fee_amount_low")
        if ft and low is not None:
            fee_bucket.setdefault(ft, []).append({
                "low": low,
                "high": sd.get("fee_amount_high") or low,
            })

    fee_summary: dict = {}
    for ft, values in fee_bucket.items():
        if len(values) >= config.AGG_MIN_FEE_COUNT:
            all_lows = sorted(v["low"] for v in values)
            all_highs = sorted(v["high"] for v in values)
            fee_summary[ft] = {
                "low": all_lows[len(all_lows) // 4],         # P25
                "high": all_highs[3 * len(all_highs) // 4],  # P75
                "count": len(values),
            }

    # === Timeline stats ===
    timeline_items = [i for i in valid_items if i.get("content_type") == "timeline"]
    timeline_data: dict[str, list] = {}
    for item in timeline_items:
        sd = item.get("structured_data", {})
        event = sd.get("event_type")
        month = sd.get("event_month")
        if event and month:
            timeline_data.setdefault(event, []).append(month)

    timeline_summary: dict = {}
    for event, months in timeline_data.items():
        if len(months) >= config.AGG_MIN_TIMELINE_COUNT:
            most_common = Counter(months).most_common(1)[0][0]
            timeline_summary[event] = {
                "typical_month": most_common,
                "count": len(months),
            }

    # === Competition level ===
    multi_round = 0
    high_applicant = 0
    for item in valid_items:
        cs = item.get("competition_signals", {})
        if cs.get("multi_round"):
            multi_round += 1
        if cs.get("high_applicant_count"):
            high_applicant += 1

    if (
        multi_round >= config.AGG_COMPETITION_HIGH_THRESHOLD
        or high_applicant >= config.AGG_COMPETITION_HIGH_THRESHOLD
    ):
        competition_level = "high"
    elif (
        multi_round >= config.AGG_COMPETITION_MEDIUM_THRESHOLD
        or high_applicant >= config.AGG_COMPETITION_MEDIUM_THRESHOLD
    ):
        competition_level = "medium"
    else:
        competition_level = "low"

    return {
        "school_code": school_code,
        "total_posts": total_posts,
        "total_engagement": total_engagement,
        "interview_posts": interview_posts,
        "top_interview_keywords": top_keywords,
        "interview_format_distribution": dict(format_counter),
        "avg_interview_duration": avg_duration,
        "parent_interview_pct": parent_pct,
        "interview_contributor_count": interview_contributors,
        "sentiment_distribution": dict(sentiment_dist),
        "positive_keywords": positive_keywords,
        "negative_keywords": negative_keywords,
        "fee_estimates": fee_summary,
        "timeline_summary": timeline_summary,
        "competition_level": competition_level,
        "data_year_range": extract_year_range(valid_items),
    }


# ─── Rankings ────────────────────────────────────────────────────────

def calculate_heat_rankings(
    summaries: list[dict],
    school_district_map: dict[str, str],
) -> list[dict]:
    """Calculate overall and district heat rankings."""

    # Overall ranking by total_engagement
    by_heat = sorted(summaries, key=lambda s: s["total_engagement"], reverse=True)
    for rank, s in enumerate(by_heat, 1):
        s["heat_rank_overall"] = rank

    # District ranking
    by_district: dict[str, list] = defaultdict(list)
    for s in summaries:
        dist = school_district_map.get(s["school_code"], "unknown")
        s["district"] = dist
        by_district[dist].append(s)

    for dist, group in by_district.items():
        ranked = sorted(group, key=lambda s: s["total_engagement"], reverse=True)
        for rank, s in enumerate(ranked, 1):
            s["heat_rank_district"] = rank

    return by_heat


# ─── SQL generation ──────────────────────────────────────────────────

def escape_sql(text: str) -> str:
    """Escape single quotes for SQL."""
    if text is None:
        return "NULL"
    return "'" + str(text).replace("'", "''") + "'"


def json_sql(obj) -> str:
    """Convert Python object to SQL jsonb literal."""
    if obj is None or obj == {} or obj == []:
        return "'{}'"
    return escape_sql(json.dumps(obj, ensure_ascii=False))


def int_or_null(val) -> str:
    return str(val) if val is not None else "NULL"


def generate_seed_sql(summaries: list[dict]) -> str:
    """Generate the seed SQL for social_summary table."""
    lines = [
        "-- ============================================================",
        "-- Seed: social_summary data (auto-generated by aggregate_and_seed.py)",
        f"-- Generated at: {datetime.now().isoformat()}",
        "-- ============================================================",
        "",
    ]

    for s in summaries:
        code = s["school_code"]
        lines.append(f"-- {s.get('name_tc', code)}")
        lines.append(f"""INSERT INTO social_summary (
    school_id, school_code,
    total_posts, total_engagement, heat_rank_overall, heat_rank_district,
    interview_posts, top_interview_keywords, interview_format_distribution,
    avg_interview_duration, parent_interview_pct, interview_contributor_count,
    sentiment_distribution, positive_keywords, negative_keywords,
    fee_estimates, timeline_summary, competition_level, data_year_range
)
SELECT
    s.id, {escape_sql(code)},
    {int_or_null(s.get('total_posts'))}, {int_or_null(s.get('total_engagement'))}, {int_or_null(s.get('heat_rank_overall'))}, {int_or_null(s.get('heat_rank_district'))},
    {int_or_null(s.get('interview_posts'))}, {json_sql(s.get('top_interview_keywords', []))}::jsonb, {json_sql(s.get('interview_format_distribution', {}))}::jsonb,
    {int_or_null(s.get('avg_interview_duration'))}, {int_or_null(s.get('parent_interview_pct'))}, {int_or_null(s.get('interview_contributor_count', 0))},
    {json_sql(s.get('sentiment_distribution', {}))}::jsonb, {json_sql(s.get('positive_keywords', {}))}::jsonb, {json_sql(s.get('negative_keywords', {}))}::jsonb,
    {json_sql(s.get('fee_estimates', {}))}::jsonb, {json_sql(s.get('timeline_summary', {}))}::jsonb, {escape_sql(s.get('competition_level'))}, {escape_sql(s.get('data_year_range'))}
FROM schools s WHERE s.school_code = {escape_sql(code)}
ON CONFLICT (school_code) DO UPDATE SET
    total_posts = EXCLUDED.total_posts,
    total_engagement = EXCLUDED.total_engagement,
    heat_rank_overall = EXCLUDED.heat_rank_overall,
    heat_rank_district = EXCLUDED.heat_rank_district,
    interview_posts = EXCLUDED.interview_posts,
    top_interview_keywords = EXCLUDED.top_interview_keywords,
    interview_format_distribution = EXCLUDED.interview_format_distribution,
    avg_interview_duration = EXCLUDED.avg_interview_duration,
    parent_interview_pct = EXCLUDED.parent_interview_pct,
    interview_contributor_count = EXCLUDED.interview_contributor_count,
    sentiment_distribution = EXCLUDED.sentiment_distribution,
    positive_keywords = EXCLUDED.positive_keywords,
    negative_keywords = EXCLUDED.negative_keywords,
    fee_estimates = EXCLUDED.fee_estimates,
    timeline_summary = EXCLUDED.timeline_summary,
    competition_level = EXCLUDED.competition_level,
    data_year_range = EXCLUDED.data_year_range,
    last_updated = now();
""")

    return "\n".join(lines)


# ─── Main ────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Aggregate extracted data + generate SQL seed")
    parser.add_argument("--preview", action="store_true", help="Preview mode: show stats without generating SQL")
    args = parser.parse_args()

    # Load school info for district mapping
    schools = load_json(config.SCHOOLS_MERGED_PATH)
    school_by_code = {s["code"]: s for s in schools}
    school_district = {s["code"]: s.get("district", "unknown") for s in schools}

    # Collect all extracted data
    extracted_files = list(config.EXTRACTED_DIR.glob("*.json"))
    if not extracted_files:
        print("⚠️ No extracted data found in data/xhs/extracted/")
        print("   Run extract_structured_data.py first.")
        return

    print(f"Phase 5: Aggregation")
    print(f"  Extracted files: {len(extracted_files)}")

    # Aggregate each school
    all_summaries: list[dict] = []
    skipped = 0
    total_items = 0

    for fp in sorted(extracted_files):
        code = fp.stem
        data = load_json(fp)
        items = data.get("items", [])
        total_items += len(items)

        summary = aggregate_school_data(code, items)
        if summary is None:
            skipped += 1
            continue

        # Attach school info
        info = school_by_code.get(code, {})
        summary["name_tc"] = info.get("name_tc", "")
        summary["name_en"] = info.get("name_en", "")
        all_summaries.append(summary)

    print(f"  Schools with valid data: {len(all_summaries)}")
    print(f"  Schools skipped (no valid items): {skipped}")
    print(f"  Total extracted items processed: {total_items}")

    if not all_summaries:
        print("⚠️ No schools with valid data to aggregate.")
        return

    # Calculate rankings
    all_summaries = calculate_heat_rankings(all_summaries, school_district)

    # Stats
    with_interviews = sum(1 for s in all_summaries if s["interview_posts"] >= 3)
    with_fees = sum(1 for s in all_summaries if s["fee_estimates"])
    with_timeline = sum(1 for s in all_summaries if s["timeline_summary"])
    competition_dist = Counter(s["competition_level"] for s in all_summaries)

    print(f"\n  📊 Aggregation Stats:")
    print(f"    Schools with 3+ interview posts: {with_interviews}")
    print(f"    Schools with fee estimates: {with_fees}")
    print(f"    Schools with timeline data: {with_timeline}")
    print(f"    Competition: high={competition_dist['high']}, "
          f"medium={competition_dist['medium']}, low={competition_dist['low']}")

    # Top 10 by heat
    print(f"\n  🔥 Top 10 by engagement:")
    for s in all_summaries[:10]:
        print(f"    #{s['heat_rank_overall']} {s['name_tc']} — "
              f"posts={s['total_posts']}, engagement={s['total_engagement']}")

    if args.preview:
        print(f"\n  [PREVIEW MODE] Not generating SQL. Run without --preview to generate.")
        return

    # Save social_summary.json
    config.XHS_DIR.mkdir(parents=True, exist_ok=True)
    save_json(all_summaries, config.SOCIAL_SUMMARY_PATH)
    print(f"\n  💾 Saved: {config.SOCIAL_SUMMARY_PATH}")

    # Generate seed SQL
    sql = generate_seed_sql(all_summaries)
    seed_path = config.ROOT / "supabase" / "seed" / "010_social_intel.sql"
    seed_path.parent.mkdir(parents=True, exist_ok=True)
    seed_path.write_text(sql, encoding="utf-8")
    print(f"  💾 Saved: {seed_path}")
    print(f"\n✅ Aggregation complete!")
    print(f"   {len(all_summaries)} schools in social_summary")
    print(f"   SQL seed ready at {seed_path}")


if __name__ == "__main__":
    main()
