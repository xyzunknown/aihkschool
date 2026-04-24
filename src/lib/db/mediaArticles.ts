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

export async function fetchMediaArticles(limit = 60): Promise<MediaArticle[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("media_articles" as never)
      .select("*")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error || !data) return [];
    return (data as UnknownRecord[]).map(normalizeArticle);
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
