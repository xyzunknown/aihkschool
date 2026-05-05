/**
 * @deprecated ABANDONED — 2026-05
 * The media_articles crawler pipeline was unable to extract usable data.
 * The table remains but is never populated. All queries return empty results.
 * See: scripts/crawlers/media-articles.mjs
 */
import { createClient } from "@/lib/supabase/server";

export type MediaArticleContentType =
  | "open_day"
  | "admission"
  | "interview"
  | "policy"
  | "feature"
  | "school_event";

export interface MediaArticle {
  id: string;
  source: "ohpama" | "sundaykiss" | "parentingheadline";
  external_id: string;
  title: string;
  summary: string | null;
  published_at: string | null;
  category: string | null;
  url: string;
  body_excerpt: string | null;
  content_type: MediaArticleContentType;
  school_match_status: "matched" | "uncertain" | "none";
  school_matches: Array<{
    school_id: string;
    confidence: "high" | "medium" | "low";
    matched_text?: string;
    method?: string;
  }>;
  raw_metadata: {
    source_label?: string;
    content_type_label?: string;
  } | null;
}

export const MEDIA_SOURCE_LABELS: Record<MediaArticle["source"], string> = {
  ohpama: "Oh!爸媽",
  sundaykiss: "Sunday Kiss",
  parentingheadline: "Parenting Headline",
};

export const MEDIA_CONTENT_TYPE_LABELS: Record<MediaArticleContentType, string> = {
  open_day: "開放日",
  admission: "招生",
  interview: "面試",
  policy: "升學政策",
  feature: "專題整理",
  school_event: "學校事件",
};

type UnknownRecord = Record<string, unknown>;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function normalizeArticle(row: UnknownRecord): MediaArticle {
  return {
    id: asString(row.id),
    source: asString(row.source) as MediaArticle["source"],
    external_id: asString(row.external_id),
    title: asString(row.title),
    summary: asNullableString(row.summary),
    published_at: asNullableString(row.published_at),
    category: asNullableString(row.category),
    url: asString(row.url),
    body_excerpt: asNullableString(row.body_excerpt),
    content_type: asString(row.content_type) as MediaArticleContentType,
    school_match_status: asString(row.school_match_status) as MediaArticle["school_match_status"],
    school_matches: Array.isArray(row.school_matches)
      ? row.school_matches as MediaArticle["school_matches"]
      : [],
    raw_metadata: row.raw_metadata && typeof row.raw_metadata === "object"
      ? row.raw_metadata as MediaArticle["raw_metadata"]
      : {},
  };
}

function sortByPublishedAt(rows: MediaArticle[]) {
  return [...rows].sort((first, second) => {
    const firstTime = first.published_at ? new Date(first.published_at).getTime() : 0;
    const secondTime = second.published_at ? new Date(second.published_at).getTime() : 0;
    return secondTime - firstTime;
  });
}

// Negative keywords to drop articles that are technically tagged as
// admission/feature/etc but target the wrong audience (university, primary
// school, sensational news) when surfaced on a kindergarten product.
const OFF_TOPIC_PATTERNS: RegExp[] = [
  /jupas|dse|大學|大学|university/i,
  /中學|中学|高中/,
  /小一|升小|p\.?[1-6]|primary (one|school)/i,
  /小學|小学/,
  /呈分試|呈分|常識科|默書|統一派位|世界排名/,
  /墮.{0,4}(軌|樓|海|河|車)/,
  /(虐(童|待)|斃命|遇害|罪案|猥褻|性侵|綁架|墜樓|身亡|罹難|燒(傷|死)|溺斃|車禍)/,
];

// KG audience signals — only trust these when found in TITLE. Many RSS
// summaries have boilerplate footers like "Oh!爸媽親子網站" that cause false
// positives if matched in summary text.
const KG_TITLE_KEYWORDS =
  /(幼稚園|幼兒園|幼稚园|幼儿园|kindergarten|nursery|playgroup|n班|\bk[123](?!\d)|入園|插班|學前|親子(?!網站|網))/i;

function isKindergartenRelevant(article: MediaArticle): boolean {
  const haystack = `${article.title} ${article.summary ?? ""}`;
  if (OFF_TOPIC_PATTERNS.some((re) => re.test(haystack))) return false;
  // Either the article matched a school in our (KG-only) DB, or its TITLE
  // explicitly signals KG content. Summary-only matches are unreliable.
  return (
    article.school_match_status === "matched" || KG_TITLE_KEYWORDS.test(article.title)
  );
}

export async function fetchMediaArticles(
  limit = 60,
  options: { audience?: "kindergarten" | "all" } = {}
): Promise<MediaArticle[]> {
  const audience = options.audience ?? "kindergarten";
  try {
    const supabase = await createClient();
    // Over-fetch when filtering so the audience-relevant slice still meets the limit.
    const fetchLimit = audience === "kindergarten" ? Math.max(limit * 4, 80) : limit;
    const { data, error } = await supabase
      .from("media_articles" as never)
      .select("*")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(fetchLimit);

    if (error || !data) return [];
    const articles = (data as UnknownRecord[]).map(normalizeArticle);
    if (audience === "all") return articles.slice(0, limit);
    return articles.filter(isKindergartenRelevant).slice(0, limit);
  } catch {
    return [];
  }
}

export async function fetchRelatedMediaArticles(
  schoolId: string,
  limit = 6
): Promise<MediaArticle[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("media_articles" as never)
      .select("*")
      .eq("school_match_status", "matched")
      .contains("school_matches", JSON.stringify([{ school_id: schoolId }]))
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error || !data) return [];
    return sortByPublishedAt((data as UnknownRecord[]).map(normalizeArticle));
  } catch {
    return [];
  }
}
