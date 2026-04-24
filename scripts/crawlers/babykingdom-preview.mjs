#!/usr/bin/env node
/**
 * Baby-Kingdom preview crawler (preview only)
 *
 * Only stores: title + 200-char preview + link. No full text storage.
 * This complies with the platform TOS — preview only, no full content scraping.
 *
 * Pipeline:
 *   1. Read Baby-Kingdom public thread sitemaps (robots-allowed)
 *   2. Fetch recent thread pages and extract title + 200-char preview
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
const BASE_URL = "https://www.edu-kingdom.com";
const MAX_PREVIEW = 200;
const CHANNEL_URL = `${BASE_URL}/channel/%E5%B9%BC%E5%85%92%E6%95%99%E8%82%B2`;
const TARGET_FORUM_IDS = new Set(["6", "368"]);
const MAX_FORUM_CANDIDATES = 150;
const MAX_THREADS_PER_FORUM_PAGE = 40;

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

function parseXmlLocs(xml) {
  const $ = cheerio.load(xml, { xmlMode: true });
  return $("loc")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);
}

function parseForumUrlsFromChannel(html) {
  const $ = cheerio.load(html);
  const forumUrls = $("a[href*='forum.php?mod=forumdisplay']")
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter(Boolean)
    .map((url) => new URL(url.replace(/&amp;/g, "&"), `${BASE_URL}/`).toString());

  const unique = [];
  for (const forumUrl of forumUrls) {
    const fid = new URL(forumUrl).searchParams.get("fid");
    if (!fid || !TARGET_FORUM_IDS.has(fid)) continue;
    if (!unique.includes(forumUrl)) unique.push(forumUrl);
  }

  return unique;
}

async function fetchThreadUrlsFromForums(maxPages) {
  if (!(await isAllowed(CHANNEL_URL))) {
    throw new Error(`robots disallowed channel page: ${CHANNEL_URL}`);
  }

  const channelHtml = await rateLimitedFetch(CHANNEL_URL);
  if (!channelHtml) {
    throw new Error("failed to fetch Edu-Kingdom channel page");
  }

  const forumUrls = parseForumUrlsFromChannel(channelHtml);
  if (forumUrls.length === 0) {
    throw new Error("failed to find Edu-Kingdom forumdisplay URLs from channel page");
  }

  const threadUrls = [];

  for (const forumUrl of forumUrls) {
    for (let page = 1; page <= maxPages; page += 1) {
      const pagedUrl = page === 1 ? forumUrl : `${forumUrl}&page=${page}`;
      if (!(await isAllowed(pagedUrl))) {
        console.log(`[babykingdom] robots disallowed forum page: ${pagedUrl}`);
        continue;
      }

      console.log(`[babykingdom] fetching forum page: ${pagedUrl}`);
      const forumHtml = await rateLimitedFetch(pagedUrl);
      if (!forumHtml) continue;

      const $ = cheerio.load(forumHtml);
      const urls = $("a.xst, a[href*='forum.php?mod=viewthread']")
        .map((_, el) => $(el).attr("href"))
        .get()
        .filter((url) => url && url.includes("mod=viewthread") && !url.includes("tid=0"))
        .map((url) => new URL(url.replace(/&amp;/g, "&"), `${BASE_URL}/`).toString())
        .slice(0, MAX_THREADS_PER_FORUM_PAGE);

      threadUrls.push(...urls);
    }
  }

  return Array.from(new Set(threadUrls)).slice(0, MAX_FORUM_CANDIDATES);
}

async function fetchThreadData(threadUrl) {
  if (!(await isAllowed(threadUrl))) return null;
  const html = await rateLimitedFetch(threadUrl);
  if (!html) return null;

  const $ = cheerio.load(html);
  $("script, style, noscript, nav, footer, .ad").remove();

  const title = (
    $("#thread_subject, h1#thread_subject, h1.ph").first().text().trim() ||
    $("title").text().trim().replace(/\s+-\s+[^-]+?\s+[－-]\s+教育王國.*$/u, "")
  ).replace(/\s+/g, " ");

  if (!title || title.length < 5) return null;

  // Get first post content (preview only — 200 chars)
  const firstPost = $(".t_f, .postcontent, .message, td.t_f").first().text()
    .replace(/\s+/g, " ").trim();

  const preview = firstPost.slice(0, MAX_PREVIEW);

  // Try to get post date
  const dateStr = $("em[id^='authorposton'], .authi em, .postinfo .date").first().text().trim();

  return {
    title,
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

function mergeMatches(...groups) {
  const rank = { high: 3, medium: 2, low: 1 };
  const merged = new Map();

  for (const group of groups) {
    for (const match of group) {
      const existing = merged.get(match.school_id);
      if (!existing || rank[match.confidence] > rank[existing.confidence]) {
        merged.set(match.school_id, match);
      }
    }
  }

  return Array.from(merged.values());
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

  const threadUrls = await fetchThreadUrlsFromForums(PAGES);
  console.log(`[babykingdom] forum thread candidates: ${threadUrls.length}`);

  const postsToInsert = [];
  for (const threadUrl of threadUrls) {
    if (postsToInsert.length >= LIMIT) break;

    const threadData = await fetchThreadData(threadUrl);
    if (!threadData?.title) continue;

    const titleMatches = matchSchools(threadData.title, schools, aliases);
    const previewMatches = threadData.preview
      ? matchSchools(`${threadData.title}\n${threadData.preview}`, schools, aliases)
      : [];
    const schoolMatches = mergeMatches(titleMatches, previewMatches);
    if (schoolMatches.length === 0) continue;

    console.log(`[babykingdom] matched thread: ${threadData.title.slice(0, 60)}...`);
    const externalId = createHash("sha256").update(threadUrl).digest("hex").slice(0, 24);

    postsToInsert.push({
      platform: "babykingdom",
      external_id: externalId,
      url: threadUrl,
      author_hash: null,
      posted_at: threadData.posted_at || null,
      raw_text: sanitizePII(`${threadData.title}\n\n${threadData.preview || ""}`),
      raw_metadata: {
        title: threadData.title,
        is_preview: true,
        preview_length: threadData.preview?.length || 0,
        title_match_count: titleMatches.length,
        preview_match_count: previewMatches.length,
      },
      school_matches: schoolMatches,
      sentiment: null,
      topics: [],
      fetched_at: new Date().toISOString(),
    });
  }

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
