#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import robotsParser from "robots-parser";
import { createClient } from "@supabase/supabase-js";
import {
  BASE_URL,
  UA,
  FETCH_TIMEOUT,
  collapseWhitespace,
  extractTrailingNumericId,
  normalizeSchoolName,
  parseForumThread,
} from "./edu-kingdom-utils.mjs";

const { values: args } = parseArgs({
  options: {
    mode: { type: "string", default: "full" },
    limit: { type: "string", default: "0" },
    offset: { type: "string", default: "0" },
    "only-top-100": { type: "boolean", default: false },
    "school-type": { type: "string" },
    "dry-run": { type: "boolean", default: false },
    "json-report": { type: "string", default: "docs/edu-kingdom-crawl-report.json" },
    "threads-per-board": { type: "string", default: "3" },
    "generic-threads-per-board": { type: "string", default: "0" },
  },
});

const MODE = "full";
const LIMIT = Math.max(0, parseInt(args.limit, 10) || 0);
const OFFSET = Math.max(0, parseInt(args.offset, 10) || 0);
const ONLY_TOP_100 = args["only-top-100"];
const SCHOOL_TYPE = args["school-type"] || null;
const DRY_RUN = args["dry-run"];
const JSON_REPORT = args["json-report"];
const THREADS_PER_BOARD = Math.max(1, parseInt(args["threads-per-board"], 10) || 3);
const GENERIC_BOARD_THREADS_PER_BOARD = Math.max(
  THREADS_PER_BOARD,
  parseInt(args["generic-threads-per-board"], 10) || THREADS_PER_BOARD,
);
const REQUEST_GAP_MS = 3000;
const CHUNK = 100;
const MISS_LIST_PATH = resolve(process.cwd(), "docs/edu-kingdom-miss-list.json");

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

const hostLastRequest = new Map();
const robotsCache = new Map();

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

async function acquireHostSlot(url) {
  const host = new URL(url).host;
  const last = hostLastRequest.get(host) || 0;
  const wait = Math.max(0, REQUEST_GAP_MS - (Date.now() - last));
  if (wait > 0) await new Promise((resolveDelay) => setTimeout(resolveDelay, wait));
  hostLastRequest.set(host, Date.now());
}

async function getRobots(origin) {
  if (robotsCache.has(origin)) return robotsCache.get(origin);
  try {
    const resp = await fetch(`${origin}/robots.txt`, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(5000),
    });
    const text = resp.ok ? await resp.text() : "";
    const parsed = robotsParser(`${origin}/robots.txt`, text);
    robotsCache.set(origin, parsed);
    return parsed;
  } catch {
    robotsCache.set(origin, null);
    return null;
  }
}

async function isAllowed(url) {
  const origin = new URL(url).origin;
  const robots = await getRobots(origin);
  if (!robots) return true;
  return robots.isAllowed(url, UA) !== false;
}

