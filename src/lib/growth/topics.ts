import { createServiceClient } from "@/lib/supabase/server";

export type Topic = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  hero_image_url: string | null;
  body_md: string;
  is_featured: boolean;
  published_at: string | null;
};

function normalizeTopic(row: Record<string, unknown>): Topic {
  return {
    id: String(row.id),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    summary: String(row.summary ?? ""),
    category: String(row.category ?? "guide"),
    hero_image_url: row.hero_image_url ? String(row.hero_image_url) : null,
    body_md: String(row.body_md ?? ""),
    is_featured: Boolean(row.is_featured),
    published_at: row.published_at ? String(row.published_at) : null,
  };
}

export async function getVisibleTopics() {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("content_topics" as never)
      .select("id, slug, title, summary, category, hero_image_url, body_md, is_featured, published_at")
      .eq("is_visible" as never, true as never)
      .order("is_featured" as never, { ascending: false } as never)
      .order("published_at" as never, { ascending: false, nullsFirst: false } as never);

    if (error) return [];
    return ((data ?? []) as Record<string, unknown>[]).map(normalizeTopic);
  } catch {
    return [];
  }
}

export async function getVisibleTopic(slug: string) {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("content_topics" as never)
      .select("id, slug, title, summary, category, hero_image_url, body_md, is_featured, published_at")
      .eq("slug" as never, slug as never)
      .eq("is_visible" as never, true as never)
      .single();

    if (error || !data) return null;
    return normalizeTopic(data as Record<string, unknown>);
  } catch {
    return null;
  }
}
