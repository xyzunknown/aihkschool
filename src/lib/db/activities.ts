import { createClient } from "@/lib/supabase/server";
import { getOneMonthAgoDate } from "@/lib/activities/labels";

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
  publish_channels?: string[] | null;
  admin_status?: "visible" | "hidden" | "low_quality";
  admin_notes?: string | null;
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
  source, source_url, match_confidence, is_active, publish_channels, admin_status, admin_notes, created_at, updated_at`;

const LEGACY_LIST_SELECT = `id, title, category, organizer, district, address,
  description, age_min, age_max, fee, fee_note,
  start_date, end_date, schedule, contact_phone, contact_url, image_url,
  source, source_url, match_confidence, is_active, created_at, updated_at`;

// ============================================================
// Queries
// ============================================================

function sortByExpiryThenDate(activities: Activity[]): Activity[] {
  const now = Date.now();
  return activities.slice().sort((a, b) => {
    const aExpired = a.end_date ? new Date(a.end_date).getTime() < now : false;
    const bExpired = b.end_date ? new Date(b.end_date).getTime() < now : false;
    if (aExpired !== bExpired) return aExpired ? 1 : -1;
    const aDate = a.start_date ? new Date(a.start_date).getTime() : Infinity;
    const bDate = b.start_date ? new Date(b.start_date).getTime() : Infinity;
    return aDate - bDate;
  });
}

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

  const buildQuery = (select: string, includeAdminStatus: boolean, includePublishChannels: boolean) => {
    let nextQuery = supabase
      .from("activities")
      .select(select, { count: "exact" })
      .eq("is_active", true)
      .not("source_url", "is", null)
      .neq("source_url", "");
    if (includeAdminStatus) {
      nextQuery = nextQuery
        .neq("admin_status" as never, "hidden" as never)
        .neq("admin_status" as never, "low_quality" as never);
    }
    if (includePublishChannels) {
      nextQuery = nextQuery.contains("publish_channels" as never, ["web"] as never);
    }
    return nextQuery;
  };

  let query = buildQuery(LIST_SELECT, true, true);

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

  // 過濾：結束超過一個月的活動不再前端顯示
  // end_date IS NULL = 長期活動
  const oneMonthAgo = getOneMonthAgoDate();
  query = query.or(`end_date.is.null,end_date.gte.${oneMonthAgo}`);

  // 按 start_date 升序：即將開始的在前；NULL 沉底
  query = query
    .order("start_date", { ascending: true, nullsFirst: false })
    .range(offset, offset + safeLimit - 1);

  let { data, error, count } = await query;

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    query = buildQuery(LEGACY_LIST_SELECT, false, false);
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
      query = query
        .or(`age_min.is.null,age_min.lte.${age}`)
        .or(`age_max.is.null,age_max.gte.${age}`);
    }
    if (search && search.trim()) {
      const safe = search.trim().replace(/[,()]/g, "");
      query = query.or(`title.ilike.%${safe}%,organizer.ilike.%${safe}%`);
    }
    query = query
      .or(`end_date.is.null,end_date.gte.${oneMonthAgo}`)
      .order("start_date", { ascending: true, nullsFirst: false })
      .range(offset, offset + safeLimit - 1);
    const retry = await query;
    data = retry.data;
    error = retry.error;
    count = retry.count;
  }

  if (error) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }

  // 排序：未过期在前，已过期沉底（兩類內部均按 start_date 升序）
  const sorted = sortByExpiryThenDate((data ?? []) as unknown as Activity[]);

  return {
    data: sorted,
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
    .contains("publish_channels" as never, ["web"] as never)
    .neq("admin_status" as never, "hidden" as never)
    .neq("admin_status" as never, "low_quality" as never)
    .not("source_url", "is", null)
    .neq("source_url", "")
    .single();

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    const retry = await supabase
      .from("activities")
      .select(LEGACY_LIST_SELECT)
      .eq("id", id)
      .eq("is_active", true)
      .not("source_url", "is", null)
      .neq("source_url", "")
      .single();
    if (retry.error || !retry.data) return null;
    return retry.data as unknown as Activity;
  }
  if (error || !data) return null;
  return data as unknown as Activity;
}

export async function fetchRelatedActivities(
  activity: Activity,
  limit = 4,
): Promise<Activity[]> {
  const supabase = await createClient();
  const oneMonthAgo = getOneMonthAgoDate();

  // 優先：同類別；次選：同區域
  const primaryRelated = await supabase
    .from("activities")
    .select(LIST_SELECT)
    .eq("is_active", true)
    .contains("publish_channels" as never, ["web"] as never)
    .neq("admin_status" as never, "hidden" as never)
    .neq("admin_status" as never, "low_quality" as never)
    .not("source_url", "is", null)
    .neq("source_url", "")
    .neq("id", activity.id)
    .or(
      `category.eq.${activity.category}${
        activity.district ? `,district.eq.${activity.district}` : ""
      }`,
    )
    .or(`end_date.is.null,end_date.gte.${oneMonthAgo}`)
    .order("start_date", { ascending: true, nullsFirst: false })
    .limit(limit);
  let data = primaryRelated.data as unknown[] | null;
  let error = primaryRelated.error;

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    const retry = await supabase
      .from("activities")
      .select(LEGACY_LIST_SELECT)
      .eq("is_active", true)
      .not("source_url", "is", null)
      .neq("source_url", "")
      .neq("id", activity.id)
      .or(
        `category.eq.${activity.category}${
          activity.district ? `,district.eq.${activity.district}` : ""
        }`,
      )
      .or(`end_date.is.null,end_date.gte.${oneMonthAgo}`)
      .order("start_date", { ascending: true, nullsFirst: false })
      .limit(limit);
    data = retry.data;
    error = retry.error;
  }
  if (error) return [];
  return sortByExpiryThenDate((data ?? []) as unknown as Activity[]);
}

export async function fetchFeaturedActivities(limit = 6): Promise<Activity[]> {
  const supabase = await createClient();
  const oneMonthAgo = getOneMonthAgoDate();

  // 首頁預覽：最近即將開始的活動
  const primaryFeatured = await supabase
    .from("activities")
    .select(LIST_SELECT)
    .eq("is_active", true)
    .contains("publish_channels" as never, ["web"] as never)
    .neq("admin_status" as never, "hidden" as never)
    .neq("admin_status" as never, "low_quality" as never)
    .not("source_url", "is", null)
    .neq("source_url", "")
    .or(`end_date.is.null,end_date.gte.${oneMonthAgo}`)
    .order("start_date", { ascending: true, nullsFirst: false })
    .limit(limit);
  let data = primaryFeatured.data as unknown[] | null;
  let error = primaryFeatured.error;

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    const retry = await supabase
      .from("activities")
      .select(LEGACY_LIST_SELECT)
      .eq("is_active", true)
      .not("source_url", "is", null)
      .neq("source_url", "")
      .or(`end_date.is.null,end_date.gte.${oneMonthAgo}`)
      .order("start_date", { ascending: true, nullsFirst: false })
      .limit(limit);
    data = retry.data;
    error = retry.error;
  }
  if (error) return [];
  return sortByExpiryThenDate((data ?? []) as unknown as Activity[]);
}
