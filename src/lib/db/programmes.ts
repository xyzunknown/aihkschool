import { createServiceClient } from "@/lib/supabase/server";
import type { District } from "@/types/database";
import { computeEnrolmentStatus } from "@/lib/programmes/labels";

// ============================================================
// Types
// ============================================================

export type ProgrammeCategory =
  | "swimming"
  | "music"
  | "dance"
  | "art"
  | "sport"
  | "parent_child"
  | "other";

export type EnrolmentStatus = "pre_open" | "open" | "closed" | "full";

export interface Programme {
  id: string;
  lcsd_programme_id: string;
  name_zh: string | null;
  name_en: string | null;
  category: ProgrammeCategory | null;
  age_min: number | null;
  age_max: number | null;
  venue: string | null;
  district: District | null;
  fee_hkd: number | null;
  sessions_count: number | null;
  start_date: string | null;
  end_date: string | null;
  enrolment_open_at: string | null;
  enrolment_close_at: string | null;
  raw_url: string | null;
  is_active: boolean;
  publish_channels?: string[] | null;
  admin_status?: "visible" | "hidden" | "ended";
  admin_notes?: string | null;
  last_scraped_at: string | null;
  created_at: string;
}

export interface ProgrammeWithStatus extends Programme {
  lcsd_programme_status: {
    seats_available: number | null;
    is_full: boolean;
    enrolment_status: EnrolmentStatus;
    last_checked_at: string | null;
  } | null;
}

type ProgrammeStatusRow = {
  seats_available: number | null;
  is_full: boolean;
  enrolment_status: EnrolmentStatus;
  last_checked_at: string | null;
};

type ProgrammeRow = Programme & {
  lcsd_programme_status: ProgrammeStatusRow | ProgrammeStatusRow[] | null;
};

export interface FetchProgrammesParams {
  category?: ProgrammeCategory;
  district?: District;
  districts?: District[];
  search?: string;
  ageMin?: number;
  ageMax?: number;
  /**
   * Drop programmes whose age_max signals "all ages" (LCSD encodes this as
   * 199 but anything above 50 is effectively the same sentinel). Used by
   * narrow age presets so they don't get flooded by adult/senior offerings.
   */
  excludeAllAges?: boolean;
  page?: number;
  limit?: number;
}

export interface FetchProgrammesResult {
  data: ProgrammeWithStatus[];
  count: number;
  page: number;
  limit: number;
}

function isVisibleProgramme(programme: ProgrammeWithStatus) {
  return programme.lcsd_programme_status?.enrolment_status !== "closed";
}

// ============================================================
// Selects
// ============================================================

const LIST_SELECT = `id, lcsd_programme_id, name_zh, name_en, category,
  age_min, age_max, venue, district, fee_hkd, sessions_count,
  start_date, end_date, enrolment_open_at, enrolment_close_at,
  raw_url, is_active, publish_channels, admin_status, admin_notes, last_scraped_at, created_at,
  lcsd_programme_status (seats_available, is_full, enrolment_status, last_checked_at)`;

const LEGACY_LIST_SELECT = `id, lcsd_programme_id, name_zh, name_en, category,
  age_min, age_max, venue, district, fee_hkd, sessions_count,
  start_date, end_date, enrolment_open_at, enrolment_close_at,
  raw_url, is_active, last_scraped_at, created_at,
  lcsd_programme_status (seats_available, is_full, enrolment_status, last_checked_at)`;

// ============================================================
// Queries
// ============================================================