async function fetchHtml(url) {
  if (!(await isAllowed(url))) {
    return { ok: false, status: null, html: "", error: "robots_disallowed" };
  }

  await acquireHostSlot(url);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: ctrl.signal,
    });
    const html = resp.ok ? await resp.text() : "";
    return { ok: resp.ok, status: resp.status, html, finalUrl: resp.url };
  } catch (error) {
    return { ok: false, status: null, html: "", error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

function buildFallbackTargetsFromFile() {
  const schoolsPath = resolve(process.cwd(), "data/schools_merged.json");
  const rows = JSON.parse(readFileSync(schoolsPath, "utf-8"));
  return rows.map((row, index) => ({
    id: row.id || null,
    name_tc: row.name_tc,
    name_en: row.name_en,
    school_type: row.school_type || null,
    order_index: index,
  }));
}

async function loadTargets(supabase) {
  if (!supabase) return { schools: buildFallbackTargetsFromFile(), aliases: [] };

  const [{ data: schoolsData, error: schoolsError }, { data: aliasesData, error: aliasesError }] = await Promise.all([
    supabase
      .from("schools")
      .select("id, name_tc, name_en, school_type")
      .eq("is_active", true),
    supabase
      .from("school_aliases")
      .select("school_id, alias, confidence, alias_type"),
  ]);

  if (schoolsError) throw new Error(`Failed to load schools: ${schoolsError.message}`);
  if (aliasesError) throw new Error(`Failed to load school aliases: ${aliasesError.message}`);

  const schools = (schoolsData || []).map((row, index) => ({ ...row, order_index: index }));
  return { schools, aliases: aliasesData || [] };
}

function matchSchoolsInText(text, schools, aliases) {
  const normalized = collapseWhitespace(text || "");
  const lower = normalized.toLowerCase();
  const hits = [];
  const seen = new Set();

  for (const school of schools) {
    if (!school.id || seen.has(school.id)) continue;
    if (
      (school.name_tc && normalized.includes(school.name_tc)) ||
      (school.name_en && lower.includes(school.name_en.toLowerCase()))
    ) {
      hits.push({ school_id: school.id, confidence: 0.8 });
      seen.add(school.id);
    }
  }

  for (const alias of aliases) {
    if (!alias.school_id || seen.has(alias.school_id)) continue;
    if (alias.alias && normalized.includes(alias.alias)) {
      hits.push({
        school_id: alias.school_id,
        confidence: alias.confidence >= 0.9 ? 0.8 : alias.confidence >= 0.7 ? 0.65 : 0.5,
      });
      seen.add(alias.school_id);
    }
  }

  return hits;
}

function buildBoardSchoolMatcher(schools, aliases) {
  const labelMap = new Map();

  function pushLabel(schoolId, label, confidence) {
    const normalized = normalizeSchoolName(label);
    if (!schoolId || !normalized || normalized.length < 2) return;
    const existing = labelMap.get(normalized);
    if (!existing || confidence > existing.confidence) {
      labelMap.set(normalized, { school_id: schoolId, confidence });
    }
  }

  for (const school of schools) {
    pushLabel(school.id, school.name_tc, 0.95);
    pushLabel(school.id, school.name_en, 0.9);
  }

  for (const alias of aliases) {
    pushLabel(alias.school_id, alias.alias, alias.confidence >= 0.9 ? 0.9 : 0.8);
  }

  const entries = [...labelMap.entries()]
    .map(([label, meta]) => ({ label, ...meta }))
    .sort((left, right) => right.label.length - left.label.length);

  return function matchBoardTitle(title) {
    const normalizedTitle = normalizeSchoolName(
      collapseWhitespace(title)
        .replace(/\s*[－-]\s*教育王國.*$/u, "")
        .replace(/\s*[｜|].*$/u, ""),
    );

    if (!normalizedTitle) return [];

    const matches = [];
    const seen = new Set();
    for (const entry of entries) {
      if (seen.has(entry.school_id)) continue;
      if (
        normalizedTitle === entry.label ||
        normalizedTitle.includes(entry.label) ||
        entry.label.includes(normalizedTitle)
      ) {
        matches.push({ school_id: entry.school_id, confidence: entry.confidence });
        seen.add(entry.school_id);
      }
    }
    return matches;
  };
}

function mergeSchoolMatches(...groups) {
  const merged = new Map();
  for (const group of groups) {
    for (const match of group.filter(Boolean)) {
      const existing = merged.get(match.school_id);
      if (!existing || match.confidence > existing.confidence) {
        merged.set(match.school_id, match);
      }
    }
  }
  return [...merged.values()];
}

function upsertCollectedPost(collectedPosts, post) {
  const existing = collectedPosts.get(post.external_id);
  if (!existing) {
    collectedPosts.set(post.external_id, post);
    return;
  }

  existing.school_matches = mergeSchoolMatches(existing.school_matches, post.school_matches);
  if (!existing.raw_text || existing.raw_text.length < post.raw_text.length) {
    existing.raw_text = post.raw_text;
  }
  if (!existing.posted_at && post.posted_at) existing.posted_at = post.posted_at;
  if (!existing.author_hash && post.author_hash) existing.author_hash = post.author_hash;
}

function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(/&amp;/g, "&"));
}

function normalizeThreadUrl(url) {
  const absolute = new URL(url.replace(/&amp;/g, "&"), `${BASE_URL}/`).toString();
  const parsed = new URL(absolute);
  const tid = parsed.searchParams.get("tid") || extractTrailingNumericId(absolute);
  if (tid) return `${BASE_URL}/forum.php?mod=viewthread&tid=${tid}`;
  return absolute;
}

function isRelevantBoardUrl(url) {
  const fid = new URL(url).searchParams.get("fid");
  const boardId = Number(fid || 0);
  return boardId === 6 || boardId === 7 || boardId === 43 || boardId === 51 || boardId >= 168;
}

function isGenericBoardId(boardId) {
  return boardId === 6 || boardId === 7 || boardId === 43 || boardId === 51;
}

function extractTitleFromHtml(html) {
  const matched = html.match(/<title>([\s\S]*?)<\/title>/i);
  return collapseWhitespace((matched?.[1] || "").replace(/<[^>]+>/g, "")).replace(/\s*[－-]\s*教育王國.*$/u, "");
}

const RULE_THREAD_RE = /版規|禁止|通訊群組|交易活動|請注意/u;

