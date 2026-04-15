import { createClient } from "@/lib/supabase/server";

// ============================================================
// Types
// ============================================================

export type ActivityCategory =
  | "music"
  | "sports"
  | "art"
  | "dance"
  | "stem"
  | "language"
  | "drama"
  | "other";

export type ActivityDistrict =
  | "central_and_western"
  | "eastern"
  | "southern"
  | "wan_chai"
  | "kowloon_city"
  | "kwun_tong"
  | "sham_shui_po"
  | "wong_tai_sin"
  | "yau_tsim_mong"
  | "islands"
  | "kwai_tsing"
  | "north"
  | "sai_kung"
  | "sha_tin"
  | "tai_po"
  | "tsuen_wan"
  | "tuen_mun"
  | "yuen_long";

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  organizer: string | null;
  district: ActivityDistrict | null;
  address: string | null;
  description: string | null;
  age_min: number | null;
  age_max: number | null;
  fee: number | null;
  fee_note: string | null;
  start_date: string | null;
  end_date: string | null;
  schedule: string | null;
  contact_phone: string | null;
  contact_url: string | null;
  image_url: string | null;
  source: string;
  source_url: string | null;
  match_confidence: "high" | "medium" | "low" | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FetchActivitiesParams {
  category?: ActivityCategory;
  district?: ActivityDistrict;
  free?: boolean;           // true = 只顯示免費
  age?: number;             // 年齡落在 [age_min, age_max] 之間
  search?: string;          // 標題 / 機構模糊搜索
  page?: number;
  limit?: number;
}

export interface FetchActivitiesResult {
  data: Activity[];
  count: number;
  page: number;
  limit: number;
}

const LIST_SELECT = `id, title, category, organizer, district, address,
  description, age_min, age_max, fee, fee_note,
  start_date, end_date, schedule, contact_phone, contact_url, image_url,
  source, source_url, match_confidence, is_active, created_at, updated_at`;

// ============================================================
// Queries
// ============================================================

export async function fetchActivities(
  params: FetchActivitiesParams = {},
): Promise<FetchActivitiesResult> {
  const supabase = await createClient();
  const {
    category,
    district,
    free,
    age,
    search,
    page = 1,
    limit = 20,
  } = params;

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const offset = (page - 1) * safeLimit;

  let query = supabase
    .from("activities")
    .select(LIST_SELECT, { count: "exact" })
    .eq("is_active", true);

  if (category) {
    query = query.eq("category", category);
  }
  if (district) {
    query = query.eq("district", district);
  }
  if (free) {
    query = query.eq("fee", 0);
  }
  if (typeof age === "number" && Number.isFinite(age)) {
    // age 落在 [age_min, age_max] 之間；若字段為 NULL 則視為不限
    query = query
      .or(`age_min.is.null,age_min.lte.${age}`)
      .or(`age_max.is.null,age_max.gte.${age}`);
  }
  if (search && search.trim()) {
    const safe = search.trim().replace(/[,()]/g, "");
    query = query.or(`title.ilike.%${safe}%,organizer.ilike.%${safe}%`);
  }

  // 按 start_date 升序：即將開始的在前；NULL 沉底
  query = query
    .order("start_date", { ascending: true, nullsFirst: false })
    .range(offset, offset + safeLimit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }

  return {
    data: (data ?? []) as Activity[],
    count: count ?? 0,
    page,
    limit: safeLimit,
  };
}

export async function fetchActivityById(id: string): Promise<Activity | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .select(LIST_SELECT)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data as Activity;
}

export async function fetchRelatedActivities(
  activity: Activity,
  limit = 4,
): Promise<Activity[]> {
  const supabase = await createClient();

  // 優先：同類別；次選：同區域
  const { data, error } = await supabase
    .from("activities")
    .select(LIST_SELECT)
    .eq("is_active", true)
    .neq("id", activity.id)
    .or(
      `category.eq.${activity.category}${
        activity.district ? `,district.eq.${activity.district}` : ""
      }`,
    )
    .order("start_date", { ascending: true, nullsFirst: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []) as Activity[];
}

export async function fetchFeaturedActivities(limit = 6): Promise<Activity[]> {
  const supabase = await createClient();

  // 首頁預覽：最近即將開始的活動
  const { data, error } = await supabase
    .from("activities")
    .select(LIST_SELECT)
    .eq("is_active", true)
    .order("start_date", { ascending: true, nullsFirst: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []) as Activity[];
}
