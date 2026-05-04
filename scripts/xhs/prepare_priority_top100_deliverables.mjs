#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const resultsPath = resolve(root, "data/xhs/internal_priority_school_top100_results.json");
const queuePath = resolve(root, "data/xhs/internal_priority_school_top100.json");

const results = JSON.parse(readFileSync(resultsPath, "utf-8"));
const queue = JSON.parse(readFileSync(queuePath, "utf-8"));

const openDayManualReview = {
  "613681": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "2026-04-20 来自 PN 申请结果公布窗口，不是开放日。",
    recommended_action: "保留招生流程，不展示为开放日。",
  },
  "618039": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Victoria admissions page展示的是申请时段，2025-12-15 为 PN 申请截止，不是开放日。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "566900": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Victoria admissions page展示的是申请时段，2025-12-15 为 PN 申请截止，不是开放日。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "574708": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Victoria admissions page展示的是申请时段，2025-12-15 为 PN 申请截止，不是开放日。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "609528": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "2026-04-20 来自 PN 申请结果公布窗口，不是开放日。",
    recommended_action: "保留招生流程，不展示为开放日。",
  },
  "159131": {
    review_status: "activity_signal_only",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "抓到的是 K2 参观香港文化博物馆活动花絮，不是招生开放日。",
    recommended_action: "可作为活动线索展示，不计入开放日命中。",
  },
  "325970": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "官网最新消息中的 2025-09-01 是插班申请新闻日期，不是开放日。",
    recommended_action: "保留招生入口，不展示为开放日。",
  },
  "157376": {
    review_status: "weak_signal_false_positive",
    confidence: "low",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "保良局统一网申页未见开放日信息，2026-04-13 缺少开放日证据支撑。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "216054": {
    review_status: "activity_signal_only",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "内容是探索学校、亲子活动与参观活动聚合，不是明确开放日公告。",
    recommended_action: "仅作为活动线索展示。",
  },
  "325821": {
    review_status: "weak_signal_false_positive",
    confidence: "low",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "收生页可见 2026/2027 招收新生流程，但未见与 2026-05-05 对应的开放日公告。",
    recommended_action: "保留招生入口，不展示为开放日。",
  },
  "537098": {
    review_status: "validated_open_day",
    confidence: "high",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "官网内容明确写明 2025-09-27 举行学校开放日，且附带完整说明。",
    recommended_action: "可作为已核验开放日直接展示。",
  },
  "537578": {
    review_status: "open_day_cta_no_schedule",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "站点存在『开放日 School open days』入口与『参加开放日』CTA，但当前未抓到具体日期。",
    recommended_action: "以前端待核验开放日展示，后续继续抓具体场次。",
  },
  "158852": {
    review_status: "open_day_cta_no_schedule",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "站点存在『开放日 School open days』入口与『参加开放日』CTA，但当前未抓到具体日期。",
    recommended_action: "以前端待核验开放日展示，后续继续抓具体场次。",
  },
  "156930": {
    review_status: "historical_false_positive",
    confidence: "high",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "抓到的是旧版 application 图页，2017-10-07 属历史页面残留，不是当前开放日。",
    recommended_action: "移除开放日信号。",
  },
  "325864": {
    review_status: "open_day_cta_no_schedule",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "站点存在『开放日 School open days』入口与『参加开放日』CTA，但当前未抓到具体日期。",
    recommended_action: "以前端待核验开放日展示，后续继续抓具体场次。",
  },
  "572764": {
    review_status: "validated_open_day",
    confidence: "high",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Admissions FAQ 明确列出 2025-10-25 为 Open Day。",
    recommended_action: "可作为已核验开放日直接展示。",
    display_date: "2025-10-25",
    display_details: "Admissions FAQ 明确列出 Open Day: 2025-10-25",
  },
  "561207": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "2026-04-20 来自 PN 申请结果公布窗口，不是开放日。",
    recommended_action: "保留招生流程，不展示为开放日。",
  },
  "216194": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Victoria admissions page展示的是申请时段，2025-12-15 为 PN 申请截止，不是开放日。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "542164": {
    review_status: "weak_signal_false_positive",
    confidence: "medium",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Victoria admissions page展示的是申请时段，2025-12-15 为 PN 申请截止，不是开放日。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "569828": {
    review_status: "weak_signal_false_positive",
    confidence: "low",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "Victoria admissions page未见 2026-04-30 对应开放日公告，当前证据不足。",
    recommended_action: "保留申请入口，不展示为开放日。",
  },
  "526665": {
    review_status: "weak_signal_false_positive",
    confidence: "low",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "open_day_details 只有「立即查詢」，更像招生 CTA，不足以视为开放日证据。",
    recommended_action: "保留 application_url，移除开放日优先级，后续如需要可人工查新闻或活动页。",
  },
  "158119": {
    review_status: "weak_signal_false_positive",
    confidence: "low",
    reviewed_source: "crawler output + targeted webpage fetch",
    note: "open_day_date=2026-08-31 实际更像第二轮报名截止；open_day_details 来自活动花絮/户外活动文案，不是开放日公告。",
    recommended_action: "保留报名手續页面作为招生入口，不把这条算作真实开放日命中。",
  },
};

