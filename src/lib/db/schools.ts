import { createClient } from "@/lib/supabase/server";
import { normalizeVacancyStatus } from "@/lib/utils";
import { getFallbackEnglishName } from "@/lib/db/schoolNameFallback";
import {
  getAdmissionSummary,
  shouldShowAdmissionSummary,
} from "@/lib/schools/admissions";
import type { School, District, SchoolType } from "@/types/database";

export interface FetchSchoolsParams {
  districts?: District[];
  type?: SchoolType;
  language?: string;
  session?: string;
  hasNursery?: boolean;
  hasVacancy?: boolean;
  vacancyStatuses?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export async function fetchSchools(params: FetchSchoolsParams = {}) {
  const supabase = await createClient();
  const {
    districts,
    type,
    language,
    session,
    hasNursery,
    vacancyStatuses,
    search,
    page = 1,
    limit = 20,
  } = params;

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const offset = (page - 1) * safeLimit;

  let query = supabase
    .from("schools")
    .select(
      `id, school_code, name_tc, name_en, district, phone, website, logo_url,
       school_type, kep_participant, session_type, language_primary, has_nursery,
       latitude, longitude,
       fee_monthly_hkd, application_status, application_details, application_url,
       grades_offered, data_source, last_verified_at,
       is_active, created_at, updated_at,
       vacancies!inner ( id, academic_year, k1_vacancy, k2_vacancy, k3_vacancy, n_vacancy, application_deadline, edb_published_date, is_current )`,
      { count: "exact" }
    )
    .eq("is_active", true)
    .eq("vacancies.is_current", true);

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
    // half_day = any session with am/pm component; whole_day = any with whole_day component
    if (session === "half_day") {
      query = query.or("session_type.eq.am,session_type.eq.pm,session_type.eq.am_pm,session_type.eq.am_whole_day,session_type.eq.pm_whole_day,session_type.eq.am_pm_whole_day");
    } else if (session === "whole_day") {
      query = query.or("session_type.eq.whole_day,session_type.eq.am_whole_day,session_type.eq.pm_whole_day,session_type.eq.am_pm_whole_day");
    } else {
      query = query.eq("session_type", session);
    }
  }

  if (hasNursery) {
    query = query.eq("has_nursery", true);
  }

  if (search && search.trim()) {
    query = query.or(`name_tc.ilike.%${search.trim()}%,name_en.ilike.%${search.trim()}%`);
  }

  query = query.order("created_at", { ascending: false });

  if (!vacancyStatuses || vacancyStatuses.length === 0) {
    query = query.range(offset, offset + safeLimit - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch schools: ${error.message}`);
  }

  let schools = data ?? [];

  if (vacancyStatuses && vacancyStatuses.length > 0) {
    schools = schools.filter((school) => {
      const currentVacancy = school.vacancies?.[0];
      if (!currentVacancy) return false;

      const statuses = [
        currentVacancy.n_vacancy,
        currentVacancy.k1_vacancy,
        currentVacancy.k2_vacancy,
        currentVacancy.k3_vacancy,
      ].map((status) => normalizeVacancyStatus(status));

      return statuses.some((status) => vacancyStatuses.includes(status));
    });
  }

  const pagedSchools =
    vacancyStatuses && vacancyStatuses.length > 0
      ? schools.slice(offset, offset + safeLimit)
      : schools;

  const normalizedSchools = pagedSchools.map((school) => ({
    ...school,
    name_en: school.name_en ?? getFallbackEnglishName(school.school_code),
    admission_summary: getAdmissionSummary({
      schoolType: school.school_type,
      applicationStatus: school.application_status,
      applicationDetails: school.application_details,
      applicationUrl: school.application_url,
      vacancy: school.vacancies?.[0] ?? null,
    }),
    show_admission_summary: shouldShowAdmissionSummary({
      schoolType: school.school_type,
      applicationStatus: school.application_status,
      applicationDetails: school.application_details,
      applicationUrl: school.application_url,
      vacancy: school.vacancies?.[0] ?? null,
    }),
  }));

  return {
    data: normalizedSchools,
    count: vacancyStatuses && vacancyStatuses.length > 0 ? schools.length : count ?? 0,
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