async function loadThreadSeeds(allSchools, allAliases) {
  const matchBoardTitle = buildBoardSchoolMatcher(allSchools, allAliases);
  const sitemapResponse = await fetchHtml(`${BASE_URL}/sitemap-1.xml`);
  if (!sitemapResponse.ok) {
    throw new Error(`Failed to load sitemap-1.xml: ${sitemapResponse.error || sitemapResponse.status}`);
  }

  const boardUrls = parseSitemapLocs(sitemapResponse.html).filter(
    (url) => url.includes("forum.php?mod=forumdisplay") && isRelevantBoardUrl(url),
  );
  boardUrls.sort((left, right) => {
    const leftId = Number(new URL(left).searchParams.get("fid") || 0);
    const rightId = Number(new URL(right).searchParams.get("fid") || 0);
    const leftSpecific = leftId >= 168 ? 0 : 1;
    const rightSpecific = rightId >= 168 ? 0 : 1;
    return leftSpecific - rightSpecific || leftId - rightId;
  });

  let seeds = [];
  const seen = new Set();
  const targetCount = ONLY_TOP_100 ? 100 : LIMIT > 0 ? LIMIT + OFFSET : Number.POSITIVE_INFINITY;

  for (const boardUrl of boardUrls) {
    if (seeds.length >= targetCount) break;

    const boardResponse = await fetchHtml(boardUrl);
    if (!boardResponse.ok) continue;

    const boardTitle = extractTitleFromHtml(boardResponse.html);
    const surfacedMatches = mergeSchoolMatches(
      matchBoardTitle(boardTitle),
      matchSchoolsInText(boardTitle, allSchools, allAliases),
    );
    const boardId = Number(new URL(boardUrl).searchParams.get("fid") || 0);
    if (boardId >= 168 && surfacedMatches.length === 0) continue;
    const perBoardLimit = isGenericBoardId(boardId) ? GENERIC_BOARD_THREADS_PER_BOARD : THREADS_PER_BOARD;

    const links = [...boardResponse.html.matchAll(/<a[^>]+href="([^"]*(?:viewthread|\/thread-)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
    let boardSeedCount = 0;
    for (const [, rawHref, rawText] of links) {
      if (boardSeedCount >= perBoardLimit) break;

      const title = collapseWhitespace(rawText.replace(/<[^>]+>/g, ""));
      if (!title || /^\d+$/.test(title) || RULE_THREAD_RE.test(title)) continue;

      const normalized = normalizeThreadUrl(rawHref);
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      seeds.push({
        url: normalized,
        board_url: boardUrl,
        board_title: boardTitle,
        surfaced_matches: surfacedMatches,
      });
      boardSeedCount += 1;

      if (seeds.length >= targetCount) break;
    }
  }

  if (OFFSET > 0) seeds = seeds.slice(OFFSET);
  if (ONLY_TOP_100) seeds = seeds.slice(0, 100);
  if (LIMIT > 0) seeds = seeds.slice(0, LIMIT);
  return seeds;
}

async function processThreadSeed({ seed, allSchools, allAliases, collectedPosts, summary }) {
  const threadResponse = await fetchHtml(seed.url);
  if (!threadResponse.ok) {
    summary.fetch_failures += 1;
    return {
      url: seed.url,
      matched_school: false,
      error: threadResponse.error || `thread_status_${threadResponse.status}`,
    };
  }

  const thread = parseForumThread(threadResponse.html, seed.url);
  if (/^deleted$/i.test(thread.title) || /^deleted(?:\s|$)/i.test(thread.raw_text)) {
    summary.skipped_deleted_threads += 1;
    return {
      url: seed.url,
      matched_school: false,
      error: "deleted_thread",
      title: thread.title,
    };
  }

  if (!thread.raw_text || thread.raw_text.length < 40) {
    summary.skipped_short_threads += 1;
    return {
      url: seed.url,
      matched_school: false,
      error: "short_thread",
      title: thread.title,
    };
  }

  const matches = mergeSchoolMatches(
    seed.surfaced_matches,
    matchSchoolsInText(`${thread.title}\n${thread.raw_text}`, allSchools, allAliases),
  );
  if (matches.length === 0) {
    summary.unmatched_threads += 1;
    return {
      url: seed.url,
      matched_school: false,
      error: "no_school_match",
      title: thread.title,
    };
  }

  const threadId = extractTrailingNumericId(seed.url);
  upsertCollectedPost(collectedPosts, {
    platform: "edu_kingdom",
    external_id: `thread-${threadId || seed.url}`,
    url: seed.url,
    author_hash: thread.author_hash,
    posted_at: thread.posted_at,
    raw_text: thread.raw_text,
    raw_metadata: {
      source_type: "forum_thread",
      title: thread.title,
      reply_count_sampled: thread.reply_count_sampled,
      discovery_source: "forumdisplay",
      board_title: seed.board_title,
      board_url: seed.board_url,
    },
    school_matches: matches,
    sentiment: null,
    topics: [],
    fetched_at: new Date().toISOString(),
  });

  summary.matched_threads += 1;
  summary.thread_posts += 1;
  return {
    url: seed.url,
    matched_school: true,
    title: thread.title,
    school_matches: matches,
    board_title: seed.board_title,
  };
}

async function main() {
  if (args.mode && args.mode !== "full") {
    console.warn(`[edu-kingdom] mode=${args.mode} ignored: robots-compliant production is forum-thread only.`);
  }

  console.log(`[edu-kingdom] starting — mode=${MODE} dry-run=${DRY_RUN} limit=${LIMIT || "∞"} offset=${OFFSET} only-top-100=${ONLY_TOP_100}`);

  let supabase = null;
  if (!DRY_RUN || process.env.NEXT_PUBLIC_SUPABASE_URL) {
    supabase = getSupabase();
  }

  const { schools: allSchools, aliases: allAliases } = await loadTargets(supabase);
  const matchingSchools = allSchools
    .filter((school) => !SCHOOL_TYPE || school.school_type === SCHOOL_TYPE)
    .filter((school) => school.name_tc || school.name_en);
  const threadSeeds = await loadThreadSeeds(matchingSchools, allAliases);
  const collectedPosts = new Map();
  const summary = {
    sampled: threadSeeds.length,
    distinct_candidate_schools: matchingSchools.length,
    threads_per_board: THREADS_PER_BOARD,
    generic_threads_per_board: GENERIC_BOARD_THREADS_PER_BOARD,
    matched_threads: 0,
    unmatched_threads: 0,
    fetch_failures: 0,
    skipped_short_threads: 0,
    skipped_deleted_threads: 0,
    article_posts: 0,
    thread_posts: 0,
    unique_posts: 0,
    inserted_posts: 0,
  };

  console.log(`[edu-kingdom] loaded ${matchingSchools.length} schools for text matching (${allAliases.length} aliases)`);
  console.log(`[edu-kingdom] loaded ${threadSeeds.length} forum thread seeds`);

  const results = [];
  for (const [index, seed] of threadSeeds.entries()) {
    console.log(`[edu-kingdom] [${index + 1}/${threadSeeds.length}] ${seed.url}`);
    const result = await processThreadSeed({
      seed,
      allSchools: matchingSchools,
      allAliases,
      collectedPosts,
      summary,
    });
    results.push(result);
  }

  const postsToInsert = [...collectedPosts.values()].map((post) => ({
    ...post,
    school_matches: post.school_matches || [],
  }));
  summary.unique_posts = postsToInsert.length;

  if (DRY_RUN) {
    console.log(`[edu-kingdom] dry-run sample (first 3 posts):`);
    console.log(JSON.stringify(postsToInsert.slice(0, 3), null, 2));
  } else if (supabase && postsToInsert.length > 0) {
    for (let index = 0; index < postsToInsert.length; index += CHUNK) {
      const slice = postsToInsert.slice(index, index + CHUNK);
      const { error } = await supabase
        .from("social_posts_raw")
        .upsert(slice, { onConflict: "platform,external_id" });

      if (error) {
        console.error(`[edu-kingdom] chunk ${index} failed:`, error.message);
      } else {
        summary.inserted_posts += slice.length;
      }
    }
  }

  const matchedSchoolIds = new Set();
  for (const post of postsToInsert) {
    for (const match of post.school_matches || []) {
      if (match.school_id) matchedSchoolIds.add(match.school_id);
    }
  }

  const misses = results.filter((item) => !item.matched_school);
  const report = {
    generated_at: new Date().toISOString(),
    mode: MODE,
    summary: {
      ...summary,
      matched_school_count: matchedSchoolIds.size,
      thread_match_rate: threadSeeds.length ? Number((summary.matched_threads / threadSeeds.length).toFixed(2)) : 0,
      robots_compliant_scope: "forumdisplay_threads_only",
    },
    results,
  };

  writeFileSync(resolve(process.cwd(), JSON_REPORT), `${JSON.stringify(report, null, 2)}\n`, "utf-8");
  writeFileSync(MISS_LIST_PATH, `${JSON.stringify(misses, null, 2)}\n`, "utf-8");

  console.log(`[edu-kingdom] JSON report written to: ${JSON_REPORT}`);
  console.log(`[edu-kingdom] miss list written to: ${MISS_LIST_PATH}`);
  console.log(JSON.stringify(report.summary, null, 2));
}

main().catch((error) => {
  console.error("[edu-kingdom] fatal:", error);
  process.exit(1);
});
