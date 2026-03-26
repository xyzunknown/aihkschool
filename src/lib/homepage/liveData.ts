import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import {
  DEADLINES,
  NEWS_ITEMS,
  OFFICIAL_LINKS,
  OPEN_DAYS,
} from "@/data/homepage";
import type {
  DeadlineItem,
  NewsItem,
  OfficialLinkItem,
  OpenDayItem,
} from "@/types/homepage";

type EnrichmentRow = {
  school_code?: string | null;
  name_tc?: string | null;
  name_en?: string | null;
  open_day_details?: string | null;
  open_day_url?: string | null;
  application_details?: string | null;
  application_url?: string | null;
};

const KG_NEWS_REGEX =
  /(kindergarten|k1|pre-primary|pre primary|preschool|幼稚園|幼兒班|收生安排|收生|註冊證|註冊|家長簡介會)/i;
const NOISE_REGEX =
  /(smart parent net|parent-child code|secondary|primary one|senior secondary|principals and teachers|vacant kindergarten premises)/i;
const OPEN_DAY_REGEX =
  /(open day|open house|school tour|campus tour|visit us|校園參觀|開放日|參觀)/i;
const ADMISSION_REGEX =
  /(admission|apply|application|enrol|enrollment|招生|入學|申請|收生)/i;
const BLOCKED_URL_REGEX = /(godaddy\.com|javascript:|facebook\.com)/i;

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&hellip;/g, "…");
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
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function formatMonthDay(dateInput: string): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return dateInput;
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function parseMetaContent(html: string, key: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
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

async function getLiveNewsItems(): Promise<NewsItem[]> {
  const rss = await fetchText("https://www.edb.gov.hk/en/whats_new_rss.xml");
  if (!rss) return NEWS_ITEMS;

  const relevant = parseRssItems(rss)
    .filter((item) => item.link && item.title && isRelevantNews(item.title))
    .slice(0, 6);

  const mapped = await Promise.all(
    relevant.map(async (item, index) => {
      const summary = await fetchNewsSummary(item.link, item.title);
      const source = item.link.includes("info.gov.hk") ? "govhk" : "edb";

      return {
        id: `live-news-${index + 1}`,
        source,
        source_label: source === "govhk" ? "政府公報" : "教育局",
        title: cleanText(item.title),
        summary,
        date: formatMonthDay(item.pubDate),
        href: item.link,
      } satisfies NewsItem;
    })
  );

  const fallback = NEWS_ITEMS.filter(
    (fallbackItem) => !mapped.some((item) => item.href === fallbackItem.href)
  );

  return [...mapped, ...fallback].slice(0, 4);
}

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

function toSchoolName(row: EnrichmentRow): string {
  return row.name_tc || row.name_en || "學校官方";
}

function toOpenDayLabel(row: EnrichmentRow): string {
  const detail = cleanText(row.open_day_details || "");
  const safeDetail = detail.length > 80 ? "" : detail;
  const dateLabel = extractDateLabel(safeDetail);

  if (dateLabel && /open day|open house|開放日/i.test(safeDetail)) {
    return `${dateLabel} 開放日`;
  }

  if (dateLabel) return `${dateLabel} 可查看詳情`;
  if (/open house/i.test(detail)) return "官方 Open House 頁面";
  if (/school tour|campus tour|visit us/i.test(detail)) return "官方頁面可預約參觀";
  if (/開放日/i.test(detail)) return "官方開放日詳情";

  return shorten(safeDetail || "官方頁面可預約參觀", 24);
}

function toAdmissionLabel(row: EnrichmentRow): string {
  const detail = cleanText(row.application_details || "");
  const safeDetail = detail.length > 80 ? "" : detail;

  if (/2025\/26/i.test(safeDetail) && /2026\/27/i.test(safeDetail)) {
    return "2025/26 及 2026/27 可申請";
  }

  if (/2026\/27|2026-2027|2026 \/ 2027/i.test(safeDetail)) {
    return "2026/27 招生中";
  }

  if (/enrol now|enrollment is now open|apply/i.test(safeDetail)) {
    return "入學申請開放";
  }

  return shorten(safeDetail || "官方招生頁", 24);
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

function uniqueByHref<T extends { href: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

async function getSchoolActionItems() {
  const rows = await readSchoolEnrichment();
  if (rows.length === 0) {
    return {
      openDays: OPEN_DAYS,
      admissions: DEADLINES,
    };
  }

  const openDays = uniqueByHref(
    rows
      .filter(
        (row) =>
          row.open_day_url &&
          !BLOCKED_URL_REGEX.test(row.open_day_url) &&
          OPEN_DAY_REGEX.test(`${row.open_day_details || ""} ${row.open_day_url}`)
      )
      .map((row, index) => ({
        id: `open-${index + 1}`,
        school_name: toSchoolName(row),
        date: toOpenDayLabel(row),
        href: row.open_day_url!,
        source_label: "學校官方",
      }))
      .sort((left, right) => {
        const leftHasDate = /\d+月\d+日/.test(left.date) ? 1 : 0;
        const rightHasDate = /\d+月\d+日/.test(right.date) ? 1 : 0;
        return rightHasDate - leftHasDate;
      })
  ).slice(0, 3);

  const admissions = uniqueByHref(
    rows
      .filter(
        (row) =>
          row.application_url &&
          !BLOCKED_URL_REGEX.test(row.application_url) &&
          ADMISSION_REGEX.test(`${row.application_details || ""} ${row.application_url}`)
      )
      .map((row, index) => ({
        id: `admission-${index + 1}`,
        school_name: toSchoolName(row),
        deadline: toAdmissionLabel(row),
        badge: "官方招生頁",
        href: row.application_url!,
      }))
      .sort((left, right) => {
        const leftPriority = /2026\/27|2025\/26/.test(left.deadline) ? 1 : 0;
        const rightPriority = /2026\/27|2025\/26/.test(right.deadline) ? 1 : 0;
        return rightPriority - leftPriority;
      })
  ).slice(0, 3);

  return {
    openDays: openDays.length > 0 ? openDays : OPEN_DAYS,
    admissions: admissions.length > 0 ? admissions : DEADLINES,
  };
}

export async function getHomepageLiveData(): Promise<{
  openDays: OpenDayItem[];
  admissions: DeadlineItem[];
  officialLinks: OfficialLinkItem[];
  newsItems: NewsItem[];
}> {
  const [schoolActions, newsItems] = await Promise.all([
    getSchoolActionItems(),
    getLiveNewsItems(),
  ]);

  return {
    openDays: schoolActions.openDays,
    admissions: schoolActions.admissions,
    officialLinks: OFFICIAL_LINKS,
    newsItems,
  };
}
