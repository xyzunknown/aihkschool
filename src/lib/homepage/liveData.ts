import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import {
  BANNERS,
  NEWS_ITEMS,
  SCHOOL_EVENTS,
} from "@/data/homepage";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  formatEnglishSchoolName,
} from "@/lib/utils";
import type {
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
/** Show events up to 30 days in the future */
const MAX_EVENT_FUTURE_DAYS = 30;
/** Keep past events for 7 days after they occurred */
const MAX_EVENT_PAST_DAYS = 7;

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
        HK01_KG_NEWS_REGEX.test(`${item.title} ${item.link}`)
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
  const [edbItems, hk01Items] = await Promise.all([
    getEdbNewsItems(),
    getHk01NewsItems(),
  ]);

  const liveItems = sortNewsByPublishedAt([...edbItems, ...hk01Items]);
  const fallback = sortNewsByPublishedAt(
    NEWS_ITEMS.filter(
      (fallbackItem) =>
        isRecent(fallbackItem.published_at) &&
        !liveItems.some((item) => item.href === fallbackItem.href)
    )
  );

  // Homepage shows 3 items; /news page fetches separately
  return sortNewsByPublishedAt([...liveItems, ...fallback]).slice(0, 3);
}

/** Fetch all news (for /news page). No slice limit. */
export async function getAllNewsItems(): Promise<NewsItem[]> {
  const [edbItems, hk01Items] = await Promise.all([
    getEdbNewsItems(),
    getHk01NewsItems(),
  ]);

  const liveItems = sortNewsByPublishedAt([...edbItems, ...hk01Items]);
  const fallback = sortNewsByPublishedAt(
    NEWS_ITEMS.filter(
      (fallbackItem) =>
        isRecent(fallbackItem.published_at) &&
        !liveItems.some((item) => item.href === fallbackItem.href)
    )
  );

  return sortNewsByPublishedAt([...liveItems, ...fallback]);
}

/* ─── Event helpers ─── */

function extractDateLabel(text: string): string | null {
  const lowered = text.toLowerCase();
  const englishDate =
    lowered.match(/\b(\d{1,2})\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(20\d{2})?/i) ||
    lowered.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})(?:,?\s*(20\d{2}))?/i);

  if (englishDate) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const first = englishDate[1]?.toLowerCase();
    const second = englishDate[2]?.toLowerCase();
    const monthKey = months.includes(first) ? first : second;
    const day = months.includes(first) ? Number(englishDate[2]) : Number(englishDate[1]);
    const month = months.indexOf(monthKey) + 1;

    if (month > 0 && day > 0) {
      return `${month}月${day}日`;
    }
  }

  const chineseDate = text.match(/(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (chineseDate) {
    return `${chineseDate[1]}月${chineseDate[2]}日`;
  }

  return null;
}

function extractIsoDate(text: string): string | null {
  const dateLabel = extractDateLabel(text);
  if (!dateLabel) return null;

  const match = dateLabel.match(/(\d{1,2})月(\d{1,2})日/);
  if (!match) return null;

  const year = new Date().getFullYear();
  const month = match[1].padStart(2, "0");
  const day = match[2].padStart(2, "0");
  return `${year}-${month}-${day}`;
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

async function getSchoolEvents(): Promise<SchoolEventItem[]> {
  const rows = await readSchoolEnrichment();
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
  const [profiles, schoolList] = await Promise.all([
    readSchoolEnrichment(),
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

/* ─── Main export ─── */

export async function getHomepageLiveData(): Promise<{
  banners: HomeBanner[];
  events: SchoolEventItem[];
  newsItems: NewsItem[];
}> {
  const [banners, events, newsItems] = await Promise.all([
    getHomepageBanners(),
    getSchoolEvents(),
    getLiveNewsItems(),
  ]);

  return {
    banners,
    events,
    newsItems,
  };
}
