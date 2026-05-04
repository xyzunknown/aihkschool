#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(process.cwd());
const queuePath = resolve(root, "data/xhs/internal_priority_school_retry_queue.json");
const outputReport = resolve(root, "docs/school-website-report.priority-top100-retry-round2-2026-05-04.json");
const summaryPath = resolve(root, "data/xhs/internal_priority_school_retry_round2_summary.json");

const queue = JSON.parse(readFileSync(queuePath, "utf-8"));
const retryableRows = (queue.rows || []).filter((row) => row.retry_strategy !== "respect_robots_manual_only");
const retryCodes = retryableRows.map((row) => row.school_code);

if (retryCodes.length === 0) {
  console.log(JSON.stringify({ retried: 0, message: "no retryable rows" }, null, 2));
  process.exit(0);
}

const run = spawnSync(
  "node",
  [
    "scripts/crawlers/school-website.mjs",
    "--school-codes",
    retryCodes.join(","),
    "--concurrency",
    "1",
    "--json-report",
    outputReport,
  ],
  {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  }
);

if (run.status !== 0) {
  process.exit(run.status || 1);
}

const report = JSON.parse(readFileSync(outputReport, "utf-8"));
const summary = {
  generated_at: new Date().toISOString(),
  source_queue: "data/xhs/internal_priority_school_retry_queue.json",
  retried_targets: retryCodes.length,
  skipped_manual_only: (queue.rows || []).length - retryCodes.length,
  stats: report.stats,
};

writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));