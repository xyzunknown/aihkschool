import { createClient } from "@/lib/supabase/server";
import { normalizeVacancyStatus } from "@/lib/utils";
import { getFallbackEnglishName } from "@/lib/db/schoolNameFallback";
import {
  getAdmissionSummary,
  shouldShowAdmissionSummary,
} from "@/lib/schools/admissions";
import type { School, District, SchoolType, SessionType, VacancyStatus } from "@/types/database";

export type SessionFilter = SessionType | "half_day";

export interface FetchSchoolsParams {
  districts?: District[];
  type?: SchoolType;
  language?: string;
  session?: SessionFilter;
  hasNursery?: boolean;
  hasVacancy?: boolean;
  vacancyStatuses?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

const FULL_LIST_SELECT = `id, school_code, name_tc, name_en, district, phone, website, logo_url,
  school_type, kep_participant, session_type, language_primary, has_nursery,
  latitude, longitude,
  fee_monthly_hkd, application_status, application_details, application_url,
  grades_offered, data_source, last_verified_at,
  is_active, created_at, updated_at,
  vacancies ( id, academic_year, k1_vacancy, k2_vacancy, k3_vacancy, n_vacancy, application_deadline, edb_published_date, is_current )`;

const LEGACY_LIST_SELECT = `id, school_code, name_tc, name_en, district, phone, website, logo_url,
  school_type, kep_participant, session_type, language_primary,
  fee_monthly_hkd, grades_offered, data_source, last_verified_at,
  is_active, created_at, updated_at,
  vacancies ( id, academic_year, k1_vacancy, k2_vacancy, k3_vacancy, n_vacancy, application_deadline, edb_published_date, is_current )`;

const NEW_COLUMN_NAMES = [
  "has_nursery", "latitude", "longitude",
  "application_status", "application_details", "application_url",
];

function buildSchoolListQuery(
  supabase: Awaited<ReturnType<typeof createClient>>,
  selectStr: string,
  params: FetchSchoolsParams,
  isLegacy: boolean,
) {
  const {
    districts, type, language, session, hasNursery,
    search,
  } = params;

  let query = supabase
    .from("schools")
    .select(selectStr, { count: "exact" })
    .eq("is_active", true);

  if (districts && districts.length > 0) {
    query = query.in("district", districts);
  }
  if (type) {
    query = query.eq("school_type", type);
  }
  if (language) {
    query = query.eq("language_primary", language);
  }
  if (session) {
    if (session === "half_day") {
      query = query.or("session_type.eq.am,session_type.eq.pm,session_type.eq.am_pm,session_type.eq.am_whole_day,session_type.eq.pm_whole_day,session_type.eq.am_pm_whole_day");
    } else if (session === "whole_day") {
      query = query.or("session_type.eq.whole_day,session_type.eq.am_whole_day,session_type.eq.pm_whole_day,session_type.eq.am_pm_whole_day");
    } else {
      query = query.eq("session_type", session);
    }
  }
  // Skip has_nursery filter in legacy mode (column doesn't exist)
  if (hasNursery && !isLegacy) {
    query = query.eq("has_nursery", true);
  }
  if (search && search.trim()) {
    query = query.or(`name_tc.ilike.%${search.trim()}%,name_en.ilike.%${search.trim()}%`);
  }

  // No DB-level sort — we sort in-memory after vacancy enrichment
  // No DB-level pagination — we paginate after sorting

  return query;
}

export async function fetchSchools(params: FetchSchoolsParams = {}) {
  const supabase = await createClient();
  const {
    vacancyStatuses,
    page = 1,
    limit = 20,
  } = params;

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const offset = (page - 1) * safeLimit;

  // Try full query first, fallback to legacy if new columns don't exist
  let result = await buildSchoolListQuery(supabase, FULL_LIST_SELECT, params, false);
  let isLegacy = false;

  if (result.error) {
    const needsFallback = NEW_COLUMN_NAMES.some((col) =>
      result.error!.message.includes(col)
    );
    if (needsFallback) {
      console.warn("fetchSchools: falling back to legacy select (missing columns):", result.error.message);
      result = await buildSchoolListQuery(supabase, LEGACY_LIST_SELECT, params, true);
      isLegacy = true;
    }
    if (result.error) {
      throw new Error(`Failed to fetch schools: ${result.error.message}`);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawData: any[] = (result.data as any[]) ?? [];

  // Filter vacancies to only is_current=true in-memory
  let schools = rawData.map((school) => ({
    ...school,
    // Fill missing columns with defaults when in legacy mode
    ...(isLegacy ? {
      has_nursery: false,
      latitude: null,
      longitude: null,
      application_status: null,
      application_details: null,
      application_url: null,
    } : {}),
    vacancies: (school.vacancies ?? []).filter(
      (v: { is_current: boolean }) => v.is_current
    ),
  }));

  if (vacancyStatuses && vacancyStatuses.length > 0) {
    schools = schools.filter((school) => {
      const currentVacancy = school.vacancies?.[0];
      if (!currentVacancy) return false;

      const statuses = [
        currentVacancy.n_vacancy,
        currentVacancy.k1_vacancy,
        currentVacancy.k2_vacancy,
        currentVacancy.k3_vacancy,
      ].map((status: string) => normalizeVacancyStatus(status as VacancyStatus));

      return statuses.some((status) => vacancyStatuses.includes(status));
    });
  }

  // Sort: has_vacancy first → nearest deadline → most recently updated
  schools.sort((a, b) => {
    const vA = a.vacancies?.[0];
    const vB = b.vacancies?.[0];

    // 1. Schools with any vacancy come first
    const hasVacA = vA ? [vA.k1_vacancy, vA.k2_vacancy, vA.k3_vacancy, vA.n_vacancy]
      .some((s: string) => normalizeVacancyStatus(s as VacancyStatus) === "has_vacancy") : false;
    const hasVacB = vB ? [vB.k1_vacancy, vB.k2_vacancy, vB.k3_vacancy, vB.n_vacancy]
      .some((s: string) => normalizeVacancyStatus(s as VacancyStatus) === "has_vacancy") : false;
    if (hasVacA !== hasVacB) return hasVacA ? -1 : 1;

    // 2. Nearest deadline first (null deadlines go to end)
    const dlA = vA?.application_deadline ? new Date(vA.application_deadline).getTime() : Infinity;
    const dlB = vB?.application_deadline ? new Date(vB.application_deadline).getTime() : Infinity;
    if (dlA !== dlB) return dlA - dlB;

    // 3. Most recently updated first
    const updA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
    const updB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
    return updB - updA;
  });

  const totalCount = schools.length;
  const pagedSchools = schools.slice(offset, offset + safeLimit);

  const normalizedSchools = pagedSchools.map((school) => ({
    ...school,
    name_en: school.name_en ?? getFallbackEnglishName(school.school_code),
    admission_summary: getAdmissionSummary({
      schoolType: school.school_type,
      applicationStatus: school.application_status ?? null,
      applicationDetails: school.application_details ?? null,
      applicationUrl: school.application_url ?? null,
      vacancy: school.vacancies?.[0] ?? null,
    }),
    show_admission_summary: shouldShowAdmissionSummary({
      schoolType: school.school_type,
      applicationStatus: school.application_status ?? null,
      applicationDetails: school.application_details ?? null,
      applicationUrl: school.application_url ?? null,
      vacancy: school.vacancies?.[0] ?? null,
    }),
  }));

  // Batch-fetch enrichment badges for this page of schools
  const schoolIds = normalizedSchools.map((s) => s.id);
  const enrichmentMap: Record<string, { application_url: string | null; open_day_date: string | null; open_day_details: string | null }> = {};
  if (schoolIds.length > 0) {
    try {
      const { data: enrichRows } = await supabase
        .from("school_enrichments")
        .select("school_id, application_url, open_day_date, open_day_details")
        .in("school_id", schoolIds);
      if (enrichRows) {
        for (const row of enrichRows) {
          enrichmentMap[row.school_id] = {
            application_url: row.application_url,
            open_day_date: row.open_day_date,
            open_day_details: row.open_day_details,
          };
        }
      }
    } catch {
      // Table missing or error — enrichment badges just won't show
    }
  }

  const schoolsWithEnrichment = normalizedSchools.map((s) => ({
    ...s,
    enrichment: enrichmentMap[s.id] ?? null,
  }));

  return {
    data: schoolsWithEnrichment,
    count: totalCount,
    page,
    limit: safeLimit,
  };
}

export async function fetchSchoolById(id: string) {
  const supabase = await createClient();

  const fullSelect = `id, school_code, name_tc, name_en, district, address_tc, address_en,
     phone, fax, email, website, logo_url, school_type, kep_participant, session_type,
     language_primary, language_secondary, fee_monthly_hkd, fee_annual_hkd,
     application_fee_hkd, registration_fee_hkd, other_fees_note, fee_notes,
     application_status, application_details, application_url, open_day_details, open_day_url,
     grades_offered, data_source, last_verified_at, last_profile_scraped_at, is_active, created_at, updated_at`;

  const legacySelect = `id, school_code, name_tc, name_en, district, address_tc, address_en,
     phone, fax, email, website, logo_url, school_type, kep_participant, session_type,
     language_primary, language_secondary, fee_monthly_hkd, fee_annual_hkd,
     grades_offered, data_source, last_verified_at, is_active, created_at, updated_at`;

  const { data, error } = await supabase
    .from("schools")
    .select(fullSelect)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!error) {
    return {
      ...data,
      name_en: data.name_en ?? getFallbackEnglishName(data.school_code),
    } as School;
  }

  const shouldFallback =
    error.message.includes("application_fee_hkd") ||
    error.message.includes("registration_fee_hkd") ||
    error.message.includes("other_fees_note") ||
    error.message.includes("fee_notes") ||
    error.message.includes("application_status") ||
    error.message.includes("application_details") ||
    error.message.includes("application_url") ||
    error.message.includes("open_day_details") ||
    error.message.includes("open_day_url") ||
    error.message.includes("last_profile_scraped_at");

  if (!shouldFallback) {
    return null;
  }

  const legacyResult = await supabase
    .from("schools")
    .select(legacySelect)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (legacyResult.error || !legacyResult.data) {
    return null;
  }

  return {
    ...legacyResult.data,
    name_en: legacyResult.data.name_en ?? getFallbackEnglishName(legacyResult.data.school_code),
    application_fee_hkd: null,
    registration_fee_hkd: null,
    other_fees_note: null,
    fee_notes: null,
    application_status: null,
    application_details: null,
    application_url: null,
    open_day_details: null,
    open_day_url: null,
    last_profile_scraped_at: null,
  } as School;
}

// ── School Enrichment ──────────────────────────────────────────────────────

export interface ReputationTag {
  tag: string;
  count: number;
}

export interface QuoteHighlight {
  text: string;
  source_platform: string;
  posted_at?: string | null;
}

export interface SchoolEnrichment {
  school_id: string;
  // Official layer
  admission_hours: string | null;
  application_process: string | null;
  application_url: string | null;
  open_day_date: string | null;
  open_day_details: string | null;
  vacancy_k1: string | null;
  vacancy_k2: string | null;
  vacancy_k3: string | null;
  // Reputation layer
  reputation_summary: string | null;
  pros_tags: ReputationTag[];
  cons_tags: ReputationTag[];
  interview_style: string | null;
  quote_highlights: QuoteHighlight[] | null;
  sentiment_positive_ratio: number | null;
  source_count_by_platform: Record<string, number>;
  scrape_confidence: "high" | "medium" | "low" | null;
  last_updated_at: string;
  reputation_last_updated: string | null;
}

/**
 * Columns GRANTed to anon in migration 019.
 * Selecting anything outside this set causes PostgREST permission denied for guests.
 */
const ENRICHMENT_ANON_SELECT = `school_id, admission_hours, application_process, application_url, open_day_date, open_day_details, vacancy_k1, vacancy_k2, vacancy_k3, reputation_summary, pros_tags, cons_tags, interview_style, sentiment_positive_ratio, source_count_by_platform, scrape_confidence, last_updated_at, reputation_last_updated`;

const ENRICHMENT_RESTRICTED_SELECT = `school_id, admission_hours, application_process, application_url, open_day_date, open_day_details, vacancy_k1, vacancy_k2, vacancy_k3, reputation_summary, pros_tags, cons_tags, interview_style, sentiment_positive_ratio, source_count_by_platform, scrape_confidence, last_updated_at, reputation_last_updated, quote_highlights`;

/**
 * Fetch the enrichment row for a single school. Returns null if the table
 * doesn't exist yet (migration 015 not applied) or no data for this school.
 *
 * @param includeRestricted — true to include quote_highlights (requires authenticated role)
 */
export async function fetchSchoolEnrichment(
  schoolId: string,
  opts?: { includeRestricted?: boolean },
): Promise<SchoolEnrichment | null> {
  const supabase = await createClient();
  const selectStr = opts?.includeRestricted
    ? ENRICHMENT_RESTRICTED_SELECT
    : ENRICHMENT_ANON_SELECT;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase
    .from("school_enrichments")
    .select(selectStr)
    .eq("school_id", schoolId)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .maybeSingle() as { data: any; error: any };

  if (error) {
    // Table missing (migration not applied) or transient — return null, caller falls back
    const msg = error.message || "";
    if (
      msg.includes("school_enrichments") ||
      msg.includes("does not exist") ||
      msg.includes("relation")
    ) {
      return null;
    }
    console.warn("fetchSchoolEnrichment error:", msg);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    pros_tags: Array.isArray(data.pros_tags) ? (data.pros_tags as ReputationTag[]) : [],
    cons_tags: Array.isArray(data.cons_tags) ? (data.cons_tags as ReputationTag[]) : [],
    quote_highlights: Array.isArray(data.quote_highlights)
      ? (data.quote_highlights as QuoteHighlight[])
      : (opts?.includeRestricted ? [] : null),
    source_count_by_platform:
      data.source_count_by_platform && typeof data.source_count_by_platform === "object"
        ? (data.source_count_by_platform as Record<string, number>)
        : {},
  } as SchoolEnrichment;
}

export async function searchSchools(query: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("schools")
    .select("id, name_tc, name_en, district")
    .eq("is_active", true)
    .or(`name_tc.ilike.%${query}%,name_en.ilike.%${query}%`)
    .limit(10);

  if (error) {
    throw new Error(`Failed to search schools: ${error.message}`);
  }

  return data ?? [];
}
