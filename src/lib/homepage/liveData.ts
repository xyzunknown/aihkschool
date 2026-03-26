import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import {
  BANNERS,
  DEADLINES,
  NEWS_ITEMS,
  OFFICIAL_LINKS,
  OPEN_DAYS,
} from "@/data/homepage";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  formatEnglishSchoolName,
} from "@/lib/utils";
import type {
  HomeBanner,
  DeadlineItem,
  NewsItem,
  OfficialLinkItem,
  OpenDayItem,
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
    src: "/images/banners/美術室午后-Banner-02.png",
    alt: "孩子在美術室內專注創作",
    layout: "event",
  },
  {
    src: "/images/banners/閱讀角午后-Banner-03.png",
    alt: "安靜舒適的兒童閱讀角",
    layout: "minimal",
  },
] as const satisfies Array<{
  src: string;
  alt: string;
  layout: HomeBanner["layout"];
}>;

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

function toSearchHref(row: { name_tc?: string | null; name_en?: string | null }) {
  const keyword = row.name_tc || row.name_en || "";
  return `/kg?search=${encodeURIComponent(keyword)}`;
}

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

export async function getHomepageLiveData(): Promise<{
  banners: HomeBanner[];
  openDays: OpenDayItem[];
  admissions: DeadlineItem[];
  officialLinks: OfficialLinkItem[];
  newsItems: NewsItem[];
}> {
  const [banners, schoolActions, newsItems] = await Promise.all([
    getHomepageBanners(),
    getSchoolActionItems(),
    getLiveNewsItems(),
  ]);

  return {
    banners,
    openDays: schoolActions.openDays,
    admissions: schoolActions.admissions,
    officialLinks: OFFICIAL_LINKS,
    newsItems,
  };
}