export async function fetchProgrammes(
  params: FetchProgrammesParams = {},
): Promise<FetchProgrammesResult> {
  const supabase = await createServiceClient();
  const {
    category,
    district,
    districts,
    search,
    ageMin,
    ageMax,
    excludeAllAges,
    page = 1,
    limit = 20,
  } = params;

  const safeLimit = Math.min(Math.max(limit, 1), 300);
  const offset = (page - 1) * safeLimit;

  const buildQuery = (select: string, includeAdminStatus: boolean, includePublishChannels: boolean) => {
    let nextQuery = supabase
      .from("lcsd_programmes")
      .select(select, { count: "exact" })
      .eq("is_active", true);
    if (includeAdminStatus) {
      nextQuery = nextQuery.neq("admin_status" as never, "hidden" as never);
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
  } else if (districts && districts.length > 0) {
    query = query.in("district", districts);
  }
  // Range overlap: programme matches when its [age_min, age_max] interval
  // overlaps with the filter [ageMin, ageMax]. The previous logic only
  // constrained age_max in both directions, which both excluded valid
  // programmes (e.g. a 4-11 dance class with ageMax=6 filter) and let
  // some 0-199 sentinel rows through.
  if (typeof ageMin === "number" && Number.isFinite(ageMin)) {
    query = query.gte("age_max", ageMin);
  }
  if (typeof ageMax === "number" && Number.isFinite(ageMax)) {
    query = query.lte("age_min", ageMax);
  }
  if (excludeAllAges) {
    // LCSD uses 199 as an "all ages" sentinel and 99 for "no upper limit".
    // Anything above 50 in age_max is effectively unbounded.
    query = query.lt("age_max", 50);
  }
  // Hide rows once enrolment has closed. Grouped cards and homepage previews
  // should never surface already-cutoff sessions.
  {
    const nowISO = new Date().toISOString();
    query = query.or(
      `enrolment_close_at.gt.${nowISO},enrolment_close_at.is.null`,
    );
  }
  if (search && search.trim()) {
    const safe = search.trim().replace(/[,()]/g, "");
    query = query.or(`name_zh.ilike.%${safe}%,name_en.ilike.%${safe}%,venue.ilike.%${safe}%`);
  }

  query = query
    .order("enrolment_close_at", { ascending: false, nullsFirst: true })
    .order("enrolment_open_at", { ascending: true, nullsFirst: false })
    .range(offset, offset + safeLimit - 1);

  let { data, error, count } = await query;

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    query = buildQuery(LEGACY_LIST_SELECT, false, false);
    if (category) {
      query = query.eq("category", category);
    }
    if (district) {
      query = query.eq("district", district);
    } else if (districts && districts.length > 0) {
      query = query.in("district", districts);
    }
    if (typeof ageMin === "number" && Number.isFinite(ageMin)) {
      query = query.gte("age_max", ageMin);
    }
    if (typeof ageMax === "number" && Number.isFinite(ageMax)) {
      query = query.lte("age_min", ageMax);
    }
    if (excludeAllAges) {
      query = query.lt("age_max", 50);
    }
    const nowISO = new Date().toISOString();
    query = query.or(
      `enrolment_close_at.gt.${nowISO},enrolment_close_at.is.null`,
    );
    if (search && search.trim()) {
      const safe = search.trim().replace(/[,()]/g, "");
      query = query.or(`name_zh.ilike.%${safe}%,name_en.ilike.%${safe}%,venue.ilike.%${safe}%`);
    }
    query = query
      .order("enrolment_close_at", { ascending: false, nullsFirst: true })
      .order("enrolment_open_at", { ascending: true, nullsFirst: false })
      .range(offset, offset + safeLimit - 1);
    const retry = await query;
    data = retry.data;
    error = retry.error;
    count = retry.count;
  }

  if (error) {
    throw new Error(`Failed to fetch programmes: ${error.message}`);
  }

  const mapped = ((data ?? []) as unknown as ProgrammeRow[]).map((row) => {
    const rawStatus = Array.isArray(row.lcsd_programme_status)
      ? row.lcsd_programme_status[0] ?? null
      : row.lcsd_programme_status ?? null;
    const enrolmentStatus = computeEnrolmentStatus(
      row.enrolment_open_at,
      row.enrolment_close_at,
      rawStatus?.enrolment_status ?? null,
    );
    return {
      ...row,
      lcsd_programme_status: rawStatus
        ? { ...rawStatus, enrolment_status: enrolmentStatus }
        : {
            programme_id: row.id,
            seats_available: null,
            is_full: false,
            enrolment_status: enrolmentStatus,
            last_checked_at: null,
          },
    } as ProgrammeWithStatus;
  }).filter(isVisibleProgramme);

  return {
    data: mapped,
    count: Math.min(count ?? mapped.length, mapped.length),
    page,
    limit: safeLimit,
  };
}

