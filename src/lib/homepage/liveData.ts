import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@/lib/supabase/server";
import priorityTop100Data from "../../../data/xhs/internal_priority_school_top100_results.json";
import schoolListData from "../../../data/schools_merged.json";
import {
  BANNERS,
  FEATURED_SCHOOLS,
  NEWS_ITEMS,
  SCHOOL_EVENTS,
} from "@/data/homepage";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  formatEnglishSchoolName,
} from "@/lib/utils";
import { extractIsoDate } from "@/lib/utils/extractIsoDate";
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

type PriorityTop100Row = {
  rank?: number | null;
  school_code?: string | null;
  db_name_tc?: string | null;
  queue_name_tc?: string | null;
  name_en?: string | null;
  school_type?: string | null;
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
  /(kindergarten|k1|pre-primary|pre primary|preschool|幼稚園|幼兒班|收生安排|收生|註冊證|註冊|家長簡介會)/i;
const HK01_KG_NEWS_REGEX =
  /(幼稚園|幼兒|k1|學前|收生|入學|pn|幼教|校舍|停辦|學券|概覽)/i;
const NOISE_REGEX =
  /(smart parent net|parent-child code|secondary|primary one|senior secondary|principals and teachers|vacant kindergarten premises)/i;
const OPEN_DAY_REGEX =
  /(open day|open house|school tour|campus tour|visit us|校園參觀|開放日|參觀)/i;
const ADMISSION_REGEX =
  /(admission|apply|application|enrol|enrollment|招生|入學|申請|收生)/i;
const BLOCKED_URL_REGEX = /(godaddy\.com|javascript:|facebook\.com)/i;

/* ─── Freshness constants ─── */

/** Only show news published within the last 60 days */
const MAX_NEWS_AGE_DAYS = 60;
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

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
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
  return KG_NEWS_REGEX.test(title) && !NOISE_REGEX.test(title);
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

/* ─── Content type detection ─── */

const POLICY_REGEX =
  /(政策|措施|資助|安排|計劃|方案|支援|津貼|補貼|撥款|修訂|公告|通告|指引|規定|檢討|報告|統計|概覽|概覽|數據|拨款|修订|检讨|补贴|规定|数据)/i;
const EVENT_ACTIVITY_REGEX =
  /(活動|講座|工作坊|研討會|嘉年華|體驗|講座|talk|workshop|seminar|webinar)/i;

function detectContentType(
  title: string,
  link: string,
  source: string
): { content_type: NonNullable<NewsItem["content_type"]>; content_type_label: string } {
  const combined = `${title} ${link}`;

  if (OPEN_DAY_REGEX.test(combined)) {
    return { content_type: "open_day", content_type_label: "開放日" };
  }
  if (ADMISSION_REGEX.test(combined)) {
    return { content_type: "admission", content_type_label: "升學" };
  }
  if (EVENT_ACTIVITY_REGEX.test(combined)) {
    return { content_type: "school_event", content_type_label: "活動" };
  }
  if (POLICY_REGEX.test(combined)) {
    return { content_type: "policy", content_type_label: "教育政策" };
  }

  // Default: EDB/GovHK → policy, HK01/media → feature (shown under all/latest only)
  if (source === "edb" || source === "govhk") {
    return { content_type: "policy", content_type_label: "教育政策" };
  }
  return { content_type: "feature", content_type_label: "媒體報導" };
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
    relevant.map(async (item) => {
      const summary = await fetchNewsSummary(item.link, item.title);
      const source = item.link.includes("info.gov.hk") ? "govhk" : "edb";
      const { content_type, content_type_label } = detectContentType(
        item.title,
        item.link,
        source
      );

      return {
        id: `rss-${source}-${simpleHash(item.link)}`,
        source,
        source_category: toSourceCategory(source),
        source_label: source === "govhk" ? "政府公報" : "教育局",
        title: cleanText(item.title),
        summary,
        date: formatMonthDay(item.pubDate),
        published_at: new Date(item.pubDate).toISOString(),
        href: item.link,
        is_external: isExternalSource(source),
        content_type,
        content_type_label,
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
        HK01_KG_NEWS_REGEX.test(`${item.title} ${item.link}`)
    )
    .slice(0, 4);

  return Promise.all(
    relevant.map(async (item) => {
      const { content_type, content_type_label } = detectContentType(
        item.title,
        item.link,
        "hk01"
      );

      return {
        id: `rss-hk01-${simpleHash(item.link)}`,
        source: "hk01",
        source_category: "media" as const,
        source_label: "HK01",
        title: cleanText(item.title),
        summary: await fetchNewsSummary(item.link, item.title),
        date: formatMonthDay(item.pubDate),
        published_at: new Date(item.pubDate).toISOString(),
        href: item.link,
        is_external: true,
        content_type,
        content_type_label,
      };
    })
  );
}

async function getLiveNewsItems(): Promise<NewsItem[]> {
  const [edbItems, hk01Items] = await Promise.all([
    getEdbNewsItems(),
    getHk01NewsItems(),
  ]);

  const liveItems = sortNewsByPublishedAt([...edbItems, ...hk01Items]);

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
  const [edbItems, hk01Items] = await Promise.all([
    getEdbNewsItems(),
    getHk01NewsItems(),
  ]);

  const liveItems = sortNewsByPublishedAt([...edbItems, ...hk01Items]);

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

function extractDateLabel(text: string): string | null {
  const iso = extractIsoDate(text);
  if (!iso) return null;
  const date = parseDate(iso);
  if (!date) return null;
  return `${date.getMonth() + 1}月${date.getDate()}日`;
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
  return Array.isArray(schoolListData)
    ? (schoolListData as SchoolListRow[])
    : [];
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
  const [rows, schoolList, managedEvents] = await Promise.all([
    mergedEnrichmentRows(),
    readSchoolList(),
    getManagedTimelineEvents(),
  ]);
  if (rows.length === 0 && managedEvents.length === 0) return SCHOOL_EVENTS.map((e) => ({ ...e, days_until: computeDaysUntil(e.date_iso) }));

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

  const merged = [...managedEvents, ...sorted].sort((a, b) => {
    if (a.is_past !== b.is_past) return a.is_past ? 1 : -1;
    return a.date_iso.localeCompare(b.date_iso);
  });

  return merged.length > 0
    ? uniqueByHref(merged)
    : SCHOOL_EVENTS.map((e) => ({ ...e, days_until: computeDaysUntil(e.date_iso) }));
}

async function getManagedTimelineEvents(): Promise<SchoolEventItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("timeline_events" as never)
      .select("*, schools:school_id ( id, district, school_type )")
      .eq("is_visible", true)
      .gte("event_date", new Date(Date.now() - MAX_EVENT_PAST_DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10))
      .lte("event_date", new Date(Date.now() + MAX_TIMELINE_FUTURE_DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10))
      .order("is_pinned" as never, { ascending: false } as never)
      .order("event_date" as never, { ascending: true } as never);
    if (error || !data) return [];

    return (data as Array<Record<string, unknown>>).flatMap((row) => {
      const dateIso = String(row.event_date || "");
      if (!dateIso || !isEventInTimelineWindow(dateIso)) return [];
      const school = Array.isArray(row.schools) ? row.schools[0] : row.schools;
      const schoolRecord = school && typeof school === "object" ? school as Record<string, unknown> : {};
      return [{
        id: String(row.id),
        school_name: String(row.school_name || "學校活動"),
        school_type: typeof schoolRecord.school_type === "string" ? schoolRecord.school_type : undefined,
        district: typeof schoolRecord.district === "string" ? schoolRecord.district : undefined,
        date: `${formatMonthDay(dateIso)} ${String(row.event_label || "")}`.trim(),
        date_iso: dateIso,
        event_type: row.event_type as SchoolEventItem["event_type"],
        event_label: String(row.event_label || ""),
        href: String(row.href || "/"),
        detail_href: String(row.detail_href || (row.school_id ? `/kg/${row.school_id}` : "/timeline")),
        is_past: isEventPast(dateIso),
        days_until: computeDaysUntil(dateIso),
      } satisfies SchoolEventItem];
    });
  } catch {
    return [];
  }
}

/* ─── Banner generation ─── */

function normalizeSessionTags(session: string | null | undefined): string[] {
  if (!session) return [];

  const tags: string[] = [];
  const lowered = session.toLowerCase();
  const raw = session.trim();

  if (lowered.includes("whole_day") || raw.includes("全日")) {
    tags.push("全日班");
  }

  if (
    lowered.includes("am") ||
    lowered.includes("pm") ||
    raw.includes("上午") ||
    raw.includes("下午")
  ) {
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
  const managed = await getManagedHomepageBanners();
  if (managed.length > 0) return managed;

  if (!isHomepageBannerEnabled()) {
    return [];
  }

  const [profiles, schoolList] = await Promise.all([
    mergedEnrichmentRows(),
    readSchoolList(),
  ]);

  if (profiles.length === 0 || schoolList.length === 0) {
    return BANNERS;
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
    return BANNERS;
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

/* ─── Featured schools (picked from top 100 priority list) ─── */

async function getFeaturedSchoolsLive(): Promise<FeaturedSchool[]> {
  const managed = await getManagedFeaturedSchools();
  if (managed.length > 0) return managed;

  const parsedPriority = priorityTop100Data as { rows?: PriorityTop100Row[] };
  const priorityRows = Array.isArray(parsedPriority.rows) ? parsedPriority.rows : [];
  const schoolList = await readSchoolList();

  if (priorityRows.length === 0 || schoolList.length === 0) {
    return FEATURED_SCHOOLS;
  }

  const priorityCodes = priorityRows
    .map((row) => row.school_code)
    .filter((code): code is string => Boolean(code));
  const supabase = await createClient();
  const { data: schoolRows } = await supabase
    .from("schools")
    .select(
      "id, school_code, name_tc, name_en, district, school_type, session_type, has_nursery, schooland_group_tag, schooland_nursery_service, schooland_size_label, schooland_session_label"
    )
    .in("school_code", priorityCodes);

  const schoolRowsByCode = new Map(
    (schoolRows ?? []).map((row: {
      id: string;
      school_code: string | null;
      name_tc: string | null;
      name_en: string | null;
      district: string | null;
      school_type: string | null;
      session_type: string | null;
      has_nursery: boolean | null;
      schooland_group_tag: string | null;
      schooland_nursery_service: string | null;
      schooland_size_label: string | null;
      schooland_session_label: string | null;
    }) => [row.school_code, row])
  );

  const schoolMap = new Map(schoolList.map((row) => [row.code, row]));
  const featured = priorityRows
    .sort((a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER))
    .map<FeaturedSchool | null>((row) => {
      const school = schoolMap.get(row.school_code ?? "");
      const schoolRecord = schoolRowsByCode.get(row.school_code ?? "");
      const nameTc = school?.name_tc || row.db_name_tc || row.queue_name_tc || "";
      if (!nameTc) return null;

      const district =
        school?.district && school.district in DISTRICT_LABELS
          ? DISTRICT_LABELS[school.district]
          : school?.district ?? toSourceLabel(row.school_type);

      const sessionSource = schoolRecord?.session_type ?? school?.session ?? null;
      return {
        id: schoolRecord?.id ?? row.school_code ?? nameTc,
        detailId: schoolRecord?.id ?? null,
        schoolCode: row.school_code ?? undefined,
        name_tc: nameTc,
        name_en: formatEnglishSchoolName(school?.name_en || row.name_en || null),
        district,
        schoolType: schoolRecord?.school_type ?? school?.school_type ?? row.school_type ?? null,
        sessionTags: normalizeSessionTags(sessionSource),
        hasN: Boolean(schoolRecord?.has_nursery ?? school?.session?.includes("N")),
        href: `/kg?search=${encodeURIComponent(nameTc)}`,
        schoolandGroupTag: schoolRecord?.schooland_group_tag ?? null,
        schoolandNurseryService: schoolRecord?.schooland_nursery_service ?? null,
        schoolandSizeLabel: schoolRecord?.schooland_size_label ?? null,
        schoolandSessionLabel: schoolRecord?.schooland_session_label ?? null,
        vacancyStatus: school
          ? {
            k1: school.k1 ?? "no_information",
            k2: school.k2 ?? "no_information",
            k3: school.k3 ?? "no_information",
          }
          : undefined,
        vacancyPublishedDate: school?.edb_date ?? null,
      } satisfies FeaturedSchool;
    })
    .filter((school): school is FeaturedSchool => school !== null)
    .slice(0, 3);

  return featured.length > 0 ? featured : FEATURED_SCHOOLS;
}

async function getManagedHomepageBanners(): Promise<HomeBanner[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_banners" as never)
      .select("*")
      .eq("is_visible", true)
      .contains("publish_channels" as never, ["web"] as never)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];

    return (data as Array<Record<string, unknown>>).map((row) => ({
      id: String(row.id),
      layout: (row.layout as HomeBanner["layout"]) || "classic",
      source_label: String(row.source_label || "HKSchoolPlace"),
      title_tc: String(row.title_tc || ""),
      subtitle_en: typeof row.subtitle_en === "string" ? row.subtitle_en : undefined,
      tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
      cta_primary: {
        label: String(row.cta_primary_label || "查看詳情"),
        url: String(row.cta_primary_url || "/"),
      },
      cta_secondary: row.cta_secondary_label && row.cta_secondary_url
        ? { label: String(row.cta_secondary_label), url: String(row.cta_secondary_url) }
        : undefined,
      footer_note: typeof row.footer_note === "string" ? row.footer_note : undefined,
      image_src: String(row.image_src || "/brand/Web Logo/Logo.png"),
      image_alt: String(row.image_alt || ""),
    })).filter((item) => item.title_tc);
  } catch {
    return [];
  }
}

async function getManagedFeaturedSchools(): Promise<FeaturedSchool[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_featured_schools" as never)
      .select("*, schools ( id, school_code, name_tc, name_en, district, school_type, session_type, has_nursery, schooland_group_tag, schooland_nursery_service, schooland_size_label, schooland_session_label )")
      .eq("is_visible", true)
      .contains("publish_channels" as never, ["web"] as never)
      .order("sort_order", { ascending: true })
      .limit(6);

    if (error || !data) return [];

    return (data as Array<Record<string, unknown>>).flatMap((row) => {
      const school = Array.isArray(row.schools) ? row.schools[0] : row.schools;
      if (!school || typeof school !== "object") return [];
      const schoolRecord = school as Record<string, unknown>;
      const nameTc = String(row.custom_title || schoolRecord.name_tc || "");
      if (!nameTc) return [];
      return [{
        id: String(schoolRecord.id || row.id),
        detailId: String(schoolRecord.id || ""),
        schoolCode: typeof schoolRecord.school_code === "string" ? schoolRecord.school_code : undefined,
        name_tc: nameTc,
        name_en: formatEnglishSchoolName(String(row.custom_name_en || schoolRecord.name_en || "")),
        district: schoolRecord.district && String(schoolRecord.district) in DISTRICT_LABELS
          ? DISTRICT_LABELS[String(schoolRecord.district) as keyof typeof DISTRICT_LABELS]
          : String(schoolRecord.district || ""),
        schoolType: typeof schoolRecord.school_type === "string" ? schoolRecord.school_type : null,
        sessionTags: normalizeSessionTags(typeof schoolRecord.session_type === "string" ? schoolRecord.session_type : null),
        hasN: Boolean(schoolRecord.has_nursery),
        href: `/kg/${schoolRecord.id}`,
        schoolandGroupTag: typeof schoolRecord.schooland_group_tag === "string" ? schoolRecord.schooland_group_tag : null,
        schoolandNurseryService: typeof schoolRecord.schooland_nursery_service === "string" ? schoolRecord.schooland_nursery_service : null,
        schoolandSizeLabel: typeof schoolRecord.schooland_size_label === "string" ? schoolRecord.schooland_size_label : null,
        schoolandSessionLabel: typeof schoolRecord.schooland_session_label === "string" ? schoolRecord.schooland_session_label : null,
      } satisfies FeaturedSchool];
    });
  } catch {
    return [];
  }
}

async function getManagedNewsItems(): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_news_items" as never)
      .select("*")
      .eq("is_visible", true)
      .contains("publish_channels" as never, ["web"] as never)
      .order("is_pinned" as never, { ascending: false } as never)
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false })
      .limit(12);

    if (error || !data) return [];

    return (data as Array<Record<string, unknown>>).map((row) => ({
      id: String(row.id),
      source: String(row.source || "hkschoolplace"),
      source_category: (row.source_category as NewsItem["source_category"]) || "school",
      source_label: String(row.source_label || "HKSchoolPlace"),
      title: String(row.title || ""),
      summary: String(row.summary || ""),
      date: String(row.display_date || formatMonthDay(String(row.published_at))),
      published_at: String(row.published_at || new Date().toISOString()),
      href: String(row.href || "/"),
      is_external: Boolean(row.is_external),
      content_type: row.content_type as NewsItem["content_type"],
      content_type_label: typeof row.content_type_label === "string" ? row.content_type_label : undefined,
    })).filter((item) => item.title);
  } catch {
    return [];
  }
}

/* ─── Main export ─── */

export async function getHomepageLiveData(): Promise<{
  banners: HomeBanner[];
  newsItems: NewsItem[];
  featuredSchools: FeaturedSchool[];
}> {
  const [banners, managedNewsItems, fallbackNewsItems, featuredSchools] = await Promise.all([
    getHomepageBanners(),
    getManagedNewsItems(),
    getLiveNewsItems(),
    getFeaturedSchoolsLive(),
  ]);

  return {
    banners,
    newsItems: managedNewsItems.length > 0 ? managedNewsItems : fallbackNewsItems,
    featuredSchools,
  };
}
