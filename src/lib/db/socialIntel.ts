import { createClient } from "@/lib/supabase/server";
import type { SocialSummary, HeatRankingItem } from "@/types/database";

// ============================================================
// Social Intelligence — DB query layer
// Graceful degradation: if social_summary table doesn't exist,
// all functions return null / empty without throwing.
// ============================================================

/**
 * 获取单个学校的社交平台聚合数据（详情页用）
 */
export async function fetchSocialSummary(
  schoolId: string,
): Promise<SocialSummary | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_summary")
      .select(
        `id, school_id, school_code, total_posts, total_engagement,
         heat_rank_overall, heat_rank_district,
         interview_posts, top_interview_keywords,
         interview_format_distribution, avg_interview_duration,
         parent_interview_pct, interview_contributor_count,
         sentiment_distribution, positive_keywords, negative_keywords,
         fee_estimates, timeline_summary, competition_level,
         data_year_range, last_updated, created_at`,
      )
      .eq("school_id", schoolId)
      .maybeSingle();

    if (error) {
      // Table doesn't exist or other DB error → graceful degradation
      console.warn("fetchSocialSummary: skipping —", error.message);
      return null;
    }
    return (data as SocialSummary) ?? null;
  } catch {
    return null;
  }
}

/**
 * 获取热度排行榜（首页 Top 10 / 排行页分页）
 */
export async function fetchHeatRanking(options: {
  district?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: HeatRankingItem[]; count: number }> {
  const { district, limit = 10, offset = 0 } = options;

  try {
    const supabase = await createClient();

    // We need a join with schools to get name_tc, name_en, district, school_type.
    // Supabase JS client supports foreign-table embedding via `social_summary!inner(...)`.
    // However the simplest approach: query social_summary + schools separately or use a view.
    // We'll use the embedded join syntax: social_summary has school_id → schools.id

    let query = supabase
      .from("social_summary")
      .select(
        `school_id, school_code, total_posts, total_engagement,
         interview_posts, heat_rank_overall, heat_rank_district,
         competition_level,
         schools!inner ( id, name_tc, name_en, district, school_type, is_active )`,
        { count: "exact" },
      )
      .eq("schools.is_active", true)
      .not("heat_rank_overall", "is", null);

    if (district) {
      query = query.eq("schools.district", district);
      query = query.order("heat_rank_district", { ascending: true, nullsFirst: false });
    } else {
      query = query.order("heat_rank_overall", { ascending: true });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      console.warn("fetchHeatRanking: skipping —", error.message);
      return { data: [], count: 0 };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: HeatRankingItem[] = (data ?? []).map((row: any) => {
      const school = row.schools;
      return {
        school_id: row.school_id,
        school_code: row.school_code,
        name_tc: school.name_tc,
        name_en: school.name_en,
        district: school.district,
        school_type: school.school_type,
        total_posts: row.total_posts,
        total_engagement: row.total_engagement,
        interview_posts: row.interview_posts,
        heat_rank_overall: row.heat_rank_overall,
        heat_rank_district: row.heat_rank_district,
        competition_level: row.competition_level,
      };
    });

    return { data: items, count: count ?? 0 };
  } catch {
    return { data: [], count: 0 };
  }
}

/**
 * 批量获取多个学校的社交平台摘要（列表页用，避免 N+1 查询）
 * 返回 { school_id: SocialSummary } 的 map
 */
export async function fetchSocialSummariesBySchoolIds(
  schoolIds: string[],
): Promise<Record<string, SocialSummary>> {
  if (schoolIds.length === 0) return {};

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_summary")
      .select(
        `id, school_id, school_code, total_posts, total_engagement,
         heat_rank_overall, heat_rank_district,
         interview_posts, top_interview_keywords,
         interview_format_distribution, avg_interview_duration,
         parent_interview_pct, interview_contributor_count,
         sentiment_distribution, positive_keywords, negative_keywords,
         fee_estimates, timeline_summary, competition_level,
         data_year_range, last_updated, created_at`,
      )
      .in("school_id", schoolIds);

    if (error) {
      console.warn("fetchSocialSummariesBySchoolIds: skipping —", error.message);
      return {};
    }

    const map: Record<string, SocialSummary> = {};
    for (const row of data ?? []) {
      map[(row as SocialSummary).school_id] = row as SocialSummary;
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * 检查 social_summary 表是否有数据可用
 */
export async function hasSocialSummaryData(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error, count } = await supabase
      .from("social_summary")
      .select("id", { count: "exact", head: true })
      .limit(1);

    if (error) return false;
    return (count ?? 0) > 0;
  } catch {
    return false;
  }
}