export async function fetchProgrammeById(id: string): Promise<ProgrammeWithStatus | null> {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("lcsd_programmes")
    .select(LIST_SELECT)
    .eq("id", id)
    .eq("is_active", true)
    .contains("publish_channels" as never, ["web"] as never)
    .neq("admin_status" as never, "hidden" as never)
    .single();

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    const retry = await supabase
      .from("lcsd_programmes")
      .select(LEGACY_LIST_SELECT)
      .eq("id", id)
      .eq("is_active", true)
      .single();
    if (retry.error || !retry.data) return null;
    const row = retry.data as unknown as ProgrammeRow;
    const rawStatus = Array.isArray(row.lcsd_programme_status)
      ? row.lcsd_programme_status[0] ?? null
      : row.lcsd_programme_status ?? null;
    const enrolmentStatus = computeEnrolmentStatus(
      row.enrolment_open_at,
      row.enrolment_close_at,
      rawStatus?.enrolment_status ?? null,
    );
    return {
      ...row,
      lcsd_programme_status: rawStatus
        ? { ...rawStatus, enrolment_status: enrolmentStatus }
        : {
            programme_id: row.id,
            seats_available: null,
            is_full: false,
            enrolment_status: enrolmentStatus,
            last_checked_at: null,
          },
    } as ProgrammeWithStatus;
  }
  if (error || !data) return null;
  const row = data as unknown as ProgrammeRow;
  const rawStatus = Array.isArray(row.lcsd_programme_status)
    ? row.lcsd_programme_status[0] ?? null
    : row.lcsd_programme_status ?? null;
  const enrolmentStatus = computeEnrolmentStatus(
    row.enrolment_open_at,
    row.enrolment_close_at,
    rawStatus?.enrolment_status ?? null,
  );
  return {
    ...row,
    lcsd_programme_status: rawStatus
      ? { ...rawStatus, enrolment_status: enrolmentStatus }
      : {
          programme_id: row.id,
          seats_available: null,
          is_full: false,
          enrolment_status: enrolmentStatus,
          last_checked_at: null,
        },
  } as ProgrammeWithStatus;
}

export async function fetchUpcomingProgrammes(limit = 6): Promise<ProgrammeWithStatus[]> {
  const supabase = await createServiceClient();

  const now = new Date().toISOString();

  // Audience filter: kindergarten product, surface programmes that fit K1-K3
  // children (~3-6) or parent-child sessions. LCSD uses age_max=199 as an
  // "all ages" sentinel, which would otherwise leak adult/senior offerings
  // (長期病患者乒乓球班、清晨觀鳥 etc) into the homepage card.
  const primaryUpcoming = await supabase
    .from("lcsd_programmes")
    .select(LIST_SELECT)
    .eq("is_active", true)
    .contains("publish_channels" as never, ["web"] as never)
    .neq("admin_status" as never, "hidden" as never)
    .or(`enrolment_close_at.gt.${now},enrolment_close_at.is.null`)
    .lte("age_min", 6)
    .or("age_max.lte.12,category.eq.parent_child")
    .order("enrolment_open_at", { ascending: true })
    .limit(limit);
  let data = primaryUpcoming.data as unknown[] | null;
  let error = primaryUpcoming.error;

  if (error?.message.includes("admin_status") || error?.message.includes("publish_channels")) {
    const retry = await supabase
      .from("lcsd_programmes")
      .select(LEGACY_LIST_SELECT)
      .eq("is_active", true)
      .or(`enrolment_close_at.gt.${now},enrolment_close_at.is.null`)
      .lte("age_min", 6)
      .or("age_max.lte.12,category.eq.parent_child")
      .order("enrolment_open_at", { ascending: true })
      .limit(limit);
    data = retry.data;
    error = retry.error;
  }
  if (error) return [];
  return ((data ?? []) as unknown as ProgrammeRow[]).map((row) => {
    const rawStatus = Array.isArray(row.lcsd_programme_status)
      ? row.lcsd_programme_status[0] ?? null
      : row.lcsd_programme_status ?? null;
    const enrolmentStatus = computeEnrolmentStatus(
      row.enrolment_open_at,
      row.enrolment_close_at,
      rawStatus?.enrolment_status ?? null,
    );
    return {
      ...row,
      lcsd_programme_status: rawStatus
        ? { ...rawStatus, enrolment_status: enrolmentStatus }
        : {
            programme_id: row.id,
            seats_available: null,
            is_full: false,
            enrolment_status: enrolmentStatus,
            last_checked_at: null,
          },
    } as ProgrammeWithStatus;
  }).filter(isVisibleProgramme);
}

/**
 * 更新課程實時狀態（C 路徑用）
 */
export async function upsertProgrammeStatus(
  programmeId: string,
  status: {
    seats_available: number | null;
    is_full: boolean;
    enrolment_status: EnrolmentStatus;
  },
) {
  const supabase = await createServiceClient();

  const { error } = await supabase
    .from("lcsd_programme_status")
    .upsert({
      programme_id: programmeId,
      ...status,
      last_checked_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(`Failed to upsert programme status: ${error.message}`);
  }
}
