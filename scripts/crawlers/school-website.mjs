#!/usr/bin/env node
/**
 * School website enrichment crawler (v2 — zero AI)
 *
 * Pipeline:
 *   1. Load schools from Supabase (default: ALL active schools with website)
 *   2. Fetch school website HTML with cheerio (respect robots.txt)
 *   3. Regex + heading-section heuristics → structured fields
 *   4. content_hash dedup → upsert into school_enrichments
 *
 * Usage:
 *   node scripts/crawlers/school-website.mjs [--dry-run] [--limit N] [--school-ids id1,id2] [--school-type private_independent]
 *
 * Env vars (auto-loaded from .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";

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
import { writeFileSync } from "node:fs";
import * as cheerio from "cheerio";
import robotsParser from "robots-parser";
import {
  getDomainPolicy,
  normalizeWebsiteWithPolicy,
  shouldUsePlaywrightForUrl,
} from "./school-website-domain-policies.mjs";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

let playwrightModulePromise;

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    limit: { type: "string", default: "0" },
    "school-ids": { type: "string", default: "" },
    "school-type": { type: "string", default: "" },
    concurrency: { type: "string", default: "3" },
    "json-report": { type: "string", default: "" },
  },
});

const DRY_RUN = args["dry-run"];
const LIMIT = parseInt(args.limit, 10) || 0;
const SCHOOL_IDS = args["school-ids"] ? args["school-ids"].split(",") : null;
const SCHOOL_TYPE = args["school-type"] || null;
const CONCURRENCY = parseInt(args.concurrency, 10) || 3;
const JSON_REPORT = args["json-report"] || null;

const UA = "HKSchoolPlaceBot/1.0 (+https://aihkschool.vercel.app)";
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const FETCH_TIMEOUT = 20000;      // P4: base page timeout (was 12s)
const SUB_FETCH_TIMEOUT = 12000;  // sub-page / PDF timeout
const PLAYWRIGHT_TIMEOUT = 30000;

// P1: tolerate invalid SSL certs for crawling
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// P0: URL-level result cache — same URL only crawled once
const urlPageCache = new Map();

// Fallback sub-paths — only used when dynamic link discovery finds nothing
const SUB_PATHS = [
  "/admission", "/admissions", "/apply", "/application",
  "/open-day", "/openday", "/contact", "/about",
  "/招生", "/入學",
];

// ─── Rate limiter ─────────────────────────────────────────────────────────

const hostLastRequest = new Map();

const RETRYABLE_CODES = new Set([
  "UND_ERR_SOCKET", "ECONNRESET", "ETIMEDOUT", "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT", "EPIPE",
]);

async function rateLimitedFetch(url, { acceptPdf = false, acceptJson = false, timeout = FETCH_TIMEOUT } = {}) {
  let host;
  try {
    host = new URL(url).host;
  } catch {
    return null;
  }

  const last = hostLastRequest.get(host) || 0;
  const wait = Math.max(0, 400 - (Date.now() - last));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  hostLastRequest.set(host, Date.now());

  const maxRetries = 2; // P2: retry up to 2 times
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    // P3: on retry after 403, switch to browser UA
    const ua = (attempt > 0 && lastError === "HTTP_403") ? BROWSER_UA : UA;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    try {
      const resp = await fetch(url, {
        headers: {
          "User-Agent": ua,
          "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
        },
        signal: ctrl.signal,
        redirect: "follow",
      });
      if (resp.status === 403 && attempt < maxRetries) {
        lastError = "HTTP_403";
        clearTimeout(timer);
        await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
        continue;
      }
      const contentType = resp.headers.get("content-type") || "";
      if (!resp.ok) {
        if (contentType.includes("application/json") && acceptJson) {
          return { type: "json", text: await resp.text(), status: resp.status, url: resp.url, via: "fetch" };
        }
        if (contentType.includes("text/html") || contentType.includes("text/plain")) {
          return { type: "html", text: await resp.text(), status: resp.status, url: resp.url, via: "fetch" };
        }
        return null;
      }
      if (contentType.includes("application/pdf") && acceptPdf) {
        const buf = Buffer.from(await resp.arrayBuffer());
        return { type: "pdf", buffer: buf, status: resp.status, url: resp.url, via: "fetch" };
      }
      if (contentType.includes("application/json") && acceptJson) {
        return { type: "json", text: await resp.text(), status: resp.status, url: resp.url, via: "fetch" };
      }
      if (!contentType.includes("text/html") && !contentType.includes("text/plain")) return null;
      return { type: "html", text: await resp.text(), status: resp.status, url: resp.url, via: "fetch" };
    } catch (e) {
      clearTimeout(timer);
      const code = e.cause?.code || "";
      if (attempt < maxRetries && RETRYABLE_CODES.has(code)) {
        lastError = code;
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

function htmlTextLength(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

function looksLikeAntiBotHtml(html) {
  const sample = html.slice(0, 4000).toLowerCase();
  return [
    "attention required",
    "enable javascript",
    "just a moment",
    "checking your browser",
    "captcha",
    "ddos-guard",
    "cloudflare",
    "bot verification",
    "access denied",
  ].some((needle) => sample.includes(needle));
}

function looksLikeJsAppShell(html) {
  const sample = html.slice(0, 12000).toLowerCase();
  return [
    "<app-root",
    "<div id=\"root\"",
    "data-reactroot",
    "ng-version",
    "<base href=\"/\"",
  ].some((needle) => sample.includes(needle)) || (
    /main\.[^"']+\.js/i.test(sample) &&
    /polyfills\.[^"']+\.js/i.test(sample)
  );
}

async function loadPlaywright() {
  if (!playwrightModulePromise) {
    playwrightModulePromise = Promise.resolve()
      .then(() => require("playwright"))
      .catch(() => null);
  }
  return playwrightModulePromise;
}

async function fetchHtmlWithPlaywright(url, { timeout = PLAYWRIGHT_TIMEOUT } = {}) {
  const playwright = await loadPlaywright();
  if (!playwright?.chromium) {
    return { response: null, notes: ["Playwright package unavailable"] };
  }

  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      userAgent: BROWSER_UA,
      extraHTTPHeaders: {
        "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8",
      },
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout });
    await page.waitForLoadState("networkidle", { timeout: Math.min(timeout, 8000) }).catch(() => {});
    const html = await page.content();
    const finalUrl = page.url();
    await context.close();
    return {
      response: {
        type: "html",
        text: html,
        status: 200,
        url: finalUrl,
        via: "playwright",
      },
      notes: [`Playwright fallback used for ${new URL(url).host}`],
    };
  } catch (error) {
    return {
      response: null,
      notes: [`Playwright fallback failed: ${error.message?.slice(0, 200) || "unknown error"}`],
    };
  } finally {
    await browser?.close().catch(() => {});
  }
}

function getPlaywrightTimeout(domainPolicy, timeout) {
  return Math.max(timeout, domainPolicy?.playwrightTimeoutMs || PLAYWRIGHT_TIMEOUT);
}

async function fetchHtmlWithFallback(url, { domainPolicy = null, timeout = FETCH_TIMEOUT } = {}) {
  const response = await rateLimitedFetch(url, { timeout });
  const wantsPlaywright = domainPolicy?.usePlaywright === true || shouldUsePlaywrightForUrl(url);
  const forcePlaywright = domainPolicy?.forcePlaywright === true;

  if (forcePlaywright && wantsPlaywright) {
    const browserResult = await fetchHtmlWithPlaywright(url, { timeout: getPlaywrightTimeout(domainPolicy, timeout) });
    if (browserResult.response) return browserResult;
    return { response, notes: browserResult.notes };
  }

  if (response?.type === "html") {
    const textLen = htmlTextLength(response.text);
    const needsBrowser = wantsPlaywright && (
      response.status === 202 ||
      textLen < 80 ||
      looksLikeAntiBotHtml(response.text) ||
      looksLikeJsAppShell(response.text)
    );

    if (!needsBrowser) {
      return { response, notes: [] };
    }
  }

  if (!wantsPlaywright) {
    return { response, notes: [] };
  }

  const browserResult = await fetchHtmlWithPlaywright(url, { timeout: getPlaywrightTimeout(domainPolicy, timeout) });
  if (browserResult.response) return browserResult;
  return { response, notes: browserResult.notes };
}

async function fetchJson(url, { timeout = SUB_FETCH_TIMEOUT } = {}) {
  const response = await rateLimitedFetch(url, { acceptJson: true, timeout });
  if (!response || response.type !== "json") return null;

  try {
    return JSON.parse(response.text);
  } catch {
    return null;
  }
}

// ─── robots.txt checking ──────────────────────────────────────────────────

const robotsCache = new Map();

async function isAllowedByRobots(url) {
  let origin;
  try {
    const u = new URL(url);
    origin = `${u.protocol}//${u.host}`;
  } catch {
    return false;
  }

  if (!robotsCache.has(origin)) {
    try {
      const resp = await fetch(`${origin}/robots.txt`, {
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(5000),
      });
      const text = resp.ok ? await resp.text() : "";
      robotsCache.set(origin, robotsParser(`${origin}/robots.txt`, text));
    } catch {
      robotsCache.set(origin, null);
    }
  }

  const robots = robotsCache.get(origin);
  if (!robots) return true;
  return robots.isAllowed(url, UA) !== false;
}

// ─── Extraction helpers ───────────────────────────────────────────────────

// ── Dynamic link discovery ────────────────────────────────────────────────

function discoverCandidateUrls($, origin) {
  const kw = /admission|apply|application|enrol|open.?day|admit|報名|入學|招生|開放日|簡介會|學費|fee/i;
  const found = new Set();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().trim();
    if (!kw.test(href) && !kw.test(text)) return;
    try {
      const u = new URL(href, origin);
      if (u.origin !== origin) return; // same-site only
      if (u.pathname === "/" || u.pathname === "") return; // skip homepage
      found.add(u.href);
    } catch { /* skip malformed hrefs */ }
  });
  return Array.from(found).slice(0, 8);
}

