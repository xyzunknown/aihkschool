#!/usr/bin/env node
/**
 * @deprecated ABANDONED — 2026-05
 *
 * This crawler was unable to extract usable school-matched article data from
 * Oh!爸媽 / Sunday Kiss / Parenting Headline. The pipeline is permanently
 * abandoned. The media_articles table and RelatedMediaSection component remain
 * in place but will always show empty states.
 *
 * DO NOT attempt to revive this crawler without first verifying the target
 * sites still publish KG-relevant articles with extractable school names.
 */

import { existsSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { parseArgs } from "node:util";
import { createClient } from "@supabase/supabase-js";
import * as cheerio from "cheerio";
import robotsParser from "robots-parser";

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

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    source: { type: "string", default: "all" },
    limit: { type: "string", default: "80" },
    report: { type: "string" },
  },
});

const DRY_RUN = Boolean(args["dry-run"]);
const REQUESTED_SOURCE = String(args.source || "all");
const LIMIT = Math.max(1, parseInt(String(args.limit || "80"), 10) || 80);
const REPORT_PATH = args.report ? String(args.report) : null;

const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
const FETCH_TIMEOUT = 12000;
const MAX_EXCERPT = 900;
const MAX_SUMMARY = 160;
const MIN_ARTICLE_TEXT = 35;

const SOURCES = {
  ohpama: {
    label: "Oh!爸媽",
    baseUrl: "https://www.ohpama.com",
    entryUrls: [
      { type: "rss", url: "https://www.ohpama.com/feed/" },
      { type: "listing", url: "https://www.ohpama.com/tag/%E5%B9%BC%E7%A8%9A%E5%9C%92" },
      { type: "listing", url: "https://www.ohpama.com/tag/%E5%B0%8F%E5%AD%B8%E9%96%8B%E6%94%BE%E6%97%A5" },
    ],
  },
  sundaykiss: {
    label: "Sunday Kiss",
    baseUrl: "https://www.sundaykiss.com",
    entryUrls: [
      { type: "rss", url: "https://www.sundaykiss.com/feed/" },
      { type: "listing", url: "https://www.sundaykiss.com/listingpage/%E6%95%99%E8%82%B2/" },
      { type: "listing", url: "https://www.sundaykiss.com/%E5%B9%BC%E5%B0%8F%E5%8D%87%E5%AD%B8/" },
    ],
  },
  parentingheadline: {
    label: "Parenting Headline",
    baseUrl: "https://www.parentingheadline.com",
    hosts: ["www.parentingheadline.com", "parentingheadline.com"],
    entryUrls: [
      { type: "sitemap", url: "https://www.parentingheadline.com/sitemap.xml" },
      { type: "listing", url: "https://parentingheadline.com/category/%E6%95%99%E8%82%B2%E6%94%BB%E7%95%A5" },
      { type: "listing", url: "https://parentingheadline.com/category/%E5%8D%87%E5%AD%B8%E6%8C%87%E5%8D%97" },
      { type: "listing", url: "https://parentingheadline.com/category/%E6%A0%A1%E5%9C%92%E7%94%9F%E6%B4%BB" },
    ],
  },
};

const CONTENT_TYPES = [
  {
    type: "open_day",
    label: "開放日",
    keywords: ["開放日", "open day", "open house", "校園參觀", "簡介會", "資訊日", "入學講座"],
  },
  {
    type: "admission",
    label: "招生",
    keywords: ["招生", "收生", "入學申請", "報名", "申請", "學位", "k1", "小一入學", "統一派位"],
  },
  {
    type: "interview",
    label: "面試",
    keywords: ["面試", "interview", "叩門", "面見", "考核", "portfolio"],
  },
  {
    type: "school_event",
    label: "學校事件",
    keywords: ["停辦", "投訴", "爭議", "欺凌", "虐兒", "曝光", "事故", "涉事", "校舍", "撤銷", "停牌"],
  },
  {
    type: "policy",
    label: "升學政策",
    keywords: ["教育局", "政策", "學券", "幼稚園教育計劃", "津貼", "派位", "學費減免", "停課", "停辦"],
  },
  {
    type: "feature",
    label: "專題整理",
    keywords: ["懶人包", "排名", "比較", "名單", "攻略", "專題", "直資", "私小", "國際學校", "幼稚園"],
  },
];

const EDUCATION_KEYWORDS = [
  "幼稚園",
  "幼兒園",
  "小學",
  "升學",
  "入學",
  "招生",
  "收生",
  "面試",
  "開放日",
  "簡介會",
  "學校",
  "教育局",
  "k1",
  "pn",
  "n班",
  "小一",
  "國際學校",
  "幼教",
];

