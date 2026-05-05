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

// ============================================================
// Selects
// ============================================================

const LIST_SELECT = `id, lcsd_programme_id, name_zh, name_en, category,
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
    search,
    ageMin,
    ageMax,
    excludeAllAges,
    page = 1,
    limit = 20,
  } = params;

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const offset = (page - 1) * safeLimit;

  let query = supabase
    .from("lcsd_programmes")
    .select(LIST_SELECT, { count: "exact" })
    .eq("is_active", true);

  if (category) {
    query = query.eq("category", category);
  }
  if (district) {
    query = query.eq("district", district);
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
  // Auto-hide programmes whose enrolment window closed more than 30 days ago.
  // Keep: future/recent open_at, recent close_at, or no dates at all.
  {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const cutoffISO = cutoff.toISOString();
    query = query.or(
      `enrolment_close_at.gte.${cutoffISO},enrolment_open_at.gte.${cutoffISO},enrolment_open_at.is.null`,
    );
  }
  if (search && search.trim()) {
    const safe = search.trim().replace(/[,()]/g, "");
    query = query.or(`name_zh.ilike.%${safe}%,name_en.ilike.%${safe}%,venue.ilike.%${safe}%`);
  }

  query = query
    .order("enrolment_open_at", { ascending: true, nullsFirst: false })
    .range(offset, offset + safeLimit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch programmes: ${error.message}`);
  }

  const mapped = ((data ?? []) as ProgrammeRow[]).map((row) => {
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
  });

  return {
    data: mapped,
    count: count ?? 0,
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
    .single();

  if (error || !data) return null;
  const row = data as ProgrammeRow;
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
  const { data, error } = await supabase
    .from("lcsd_programmes")
    .select(LIST_SELECT)
    .eq("is_active", true)
    .gte("enrolment_open_at", now)
    .lte("age_min", 6)
    .or("age_max.lte.12,category.eq.parent_child")
    .order("enrolment_open_at", { ascending: true })
    .limit(limit);

  if (error) return [];
  return ((data ?? []) as ProgrammeRow[]).map((row) => {
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
  });
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
