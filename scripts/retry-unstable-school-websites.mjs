#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { parseArgs } from "node:util";
import { isUnstableRetryDomain } from "./crawlers/school-website-domain-policies.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const { values: args } = parseArgs({
  options: {
    report: { type: "string", default: "docs/school-website-report.latest.json" },
    concurrency: { type: "string", default: "1" },
    "json-report": { type: "string", default: "docs/school-website-retry-report.json" },
    "dry-run": { type: "boolean", default: false },
  },
});

const REPORT_PATH = resolve(projectRoot, args.report);
const RETRY_CONCURRENCY = Math.max(1, parseInt(args.concurrency, 10) || 1);
const JSON_REPORT = args["json-report"];
const DRY_RUN = args["dry-run"];

function spawnCrawler(schoolIds) {
  return new Promise((resolvePromise, rejectPromise) => {
    const cliArgs = [
      resolve(projectRoot, "scripts/crawlers/school-website.mjs"),
      "--school-ids",
      schoolIds.join(","),
      "--concurrency",
      String(RETRY_CONCURRENCY),
      "--json-report",
      JSON_REPORT,
    ];

    if (DRY_RUN) cliArgs.push("--dry-run");

    const child = spawn("node", cliArgs, {
      cwd: projectRoot,
      env: process.env,
      stdio: "inherit",
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }
      rejectPromise(new Error(`school-website retry exited with code ${code}`));
    });
    child.on("error", rejectPromise);
  });
}

async function main() {
  if (!existsSync(REPORT_PATH)) {
    console.log(`[retry-unstable] report not found, skipping: ${REPORT_PATH}`);
    return;
  }

  const report = JSON.parse(readFileSync(REPORT_PATH, "utf-8"));
  const candidates = (report.details || []).filter((detail) => {
    if (detail.status !== "unreachable") return false;
    return isUnstableRetryDomain(detail.crawl_url || detail.website);
  });

  const schoolIds = [...new Set(candidates.map((detail) => detail.school_id).filter(Boolean))];
  const domains = [...new Set(candidates.map((detail) => {
    try {
      return new URL(detail.crawl_url || detail.website).host;
    } catch {
      return null;
    }
  }).filter(Boolean))];

  if (schoolIds.length === 0) {
    console.log("[retry-unstable] no unstable-domain schools to retry");
    return;
  }

  console.log(
    `[retry-unstable] retrying ${schoolIds.length} schools across ${domains.length} unstable domains at concurrency=${RETRY_CONCURRENCY}`
  );
  console.log(`[retry-unstable] domains: ${domains.join(", ")}`);
  await spawnCrawler(schoolIds);
}

main().catch((error) => {
  console.error("[retry-unstable] fatal:", error);
  process.exit(1);
});