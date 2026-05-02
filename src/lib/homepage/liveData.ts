import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@/lib/supabase/server";
import {
  MEDIA_CONTENT_TYPE_LABELS,
  MEDIA_SOURCE_LABELS,
  fetchMediaArticles,
  type MediaArticle,
} from "@/lib/db/mediaArticles";
import {
  FEATURED_SCHOOLS,
  NEWS_ITEMS,
  SCHOOL_EVENTS,
} from "@/data/homepage";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  formatEnglishSchoolName,
} from "@/lib/utils";
import type {
  FeaturedSchool,
  HomeBanner,
  NewsItem,
  SchoolEventItem,
} from "@/types/homepage";

type EnrichmentRow = {
  school_code?: string | null;
  name_tc?: string | null;
  name_en?: string | null;
  website?: string | null;
  open_day_details?: string | null;
  open_day_url?: string | null;
  application_details?: string | null;
  application_url?: string | null;
};

type SchoolListRow = {
  code?: string | null;
  name_tc?: string | null;
  name_en?: string | null;
  district?: keyof typeof DISTRICT_LABELS | null;
  school_type?: string | null;
  session?: string | null;
  k1?: string | null;
  k2?: string | null;
  k3?: string | null;
  edb_date?: string | null;
};

const HOMEPAGE_BANNER_ENABLED_VALUES = new Set([
  "1",
  "true",
  "on",
  "yes",
  "enabled",
]);

function isHomepageBannerEnabled() {
  const raw = process.env.HOMEPAGE_BANNER_ENABLED?.trim().toLowerCase();
  if (!raw) return false;
  return HOMEPAGE_BANNER_ENABLED_VALUES.has(raw);
}

const BANNER_IMAGES = [
  {
    src: "/images/banners/暖金色晨光-Banner-01.png",
    alt: "溫暖明亮的幼稚園教室",
    layout: "classic",
  },
  {
    src: "/images/banners/美术室午后-Banner-02.png",
    alt: "孩子在美術室內專注創作",
    layout: "event",
  },
  {
    src: "/images/banners/阅读角午后-Banner-03.png",
    alt: "安靜舒適的兒童閱讀角",
    layout: "minimal",
  },
] as const satisfies Array<{
  src: string;
  alt: string;
  layout: HomeBanner["layout"];
}>;

/* ─── Regex filters ─── */

const KG_NEWS_REGEX =
  /(kindergarten|\bk[123](?!\d)|pre-primary|pre primary|preschool|幼稚園|幼兒班|收生安排|收生|註冊證|註冊|家長簡介會)/i;
const HK01_KG_NEWS_REGEX =
  /(幼稚園|幼兒(?!車)|\bk[123](?!\d)|學前|收生|入學|\bpn\b|幼教|校舍|停辦|學券|概覽)/i;
const NOISE_REGEX =
  /(smart parent net|parent-child code|secondary|primary one|senior secondary|principals and teachers|vacant kindergarten premises|jupas|dse|大學|大学|中學|中学|小一|升小|小六|p\.?[1-6]|呈分試|常識科|默書|呈分|統一派位|世界排名)/i;

// Sensational / accident news that mentions 幼兒/幼稚園 incidentally but is
// not useful to a parent making school decisions (accidents, crime, deaths).
const SENSATIONAL_REGEX =
  /(墮.{0,4}(軌|樓|海|河|車|斃)|跳.{0,3}(軌|樓|車)|虐|斃命|殞命|遇害|罪案|搶劫|猥褻|性侵|綁架|失蹤|墜樓|身亡|罹難|燒傷|燒死|溺斃|車禍|肉身護)/;
const OPEN_DAY_REGEX =
  /(open day|open house|school tour|campus tour|visit us|校園參觀|開放日|參觀)/i;
const ADMISSION_REGEX =
  /(admission|apply|application|enrol|enrollment|招生|入學|申請|收生)/i;
const BLOCKED_URL_REGEX = /(godaddy\.com|javascript:|facebook\.com)/i;

/* ─── Freshness constants ─── */

/** Only show news published within the last 60 days */
const MAX_NEWS_AGE_DAYS = 60;
/** Show events up to 30 days in the future */
const MAX_EVENT_FUTURE_DAYS = 30;
/** Keep past events for 7 days after they occurred */
const MAX_EVENT_PAST_DAYS = 7;
/** Timeline page: show events up to 90 days in the future */
const MAX_TIMELINE_FUTURE_DAYS = 90;

/* ─── Text helpers ─── */

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&hellip;/g, "\u2026");
}