const NOISE_KEYWORDS = [
  "食譜",
  "旅遊",
  "好去處",
  "著數",
  "美容",
  "減肥",
  "家居",
  "電影",
  "玩具",
  "親子餐廳",
  "生肖",
  "星座",
];

let requestQueue = Promise.resolve();
let lastRequestAt = 0;
const robotsByBase = new Map();

function cleanText(value = "") {
  return cheerio
    .load(String(value))("body")
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, maxLength) {
  const cleaned = cleanText(text);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}...`;
}

function hashId(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

function toIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function canonicalUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    for (const key of [...parsed.searchParams.keys()]) {
      if (/^(utm_|fbclid|gclid)/i.test(key)) parsed.searchParams.delete(key);
    }
    return parsed.href;
  } catch {
    return url;
  }
}

function isSourceUrl(sourceConfig, url) {
  try {
    const host = new URL(url).host;
    const hosts = sourceConfig.hosts || [new URL(sourceConfig.baseUrl).host];
    return hosts.includes(host);
  } catch {
    return false;
  }
}

function isProbablyEducationArticle(text) {
  let decoded = text;
  try {
    decoded = decodeURIComponent(text);
  } catch {
    decoded = text;
  }
  const lower = decoded.toLowerCase();
  const positive = EDUCATION_KEYWORDS.some((keyword) => lower.includes(keyword.toLowerCase()));
  if (!positive) return false;
  const noiseHits = NOISE_KEYWORDS.filter((keyword) => lower.includes(keyword.toLowerCase())).length;
  return noiseHits < 3;
}

function classifyArticle(article) {
  const haystack = `${article.title} ${article.summary || ""} ${article.category || ""} ${article.body_excerpt || ""}`.toLowerCase();
  for (const item of CONTENT_TYPES) {
    if (item.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))) {
      return { type: item.type, label: item.label };
    }
  }
  return { type: "feature", label: "專題整理" };
}

async function acquireSlot() {
  let release = () => {};
  const next = new Promise((resolveNext) => {
    release = resolveNext;
  });
  const previous = requestQueue;
  requestQueue = next;
  await previous;

  const wait = Math.max(0, 650 - (Date.now() - lastRequestAt));
  if (wait > 0) await new Promise((resolveWait) => setTimeout(resolveWait, wait));
  lastRequestAt = Date.now();
  release();
}

async function fetchText(url) {
  await acquireSlot();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: ctrl.signal,
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function getRobots(baseUrl) {
  if (robotsByBase.has(baseUrl)) return robotsByBase.get(baseUrl);
  const text = await fetchText(`${baseUrl}/robots.txt`);
  const parser = robotsParser(`${baseUrl}/robots.txt`, text || "");
  robotsByBase.set(baseUrl, parser);
  return parser;
}

async function isAllowed(source, url) {
  try {
    const robots = await getRobots(source.baseUrl);
    return robots.isAllowed(url, UA) !== false;
  } catch {
    return true;
  }
}

function parseRss(xml, sourceKey) {
  const $ = cheerio.load(xml, { xmlMode: true });
  const items = [];
  $("item").each((_, el) => {
    const title = cleanText($(el).find("title").first().text());
    const url = canonicalUrl($(el).find("link").first().text().trim());
    const summary = truncate($(el).find("description").first().text(), MAX_SUMMARY);
    const body = truncate($(el).find("content\\:encoded, encoded").first().text() || summary, MAX_EXCERPT);
    const published = toIsoDate($(el).find("pubDate").first().text().trim());
    const category = cleanText($(el).find("category").first().text());

    if (title && url) {
      items.push({ source: sourceKey, title, url, summary, body_excerpt: body, published_at: published, category });
    }
  });
  return items;
}

function parseSitemap(xml, sourceKey) {
  const $ = cheerio.load(xml, { xmlMode: true });
  const items = [];
  $("url").each((_, el) => {
    const url = canonicalUrl($(el).find("loc").first().text().trim());
    const lastmod = toIsoDate($(el).find("lastmod").first().text().trim());
    const title = cleanText($(el).find("news\\:title, title").first().text());
    if (url) items.push({ source: sourceKey, title, url, summary: "", body_excerpt: "", published_at: lastmod, category: "" });
  });
  return items;
}

function parseListing(html, sourceKey, baseUrl) {
  const $ = cheerio.load(html);
  const seen = new Set();
  const items = [];
  $("a[href]").each((_, el) => {
    const rawHref = $(el).attr("href") || "";
    const label = cleanText($(el).text());
    if (!label || label.length < 6) return;
    let url;
    try {
      url = canonicalUrl(new URL(rawHref, baseUrl).href);
    } catch {
      return;
    }
    if (!isSourceUrl({ baseUrl }, url) || seen.has(url)) return;
    if (/\.(jpg|png|gif|webp|pdf|zip)$/i.test(url)) return;
    if (/\/(tag|category|author|page|listingpage)\//i.test(new URL(url).pathname)) return;
    seen.add(url);
    items.push({ source: sourceKey, title: label, url, summary: "", body_excerpt: "", published_at: null, category: "" });
  });
  return items;
}

function extractDateFromHtml($) {
  const candidates = [
    $("meta[property='article:published_time']").attr("content"),
    $("meta[name='pubdate']").attr("content"),
    $("time[datetime]").first().attr("datetime"),
    $("time").first().text(),
    $(".date, .post-date, .entry-date, .published").first().text(),
  ];
  for (const candidate of candidates) {
    const iso = toIsoDate(cleanText(candidate || ""));
    if (iso) return iso;
  }
  return null;
}

function extractArticleFromHtml(html, seed, sourceConfig) {
  const $ = cheerio.load(html);
  $("script, style, noscript, svg, nav, footer, header, aside, form").remove();

  const title =
    cleanText($("meta[property='og:title']").attr("content") || "") ||
    cleanText($("h1").first().text()) ||
    seed.title;

  const summary =
    truncate(
      $("meta[name='description']").attr("content") ||
        $("meta[property='og:description']").attr("content") ||
        seed.summary ||
        "",
      MAX_SUMMARY
    );

  const category =
    cleanText($("meta[property='article:section']").attr("content") || "") ||
    cleanText($(".category, .cat, .breadcrumb a").last().text()) ||
    seed.category ||
    "";

  const bodyText =
    cleanText($("article").first().text()) ||
    cleanText($(".entry-content, .post-content, .article-content, .content, main").first().text()) ||
    seed.body_excerpt ||
    summary ||
    title;

  const published_at = extractDateFromHtml($) || seed.published_at;
  const canonical =
    canonicalUrl($("link[rel='canonical']").attr("href") || $("meta[property='og:url']").attr("content") || seed.url);

  if (!title || bodyText.length < MIN_ARTICLE_TEXT) return null;
  if (!isSourceUrl(sourceConfig, canonical)) return null;

  return {
    ...seed,
    title,
    summary: summary || truncate(bodyText, MAX_SUMMARY),
    published_at,
    category,
    url: canonical,
    body_excerpt: truncate(bodyText, MAX_EXCERPT),
  };
}

function parseSchoolsFromSeed() {
  const schoolsPath = resolve(process.cwd(), "supabase/seed/001_schools.sql");
  if (!existsSync(schoolsPath)) return [];
  const sql = readFileSync(schoolsPath, "utf-8");
  const rows = [];
  const regex =
    /INSERT INTO schools .*?VALUES \('([^']*)', '((?:''|[^'])*)', '((?:''|[^'])*)'/g;
  let match;
  while ((match = regex.exec(sql))) {
    rows.push({
      id: match[1],
      school_code: match[1],
      name_tc: match[2].replace(/''/g, "'"),
      name_en: match[3].replace(/''/g, "'"),
    });
  }
  return rows;
}

function parseAliasesFromSeed() {
  const aliasesPath = resolve(process.cwd(), "supabase/seed/008_school_aliases.sql");
  if (!existsSync(aliasesPath)) return [];
  const sql = readFileSync(aliasesPath, "utf-8");
  const rows = [];
  const regex =
    /SELECT id, '((?:''|[^'])*)', '[^']+', ([0-9.]+), 'manual' FROM schools WHERE school_code = '([^']+)'/g;
  let match;
  while ((match = regex.exec(sql))) {
    rows.push({
      school_id: match[3],
      alias: match[1].replace(/''/g, "'"),
      confidence: Number(match[2]) || 1,
    });
  }
  return rows;
}

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

async function loadSchoolData(supabase) {
  if (!supabase) {
    return {
      schools: parseSchoolsFromSeed(),
      aliases: parseAliasesFromSeed(),
      mode: "local_seed",
    };
  }

  const [{ data: schools }, { data: aliases }] = await Promise.all([
    supabase.from("schools").select("id, school_code, name_tc, name_en").eq("is_active", true),
    supabase.from("school_aliases").select("school_id, alias, confidence"),
  ]);

  return {
    schools: schools || [],
    aliases: aliases || [],
    mode: "supabase",
  };
}

function pushMatch(results, seen, schoolId, confidence, matchedText, method) {
  if (seen.has(schoolId)) return;
  results.push({ school_id: schoolId, confidence, matched_text: matchedText, method });
  seen.add(schoolId);
}

function matchSchools(article, schools, aliases) {
  const text = `${article.title} ${article.summary || ""} ${article.body_excerpt || ""}`;
  const lower = text.toLowerCase();
  const results = [];
  const seen = new Set();

  for (const school of schools) {
    if (school.name_tc && school.name_tc.length >= 4 && text.includes(school.name_tc)) {
      pushMatch(results, seen, school.id, "high", school.name_tc, "name_tc");
      continue;
    }
    if (school.name_en && school.name_en.length >= 6 && lower.includes(school.name_en.toLowerCase())) {
      pushMatch(results, seen, school.id, "high", school.name_en, "name_en");
    }
  }

  for (const alias of aliases) {
    if (!alias.alias || alias.alias.length < 2) continue;
    const isEnglish = /^[\x00-\x7F]+$/.test(alias.alias);
    const matched = isEnglish
      ? lower.includes(alias.alias.toLowerCase())
      : text.includes(alias.alias);
    if (!matched) continue;
    pushMatch(
      results,
      seen,
      alias.school_id,
      Number(alias.confidence) >= 0.9 ? "high" : "medium",
      alias.alias,
      "alias"
    );
  }

  return results;
}

function schoolMatchStatus(matches) {
  if (matches.length === 0) return "none";
  if (matches.length === 1 && matches[0].confidence === "high") return "matched";
  return "uncertain";
}

async function collectSeeds(sourceKey, sourceConfig) {
  const seeds = [];
  const entryStatus = [];
  for (const entry of sourceConfig.entryUrls) {
    if (!(await isAllowed(sourceConfig, entry.url))) {
      entryStatus.push({ ...entry, ok: false, count: 0, reason: "robots_disallowed" });
      continue;
    }
    const text = await fetchText(entry.url);
    if (!text) {
      entryStatus.push({ ...entry, ok: false, count: 0, reason: "fetch_failed" });
      continue;
    }

    let parsed = [];
    if (entry.type === "rss") parsed = parseRss(text, sourceKey);
    if (entry.type === "sitemap") parsed = parseSitemap(text, sourceKey);
    if (entry.type === "listing") parsed = parseListing(text, sourceKey, sourceConfig.baseUrl);

    seeds.push(...parsed);
    entryStatus.push({ ...entry, ok: parsed.length > 0, count: parsed.length });
  }

  const deduped = [];
  const seen = new Set();
  for (const seed of seeds) {
    const url = canonicalUrl(seed.url);
    if (seen.has(url)) continue;
    seen.add(url);
    deduped.push({ ...seed, url });
  }

  return { seeds: deduped, entryStatus };
}

async function fetchSourceArticles(sourceKey, sourceConfig, perSourceLimit) {
  const { seeds, entryStatus } = await collectSeeds(sourceKey, sourceConfig);
  const candidates = seeds
    .filter((seed) => isProbablyEducationArticle(`${seed.title} ${seed.summary || ""} ${seed.url}`))
    .slice(0, perSourceLimit * 2);

  const articles = [];
  for (const seed of candidates) {
    if (articles.length >= perSourceLimit) break;
    if (!(await isAllowed(sourceConfig, seed.url))) continue;
    const html = await fetchText(seed.url);
    const article = html ? extractArticleFromHtml(html, seed, sourceConfig) : seed;
    if (!article) continue;
    if (!isProbablyEducationArticle(`${article.title} ${article.summary || ""} ${article.body_excerpt || ""}`)) continue;
    articles.push(article);
  }

  return { articles, entryStatus, seedCount: seeds.length, candidateCount: candidates.length };
}

function toDbRow(article, sourceConfig, schools, aliases) {
  const classification = classifyArticle(article);
  const schoolMatches = matchSchools(article, schools, aliases);

  return {
    source: article.source,
    external_id: hashId(article.url || `${article.source}:${article.title}`),
    title: article.title,
    summary: article.summary || truncate(article.body_excerpt, MAX_SUMMARY),
    published_at: article.published_at,
    category: article.category || null,
    url: article.url,
    body_excerpt: article.body_excerpt || null,
    content_type: classification.type,
    school_match_status: schoolMatchStatus(schoolMatches),
    school_matches: schoolMatches,
    raw_metadata: {
      source_label: sourceConfig.label,
      content_type_label: classification.label,
    },
    fetched_at: new Date().toISOString(),
  };
}

function summarize(rows, sourceReports) {
  const bySource = {};
  const byType = {};
  const byMatchStatus = {};
  const urlCounts = new Map();

  for (const row of rows) {
    bySource[row.source] = (bySource[row.source] || 0) + 1;
    byType[row.content_type] = (byType[row.content_type] || 0) + 1;
    byMatchStatus[row.school_match_status] = (byMatchStatus[row.school_match_status] || 0) + 1;
    urlCounts.set(row.url, (urlCounts.get(row.url) || 0) + 1);
  }

  const duplicateUrls = [...urlCounts.values()].filter((count) => count > 1).length;
  const matched = byMatchStatus.matched || 0;
  const uncertain = byMatchStatus.uncertain || 0;
  const noise = rows.filter((row) => !isProbablyEducationArticle(`${row.title} ${row.summary || ""} ${row.body_excerpt || ""}`)).length;

  return {
    generated_at: new Date().toISOString(),
    requested_source: REQUESTED_SOURCE,
    dry_run: DRY_RUN,
    limit: LIMIT,
    totals: {
      rows: rows.length,
      matched,
      uncertain,
      none: byMatchStatus.none || 0,
      duplicate_urls: duplicateUrls,
      estimated_noise: noise,
      match_rate: rows.length ? Number(((matched + uncertain) / rows.length).toFixed(3)) : 0,
      duplicate_rate: rows.length ? Number((duplicateUrls / rows.length).toFixed(3)) : 0,
      noise_rate: rows.length ? Number((noise / rows.length).toFixed(3)) : 0,
    },
    by_source: bySource,
    by_type: byType,
    by_match_status: byMatchStatus,
    source_reports: sourceReports,
    sample: rows.slice(0, 12).map((row) => ({
      source: row.source,
      title: row.title,
      content_type: row.content_type,
      school_match_status: row.school_match_status,
      matched_count: row.school_matches.length,
      url: row.url,
    })),
  };
}

async function upsertRows(supabase, rows) {
  const CHUNK = 50;
  let upserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const { error } = await supabase
      .from("media_articles")
      .upsert(slice, { onConflict: "source,external_id" });
    if (error) throw new Error(`media_articles upsert failed: ${error.message}`);
    upserted += slice.length;
  }
  return upserted;
}

async function main() {
  const selectedKeys =
    REQUESTED_SOURCE === "all"
      ? Object.keys(SOURCES)
      : REQUESTED_SOURCE.split(",").map((item) => item.trim()).filter(Boolean);

  for (const key of selectedKeys) {
    if (!SOURCES[key]) throw new Error(`Unknown source: ${key}`);
  }

  const supabase = getSupabase();
  const { schools, aliases, mode } = await loadSchoolData(supabase);
  console.log(`[media] school matcher loaded: schools=${schools.length} aliases=${aliases.length} mode=${mode}`);

  const perSourceLimit = Math.max(1, Math.ceil(LIMIT / selectedKeys.length));
  const sourceReports = [];
  const rows = [];

  for (const sourceKey of selectedKeys) {
    const sourceConfig = SOURCES[sourceKey];
    console.log(`[media] ${sourceConfig.label}: collecting entries`);
    const result = await fetchSourceArticles(sourceKey, sourceConfig, perSourceLimit);
    const sourceRows = result.articles.map((article) => toDbRow(article, sourceConfig, schools, aliases));
    rows.push(...sourceRows);
    sourceReports.push({
      source: sourceKey,
      label: sourceConfig.label,
      seed_count: result.seedCount,
      candidate_count: result.candidateCount,
      article_count: result.articles.length,
      entry_status: result.entryStatus,
    });
    console.log(`[media] ${sourceConfig.label}: articles=${result.articles.length} seeds=${result.seedCount}`);
  }

  const sortedRows = rows
    .sort((first, second) => {
      const firstTime = first.published_at ? new Date(first.published_at).getTime() : 0;
      const secondTime = second.published_at ? new Date(second.published_at).getTime() : 0;
      return secondTime - firstTime;
    })
    .slice(0, LIMIT);

  const report = summarize(sortedRows, sourceReports);

  if (REPORT_PATH) {
    await writeFile(resolve(process.cwd(), REPORT_PATH), `${JSON.stringify(report, null, 2)}\n`, "utf-8");
    console.log(`[media] report written: ${REPORT_PATH}`);
  }

  if (DRY_RUN) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (!supabase) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for DB writes");
  }

  const upserted = await upsertRows(supabase, sortedRows);
  console.log(`[media] done: upserted=${upserted}/${sortedRows.length}`);
}

main().catch((error) => {
  console.error("[media] fatal:", error);
  process.exit(1);
});
