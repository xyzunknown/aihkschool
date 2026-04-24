#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    report: { type: "string", default: "docs/school-website-report.proxy-wave-2.json" },
    output: { type: "string", default: "docs/unresolved-school-websites.classified.json" },
  },
});

const report = JSON.parse(readFileSync(values.report, "utf8"));
const unresolved = (report.details || []).filter((detail) => !["ok", "unchanged"].includes(detail.status));

function notesText(detail) {
  return [...(detail.notes || []), detail.error || ""].join(" ").toLowerCase();
}

function categoryFor(detail) {
  const text = notesText(detail);

  if (detail.status === "robots_blocked" || /robots|blocked|403|anti-bot|challenge|cloudflare/.test(text)) {
    return {
      bucket: "blocked_current_runtime",
      action: "Mark current conditions unavailable and stop generic retries until access conditions change.",
    };
  }

  if (/normalized_url=|canonical|protocol|redirect|https:\/\//.test(text) && detail.website !== detail.crawl_url) {
    return {
      bucket: "stale_url_candidate",
      action: "Confirm the newer canonical address, update the school master URL, then rerun verification.",
    };
  }

  if (detail.status === "content_insufficient") {
    return {
      bucket: "content_insufficient",
      action: "Stop repeated generic crawls; keep on the manual supplement candidate list.",
    };
  }

  if (!detail.website || /no website|not found|nxdomain|enotfound|expired|unreachable/.test(text)) {
    return {
      bucket: "no_stable_website_or_unreachable",
      action: "Allow blank or unchanged official website if no stable replacement is confirmed; keep the reason.",
    };
  }

  return {
    bucket: "blocked_current_runtime",
    action: "Mark current conditions unavailable and stop generic retries until stronger evidence appears.",
  };
}

const details = unresolved.map((detail) => {
  const category = categoryFor(detail);
  return {
    school_id: detail.school_id,
    name_tc: detail.name_tc,
    name_en: detail.name_en,
    website: detail.website || null,
    crawl_url: detail.crawl_url || null,
    status: detail.status,
    bucket: category.bucket,
    action: category.action,
    reason: [...(detail.notes || []), detail.error].filter(Boolean).join(" | "),
  };
});

const summary = details.reduce((acc, detail) => {
  acc[detail.bucket] = (acc[detail.bucket] || 0) + 1;
  return acc;
}, {});

const output = {
  generated_at: new Date().toISOString(),
  source_report: values.report,
  total_unresolved: details.length,
  summary,
  details,
};

writeFileSync(values.output, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ total_unresolved: output.total_unresolved, summary: output.summary }, null, 2));
