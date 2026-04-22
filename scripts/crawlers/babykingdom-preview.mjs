#!/usr/bin/env node
/**
 * Baby-Kingdom preview crawler (preview only)
 *
 * Only stores: title + 200-char preview + link. No full text storage.
 * This complies with the platform TOS — preview only, no full content scraping.
 *
 * Pipeline:
 *   1. Fetch Baby-Kingdom forum listing pages for kindergarten-related threads
 *   2. Extract thread title + 200-char preview + link
 *   3. matchSchoolFromText on title → only insert if matched
 *   4. Upsert into social_posts_raw (raw_text is preview only)
 *
 * Usage:
 *   node scripts/crawlers/babykingdom-preview.mjs [--dry-run] [--limit N] [--pages N] [--concurrency N]
 *
 * Env vars (non-dry-run):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Auto-load .env.local
const envPath = resolve(process.cwd(), ".env.local");
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

import { createClient } from "@supabase/supabase-js";
import { parseArgs } from "node:util";
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import robotsParser from "robots-parser";

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "100" },
    pages: { type: "string", default: "5" },
    concurrency: { type: "string", default: "2" },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 100;
const PAGES = parseInt(args.pages, 10) || 5;
const CONCURRENCY = Math.max(1, parseInt(args.concurrency, 10) || 2);

const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
const FETCH_TIMEOUT = 10000;
const BASE_URL = "https://www.baby-kingdom.com";
const MAX_PREVIEW = 200;

// Kindergarten-related forum IDs / paths
const FORUM_PATHS = [
  "/forum/forum-175-1.html", // 幼校討論
  "/forum/forum-6-1.html",   // 幼稚園及幼兒園一覽
];

// ─── Rate limiter ─────────────────────────────────────────────────────────

let lastRequestTime = 0;
let requestQueue = Promise.resolve();

async function acquireRequestSlot() {
  let release = () => {};
  const next = new Promise((resolve) => {
    release = resolve;
  });
  const previous = requestQueue;
  requestQueue = next;

  await previous;

  const wait = Math.max(0, 3000 - (Date.now() - lastRequestTime));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestTime = Date.now();
  release();
}

async function rateLimitedFetch(url) {
  await acquireRequestSlot();

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
      },
      signal: ctrl.signal,
      redirect: "follow",
    });
    if (!resp.ok) return null;
    return await resp.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ─── robots.txt check ─────────────────────────────────────────────────────

let robotsChecker = null;

async function checkRobots() {
  if (robotsChecker !== undefined && robotsChecker !== null) return robotsChecker;
  try {
    const resp = await fetch(`${BASE_URL}/robots.txt`, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(5000),
    });
    const text = resp.ok ? await resp.text() : "";
    robotsChecker = robotsParser(`${BASE_URL}/robots.txt`, text);
  } catch {
    robotsChecker = null;
  }
  return robotsChecker;
}

async function isAllowed(url) {
  const robots = await checkRobots();
  if (!robots) return true;
  return robots.isAllowed(url, UA) !== false;
}

// ─── PII sanitization ────────────────────────────────────────────────────

function sanitizePII(text) {
  return text
    .replace(/\d{4}\s?\d{4}/g, "[電話]")
    .replace(/[A-Za-z\u4e00-\u9fff]+(路|街|道|大廈|花園|村)\d*[號樓室層]/g, "[地址]")
    .replace(/[\w.]+@[\w.]+\.\w+/g, "[email]");
}

// ─── Parse forum listing ─────────────────────────────────────────────────

function parseForumListing(html) {
  const $ = cheerio.load(html);
  const threads = [];

  // Baby-Kingdom uses Discuz-style forum markup
  $("a.s.xst, a[onclick], th a[href*='thread-']").each((_, el) => {
    const $el = $(el);
    const title = $el.text().trim();
    const href = $el.attr("href") || "";

    if (!title || title.length < 5) return;

    let fullUrl = href;
    if (href.startsWith("/")) {
      fullUrl = `${BASE_URL}${href}`;
    } else if (!href.startsWith("http")) {
      fullUrl = `${BASE_URL}/${href}`;
    }

    if (!fullUrl.includes("thread-") && !fullUrl.includes("viewthread")) return;

    threads.push({ title, url: fullUrl });
  });

  return threads;
}

// ─── Fetch thread preview ─────────────────────────────────────────────────

async function fetchThreadPreview(threadUrl) {
  if (!(await isAllowed(threadUrl))) return null;
  const html = await rateLimitedFetch(threadUrl);
  if (!html) return null;

  const $ = cheerio.load(html);
  $("script, style, noscript, nav, footer, .ad").remove();

  // Get first post content (preview only — 200 chars)
  const firstPost = $(".t_f, .postcontent, .message, td.t_f").first().text()
    .replace(/\s+/g, " ").trim();

  const preview = firstPost.slice(0, MAX_PREVIEW);

  // Try to get post date
  const dateStr = $("em[id^='authorposton'], .authi em, .postinfo .date").first().text().trim();

  return {
    preview: sanitizePII(preview),
    posted_at: dateStr || null,
  };
}

// ─── School matching (inline) ─────────────────────────────────────────────

async function loadSchoolNames(supabase) {
  const { data } = await supabase
    .from("schools")
    .select("id, name_tc, name_en")
    .eq("is_active", true);
  return data || [];
}

async function loadAliases(supabase) {
  const { data } = await supabase
    .from("school_aliases")
    .select("school_id, alias, confidence");
  return data || [];
}

function matchSchools(text, schools, aliases) {
  const results = [];
  const seen = new Set();
  const lower = text.toLowerCase();

  for (const s of schools) {
    if (seen.has(s.id)) continue;
    if (
      (s.name_tc && text.includes(s.name_tc)) ||
      (s.name_en && lower.includes(s.name_en.toLowerCase()))
    ) {
      results.push({ school_id: s.id, confidence: "high" });
      seen.add(s.id);
    }
  }

  for (const a of aliases) {
    if (seen.has(a.school_id)) continue;
    if (text.includes(a.alias)) {
      results.push({
        school_id: a.school_id,
        confidence: a.confidence >= 0.9 ? "high" : a.confidence >= 0.7 ? "medium" : "low",
      });
      seen.add(a.school_id);
    }
  }

  return results;
}

function hashAuthor(platform, author) {
  if (!author) return null;
  return createHash("sha256")
    .update(`${platform}:${author}`)
    .digest("hex")
    .slice(0, 16);
}

async function mapWithConcurrency(items, worker, concurrency) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function runWorker() {
    while (currentIndex < items.length) {
      const index = currentIndex;
      currentIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker()),
  );

  return results;
}

// ─── DB ───────────────────────────────────────────────────────────────────

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `[babykingdom] starting — dry-run=${DRY_RUN} limit=${LIMIT} pages=${PAGES} concurrency=${CONCURRENCY}`,
  );

  // Step 1: Collect thread links from listing pages
  const allThreads = [];

  for (const forumPath of FORUM_PATHS) {
    for (let page = 1; page <= PAGES; page++) {
      const pageUrl = forumPath.replace("-1.html", `-${page}.html`);
      const fullUrl = `${BASE_URL}${pageUrl}`;

      if (!(await isAllowed(fullUrl))) {
        console.log(`[babykingdom] robots disallowed: ${fullUrl}`);
        continue;
      }

      console.log(`[babykingdom] fetching listing: ${fullUrl}`);
      const html = await rateLimitedFetch(fullUrl);
      if (!html) continue;

      const threads = parseForumListing(html);
      allThreads.push(...threads);
      console.log(`[babykingdom]   found ${threads.length} threads`);

      if (allThreads.length >= LIMIT * 2) break; // enough candidates
    }
    if (allThreads.length >= LIMIT * 2) break;
  }

  // Deduplicate by URL
  const uniqueThreads = Array.from(
    new Map(allThreads.map((t) => [t.url, t])).values()
  ).slice(0, LIMIT * 2);

  console.log(`[babykingdom] unique threads: ${uniqueThreads.length}`);

  // Step 2: Match to schools
  let supabase = null;
  let schools = [];
  let aliases = [];

  if (!DRY_RUN || process.env.NEXT_PUBLIC_SUPABASE_URL) {
    supabase = getSupabase();
    schools = await loadSchoolNames(supabase);
    aliases = await loadAliases(supabase);
    console.log(`[babykingdom] loaded ${schools.length} schools, ${aliases.length} aliases`);
  }

  const matchedThreads = uniqueThreads
    .map((thread) => ({
      thread,
      titleMatches: matchSchools(thread.title, schools, aliases),
    }))
    .filter(({ titleMatches }) => titleMatches.length > 0)
    .slice(0, LIMIT);

  const postsToInsert = (await mapWithConcurrency(
    matchedThreads,
    async ({ thread, titleMatches }) => {
      console.log(`[babykingdom] fetching preview: ${thread.title.slice(0, 40)}...`);
      const preview = await fetchThreadPreview(thread.url);
      const externalId = createHash("sha256").update(thread.url).digest("hex").slice(0, 24);

      return {
        platform: "babykingdom",
        external_id: externalId,
        url: thread.url,
        author_hash: null,
        posted_at: preview?.posted_at || null,
        raw_text: sanitizePII(`${thread.title}\n\n${preview?.preview || ""}`),
        raw_metadata: {
          title: thread.title,
          is_preview: true,
          preview_length: preview?.preview?.length || 0,
        },
        school_matches: titleMatches,
        sentiment: null,
        topics: [],
        fetched_at: new Date().toISOString(),
      };
    },
    CONCURRENCY,
  )).filter(Boolean);

  console.log(`[babykingdom] matched ${postsToInsert.length} threads to schools`);

  if (DRY_RUN) {
    console.log(`[babykingdom] dry-run sample (first 3):`);
    console.log(JSON.stringify(postsToInsert.slice(0, 3), null, 2));
    return;
  }

  if (!supabase || postsToInsert.length === 0) {
    console.log(`[babykingdom] nothing to insert`);
    return;
  }

  // Upsert in chunks
  const CHUNK = 50;
  let inserted = 0;
  for (let i = 0; i < postsToInsert.length; i += CHUNK) {
    const slice = postsToInsert.slice(i, i + CHUNK);
    const { error } = await supabase
      .from("social_posts_raw")
      .upsert(slice, { onConflict: "platform,external_id" });

    if (error) {
      console.error(`[babykingdom] chunk ${i} failed:`, error.message);
    } else {
      inserted += slice.length;
    }
  }

  console.log(`[babykingdom] done — upserted=${inserted}/${postsToInsert.length}`);
}

main().catch((err) => {
  console.error("[babykingdom] fatal:", err);
  process.exit(1);
});