// ── Discover PDF links on page ────────────────────────────────────────────

function discoverPdfLinks($, origin) {
  const kw = /admission|apply|application|enrol|報名|入學|招生|開放日|學費|fee/i;
  const found = new Set();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().trim();
    if (!href.toLowerCase().endsWith(".pdf")) return;
    if (!kw.test(href) && !kw.test(text)) return;
    try {
      const u = new URL(href, origin);
      found.add(u.href);
    } catch { /* skip */ }
  });
  return Array.from(found).slice(0, 4);
}

function getUrlHost(value) {
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

function extractMetaRefreshTarget(html, baseUrl) {
  const match = html.match(/<meta[^>]+http-equiv=["']?refresh["']?[^>]+content=["'][^"']*url=([^"'>]+)["']/i)
    || html.match(/<meta[^>]+content=["'][^"']*url=([^"'>]+)["'][^>]+http-equiv=["']?refresh["']?/i);
  if (!match?.[1]) return null;
  try {
    return new URL(match[1].trim(), baseUrl).href;
  } catch {
    return null;
  }
}

function uniqueItems(items) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    if (!item || seen.has(item)) continue;
    seen.add(item);
    output.push(item);
  }
  return output;
}

function buildSyntheticHtmlPage(page) {
  const title = page?.title?.rendered || page?.slug || "";
  const content = page?.content?.rendered || "";
  return {
    url: page?.link || "",
    html: `<html><body><h1>${title}</h1>${content}</body></html>`,
  };
}

function getSchoolSearchText(school) {
  return `${school?.name_tc || ""} ${school?.name_en || ""}`.toLowerCase();
}