function compactSchool(row) {
  return {
    rank: row.rank,
    school_code: row.school_code,
    name_tc: row.db_name_tc || row.queue_name_tc,
    name_en: row.name_en,
    website: row.website,
    school_type: row.school_type,
    crawl_status: row.crawl_status,
    application_url: row.application_url,
    application_process: row.application_process,
    open_day_date: row.open_day_date,
    open_day_details: row.open_day_details,
    scrape_confidence: row.scrape_confidence,
    queue_sources: row.queue_sources,
    queue_reasons: row.queue_reasons,
  };
}

function summarizeRetry(row) {
  const notes = row.crawl_notes || [];
  let retryStrategy = "manual_review";
  if (row.crawl_status === "robots_blocked") {
    retryStrategy = "respect_robots_manual_only";
  } else if (notes.some((note) => note.includes("anti_bot_challenge"))) {
    retryStrategy = "browser_or_manual_capture";
  } else if (row.crawl_status === "content_insufficient") {
    retryStrategy = "adapter_or_manual_page_selection";
  }
  return {
    rank: row.rank,
    school_code: row.school_code,
    name_tc: row.db_name_tc || row.queue_name_tc,
    website: row.website,
    crawl_status: row.crawl_status,
    crawl_notes: notes,
    retry_strategy: retryStrategy,
  };
}

const rows = results.rows || [];
const usefulRows = rows.filter((row) => row.useful_extraction);
const retryRows = rows.filter((row) => ["unreachable", "robots_blocked", "content_insufficient"].includes(row.crawl_status));
const openDayRows = rows.filter((row) => row.open_day_date || row.open_day_details);
const reviewedOpenDayRows = openDayRows.map((row) => ({
  ...compactSchool(row),
  manual_review: openDayManualReview[row.school_code] || {
    review_status: "needs_manual_review",
    confidence: "unknown",
    reviewed_source: "crawler output only",
    note: "未做额外人工复核。",
    recommended_action: "人工打开招生或活动页面确认。",
  },
}));
const validatedOpenDayCount = reviewedOpenDayRows.filter(
  (row) => row.manual_review.review_status === "validated_open_day"
).length;
const pendingOpenDayCount = reviewedOpenDayRows.filter((row) =>
  ["open_day_cta_no_schedule", "needs_manual_review"].includes(row.manual_review.review_status)
).length;
const activitySignalCount = reviewedOpenDayRows.filter(
  (row) => row.manual_review.review_status === "activity_signal_only"
).length;
const rejectedOpenDayCount = reviewedOpenDayRows.filter((row) =>
  ["weak_signal_false_positive", "historical_false_positive", "rejected_not_open_day"].includes(
    row.manual_review.review_status
  )
).length;

const effectivePayload = {
  generated_at: new Date().toISOString(),
  source_file: "data/xhs/internal_priority_school_top100_results.json",
  total_effective: usefulRows.length,
  ready_for_admissions_followup: usefulRows.filter((row) => row.application_url).length,
  with_nonempty_process_text: usefulRows.filter((row) => row.application_process).length,
  top30: usefulRows.slice(0, 30).map(compactSchool),
  all_effective: usefulRows.map(compactSchool),
};

const retryPayload = {
  generated_at: new Date().toISOString(),
  source_file: "data/xhs/internal_priority_school_top100_results.json",
  total_retry_targets: retryRows.length,
  breakdown: {
    unreachable: retryRows.filter((row) => row.crawl_status === "unreachable").length,
    robots_blocked: retryRows.filter((row) => row.crawl_status === "robots_blocked").length,
    content_insufficient: retryRows.filter((row) => row.crawl_status === "content_insufficient").length,
  },
  rows: retryRows.map(summarizeRetry),
};

