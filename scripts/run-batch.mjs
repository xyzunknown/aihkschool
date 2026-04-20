#!/usr/bin/env node
/**
 * Unified batch orchestrator
 *
 * Runs all data pipeline crawlers in the correct order with structured
 * reporting. Each crawler is spawned as a child process to avoid module
 * state conflicts.
 *
 * Order:
 *   1. Social posts ingest  (xhs-posts, bkmilk, babykingdom-preview)
 *   2. School website crawl  (school-website)
 *   3. Unstable-domain retry  (retry-website)
 *   4. Reputation aggregation (extract-reputation)
 *
 * Usage:
 *   node scripts/run-batch.mjs [--dry-run] [--skip STEP] [--only STEP]
 *
 * Steps: xhs, bkmilk, babykingdom, website, retry, reputation
 *
 * The script auto-loads .env.local and passes env to child processes.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { parseArgs } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Auto-load .env.local
const envPath = resolve(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

// ── CLI ──
const ALL_STEPS = ["xhs", "bkmilk", "babykingdom", "website", "retry", "reputation"];

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    skip: { type: "string", multiple: true, default: [] },
    only: { type: "string", multiple: true, default: [] },
  },
  strict: false,
});

const DRY_RUN = args["dry-run"];
const skipSet = new Set(args.skip || []);
const onlySet = new Set(args.only || []);

function shouldRun(step) {
  if (onlySet.size > 0) return onlySet.has(step);
  return !skipSet.has(step);
}

// ── Step definitions ──
const STEPS = [
  {
    name: "xhs",
    label: "XHS posts ingest",
    script: "scripts/crawlers/xhs-posts.mjs",
    extraArgs: [],
  },
  {
    name: "bkmilk",
    label: "BK Milk articles",
    script: "scripts/crawlers/bkmilk.mjs",
    extraArgs: [],
  },
  {
    name: "babykingdom",
    label: "Baby Kingdom previews",
    script: "scripts/crawlers/babykingdom-preview.mjs",
    extraArgs: [],
  },
  {
    name: "website",
    label: "School website crawl",
    script: "scripts/crawlers/school-website.mjs",
    extraArgs: ["--json-report", "docs/school-website-report.latest.json"],
  },
  {
    name: "retry",
    label: "Unstable-domain website retry",
    script: "scripts/retry-unstable-school-websites.mjs",
    extraArgs: ["--report", "docs/school-website-report.latest.json", "--concurrency", "1", "--json-report", "docs/school-website-retry-report.json"],
  },
  {
    name: "reputation",
    label: "Reputation aggregation",
    script: "scripts/crawlers/extract-reputation.mjs",
    extraArgs: [],
  },
];

// ── Run a single step as child process ──
function runStep(step) {
  return new Promise((resolve) => {
    const args = [...step.extraArgs];
    if (DRY_RUN) args.push("--dry-run");

    const scriptPath = `${projectRoot}/${step.script}`;
    console.log(`\n${"─".repeat(60)}`);
    console.log(`▶ [${step.name}] ${step.label}`);
    console.log(`  cmd: node ${step.script} ${args.join(" ")}`);
    console.log(`${"─".repeat(60)}`);

    const startTime = Date.now();

    const child = spawn("node", [scriptPath, ...args], {
      cwd: projectRoot,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      const text = data.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (data) => {
      const text = data.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on("close", (code) => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      resolve({
        step: step.name,
        label: step.label,
        exitCode: code,
        elapsed: `${elapsed}s`,
        stdout,
        stderr,
      });
    });

    child.on("error", (err) => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      resolve({
        step: step.name,
        label: step.label,
        exitCode: -1,
        elapsed: `${elapsed}s`,
        stdout,
        stderr: stderr + "\n" + err.message,
      });
    });
  });
}

// ── Parse stats from crawler stdout ──
function extractStats(stdout) {
  // Try to find JSON stats block (crawlers log JSON with stats)
  const jsonMatches = stdout.match(/\{[\s\S]*?"total"\s*:/g);
  if (jsonMatches) {
    // Take the last JSON-like block
    const lastMatch = jsonMatches[jsonMatches.length - 1];
    const startIdx = stdout.lastIndexOf(lastMatch);
    // Find the closing brace
    let depth = 0;
    for (let i = startIdx; i < stdout.length; i++) {
      if (stdout[i] === "{") depth++;
      if (stdout[i] === "}") depth--;
      if (depth === 0) {
        try {
          return JSON.parse(stdout.slice(startIdx, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

// ── Main ──
async function main() {
  const batchStart = Date.now();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║           HKSchoolPlace — Batch Data Pipeline             ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log(`  dry-run: ${DRY_RUN}`);
  console.log(`  steps:   ${ALL_STEPS.filter(shouldRun).join(", ") || "(none)"}`);
  console.log(`  skipped: ${ALL_STEPS.filter((s) => !shouldRun(s)).join(", ") || "(none)"}`);
  console.log(`  started: ${new Date().toISOString()}`);

  const results = [];

  for (const step of STEPS) {
    if (!shouldRun(step.name)) {
      results.push({
        step: step.name,
        label: step.label,
        exitCode: null,
        elapsed: "—",
        skipped: true,
      });
      continue;
    }
    const result = await runStep(step);
    result.stats = extractStats(result.stdout);
    results.push(result);

    // If a step fails, log but continue
    if (result.exitCode !== 0) {
      console.error(`\n⚠ [${step.name}] exited with code ${result.exitCode}`);
    }
  }

  const totalElapsed = ((Date.now() - batchStart) / 1000).toFixed(1);

  // ── Summary report ──
  console.log(`\n\n${"═".repeat(60)}`);
  console.log("  BATCH SUMMARY REPORT");
  console.log(`${"═".repeat(60)}`);
  console.log(`  Total elapsed: ${totalElapsed}s`);
  console.log(`  Completed at:  ${new Date().toISOString()}\n`);

  console.log("  Step results:");
  for (const r of results) {
    if (r.skipped) {
      console.log(`    ${r.step.padEnd(15)} ⏭ skipped`);
    } else if (r.exitCode === 0) {
      console.log(`    ${r.step.padEnd(15)} ✓ ok (${r.elapsed})`);
    } else {
      console.log(`    ${r.step.padEnd(15)} ✗ exit=${r.exitCode} (${r.elapsed})`);
    }
  }

  // ── Per-step stats ──
  const stepsWithStats = results.filter((r) => r.stats);
  if (stepsWithStats.length > 0) {
    console.log(`\n  Detailed stats:`);
    for (const r of stepsWithStats) {
      console.log(`\n    [${r.step}]:`);
      for (const [key, val] of Object.entries(r.stats)) {
        console.log(`      ${key}: ${val}`);
      }
    }
  }

  console.log(`\n${"═".repeat(60)}\n`);

  // Exit with error if any step failed
  const failed = results.filter((r) => !r.skipped && r.exitCode !== 0);
  if (failed.length > 0) {
    console.error(`${failed.length} step(s) failed: ${failed.map((r) => r.step).join(", ")}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[run-batch] fatal:", err);
  process.exit(1);
});