const CREATIVE_CAMPUS_MATCHERS = [
  { slug: "skg", patterns: [/匯景/, /sceneway/] },
  { slug: "tm", patterns: [/屯門/, /tuen\s*mun/] },
  { slug: "cast", patterns: [/帝堡城/, /castello/] },
  { slug: "ac", patterns: [/愛琴/, /aegean/] },
  { slug: "hf", patterns: [/杏花/, /heng\s*fa/] },
  { slug: "swt", patterns: [/深灣軒/, /sham\s*wan/] },
  { slug: "ty", patterns: [/青衣/, /tsing\s*yi/] },
  { slug: "mw", patterns: [/馬灣/, /ma\s*wan/] },
  { slug: "mos", patterns: [/馬鞍山/, /ma\s*on\s*shan/] },
  { slug: "ck", patterns: [/九龍塘正校/, /creative\s*kindergarten$/] },
];

function resolveCreativeCampusSlug(school) {
  const text = getSchoolSearchText(school);
  for (const matcher of CREATIVE_CAMPUS_MATCHERS) {
    if (matcher.patterns.some((pattern) => pattern.test(text))) {
      return matcher.slug;
    }
  }
  return null;
}

function getCreativeTargetSlugs(school) {
  const campusSlug = resolveCreativeCampusSlug(school);
  const baseSlugs = [campusSlug, "2627admissions", "admissions", "contact", "home"];
  if (campusSlug === "mos") {
    baseSlugs.unshift("mosadmissions");
  }
  return uniqueItems(baseSlugs);
}

async function fetchCreativeAdapterPages(school, website) {
  const origin = "https://creative.edu.hk";
  const pageIndex = await fetchJson(`${origin}/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,title`, {
    timeout: SUB_FETCH_TIMEOUT,
  });
  if (!Array.isArray(pageIndex) || pageIndex.length === 0) {
    return null;
  }

  const pagesBySlug = new Map(pageIndex.map((page) => [page.slug, page]));
  const targetSlugs = getCreativeTargetSlugs(school);
  const pages = [];
  const notes = [
    `host_adapter=creative_wp_rest`,
    `creative_target_slugs=${targetSlugs.join(",")}`,
  ];

  for (const slug of targetSlugs) {
    const summary = pagesBySlug.get(slug);
    if (!summary?.id) continue;

    const detail = await fetchJson(
      `${origin}/wp-json/wp/v2/pages/${summary.id}?_fields=id,slug,link,title,content`,
      { timeout: SUB_FETCH_TIMEOUT }
    );
    if (!detail?.content?.rendered) continue;

    pages.push(buildSyntheticHtmlPage(detail));
  }

  if (pages.length === 0) {
    return null;
  }

  return {
    pages,
    pdfTexts: [],
    spaDetected: false,
    notes: [...notes, `creative_pages=${pages.length}`, `normalized_origin=${origin}`, `original_website=${website}`],
  };
}

const GOOD_HEALTH_CAMPUS_MATCHERS = [
  { subdomain: "tys", patterns: [/青衣南/, /tsing\s*yi\s*south/] },
  { subdomain: "ty", patterns: [/青衣/, /tsing\s*yi/] },
  { subdomain: "mos", patterns: [/馬鞍山/, /ma\s*on\s*shan/] },
];

function resolveGoodHealthSubdomain(school) {
  const text = getSchoolSearchText(school);
  for (const matcher of GOOD_HEALTH_CAMPUS_MATCHERS) {
    if (matcher.patterns.some((pattern) => pattern.test(text))) {
      return matcher.subdomain;
    }
  }
  return "mos";
}

async function fetchGoodHealthAdapterPages(school, website) {
  const subdomain = resolveGoodHealthSubdomain(school);
  const origin = `https://${subdomain}.good-health.edu.hk`;
  const urls = [
    `${origin}/`,
    `${origin}/admission/`,
    `${origin}/contact-us/`,
    `${origin}/about-us/`,
  ];
  const pages = [];
  const notes = [
    "host_adapter=good_health_campus",
    `good_health_subdomain=${subdomain}`,
    `original_website=${website}`,
  ];

  for (const url of urls) {
    const fetched = await fetchHtmlWithFallback(url, {
      domainPolicy: getDomainPolicy(url) ?? getDomainPolicy(website),
      timeout: url === `${origin}/` ? FETCH_TIMEOUT : SUB_FETCH_TIMEOUT,
    });
    notes.push(...fetched.notes.map((note) => `${getUrlHost(url) || "adapter"}: ${note}`));

    const response = fetched.response;
    if (!response || response.type !== "html") continue;
    if (htmlTextLength(response.text) < 120) continue;

    pages.push({ url: response.url || url, html: response.text });
  }

  if (pages.length === 0) {
    return null;
  }

  return {
    pages,
    pdfTexts: [],
    spaDetected: false,
    notes: [...notes, `good_health_pages=${pages.length}`],
  };
}

async function fetchGcieduAdapterPages(school, website) {
  const urls = [
    "https://gciedu.hk/home/",
    "https://gciedu.hk/home/2024/13730/",
    "https://gciedu.hk/home/?p=132",
    "https://gciedu.hk/home/2021/15223/",
  ];
  const pages = [];
  const notes = [
    "host_adapter=gciedu_fixed_navigation",
    `original_website=${website}`,
  ];

  for (const url of urls) {
    const fetched = await fetchHtmlWithFallback(url, {
      domainPolicy: getDomainPolicy(url) ?? getDomainPolicy(website),
      timeout: url === urls[0] ? FETCH_TIMEOUT : SUB_FETCH_TIMEOUT,
    });
    notes.push(...fetched.notes.map((note) => `${getUrlHost(url) || "adapter"}: ${note}`));

    const response = fetched.response;
    if (!response || response.type !== "html") continue;
    if (htmlTextLength(response.text) < 120) continue;

    pages.push({ url: response.url || url, html: response.text });
  }

  if (pages.length === 0) {
    return null;
  }

  return {
    pages,
    pdfTexts: [],
    spaDetected: false,
    notes: [...notes, `gciedu_pages=${pages.length}`],
  };
}

