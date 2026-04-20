#!/usr/bin/env node
/**
 * Xiaohongshu posts ingester
 *
 * Reads raw scraped posts from `data/xhs/raw_posts/*.json` (produced by
 * `scripts/xhs/scrape_posts.py`) and upserts them into `social_posts_raw`.
 *
 * This script does NOT scrape XHS — scraping is handled by the Python pipeline
 * with Playwright + login. This script is the DB bridge.
 *
 * Pipeline:
 *   1. Walk data/xhs/raw_posts/*.json
 *   2. For each post: resolve school_code → school_id, normalize fields,
 *      hash author, truncate text
 *   3. Upsert into social_posts_raw (dedup by (platform, external_id))
 *
 * Usage:
 *   node scripts/crawlers/xhs-posts.mjs [--dry-run] [--limit N] [--data-dir PATH]
 *
 * Env vars (non-dry-run):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Auto-load .env.local
const _envPath = resolve(process.cwd(), ".env.local");
if (existsSync(_envPath)) {
  for (const line of readFileSync(_envPath, "utf-8").split("\n")) {
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
import fs from "node:fs/promises";
import path from "node:path";

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "0" },
    "data-dir": { type: "string", default: "data/xhs/raw_posts" },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 0;
const DATA_DIR = path.resolve(process.cwd(), args["data-dir"]);

const MAX_RAW_TEXT = 2000;

// ─── Helpers ──────────────────────────────────────────────────────────────

function hashAuthor(platform, author) {
  if (!author) return null;
  return createHash("sha256")
    .update(`${platform}:${author}`)
    .digest("hex")
    .slice(0, 16);
}

function mapConfidence(xhsConf) {
  // XHS match_confidence: high/medium/low — pass through
  if (xhsConf === "high" || xhsConf === "medium" || xhsConf === "low") return xhsConf;
  return "low";
}

function sanitizePII(text) {
  return text
    .replace(/\d{4}\s?\d{4}/g, "[電話]")
    .replace(/[A-Za-z\u4e00-\u9fff]+(路|街|道|大廈|花園|村)\d*[號樓室層]/g, "[地址]")
    .replace(/[\w.]+@[\w.]+\.\w+/g, "[email]");
}

function normalizePost(post, fileMeta, schoolIdBySchoolCode) {
  const schoolCode = post.matched_school_code || fileMeta.school_code;
  const schoolId = schoolIdBySchoolCode.get(schoolCode);

  const title = post.title || "";
  const content = post.content || "";
  const rawText = sanitizePII(`${title}\n\n${content}`.trim().slice(0, MAX_RAW_TEXT));

  const schoolMatches = schoolId
    ? [{ school_id: schoolId, confidence: mapConfidence(post.match_confidence) }]
    : [];

  return {
    platform: "xhs",
    external_id: post.post_id,
    url: post.url || null,
    author_hash: hashAuthor("xhs", post.author),
    posted_at: post.publish_date ? new Date(post.publish_date).toISOString() : null,
    raw_text: rawText,
    raw_metadata: {
      likes: post.likes ?? null,
      collects: post.collects ?? null,
      comments_count: post.comments_count ?? null,
      search_keyword: post.search_keyword ?? null,
      kg_confidence: post.kg_confidence ?? null,
      branch_identified: post.branch_identified ?? null,
      source_school_code: schoolCode,
    },
    school_matches: schoolMatches,
    sentiment: null, // populated by extract-reputation.mjs later
    topics: [],
    fetched_at: post.fetch_timestamp
      ? new Date(post.fetch_timestamp).toISOString()
      : new Date().toISOString(),
  };
}

// ─── File loading ─────────────────────────────────────────────────────────

async function loadRawPostFiles() {
  let files;
  try {
    files = await fs.readdir(DATA_DIR);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`[xhs-ingest] data dir not found: ${DATA_DIR}`);
      return [];
    }
    throw err;
  }

  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const results = [];
  for (const file of jsonFiles) {
    const fullPath = path.join(DATA_DIR, file);
    try {
      const raw = await fs.readFile(fullPath, "utf8");
      const data = JSON.parse(raw);
      if (data.posts && Array.isArray(data.posts)) {
        results.push({
          school_code: data.school_code,
          name_tc: data.name_tc,
          posts: data.posts,
        });
      }
    } catch (err) {
      console.error(`[xhs-ingest] skip ${file}: ${err.message}`);
    }
  }
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

async function buildSchoolCodeToIdMap(supabase, schoolCodes) {
  // schools table uses `school_code` or similar — verify schema first
  const { data, error } = await supabase
    .from("schools")
    .select("id, school_code")
    .in("school_code", schoolCodes);

  if (error) {
    console.warn(`[xhs-ingest] could not resolve school_code → id:`, error.message);
    return new Map();
  }

  const map = new Map();
  for (const row of data || []) {
    if (row.school_code) map.set(String(row.school_code), row.id);
  }
  return map;
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[xhs-ingest] starting — dry-run=${DRY_RUN} limit=${LIMIT || "∞"}`);
  console.log(`[xhs-ingest] data dir: ${DATA_DIR}`);

  const files = await loadRawPostFiles();
  console.log(`[xhs-ingest] loaded ${files.length} school files`);

  const schoolCodes = files.map((f) => String(f.school_code)).filter(Boolean);

  let schoolMap = new Map();
  let supabase = null;

  if (!DRY_RUN || process.env.NEXT_PUBLIC_SUPABASE_URL) {
    supabase = getSupabase();
    schoolMap = await buildSchoolCodeToIdMap(supabase, schoolCodes);
    console.log(`[xhs-ingest] resolved ${schoolMap.size}/${schoolCodes.length} school codes → ids`);
  } else {
    console.log(`[xhs-ingest] dry-run without SUPABASE — school_id resolution skipped`);
  }

  // Flatten + dedup by post_id
  const seen = new Set();
  const allPosts = [];
  for (const file of files) {
    for (const post of file.posts) {
      if (!post.post_id || seen.has(post.post_id)) continue;
      seen.add(post.post_id);
      allPosts.push(normalizePost(post, file, schoolMap));
      if (LIMIT > 0 && allPosts.length >= LIMIT) break;
    }
    if (LIMIT > 0 && allPosts.length >= LIMIT) break;
  }

  console.log(`[xhs-ingest] normalized ${allPosts.length} unique posts`);

  if (DRY_RUN) {
    console.log(`[xhs-ingest] dry-run sample (first 3):`);
    console.log(JSON.stringify(allPosts.slice(0, 3), null, 2));
    const matched = allPosts.filter((p) => p.school_matches.length > 0).length;
    console.log(`[xhs-ingest] stats: total=${allPosts.length} matched_to_school=${matched}`);
    return;
  }

  // Upsert in chunks
  const CHUNK = 100;
  let inserted = 0;
  for (let i = 0; i < allPosts.length; i += CHUNK) {
    const slice = allPosts.slice(i, i + CHUNK);
    const { error } = await supabase
      .from("social_posts_raw")
      .upsert(slice, { onConflict: "platform,external_id" });

    if (error) {
      console.error(`[xhs-ingest] chunk ${i} failed:`, error.message);
    } else {
      inserted += slice.length;
    }
  }

  console.log(`[xhs-ingest] done — upserted=${inserted}/${allPosts.length}`);
}

main().catch((err) => {
  console.error("[xhs-ingest] fatal:", err);
  process.exit(1);
});
