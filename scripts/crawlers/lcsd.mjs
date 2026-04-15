#!/usr/bin/env node
/**
 * LCSD (康樂及文化事務署) activities scraper
 *
 * Scrapes children/early-childhood programmes from the LCSD programmes portal.
 * Output: tmp/raw_activities.json — an array of { source, source_url, raw_text }
 * that downstream extract.mjs feeds to Claude for structured extraction.
 *
 * Usage:
 *   node scripts/crawlers/lcsd.mjs [--limit N] [--output path]
 *
 * Dependencies: playwright
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    limit: { type: "string", default: "50" },
    output: { type: "string", default: "tmp/raw_activities.json" },
    headless: { type: "string", default: "true" },
  },
});

const LIMIT = parseInt(args.limit, 10);
const OUTPUT = resolve(process.cwd(), args.output);
const HEADLESS = args.headless !== "false";

// LCSD programme search (Traditional Chinese portal)
// We use the public listing page; queries narrow by age group + district.
const LCSD_LISTING_URL =
  "https://www.lcsd.gov.hk/clpss/tc/webApp/Programme/ProgList.do";

async function main() {
  console.log(`[lcsd] starting — limit=${LIMIT} output=${OUTPUT}`);
  const browser = await chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
    locale: "zh-HK",
  });
  const page = await context.newPage();

  const records = [];

  try {
    await page.goto(LCSD_LISTING_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // LCSD uses a form-driven listing. We rely on the "view all" behaviour
    // by clicking 「搜尋」without restricting the query — we'll filter age
    // downstream in extract.mjs via Claude (more resilient to HTML changes).
    //
    // Fallback: collect every programme card-like element on the page.
    const items = await page.$$eval("table tr, .prog-item, .programme-row", (rows) =>
      rows
        .map((row) => {
          const text = (row.textContent || "").replace(/\s+/g, " ").trim();
          const link = row.querySelector("a[href]");
          const href = link ? link.getAttribute("href") : null;
          return { text, href };
        })
        .filter((r) => r.text.length > 20),
    );

    console.log(`[lcsd] found ${items.length} candidate rows`);

    for (const item of items.slice(0, LIMIT)) {
      records.push({
        source: "lcsd",
        source_url: item.href
          ? new URL(item.href, LCSD_LISTING_URL).toString()
          : LCSD_LISTING_URL,
        raw_text: item.text,
        scraped_at: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("[lcsd] scrape error:", err.message);
  } finally {
    await browser.close();
  }

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, JSON.stringify(records, null, 2), "utf8");
  console.log(`[lcsd] wrote ${records.length} records → ${OUTPUT}`);
}

main().catch((err) => {
  console.error("[lcsd] fatal:", err);
  process.exit(1);
});
