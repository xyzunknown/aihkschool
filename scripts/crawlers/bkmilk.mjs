#!/usr/bin/env node
/**
 * BK Milk article crawler
 *
 * Pipeline:
 *   1. Try RSS feed at https://bkmilk.com.hk/feed/
 *   2. Fallback: fetch listing pages + cheerio to extract article links
 *   3. For each article: extract title, author, published, body (truncated)
 *   4. matchSchoolFromText → only insert if matched to a school
 *   5. Upsert into social_posts_raw
 *
 * Usage:
 *   node scripts/crawlers/bkmilk.mjs [--dry-run] [--limit N]
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
    limit: { type: "string", default: "50" },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 50;

const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
const FETCH_TIMEOUT = 10000;
const MAX_RAW_TEXT = 1500;
const BASE_URL = "https://bkmilk.com.hk";

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

// ─── RSS parsing ──────────────────────────────────────────────────────────

function parseRSS(xml) {
  const $ = cheerio.load(xml, { xmlMode: true });
  const items = [];
  $("item").each((_, el) => {
    const title = $(el).find("title").text().trim();
    const link = $(el).find("link").text().trim();
    const pubDate = $(el).find("pubDate").text().trim();
    const author = $(el).find("dc\\:creator, creator").text().trim();
    const contentEncoded = $(el).find("content\\:encoded, encoded").text().trim();
    const description = $(el).find("description").text().trim();

    const body = contentEncoded || description || "";
    // Strip HTML from body
    const cleanBody = cheerio.load(body).text().replace(/\s+/g, " ").trim();

    items.push({
      title,
      url: link,
      author,
      published: pubDate ? new Date(pubDate).toISOString() : null,
      body: cleanBody.slice(0, MAX_RAW_TEXT),
    });
  });
  return items;
}

// ─── HTML listing fallback ────────────────────────────────────────────────

async function fetchArticleLinksFromListing() {
  const urls = [
    `${BASE_URL}/category/升學攻略/`,
    `${BASE_URL}/category/教育/`,
    `${BASE_URL}/`,
  ];

  const links = new Set();

  for (const listUrl of urls) {
    if (!(await isAllowed(listUrl))) continue;
    const html = await rateLimitedFetch(listUrl);
    if (!html) continue;

    const $ = cheerio.load(html);
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || "";
      if (href.includes("bkmilk.com.hk") && !href.includes("/category/") && !href.includes("/tag/")) {
        try {
          const u = new URL(href);
          if (u.pathname.length > 5 && u.pathname !== "/") {
            links.add(u.href);
          }
        } catch {
          // skip invalid URLs
        }
      }
    });

    if (links.size >= LIMIT) break;
  }

  return Array.from(links).slice(0, LIMIT);
}

async function fetchArticle(url) {
  if (!(await isAllowed(url))) return null;
  const html = await rateLimitedFetch(url);
  if (!html) return null;

  const $ = cheerio.load(html);
  $("script, style, noscript, nav, footer, aside").remove();

  const title = $("h1.entry-title, h1.post-title, h1").first().text().trim() ||
    $("title").text().trim();
  const author = $("span.author, .post-author, .entry-author").first().text().trim();
  const dateStr = $("time[datetime]").first().attr("datetime") ||
    $("meta[property='article:published_time']").attr("content");
  const published = dateStr ? new Date(dateStr).toISOString() : null;

  const body = $("article, .entry-content, .post-content, .article-body").first().text()
    .replace(/\s+/g, " ").trim().slice(0, MAX_RAW_TEXT);

  if (!title || body.length < 50) return null;

  return { title, url, author, published, body };
}

// ─── School matching (simplified inline version for .mjs scripts) ────────

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
  console.log(`[bkmilk] starting — dry-run=${DRY_RUN} limit=${LIMIT}`);

  // Step 1: Try RSS
  let articles = [];
  console.log(`[bkmilk] trying RSS feed...`);
  const rssXml = await rateLimitedFetch(`${BASE_URL}/feed/`);
  if (rssXml && rssXml.includes("<rss") || rssXml?.includes("<channel")) {
    articles = parseRSS(rssXml);
    console.log(`[bkmilk] RSS: parsed ${articles.length} articles`);
  }

  // Step 2: Fallback to HTML listing
  if (articles.length === 0) {
    console.log(`[bkmilk] RSS failed, falling back to HTML listing...`);
    const articleUrls = await fetchArticleLinksFromListing();
    console.log(`[bkmilk] found ${articleUrls.length} article links`);

    for (const url of articleUrls.slice(0, LIMIT)) {
      const article = await fetchArticle(url);
      if (article) articles.push(article);
    }
    console.log(`[bkmilk] fetched ${articles.length} articles from HTML`);
  }

  articles = articles.slice(0, LIMIT);

  // Step 3: Match to schools
  let supabase = null;
  let schools = [];
  let aliases = [];

  if (!DRY_RUN || process.env.NEXT_PUBLIC_SUPABASE_URL) {
    supabase = getSupabase();
    schools = await loadSchoolNames(supabase);
    aliases = await loadAliases(supabase);
    console.log(`[bkmilk] loaded ${schools.length} schools, ${aliases.length} aliases`);
  }

  const postsToInsert = [];

  for (const article of articles) {
    const fullText = `${article.title} ${article.body}`;
    const schoolMatches = matchSchools(fullText, schools, aliases);

    if (schoolMatches.length === 0) continue;

    const externalId = createHash("sha256").update(article.url || article.title).digest("hex").slice(0, 24);

    postsToInsert.push({
      platform: "bkmilk",
      external_id: externalId,
      url: article.url,
      author_hash: hashAuthor("bkmilk", article.author),
      posted_at: article.published,
      raw_text: sanitizePII(article.body),
      raw_metadata: {
        title: article.title,
        author: article.author,
      },
      school_matches: schoolMatches,
      sentiment: null,
      topics: [],
      fetched_at: new Date().toISOString(),
    });
  }

  console.log(`[bkmilk] matched ${postsToInsert.length}/${articles.length} articles to schools`);

  if (DRY_RUN) {
    console.log(`[bkmilk] dry-run sample (first 3):`);
    console.log(JSON.stringify(postsToInsert.slice(0, 3), null, 2));
    return;
  }

  if (!supabase || postsToInsert.length === 0) {
    console.log(`[bkmilk] nothing to insert`);
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
      console.error(`[bkmilk] chunk ${i} failed:`, error.message);
    } else {
      inserted += slice.length;
    }
  }

  console.log(`[bkmilk] done — upserted=${inserted}/${postsToInsert.length}`);
}

main().catch((err) => {
  console.error("[bkmilk] fatal:", err);
  process.exit(1);
});