function getSalvationArmyBranchRoot(website) {
  try {
    const url = new URL(website);
    const match = url.pathname.match(/^(\/esd\/[^/]+\/)/i);
    if (match) {
      return new URL(match[1], `${url.protocol}//${url.host}`).href;
    }
  } catch {
    return null;
  }
  return null;
}

async function fetchSalvationArmyAdapterPages(school, website, domainPolicy) {
  const branchRoot = getSalvationArmyBranchRoot(website);
  if (!branchRoot) return null;

  const candidateUrls = uniqueItems([
    website,
    branchRoot,
    new URL("home.html", branchRoot).href,
    new URL("index.html", branchRoot).href,
    new URL("about-us.html", branchRoot).href,
    new URL("our-curriculum.html", branchRoot).href,
    new URL("admissions.html", branchRoot).href,
    new URL("application-procedures.html", branchRoot).href,
    new URL("contact-us.html", branchRoot).href,
  ]);

  const pages = [];
  const notes = [
    "host_adapter=salvation_army_branch",
    `salvation_branch_root=${branchRoot}`,
  ];

  for (const url of candidateUrls) {
    if (!(await isAllowedByRobots(url))) continue;

    const fetched = await fetchHtmlWithFallback(url, {
      domainPolicy: getDomainPolicy(url) ?? domainPolicy,
      timeout: url === website ? FETCH_TIMEOUT : SUB_FETCH_TIMEOUT,
    });
    notes.push(...fetched.notes.map((note) => `${getUrlHost(url) || "adapter"}: ${note}`));

    const response = fetched.response;
    if (!response || response.type !== "html") continue;
    if (htmlTextLength(response.text) < 80) continue;

    pages.push({ url: response.url || url, html: response.text });
    if (pages.length >= 5) break;
  }

  return {
    pages,
    pdfTexts: [],
    spaDetected: false,
    notes: pages.length > 0 ? [...notes, `salvation_pages=${pages.length}`] : [...notes, "salvation_adapter_no_live_pages"],
  };
}

async function fetchAbcPathwaysAdapterPages(school, website, domainPolicy) {
  const rootUrl = "https://www.abcpathways.edu.hk/";
  const candidateUrls = uniqueItems([
    rootUrl,
    new URL("%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/", rootUrl).href,
    new URL("%E5%85%A5%E5%AD%B8%E8%AC%9B%E5%BA%A7%E5%8F%8A%E9%9D%A2%E8%A9%A6%E6%97%A5/", rootUrl).href,
    new URL("2026admissionevents/", rootUrl).href,
    new URL("%E9%97%9C%E6%96%BCabc/", rootUrl).href,
    new URL("%E6%88%91%E5%80%91%E7%9A%84%E6%A0%A1%E8%88%8D/", rootUrl).href,
  ]);

  const pages = [];
  const notes = [
    "host_adapter=abc_pathways_navigation",
    `original_website=${website}`,
  ];

  for (const url of candidateUrls) {
    if (!(await isAllowedByRobots(url))) continue;

    const fetched = await fetchHtmlWithFallback(url, {
      domainPolicy: getDomainPolicy(url) ?? domainPolicy,
      timeout: url === rootUrl ? FETCH_TIMEOUT : SUB_FETCH_TIMEOUT,
    });
    notes.push(...fetched.notes.map((note) => `${getUrlHost(url) || "adapter"}: ${note}`));

    const response = fetched.response;
    if (!response || response.type !== "html") continue;
    if (htmlTextLength(response.text) < 120) continue;

    pages.push({ url: response.url || url, html: response.text });
  }

  if (pages.length === 0) {
    return null;
  }

  return {
    pages,
    pdfTexts: [],
    spaDetected: false,
    notes: [...notes, `abc_pages=${pages.length}`],
  };
}

async function fetchWithHostAdapter(school, website, domainPolicy) {
  const host = getUrlHost(website);
  if (!host) return null;

  if (host === "creative.edu.hk" || host === "www.creative.edu.hk") {
    return fetchCreativeAdapterPages(school, website, domainPolicy);
  }

  if (host === "www.salvationarmy.org.hk" || host === "salvationarmy.org.hk") {
    return fetchSalvationArmyAdapterPages(school, website, domainPolicy);
  }

  if (host === "www.abcpathways.edu.hk") {
    return fetchAbcPathwaysAdapterPages(school, website, domainPolicy);
  }

  if (host === "www.good-health.edu.hk") {
    return fetchGoodHealthAdapterPages(school, website, domainPolicy);
  }

  if (host === "www.gciedu.hk" || host === "gciedu.hk") {
    return fetchGcieduAdapterPages(school, website, domainPolicy);
  }

  return null;
}

// ── PDF parsing ───────────────────────────────────────────────────────────

async function fetchPdf(url) {
  const resp = await rateLimitedFetch(url, { acceptPdf: true, timeout: SUB_FETCH_TIMEOUT });
  if (!resp || resp.type !== "pdf") return null;
  try {
    const parsed = await pdfParse(resp.buffer, { max: 10 }); // max 10 pages
    return parsed.text || null;
  } catch {
    return null;
  }
}

function extractApplicationUrl($, baseUrl) {
  const keywords = /apply|admission|報名|入學|招生|registration|application/i;
  const links = $("a").toArray();
  for (const el of links) {
    const href = $(el).attr("href") || "";
    const text = $(el).text().trim();
    if (keywords.test(href) || keywords.test(text)) {
      if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
        try {
          return new URL(href, baseUrl).href;
        } catch {
          return href;
        }
      }
    }
  }
  return null;
}