function stripHtml(value: string): string {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(value: string): string {
  return stripHtml(value)
    .replace(/\s*[-|]\s*Education Bureau$/i, "")
    .replace(/\s*[-|]\s*教.?局$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shorten(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}\u2026`;
}

function formatMonthDay(dateInput: string): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return dateInput;
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function parseDate(dateInput: string): Date | null {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/** Returns true if the date is within the last MAX_NEWS_AGE_DAYS days */
function isRecent(publishedAt: string): boolean {
  const date = parseDate(publishedAt);
  if (!date) return false;
  const age = Date.now() - date.getTime();
  return age >= 0 && age < MAX_NEWS_AGE_DAYS * 24 * 60 * 60 * 1000;
}

function sortNewsByPublishedAt(items: NewsItem[]): NewsItem[] {
  return [...items].sort((first, second) => {
    const firstTime = parseDate(first.published_at)?.getTime() ?? 0;
    const secondTime = parseDate(second.published_at)?.getTime() ?? 0;
    return secondTime - firstTime;
  });
}

/* ─── Fetch helpers ─── */

function parseMetaContent(html: string, key: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return cleanText(match[1]);
  }

  return null;
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 21600 },
      headers: {
        "user-agent": "Mozilla/5.0 HKSchoolPlace/1.0",
      },
    });

    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

function parseRssItems(xml: string) {
  return Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)).map((match) => {
    const block = match[1];
    const title = decodeHtml(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
    const link = decodeHtml(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "").trim();
    const pubDate = decodeHtml(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "").trim();

    return { title, link, pubDate };
  });
}

function parseSitemapNewsItems(xml: string) {
  return Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)).map((match) => {
    const block = match[1];
    const title = decodeHtml(
      block.match(/<news:title>([\s\S]*?)<\/news:title>/i)?.[1] ?? ""
    ).trim();
    const link = decodeHtml(block.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1] ?? "").trim();
    const pubDate = decodeHtml(
      block.match(/<news:publication_date>([\s\S]*?)<\/news:publication_date>/i)?.[1] ??
        ""
    ).trim();

    return { title, link, pubDate };
  });
}

function isRelevantNews(title: string): boolean {
  return (
    KG_NEWS_REGEX.test(title) &&
    !NOISE_REGEX.test(title) &&
    !SENSATIONAL_REGEX.test(title)
  );
}

async function fetchNewsSummary(url: string, fallbackTitle: string): Promise<string> {
  const html = await fetchText(url);
  if (!html) return shorten(fallbackTitle, 58);

  const metaDescription =
    parseMetaContent(html, "description") ?? parseMetaContent(html, "og:description");

  if (metaDescription && metaDescription !== fallbackTitle) {
    return shorten(metaDescription, 58);
  }

  const firstParagraphMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (firstParagraphMatch?.[1]) {
    return shorten(cleanText(firstParagraphMatch[1]), 58);
  }

  return shorten(fallbackTitle, 58);
}

/* ─── Source category mapping ─── */

function toSourceCategory(source: string): "government" | "media" | "school" {
  if (source === "edb" || source === "govhk") return "government";
  if (source === "hk01") return "media";
  return "school";
}

function isExternalSource(source: string): boolean {
  return source !== "edb" && source !== "govhk";
}

function mediaArticleToNewsItem(article: MediaArticle): NewsItem {
  const publishedAt = article.published_at || new Date().toISOString();
  return {
    id: `media-${article.source}-${article.external_id}`,
    source: article.source,
    source_category: "media",
    source_label: MEDIA_SOURCE_LABELS[article.source],
    title: cleanText(article.title),
    summary: shorten(article.summary || article.body_excerpt || article.title, 72),
    date: formatMonthDay(publishedAt),
    published_at: publishedAt,
    href: article.url,
    is_external: true,
    content_type: article.content_type,
    content_type_label: MEDIA_CONTENT_TYPE_LABELS[article.content_type],
  };
}

/* ─── News fetchers ─── */

async function getEdbNewsItems(): Promise<NewsItem[]> {
  // Use Traditional Chinese RSS feed
  const rss = await fetchText("https://www.edb.gov.hk/tc/whats_new_rss.xml");
  if (!rss) return [];

  const relevant = parseRssItems(rss)
    .filter(
      (item) =>
        item.link &&
        item.title &&
        isRelevantNews(item.title) &&
        isRecent(item.pubDate)
    )
    .slice(0, 6);

  return Promise.all(
    relevant.map(async (item, index) => {
      const summary = await fetchNewsSummary(item.link, item.title);
      const source = item.link.includes("info.gov.hk") ? "govhk" : "edb";

      return {
        id: `live-news-edb-${index + 1}`,
        source,
        source_category: toSourceCategory(source),
        source_label: source === "govhk" ? "政府公報" : "教育局",
        title: cleanText(item.title),
        summary,
        date: formatMonthDay(item.pubDate),
        published_at: new Date(item.pubDate).toISOString(),
        href: item.link,
        is_external: isExternalSource(source),
      } satisfies NewsItem;
    })
  );
}

async function getHk01NewsItems(): Promise<NewsItem[]> {
  const sitemap = await fetchText("https://www.hk01.com/sitemapByLastMod.xml");
  if (!sitemap) return [];

  const relevant = parseSitemapNewsItems(sitemap)
    .filter(
      (item) =>
        item.link &&
        item.title &&
        isRecent(item.pubDate) &&
        HK01_KG_NEWS_REGEX.test(`${item.title} ${item.link}`) &&
        !NOISE_REGEX.test(`${item.title} ${item.link}`) &&
        !SENSATIONAL_REGEX.test(`${item.title} ${item.link}`)
    )
    .slice(0, 4);

  return Promise.all(
    relevant.map(async (item, index) => ({
      id: `live-news-hk01-${index + 1}`,
      source: "hk01",
      source_category: "media" as const,
      source_label: "HK01",
      title: cleanText(item.title),
      summary: await fetchNewsSummary(item.link, item.title),
      date: formatMonthDay(item.pubDate),
      published_at: new Date(item.pubDate).toISOString(),
      href: item.link,
      is_external: true,
    }))
  );
}

async function getLiveNewsItems(): Promise<NewsItem[]> {
  const [edbItems, hk01Items, mediaArticles] = await Promise.all([
    getEdbNewsItems(),
    getHk01NewsItems(),
    fetchMediaArticles(24),
  ]);

  const mediaItems = mediaArticles.map(mediaArticleToNewsItem);
  const liveItems = sortNewsByPublishedAt([...edbItems, ...hk01Items, ...mediaItems]);

  // If live fetch succeeded, merge with recent fallback (deduped)
  if (liveItems.length > 0) {
    const recentFallback = sortNewsByPublishedAt(
      NEWS_ITEMS.filter(
        (fallbackItem) =>
          isRecent(fallbackItem.published_at) &&
          !liveItems.some((item) => item.href === fallbackItem.href)
      )
    );
    return sortNewsByPublishedAt([...liveItems, ...recentFallback]).slice(0, 3);
  }

  // Live fetch completely failed — always return fallback data regardless of age
  return sortNewsByPublishedAt(NEWS_ITEMS).slice(0, 3);
}

/** Fetch all news (for /news page). No slice limit. */
export async function getAllNewsItems(): Promise<NewsItem[]> {
  const [edbItems, hk01Items, mediaArticles] = await Promise.all([
    getEdbNewsItems(),
    getHk01NewsItems(),
    fetchMediaArticles(100),
  ]);

  const mediaItems = mediaArticles.map(mediaArticleToNewsItem);
  const liveItems = sortNewsByPublishedAt([...edbItems, ...hk01Items, ...mediaItems]);

  if (liveItems.length > 0) {
    const recentFallback = sortNewsByPublishedAt(
      NEWS_ITEMS.filter(
        (fallbackItem) =>
          isRecent(fallbackItem.published_at) &&
          !liveItems.some((item) => item.href === fallbackItem.href)
      )
    );
    return sortNewsByPublishedAt([...liveItems, ...recentFallback]);
  }

  // Live fetch completely failed — return all fallback data regardless of age
  return sortNewsByPublishedAt(NEWS_ITEMS);
}

/* ─── Event helpers ─── */

const MONTH_KEYS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function buildIso(year: number, month: number, day: number): string | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `${year}-${pad(month)}-${pad(day)}`;
}

/**
 * Resolve a year-less month/day into a full ISO date.
 * If the date with the current year is more than 30 days in the past,
 * try the next year (covers e.g. "14 Mar" seen in late April).
 */
function resolveYearAware(month: number, day: number, explicitYear: number | null): string | null {
  if (explicitYear) return buildIso(explicitYear, month, day);

  const now = new Date();
  const currentYear = now.getFullYear();
  const candidate = buildIso(currentYear, month, day);
  if (!candidate) return null;
  const candidateDate = parseDate(candidate);
  if (!candidateDate) return null;

  const diffDays = (candidateDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
  if (diffDays < -MAX_EVENT_PAST_DAYS) {
    return buildIso(currentYear + 1, month, day);
  }
  return candidate;
}

/**
 * Extract an ISO date from free-form open-day text.
 * Supports:
 *   - Chinese:   `M月D日` (year optional)
 *   - English:   `14 Mar 2026`, `Mar 14, 2026`, `14th March`, `March 2026`
 *   - Numeric:   `YYYY-MM-DD`, `D/M/YYYY`, `M/D/YYYY` (heuristic: prefer D/M when first segment > 12)
 *   - Ranges:    `Apr & May 2026`, `14-15 Mar 2026` → first valid date in range
 *   - Seasons:   `2026春季` (Spring) / `夏季` (Summer) / `秋季` (Autumn) / `冬季` (Winter) → mid-month of season
 * Year resolution: if no year present and the inferred date is >7 days past,
 * roll forward to next year.
 */
function extractIsoDate(text: string): string | null {
  if (!text) return null;
  const cleaned = text.replace(/\s+/g, " ").trim();
  const lowered = cleaned.toLowerCase();

  // 1. ISO YYYY-MM-DD
  const iso = cleaned.match(/(20\d{2})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    const built = buildIso(Number(iso[1]), Number(iso[2]), Number(iso[3]));
    if (built) return built;
  }

  // 2. Chinese: optional 4-digit year + M月D日
  const cn = cleaned.match(/(?:(20\d{2})\s*年\s*)?(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (cn) {
    return resolveYearAware(Number(cn[2]), Number(cn[3]), cn[1] ? Number(cn[1]) : null);
  }

  // 3. English month range: "Apr & May 2026" → first future month, day 1.
  //    Run BEFORE single-month patterns so "Apr & May 2026" doesn't get mis-parsed as "Apr 20" day-of-year.
  const monthRange = lowered.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(?:&|and|to|-|–|—|\/)\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*(?:\s*,?\s*(20\d{2}))?/i);
  if (monthRange) {
    const m1 = MONTH_KEYS.indexOf(monthRange[1].toLowerCase()) + 1;
    const m2 = MONTH_KEYS.indexOf(monthRange[2].toLowerCase()) + 1;
    const year = monthRange[3] ? Number(monthRange[3]) : null;
    const candidate1 = resolveYearAware(m1, 1, year);
    const candidate2 = resolveYearAware(m2, 1, year);
    const now = new Date();
    const c1 = candidate1 ? parseDate(candidate1) : null;
    if (c1 && (c1.getTime() - now.getTime()) / 86400000 >= -MAX_EVENT_PAST_DAYS) return candidate1;
    return candidate2 ?? candidate1;
  }

  // 4. English with day + month (run BEFORE month-only so "14 Mar 2026" keeps the day).
  //    `(?!\d)` after day prevents matching "20" out of "2026" when no real day is present.
  const enDayFirst = lowered.match(/\b(\d{1,2})(?:st|nd|rd|th)?(?!\d)\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*(?:\s*(?:to|-|–|—)\s*\d{1,2}(?:st|nd|rd|th)?)?(?:\s*,?\s*(20\d{2}))?/i);
  if (enDayFirst) {
    const day = Number(enDayFirst[1]);
    const month = MONTH_KEYS.indexOf(enDayFirst[2].toLowerCase()) + 1;
    const year = enDayFirst[3] ? Number(enDayFirst[3]) : null;
    return resolveYearAware(month, day, year);
  }

  const enMonthFirst = lowered.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{1,2})(?:st|nd|rd|th)?(?!\d)(?:\s*,?\s*(20\d{2}))?/i);
  if (enMonthFirst) {
    const month = MONTH_KEYS.indexOf(enMonthFirst[1].toLowerCase()) + 1;
    const day = Number(enMonthFirst[2]);
    const year = enMonthFirst[3] ? Number(enMonthFirst[3]) : null;
    return resolveYearAware(month, day, year);
  }

  // 5. English month-only with year: "April 2026", "Sep 2026" → day 1.
  const monthOnly = lowered.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(20\d{2})\b/i);
  if (monthOnly) {
    const month = MONTH_KEYS.indexOf(monthOnly[1].toLowerCase()) + 1;
    return buildIso(Number(monthOnly[2]), month, 1);
  }

  // 5. Numeric D/M/YYYY (HK style — day first when first segment > 12)
  const numeric = cleaned.match(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/);
  if (numeric) {
    const a = Number(numeric[1]);
    const b = Number(numeric[2]);
    const y = Number(numeric[3]);
    if (a > 12) return buildIso(y, b, a);  // must be D/M
    if (b > 12) return buildIso(y, a, b);  // must be M/D
    return buildIso(y, b, a);              // default HK: D/M/Y
  }

  // 6. Seasons (Chinese): 2026春季/夏季/秋季/冬季 → middle of representative month
  const season = cleaned.match(/(20\d{2})?\s*(春季|夏季|秋季|冬季|春|夏|秋|冬)/);
  if (season) {
    const seasonMonth: Record<string, number> = {
      春: 3, 春季: 3,
      夏: 6, 夏季: 6,
      秋: 9, 秋季: 9,
      冬: 12, 冬季: 12,
    };
    const m = seasonMonth[season[2]];
    const year = season[1] ? Number(season[1]) : null;
    if (m) return resolveYearAware(m, 15, year);
  }

  return null;
}

function extractDateLabel(text: string): string | null {
  const iso = extractIsoDate(text);
  if (!iso) return null;
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return `${Number(match[2])}月${Number(match[3])}日`;
}

function toSchoolName(row: EnrichmentRow): string {
  return row.name_tc || row.name_en || "學校官方";
}

function detectEventType(details: string, url: string): { type: SchoolEventItem["event_type"]; label: string } {
  const combined = `${details} ${url}`;
  if (/interview|面試/i.test(combined)) return { type: "interview", label: "面試" };
  if (/briefing|簡介會|info session/i.test(combined)) return { type: "briefing", label: "簡介會" };
  if (/trial|體驗|taster/i.test(combined)) return { type: "trial", label: "體驗日" };
  if (/deadline|截止/i.test(combined)) return { type: "deadline", label: "截止" };
  return { type: "open_day", label: "開放日" };
}

function isEventInWindow(dateIso: string): boolean {
  const eventDate = parseDate(dateIso);
  if (!eventDate) return false;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = (eventDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);

  return diffDays >= -MAX_EVENT_PAST_DAYS && diffDays <= MAX_EVENT_FUTURE_DAYS;
}

function isEventInTimelineWindow(dateIso: string): boolean {
  const eventDate = parseDate(dateIso);
  if (!eventDate) return false;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = (eventDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);

  return diffDays >= -MAX_EVENT_PAST_DAYS && diffDays <= MAX_TIMELINE_FUTURE_DAYS;
}

function isEventPast(dateIso: string): boolean {
  const eventDate = parseDate(dateIso);
  if (!eventDate) return false;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return eventDate.getTime() < today.getTime();
}

function toSearchHref(row: { name_tc?: string | null; name_en?: string | null }) {
  const keyword = row.name_tc || row.name_en || "";
  return `/kg?search=${encodeURIComponent(keyword)}`;
}

/* ─── File readers ─── */

/**
 * Fetch enrichment rows from the `school_enrichments` DB table (migration 015).
 * Returns [] if the table doesn't exist yet or has no data — caller falls
 * back to the JSON file.
 */
async function fetchEnrichmentsFromDB(): Promise<EnrichmentRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("school_enrichments")
      .select(
        `school_id, application_url, application_process, open_day_date,
         open_day_details, official_website`,
      )
      .or("open_day_date.not.is.null,application_url.not.is.null");

    if (error) return [];
    if (!data || data.length === 0) return [];

    // Join school names
    const schoolIds = data.map((d) => d.school_id);
    const { data: schoolData } = await supabase
      .from("schools")
      .select("id, school_code, name_tc, name_en, website")
      .in("id", schoolIds);

    const schoolMap = new Map<string, { school_code: string | null; name_tc: string | null; name_en: string | null; website: string | null }>();
    for (const s of schoolData || []) {
      schoolMap.set(s.id, {
        school_code: s.school_code,
        name_tc: s.name_tc,
        name_en: s.name_en,
        website: s.website,
      });
    }

    return data.map((row) => {
      const meta = schoolMap.get(row.school_id) ?? {
        school_code: null,
        name_tc: null,
        name_en: null,
        website: null,
      };
      const openDayDetails = row.open_day_date
        ? `${row.open_day_date}${row.open_day_details ? " — " + row.open_day_details : ""}`
        : row.open_day_details ?? null;

      return {
        school_code: meta.school_code ?? null,
        name_tc: meta.name_tc ?? null,
        name_en: meta.name_en ?? null,
        website: meta.website ?? row.official_website ?? null,
        open_day_details: openDayDetails,
        open_day_url: row.official_website ?? meta.website ?? null,
        application_details: row.application_process ?? null,
        application_url: row.application_url ?? null,
      } satisfies EnrichmentRow;
    });
  } catch {
    return [];
  }
}

async function readSchoolEnrichment(): Promise<EnrichmentRow[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "private_international_profile_enrichment.json");
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as EnrichmentRow[];
  } catch {
    return [];
  }
}

async function readSchoolList(): Promise<SchoolListRow[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "schools_merged.json");
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as SchoolListRow[];
  } catch {
    return [];
  }
}

function uniqueByHref<T extends { href: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

/* ─── School events (近期家長必知) ─── */

/**
 * Merge enrichment rows from DB + JSON. DB takes precedence when the same
 * school is present in both (keyed by name_tc or school_code).
 */
async function mergedEnrichmentRows(): Promise<EnrichmentRow[]> {
  const [dbRows, jsonRows] = await Promise.all([
    fetchEnrichmentsFromDB(),
    readSchoolEnrichment(),
  ]);

  if (dbRows.length === 0) return jsonRows;
  if (jsonRows.length === 0) return dbRows;

  const seen = new Set<string>();
  const merged: EnrichmentRow[] = [];
  for (const row of dbRows) {
    const key = row.school_code || row.name_tc || "";
    if (key) seen.add(key);
    merged.push(row);
  }
  for (const row of jsonRows) {
    const key = row.school_code || row.name_tc || "";
    if (key && seen.has(key)) continue;
    merged.push(row);
  }
  return merged;
}

async function getSchoolEvents(): Promise<SchoolEventItem[]> {
  const rows = await mergedEnrichmentRows();
  if (rows.length === 0) return SCHOOL_EVENTS;

  const events: SchoolEventItem[] = [];
  let counter = 0;

  for (const row of rows) {
    // Open day events
    if (
      row.open_day_url &&
      !BLOCKED_URL_REGEX.test(row.open_day_url) &&
      OPEN_DAY_REGEX.test(`${row.open_day_details || ""} ${row.open_day_url}`)
    ) {
      const details = cleanText(row.open_day_details || "");
      const dateIso = extractIsoDate(details);
      const dateLabel = extractDateLabel(details);
      const { type, label } = detectEventType(details, row.open_day_url);

      if (dateIso && isEventInWindow(dateIso)) {
        counter += 1;
        events.push({
          id: `evt-od-${counter}`,
          school_name: toSchoolName(row),
          school_type: "private_independent",
          date: dateLabel ? `${dateLabel} ${label}` : label,
          date_iso: dateIso,
          event_type: type,
          event_label: label,
          href: row.open_day_url,
          detail_href: toSearchHref(row),
          is_past: isEventPast(dateIso),
        });
      }
    }

    // Admission/interview events (only if they have specific dates)
    if (
      row.application_url &&
      !BLOCKED_URL_REGEX.test(row.application_url) &&
      ADMISSION_REGEX.test(`${row.application_details || ""} ${row.application_url}`)
    ) {
      const details = cleanText(row.application_details || "");
      const dateIso = extractIsoDate(details);
      const dateLabel = extractDateLabel(details);

      if (dateIso && isEventInWindow(dateIso)) {
        const { type, label } = detectEventType(details, row.application_url);
        counter += 1;
        events.push({
          id: `evt-adm-${counter}`,
          school_name: toSchoolName(row),
          school_type: "private_independent",
          date: dateLabel ? `${dateLabel} ${label}` : label,
          date_iso: dateIso,
          event_type: type,
          event_label: label,
          href: row.application_url,
          detail_href: toSearchHref(row),
          is_past: isEventPast(dateIso),
        });
      }
    }
  }

  // Sort by date ascending (nearest first), past events last
  const sorted = uniqueByHref(events).sort((a, b) => {
    if (a.is_past !== b.is_past) return a.is_past ? 1 : -1;
    return a.date_iso.localeCompare(b.date_iso);
  });

  return sorted.length > 0 ? sorted : SCHOOL_EVENTS;
}

/** Compute days from today to event date (negative = past) */
function computeDaysUntil(dateIso: string): number {
  const eventDate = parseDate(dateIso);
  if (!eventDate) return 0;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.ceil((eventDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
}

/**
 * Fetch all school events for the timeline page (90-day window).
 * Also enriches events with days_until and school metadata from schools_merged.json.
 */
export async function getAllSchoolEvents(): Promise<SchoolEventItem[]> {
  const [rows, schoolList] = await Promise.all([
    mergedEnrichmentRows(),
    readSchoolList(),
  ]);
  if (rows.length === 0) return SCHOOL_EVENTS.map((e) => ({ ...e, days_until: computeDaysUntil(e.date_iso) }));

  // Map school_code → metadata for district/school_type lookup
  const schoolMap = new Map(schoolList.map((row) => [row.code, row]));
  // Map name_tc → school metadata (enrichment doesn't always have school_code)
  const schoolByName = new Map(schoolList.map((row) => [row.name_tc, row]));

  const events: SchoolEventItem[] = [];
  let counter = 0;

  for (const row of rows) {
    const schoolMeta =
      schoolMap.get(row.school_code ?? "") ??
      schoolByName.get(row.name_tc ?? "") ??
      null;

    const schoolType = schoolMeta?.school_type ?? "private_independent";
    const district = schoolMeta?.district ?? undefined;

    // Open day events
    if (
      row.open_day_url &&
      !BLOCKED_URL_REGEX.test(row.open_day_url) &&
      OPEN_DAY_REGEX.test(`${row.open_day_details || ""} ${row.open_day_url}`)
    ) {
      const details = cleanText(row.open_day_details || "");
      const dateIso = extractIsoDate(details);
      const dateLabel = extractDateLabel(details);
      const { type, label } = detectEventType(details, row.open_day_url);

      if (dateIso && isEventInTimelineWindow(dateIso)) {
        counter += 1;
        events.push({
          id: `tl-od-${counter}`,
          school_name: toSchoolName(row),
          school_type: schoolType,
          district,
          date: dateLabel ? `${dateLabel} ${label}` : label,
          date_iso: dateIso,
          event_type: type,
          event_label: label,
          href: row.open_day_url,
          detail_href: toSearchHref(row),
          is_past: isEventPast(dateIso),
          days_until: computeDaysUntil(dateIso),
        });
      }
    }

    // Admission/interview events
    if (
      row.application_url &&
      !BLOCKED_URL_REGEX.test(row.application_url) &&
      ADMISSION_REGEX.test(`${row.application_details || ""} ${row.application_url}`)
    ) {
      const details = cleanText(row.application_details || "");
      const dateIso = extractIsoDate(details);
      const dateLabel = extractDateLabel(details);

      if (dateIso && isEventInTimelineWindow(dateIso)) {
        const { type, label } = detectEventType(details, row.application_url);
        counter += 1;
        events.push({
          id: `tl-adm-${counter}`,
          school_name: toSchoolName(row),
          school_type: schoolType,
          district,
          date: dateLabel ? `${dateLabel} ${label}` : label,
          date_iso: dateIso,
          event_type: type,
          event_label: label,
          href: row.application_url,
          detail_href: toSearchHref(row),
          is_past: isEventPast(dateIso),
          days_until: computeDaysUntil(dateIso),
        });
      }
    }
  }

  const sorted = uniqueByHref(events).sort((a, b) => {
    if (a.is_past !== b.is_past) return a.is_past ? 1 : -1;
    return a.date_iso.localeCompare(b.date_iso);
  });

  return sorted.length > 0
    ? sorted
    : SCHOOL_EVENTS.map((e) => ({ ...e, days_until: computeDaysUntil(e.date_iso) }));
}

/* ─── Banner generation ─── */

function normalizeSessionTags(session: string | null | undefined): string[] {
  if (!session) return [];

  const tags: string[] = [];
  const lowered = session.toLowerCase();

  if (lowered.includes("whole_day")) {
    tags.push("全日班");
  }

  if (lowered.includes("am") || lowered.includes("pm")) {
    tags.push("半日班");
  }

  return tags;
}

function toVacancyTag(value: string | null | undefined): string | null {
  if (!value) return null;

  if (value === "has_vacancy") return "K1 有位";
  if (value === "waiting_list") return "K1 候補";
  if (value === "no_vacancy") return "K1 滿額";

  return null;
}

function toSourceLabel(type: string | null | undefined): string {
  if (type === "international") return "國際學校";
  if (type === "private_independent") return "私立獨立";
  return "學校官方";
}

function toBannerSummary(row: EnrichmentRow): string {
  const application = cleanText(row.application_details || "");
  const openDay = cleanText(row.open_day_details || "");
  const preferred = [application, openDay].find(
    (value) => value && value.length <= 72
  );

  return shorten(preferred || "查看學校最新招生與參觀安排", 56);
}

function scoreBannerCandidate(
  profile: EnrichmentRow,
  school: SchoolListRow | undefined
): number {
  return [
    profile.name_tc ? 4 : 0,
    profile.name_en ? 1 : 0,
    profile.application_url ? 3 : 0,
    profile.open_day_url ? 2 : 0,
    profile.website ? 1 : 0,
    school?.district ? 1 : 0,
    school?.school_type ? 1 : 0,
    school?.k1 ? 1 : 0,
  ].reduce((sum, value) => sum + value, 0);
}

async function getHomepageBanners(): Promise<HomeBanner[]> {
  if (!isHomepageBannerEnabled()) {
    return [];
  }

  const [profiles, schoolList] = await Promise.all([
    mergedEnrichmentRows(),
    readSchoolList(),
  ]);

  if (profiles.length === 0 || schoolList.length === 0) {
    return [];
  }

  const schoolMap = new Map(schoolList.map((row) => [row.code, row]));

  const candidates = profiles
    .map((profile) => {
      const school = schoolMap.get(profile.school_code ?? "");

      return {
        profile,
        school,
        score: scoreBannerCandidate(profile, school),
      };
    })
    .filter(({ profile, school }) => {
      const hasName = Boolean(profile.name_tc || profile.name_en);
      const hasAction = Boolean(
        profile.application_url || profile.open_day_url || profile.website
      );
      const hasSchoolMeta = Boolean(school?.district || school?.school_type);
      return hasName && hasAction && hasSchoolMeta;
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, BANNER_IMAGES.length);

  if (candidates.length === 0) {
    return [];
  }

  return candidates.map(({ profile, school }, index) => {
    const image = BANNER_IMAGES[index] ?? BANNER_IMAGES[0];
    const district =
      school?.district && school.district in DISTRICT_LABELS
        ? DISTRICT_LABELS[school.district]
        : null;
    const schoolType = school?.school_type
      ? SCHOOL_TYPE_LABELS[school.school_type] ?? school.school_type
      : null;
    const sessionTags = normalizeSessionTags(school?.session);
    const vacancyTag = toVacancyTag(school?.k1);
    const tags = [district, schoolType, vacancyTag, ...sessionTags].filter(
      (tag): tag is string => Boolean(tag)
    );
    const detailUrl = toSearchHref(profile);
    const actionUrl =
      profile.application_url || profile.open_day_url || profile.website || detailUrl;

    return {
      id: `live-banner-${profile.school_code || index + 1}`,
      layout: image.layout,
      source_label: toSourceLabel(school?.school_type),
      title_tc: profile.name_tc || formatEnglishSchoolName(profile.name_en),
      subtitle_en: formatEnglishSchoolName(profile.name_en),
      tags: tags.slice(0, 3),
      cta_primary: {
        label: profile.application_url ? "查看招生" : "查看詳情",
        url: actionUrl,
      },
      cta_secondary: {
        label: "清單定位",
        url: detailUrl,
      },
      footer_note: toBannerSummary(profile),
      image_src: image.src,
      image_alt: image.alt,
    } satisfies HomeBanner;
  });
}

/* ─── Featured schools (dynamic from vacancy data) ─── */

async function getFeaturedSchoolsLive(): Promise<FeaturedSchool[]> {
  const schoolList = await readSchoolList();
  if (schoolList.length === 0) return FEATURED_SCHOOLS;

  // Pick schools that have vacancy data and diverse districts
  const withVacancy = schoolList.filter(
    (row) => row.name_tc && row.district && (row.k1 || row.k2 || row.k3)
  );

  if (withVacancy.length < 3) return FEATURED_SCHOOLS;

  // Diversify by district: pick from different districts
  const seenDistricts = new Set<string>();
  const picked: SchoolListRow[] = [];

  // First pass: one per district, prefer schools with has_vacancy
  const sorted = [...withVacancy].sort((a, b) => {
    const aScore = (a.k1 === "has_vacancy" ? 2 : 0) + (a.k2 === "has_vacancy" ? 1 : 0);
    const bScore = (b.k1 === "has_vacancy" ? 2 : 0) + (b.k2 === "has_vacancy" ? 1 : 0);
    return bScore - aScore;
  });

  for (const row of sorted) {
    if (picked.length >= 3) break;
    if (row.district && !seenDistricts.has(row.district)) {
      seenDistricts.add(row.district);
      picked.push(row);
    }
  }

  // Fill remaining slots if needed
  for (const row of sorted) {
    if (picked.length >= 3) break;
    if (!picked.includes(row)) picked.push(row);
  }

  if (picked.length < 3) return FEATURED_SCHOOLS;

  return picked.map((row) => {
    const district =
      row.district && row.district in DISTRICT_LABELS
        ? DISTRICT_LABELS[row.district as keyof typeof DISTRICT_LABELS]
        : row.district ?? "";
    const sessionTags = normalizeSessionTags(row.session);

    return {
      id: row.code ?? row.name_tc ?? "",
      schoolCode: row.code ?? undefined,
      name_tc: row.name_tc ?? "",
      name_en: formatEnglishSchoolName(row.name_en),
      district,
      sessionTags,
      hasN: false,
      href: `/kg?search=${encodeURIComponent(row.name_tc ?? "")}`,
      vacancyStatus: {
        k1: row.k1 ?? "no_information",
        k2: row.k2 ?? "no_information",
        k3: row.k3 ?? "no_information",
      },
    } satisfies FeaturedSchool;
  });
}

/* ─── Main export ─── */

export async function getHomepageLiveData(): Promise<{
  banners: HomeBanner[];
  events: SchoolEventItem[];
  newsItems: NewsItem[];
  featuredSchools: FeaturedSchool[];
}> {
  const [banners, events, newsItems, featuredSchools] = await Promise.all([
    getHomepageBanners(),
    getSchoolEvents(),
    getLiveNewsItems(),
    getFeaturedSchoolsLive(),
  ]);

  return {
    banners,
    events,
    newsItems,
    featuredSchools,
  };
}
