#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const effectivePath = resolve(root, "data/xhs/internal_priority_school_effective65.json");
const openDayReviewPath = resolve(root, "data/xhs/internal_priority_school_open_day_review.json");
const outputPath = resolve(root, "data/xhs/internal_priority_school_frontend65.json");

const effective = JSON.parse(readFileSync(effectivePath, "utf-8"));
const openDayReview = JSON.parse(readFileSync(openDayReviewPath, "utf-8"));

const reviewedByCode = new Map(
  (openDayReview.review_rows || []).map((row) => [row.school_code, row.manual_review])
);

function normalizeSignalTier(reviewStatus, hasDate, hasDetails) {
  if (reviewStatus === "validated_open_day") return "validated_open_day";
  if (reviewStatus === "open_day_cta_no_schedule") return "pending_open_day";
  if (reviewStatus === "activity_signal_only") return "activity_signal";
  if (reviewStatus === "raw_unreviewed") {
    return hasDate ? "pending_open_day" : hasDetails ? "activity_signal" : null;
  }
  return null;
}

const rows = (effective.all_effective || []).map((row) => {
  const review = reviewedByCode.get(row.school_code) || null;
  const hasRawOpenDay = Boolean(row.open_day_date || row.open_day_details || review?.display_date || review?.display_details);
  const isRejectedOpenDay = review
    ? ["weak_signal_false_positive", "historical_false_positive", "rejected_not_open_day"].includes(review.review_status)
    : false;
  const showOpenDay = hasRawOpenDay && !isRejectedOpenDay;
  const displayOpenDayDate = showOpenDay ? review?.display_date || row.open_day_date : null;
  const displayOpenDayDetails = showOpenDay ? review?.display_details || row.open_day_details : null;
  const reviewStatus = review?.review_status || (showOpenDay ? "raw_unreviewed" : null);
  const signalTier = showOpenDay
    ? normalizeSignalTier(reviewStatus, Boolean(displayOpenDayDate), Boolean(displayOpenDayDetails))
    : null;
  const applicationSummary = row.application_process
    ? row.application_process.replace(/\s+/g, " ").trim().slice(0, 220)
    : null;

  return {
    school_code: row.school_code,
    rank: row.rank,
    name_tc: row.name_tc,
    name_en: row.name_en,
    website: row.website,
    school_type: row.school_type,
    application_url: row.application_url,
    application_process_summary: applicationSummary,
    open_day_date: displayOpenDayDate,
    open_day_details: displayOpenDayDetails,
    has_application_signal: Boolean(row.application_url || row.application_process),
    has_open_day_signal: Boolean(showOpenDay && signalTier),
    has_validated_open_day: Boolean(
      review?.review_status === "validated_open_day" && showOpenDay
    ),
    open_day_review_status: reviewStatus,
    open_day_signal_tier: signalTier,
    scrape_confidence: row.scrape_confidence,
    queue_sources: row.queue_sources,
  };
});

const payload = {
  generated_at: new Date().toISOString(),
  source_file: "data/xhs/internal_priority_school_effective65.json",
  total_rows: rows.length,
  raw_open_day_rows: rows.filter((row) => row.has_open_day_signal).length,
  validated_open_day_rows: rows.filter((row) => row.has_validated_open_day).length,
  rows,
};

writeFileSync(outputPath, JSON.stringify(payload, null, 2));
console.log(
  JSON.stringify(
    {
      total_rows: payload.total_rows,
      raw_open_day_rows: payload.raw_open_day_rows,
      validated_open_day_rows: payload.validated_open_day_rows,
    },
    null,
    2
  )
);