const openDayPayload = {
  generated_at: new Date().toISOString(),
  source_file: "data/xhs/internal_priority_school_top100_results.json",
  raw_signal_count: openDayRows.length,
  validated_open_day_count: validatedOpenDayCount,
  pending_open_day_count: pendingOpenDayCount,
  activity_signal_count: activitySignalCount,
  rejected_signal_count: rejectedOpenDayCount,
  review_rows: reviewedOpenDayRows,
};

const reportLines = [
  "# Priority Top100 Completion Report",
  "",
  `Generated at: ${new Date().toISOString()}`,
  "",
  "## Final Status",
  "",
  `- Target schools crawled: ${results.acceptance.total_targets}`,
  `- Effective extraction rows: ${results.acceptance.useful_extraction_rows}`,
  `- Retry / escalation rows: ${retryRows.length}`,
  `- Raw open-day signal rows: ${openDayRows.length}`,
  `- Validated open-day rows after manual review: ${validatedOpenDayCount}`,
  `- Pending open-day CTA rows: ${pendingOpenDayCount}`,
  `- Activity-only signal rows: ${activitySignalCount}`,
  `- Rejected false-positive rows: ${rejectedOpenDayCount}`,
  "",
  "## Acceptance",
  "",
  `- Full queue executed: ${results.acceptance.crawled_rows}/${results.acceptance.total_targets}`,
  `- Application signal rows: ${results.acceptance.application_signal_rows}`,
  `- Open-day signal rows before review: ${results.acceptance.open_day_signal_rows}`,
  `- Status breakdown: ok=${results.acceptance.status_breakdown.ok}, unchanged=${results.acceptance.status_breakdown.unchanged}, content_insufficient=${results.acceptance.status_breakdown.content_insufficient}, robots_blocked=${results.acceptance.status_breakdown.robots_blocked}, unreachable=${results.acceptance.status_breakdown.unreachable}`,
  "",
  "## Deliverables",
  "",
  "- data/xhs/internal_priority_school_effective65.json",
  "- data/xhs/internal_priority_school_retry_queue.json",
  "- data/xhs/internal_priority_school_open_day_review.json",
  "- data/xhs/internal_priority_school_frontend65.json",
  "",
  "## Open Day Review",
  "",
  `- 已复核前 20 条 raw signal，其中 validated=${validatedOpenDayCount}、pending CTA=${pendingOpenDayCount}、activity-only=${activitySignalCount}、rejected=${rejectedOpenDayCount}。`,
  "- 香港五常法幼稚園: 2025-09-27 明确为学校开放日，可作为已核验开放日。",
  "- 加州天地幼稚園: Admissions FAQ 明确列出 Open Day: 2025-10-25，可作为已核验开放日。",
  "- Learning Habitat 与 Victoria 多条信号实际来自申请结果/申请时段，已降级为 false positive。",
  "",
  "## Recommended Operational Use",
  "",
  "- 先用 `internal_priority_school_effective65.json` 作为官网招生信息可用池。",
  "- 用 `internal_priority_school_retry_queue.json` 作为二次攻坚池，其中 robots_blocked 只建议人工处理。",
  "- 前端把已核验开放日、待核验开放日、活动线索分层展示；false positive 不展示。",
  "- 如需对外做强口径宣传，只使用 validated_open_day。",
  "",
  "## Queue Provenance",
  "",
  `- Queue source rows: ${(queue.schools || []).length}`,
  `- Queue file: data/xhs/internal_priority_school_top100.json`,
  `- Crawl report: docs/school-website-report.priority-top100-2026-05-04.json`,
  `- Merged result: data/xhs/internal_priority_school_top100_results.json`,
];

writeFileSync(resolve(root, "data/xhs/internal_priority_school_effective65.json"), JSON.stringify(effectivePayload, null, 2));
writeFileSync(resolve(root, "data/xhs/internal_priority_school_retry_queue.json"), JSON.stringify(retryPayload, null, 2));
writeFileSync(resolve(root, "data/xhs/internal_priority_school_open_day_review.json"), JSON.stringify(openDayPayload, null, 2));
writeFileSync(resolve(root, "docs/priority-top100-completion-report.md"), reportLines.join("\n") + "\n");

console.log(JSON.stringify({
  effective: usefulRows.length,
  retry: retryRows.length,
  open_day_raw: openDayRows.length,
  open_day_validated: validatedOpenDayCount,
}, null, 2));