function extractOpenDayDate(fullText) {
  const pattern = /(20\d{2})[-/年](\d{1,2})[-/月](\d{1,2})[日號]?/g;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidates = [];

  let m;
  while ((m = pattern.exec(fullText)) !== null) {
    const year = parseInt(m[1], 10);
    const month = parseInt(m[2], 10);
    const day = parseInt(m[3], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const d = new Date(year, month - 1, day);
      if (d >= today) {
        candidates.push(d);
      }
    }
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.getTime() - b.getTime());
  const nearest = candidates[0];
  const yy = nearest.getFullYear();
  const mm = String(nearest.getMonth() + 1).padStart(2, "0");
  const dd = String(nearest.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function extractSectionByHeading($, keywords, maxChars = 600) {
  const headings = $("h1, h2, h3, h4, h5, h6").toArray();
  for (const h of headings) {
    const headText = $(h).text().trim();
    if (keywords.test(headText)) {
      const parts = [];
      let node = $(h).next();
      let len = 0;
      for (let i = 0; i < 5 && node.length > 0; i++) {
        const t = node.text().trim();
        if (t) {
          parts.push(t);
          len += t.length;
          if (len >= maxChars) break;
        }
        node = node.next();
      }
      if (parts.length > 0) {
        return parts.join("\n").slice(0, maxChars);
      }
    }
  }
  return null;
}

function extractSectionByPseudoHeading($, keywords, maxChars = 600) {
  const candidates = $("div.title, div.section-title, p.title, strong, b, .heading, dt, .tab-title, .accordion-title, .panel-title").toArray();
  for (const el of candidates) {
    const headText = $(el).text().trim();
    if (!keywords.test(headText)) continue;
    const parts = [];
    let node = $(el).next();
    let len = 0;
    for (let i = 0; i < 5 && node.length > 0; i++) {
      const t = node.text().trim();
      if (t) {
        parts.push(t);
        len += t.length;
        if (len >= maxChars) break;
      }
      node = node.next();
    }
    // Also try parent's next siblings
    if (parts.length === 0) {
      const parent = $(el).parent();
      node = parent.next();
      for (let i = 0; i < 5 && node.length > 0; i++) {
        const t = node.text().trim();
        if (t) {
          parts.push(t);
          len += t.length;
          if (len >= maxChars) break;
        }
        node = node.next();
      }
    }
    if (parts.length > 0) {
      return parts.join("\n").slice(0, maxChars);
    }
  }
  return null;
}

function extractSectionCombined($, keywords, maxChars = 600) {
  return extractSectionByHeading($, keywords, maxChars)
    || extractSectionByPseudoHeading($, keywords, maxChars);
}

function extractVacancyStatus(fullText, grade) {
  const gradeLabel = grade.toUpperCase();
  const patterns = [
    { regex: new RegExp(`${gradeLabel}[^\\n]{0,20}(尚有學額|有學額|接受申請|accepting)`, "i"), status: "available" },
    { regex: new RegExp(`${gradeLabel}[^\\n]{0,20}(已滿|額滿|full|no vacancy)`, "i"), status: "full" },
    { regex: new RegExp(`${gradeLabel}[^\\n]{0,20}(候補|waiting|waitlist)`, "i"), status: "waitlist" },
    { regex: new RegExp(`${gradeLabel}[^\\n]{0,20}(不接受|closed|截止)`, "i"), status: "closed" },
  ];
  for (const p of patterns) {
    if (p.regex.test(fullText)) return p.status;
  }
  return null;
}

function extractFromHtml(htmlPages, website, pdfTexts = []) {
  const result = {
    application_url: null,
    open_day_date: null,
    application_process: null,
    open_day_details: null,
    admission_hours: null,
    vacancy_k1: null,
    vacancy_k2: null,
    vacancy_k3: null,
  };

  let allText = "";

  for (const page of htmlPages) {
    const $ = cheerio.load(page.html);
    $("script, style, noscript").remove();
    const pageText = $("body").text().replace(/\s+/g, " ").trim();
    allText += " " + pageText;
    const pageBaseUrl = page.url || website;

    if (!result.application_url) {
      result.application_url = extractApplicationUrl($, pageBaseUrl);
    }
    if (!result.application_process) {
      result.application_process = extractSectionCombined(
        $,
        /招生|入學程序|入學申請|Admission|How to Apply|報名辦法|入學須知|Application/i
      );
    }
    if (!result.open_day_details) {
      result.open_day_details = extractSectionCombined(
        $,
        /開放日|Open Day|簡介會|School Tour|參觀|Campus Visit/i
      );
    }
    if (!result.admission_hours) {
      result.admission_hours = extractSectionCombined(
        $,
        /上課時間|School Hours|開學|辦公時間|Office Hours|上學時間|Class Schedule/i,
        300
      );
    }
  }

  // Append PDF text
  for (const pdfText of pdfTexts) {
    allText += " " + pdfText;
    // For PDF: use first 600 chars as application_process if we don't have one
    if (!result.application_process && pdfText.length > 50) {
      result.application_process = pdfText.slice(0, 600).trim();
    }
  }

  result.open_day_date = extractOpenDayDate(allText);
  result.vacancy_k1 = extractVacancyStatus(allText, "K1");
  result.vacancy_k2 = extractVacancyStatus(allText, "K2");
  result.vacancy_k3 = extractVacancyStatus(allText, "K3");

  return result;
}

function computeContentHash(extracted) {
  const parts = [
    extracted.application_url,
    extracted.open_day_date,
    extracted.application_process,
    extracted.open_day_details,
    extracted.admission_hours,
    extracted.vacancy_k1,
    extracted.vacancy_k2,
    extracted.vacancy_k3,
  ].map((v) => v ?? "").join("|");
  return createHash("sha256").update(parts).digest("hex").slice(0, 32);
}

// ─── Fetch pages ──────────────────────────────────────────────────────────

async function fetchSchoolPages(school, website, domainPolicy = null) {
  if (!website) return { pages: [], pdfTexts: [], spaDetected: false, notes: [] };

  const adapterResult = await fetchWithHostAdapter(school, website, domainPolicy);
  if (adapterResult) return adapterResult;

  let base;
  try {
    base = new URL(website);
  } catch {
    return { pages: [], pdfTexts: [], spaDetected: false, notes: ["invalid URL"] };
  }

  const notes = [];
  const seen = new Set();
  const results = [];
  const pdfTexts = [];

  // 1. Fetch base page
  const baseFetch = await fetchHtmlWithFallback(website, { domainPolicy, timeout: FETCH_TIMEOUT });
  notes.push(...baseFetch.notes);
  const baseResp = baseFetch.response;
  if (!baseResp || baseResp.type !== "html") {
    return {
      pages: [],
      pdfTexts: [],
      spaDetected: false,
      notes: [...notes, "base page unreachable"],
    };
  }
  let resolvedBaseUrl = baseResp.url || website;
  let baseHtml = baseResp.text;

  const metaRefreshUrl = extractMetaRefreshTarget(baseHtml, resolvedBaseUrl);
  if (metaRefreshUrl && metaRefreshUrl !== resolvedBaseUrl) {
    const refreshFetch = await fetchHtmlWithFallback(metaRefreshUrl, {
      domainPolicy: getDomainPolicy(metaRefreshUrl) ?? domainPolicy,
      timeout: SUB_FETCH_TIMEOUT,
    });
    notes.push(`meta_refresh=${metaRefreshUrl}`);
    notes.push(...refreshFetch.notes.map((note) => `${getUrlHost(metaRefreshUrl) || "meta-refresh"}: ${note}`));
    if (refreshFetch.response?.type === "html") {
      resolvedBaseUrl = refreshFetch.response.url || metaRefreshUrl;
      baseHtml = refreshFetch.response.text;
    }
  }

  const origin = `${new URL(resolvedBaseUrl).protocol}//${new URL(resolvedBaseUrl).host}`;
  seen.add(website);
  seen.add(resolvedBaseUrl);

  if (looksLikeAntiBotHtml(baseHtml)) {
    return {
      pages: [],
      pdfTexts: [],
      spaDetected: false,
      notes: [...notes, `anti_bot_challenge=${getUrlHost(resolvedBaseUrl) || getUrlHost(website) || "unknown"}`],
    };
  }

  // 2. SPA detection
  const $base = cheerio.load(baseHtml);
  const rootTextLen = $base("body").text().replace(/\s+/g, " ").trim().length;
  const hasAppRoot = $base("#app, #root, [data-reactroot], script[src*='next'], script[src*='nuxt'], script[src*='gatsby']").length > 0;
  if (rootTextLen < 500 && hasAppRoot) {
    return { pages: [], pdfTexts: [], spaDetected: true, notes: ["SPA site, needs Playwright"] };
  }

  if (rootTextLen >= 100) {
    results.push({ url: resolvedBaseUrl, html: baseHtml });
  } else {
    notes.push(`base page textLen=${rootTextLen}, too short`);
  }

  // 3. Dynamic link discovery from base page
  let candidateUrls = discoverCandidateUrls($base, origin);

  // 4. If no candidates found via discovery, fall back to hardcoded SUB_PATHS
  if (candidateUrls.length === 0) {
    candidateUrls = SUB_PATHS.map((p) => `${origin}${p}`);
    notes.push("no dynamic links found, using SUB_PATHS fallback");
  }

  // 5. Discover PDF links
  const pdfLinks = discoverPdfLinks($base, origin);

  // 6. Fetch candidate pages
  for (const u of candidateUrls) {
    if (seen.has(u)) continue;
    seen.add(u);
    if (results.length >= 5) break;

    if (!(await isAllowedByRobots(u))) continue;

    const subFetch = await fetchHtmlWithFallback(u, {
      domainPolicy: getDomainPolicy(u) ?? domainPolicy,
      timeout: SUB_FETCH_TIMEOUT,
    });
    notes.push(...subFetch.notes.map((note) => `${new URL(u).host}: ${note}`));
    const resp = subFetch.response;
    if (!resp || resp.type !== "html") continue;

    const textLen = htmlTextLength(resp.text);
    if (textLen < 100) continue;

    results.push({ url: resp.url || u, html: resp.text });

    // Also discover PDF links from sub-pages
    const $sub = cheerio.load(resp.text);
    const subPdfLinks = discoverPdfLinks($sub, origin);
    for (const pl of subPdfLinks) {
      if (!pdfLinks.includes(pl)) pdfLinks.push(pl);
    }
  }

  // 7. Fetch PDFs (max 3)
  for (const pdfUrl of pdfLinks.slice(0, 3)) {
    if (!(await isAllowedByRobots(pdfUrl))) continue;
    const text = await fetchPdf(pdfUrl);
    if (text && text.length > 50) {
      pdfTexts.push(text);
      notes.push(`PDF parsed: ${pdfUrl}`);
    }
  }

  return { pages: results, pdfTexts, spaDetected: false, notes };
}

// P0: URL-level cache wrapper — same URL only crawled once
function getFetchCacheKey(school, website) {
  const key = website?.trim().toLowerCase();
  const host = getUrlHost(website);
  if (!key) return "";
  if (host === "creative.edu.hk" || host === "www.creative.edu.hk") {
    return `${key}::${school?.id || school?.name_tc || school?.name_en || "shared"}`;
  }
  if (host === "www.tutortime.com.hk") {
    return host;
  }
  return key;
}

async function fetchSchoolPagesWithCache(school, website) {
  const key = getFetchCacheKey(school, website);
  if (!key) return { pages: [], pdfTexts: [], spaDetected: false, notes: [] };
  if (urlPageCache.has(key)) {
    return urlPageCache.get(key);
  }
  const result = await fetchSchoolPages(school, website, getDomainPolicy(website));
  urlPageCache.set(key, result);
  return result;
}

// ─── DB helpers ───────────────────────────────────────────────────────────

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

async function loadTargetSchools(supabase) {
  let query = supabase
    .from("schools")
    .select("id, name_tc, name_en, website, school_type")
    .eq("is_active", true)
    .not("website", "is", null);

  if (SCHOOL_IDS && SCHOOL_IDS.length > 0) {
    query = query.in("id", SCHOOL_IDS);
  } else if (SCHOOL_TYPE) {
    query = query.eq("school_type", SCHOOL_TYPE);
  }
  // Default: ALL active schools with a website

  const { data, error } = await query.order("name_tc");
  if (error) throw error;

  let rows = data || [];
  if (SCHOOL_IDS && SCHOOL_IDS.length > 0) {
    const targetIds = new Set(SCHOOL_IDS);
    rows = rows.filter((row) => targetIds.has(row.id));
  }
  return LIMIT > 0 ? rows.slice(0, LIMIT) : rows;
}

async function getExistingHash(supabase, schoolId) {
  const { data } = await supabase
    .from("school_enrichments")
    .select("content_hash")
    .eq("school_id", schoolId)
    .maybeSingle();
  return data?.content_hash ?? null;
}

function determineScrapeConfidence(extracted) {
  let found = 0;
  if (extracted.application_url) found++;
  if (extracted.open_day_date) found++;
  if (extracted.application_process) found++;
  if (extracted.admission_hours) found++;
  if (extracted.vacancy_k1 || extracted.vacancy_k2 || extracted.vacancy_k3) found++;
  if (found >= 3) return "high";
  if (found >= 1) return "medium";
  return "low";
}

async function upsertEnrichment(supabase, schoolId, extracted, contentHash, diag = {}) {
  const diagFields = {
    scrape_status: diag.scrape_status ?? null,
    scrape_notes: diag.scrape_notes ?? null,
    pages_fetched: diag.pages_fetched ?? 0,
  };
  const basePayload = {
    school_id: schoolId,
    admission_hours: extracted?.admission_hours ?? null,
    application_process: extracted?.application_process ?? null,
    application_url: extracted?.application_url ?? null,
    open_day_date: extracted?.open_day_date ?? null,
    open_day_details: extracted?.open_day_details ?? null,
    vacancy_k1: extracted?.vacancy_k1 ?? null,
    vacancy_k2: extracted?.vacancy_k2 ?? null,
    vacancy_k3: extracted?.vacancy_k3 ?? null,
    vacancy_last_checked: new Date().toISOString().split("T")[0],
    content_hash: contentHash,
    scrape_confidence: extracted ? determineScrapeConfidence(extracted) : "low",
    last_crawled_at: new Date().toISOString(),
  };

  // Try with diagnostic columns first, fallback without if schema cache is stale
  const { error } = await supabase
    .from("school_enrichments")
    .upsert({ ...basePayload, ...diagFields }, { onConflict: "school_id" });
  if (error) {
    if (error.code === "PGRST204") {
      // Schema cache doesn't know about new columns yet — retry without them
      const { error: err2 } = await supabase
        .from("school_enrichments")
        .upsert(basePayload, { onConflict: "school_id" });
      if (err2) throw err2;
      return;
    }
    throw error;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function processSchool(school, supabase) {
  const name = school.name_tc || school.name_en;
  const crawlWebsite = normalizeWebsiteWithPolicy(school.website);
  const domainPolicy = getDomainPolicy(crawlWebsite);

  if (!school.website) {
    // Upsert a failure record
    if (!DRY_RUN && supabase) {
      try {
        await upsertEnrichment(supabase, school.id, null, null, {
          scrape_status: "no_website",
          scrape_notes: "no website URL in DB",
          pages_fetched: 0,
        });
      } catch (e) { console.error(`[school-website]   upsert warning: ${e.message}`); }
    }
    return { school, status: "no_website" };
  }

  console.log(`[school-website] processing: ${name} (${school.website})`);
  if (crawlWebsite !== school.website) {
    console.log(`[school-website]   normalized -> ${crawlWebsite}`);
  }

  // Check robots.txt first
  let robotsBlocked = false;
  try {
    robotsBlocked = !(await isAllowedByRobots(crawlWebsite));
  } catch { /* treat as allowed */ }
  if (robotsBlocked) {
    console.log(`[school-website]   robots_blocked`);
    if (!DRY_RUN && supabase) {
      try {
        await upsertEnrichment(supabase, school.id, null, null, {
          scrape_status: "robots_blocked",
          scrape_notes: `robots.txt disallows ${crawlWebsite}`,
          pages_fetched: 0,
        });
      } catch (e) { console.error(`[school-website]   upsert warning: ${e.message}`); }
    }
    return { school, status: "robots_blocked" };
  }

  const { pages, pdfTexts, spaDetected, notes } = await fetchSchoolPagesWithCache(school, crawlWebsite);
  const pagesFetched = pages.length + pdfTexts.length;
  const scrapeNotes = [...notes];
  if (crawlWebsite !== school.website) {
    scrapeNotes.unshift(`normalized_url=${crawlWebsite}`);
  }
  if (domainPolicy?.note) {
    scrapeNotes.unshift(`domain_policy=${domainPolicy.note}`);
  }

  if (spaDetected) {
    console.log(`[school-website]   spa_detected`);
    if (!DRY_RUN && supabase) {
      try {
        await upsertEnrichment(supabase, school.id, null, null, {
          scrape_status: "spa_detected",
          scrape_notes: scrapeNotes.join("; "),
          pages_fetched: 0,
        });
      } catch (e) { console.error(`[school-website]   upsert warning: ${e.message}`); }
    }
    return { school, status: "spa_detected", crawlUrl: crawlWebsite, notes: scrapeNotes };
  }

  if (pages.length === 0 && pdfTexts.length === 0) {
    console.log(`[school-website]   unreachable — no pages fetched`);
    if (!DRY_RUN && supabase) {
      try {
        await upsertEnrichment(supabase, school.id, null, null, {
          scrape_status: "unreachable",
          scrape_notes: scrapeNotes.join("; ") || "no pages fetched",
          pages_fetched: 0,
        });
      } catch (e) { console.error(`[school-website]   upsert warning: ${e.message}`); }
    }
    return { school, status: "unreachable", crawlUrl: crawlWebsite, notes: scrapeNotes };
  }

  // Check if this is PDF-only (no HTML pages with useful content, only PDFs)
  const isPdfOnly = pages.length === 0 && pdfTexts.length > 0;

  try {
    const extracted = extractFromHtml(pages, school.website, pdfTexts);
    const contentHash = computeContentHash(extracted);
    const conf = determineScrapeConfidence(extracted);

    if (isPdfOnly) scrapeNotes.unshift("PDF-only extraction");

    if (conf === "low" && !extracted.application_url && !extracted.open_day_date) {
      // Build diagnostic notes
      const baseTextLen = pages.length > 0
        ? cheerio.load(pages[0].html)("body").text().replace(/\s+/g, " ").trim().length
        : 0;
      scrapeNotes.push(`confidence=low, baseTextLen=${baseTextLen}, pages=${pages.length}, pdfs=${pdfTexts.length}`);
      console.log(`[school-website]   content_insufficient`);
      if (!DRY_RUN && supabase) {
        await upsertEnrichment(supabase, school.id, extracted, contentHash, {
          scrape_status: isPdfOnly ? "pdf_only" : "content_insufficient",
          scrape_notes: scrapeNotes.join("; "),
          pages_fetched: pagesFetched,
        });
      }
      return { school, status: isPdfOnly ? "pdf_only" : "content_insufficient", extracted, crawlUrl: crawlWebsite, notes: scrapeNotes };
    }

    if (DRY_RUN) {
      console.log(`[school-website]   dry-run extracted:`);
      console.log(JSON.stringify(extracted, null, 2));
      console.log(`[school-website]   content_hash: ${contentHash}`);
      return { school, status: "dry_run", extracted, crawlUrl: crawlWebsite, notes: scrapeNotes };
    }

    const existingHash = await getExistingHash(supabase, school.id);
    if (existingHash === contentHash) {
      const updatePayload = { last_crawled_at: new Date().toISOString() };
      const diagPayload = {
        ...updatePayload,
        scrape_status: "unchanged",
        scrape_notes: scrapeNotes.join("; ") || null,
        pages_fetched: pagesFetched,
      };
      const { error: ue } = await supabase
        .from("school_enrichments")
        .update(diagPayload)
        .eq("school_id", school.id);
      if (ue && ue.code === "PGRST204") {
        await supabase
          .from("school_enrichments")
          .update(updatePayload)
          .eq("school_id", school.id);
      }
      console.log(`[school-website]   unchanged (hash match) — updated last_crawled_at`);
      return { school, status: "unchanged", crawlUrl: crawlWebsite, notes: scrapeNotes };
    }

    await upsertEnrichment(supabase, school.id, extracted, contentHash, {
      scrape_status: "ok",
      scrape_notes: scrapeNotes.join("; ") || null,
      pages_fetched: pagesFetched,
    });
    console.log(`[school-website]   upserted (confidence=${conf}, pages=${pagesFetched})`);
    return { school, status: "ok", extracted, crawlUrl: crawlWebsite, notes: scrapeNotes };
  } catch (err) {
    console.error(`[school-website]   error:`, err.message);
    if (!DRY_RUN && supabase) {
      try {
        await upsertEnrichment(supabase, school.id, null, null, {
          scrape_status: "error",
          scrape_notes: err.message?.slice(0, 500),
          pages_fetched: pagesFetched,
        });
      } catch { /* ignore upsert error during error handling */ }
    }
    return { school, status: "error", error: err.message, crawlUrl: crawlWebsite, notes: scrapeNotes };
  }
}

async function main() {
  console.log(
    `[school-website] starting — dry-run=${DRY_RUN} limit=${LIMIT || "∞"} school-type=${SCHOOL_TYPE || "all"} concurrency=${CONCURRENCY}`
  );

  let schools;
  let supabase = null;

  if (DRY_RUN && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log("[school-website] dry-run without SUPABASE env — using synthetic test schools");
    schools = [
      { id: "test-1", name_tc: "測試學校A", name_en: "Test School A", website: "https://example.com" },
    ];
  } else {
    supabase = getSupabase();
    schools = await loadTargetSchools(supabase);
  }

  console.log(`[school-website] loaded ${schools.length} target schools`);

  const results = [];
  for (let i = 0; i < schools.length; i += CONCURRENCY) {
    const batch = schools.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map((s) => processSchool(s, supabase)));
    results.push(...batchResults);
  }

  const stats = {
    total: results.length,
    ok: results.filter((r) => r.status === "ok").length,
    unchanged: results.filter((r) => r.status === "unchanged").length,
    content_insufficient: results.filter((r) => r.status === "content_insufficient").length,
    robots_blocked: results.filter((r) => r.status === "robots_blocked").length,
    unreachable: results.filter((r) => r.status === "unreachable").length,
    spa_detected: results.filter((r) => r.status === "spa_detected").length,
    pdf_only: results.filter((r) => r.status === "pdf_only").length,
    no_website: results.filter((r) => r.status === "no_website").length,
    dry_run: results.filter((r) => r.status === "dry_run").length,
    error: results.filter((r) => r.status === "error").length,
  };
  console.log(`[school-website] done:`, JSON.stringify(stats, null, 2));

  // Optional JSON report
  if (JSON_REPORT) {
    const report = {
      timestamp: new Date().toISOString(),
      stats,
      details: results.map((r) => ({
        school_id: r.school.id,
        name_tc: r.school.name_tc,
        name_en: r.school.name_en,
        website: r.school.website,
        crawl_url: r.crawlUrl ?? r.school.website,
        status: r.status,
        error: r.error ?? null,
        notes: r.notes ?? [],
      })),
    };
    writeFileSync(JSON_REPORT, JSON.stringify(report, null, 2), "utf-8");
    console.log(`[school-website] JSON report written to: ${JSON_REPORT}`);
  }

  // Return stats for batch orchestrator
  return stats;
}

main().catch((err) => {
  console.error("[school-website] fatal:", err);
  process.exit(1);
});
