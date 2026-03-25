import { createClient } from "@/lib/supabase/server";
import { normalizeVacancyStatus } from "@/lib/utils";
import type { School, District, SchoolType } from "@/types/database";

export interface FetchSchoolsParams {
  districts?: District[];
  type?: SchoolType;
  language?: string;
  session?: string;
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
       school_type, kep_participant, session_type, language_primary,
       fee_monthly_hkd, grades_offered, data_source, last_verified_at,
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
    query = query.eq("session_type", session);
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

  return {
    data: pagedSchools,
    count: vacancyStatuses && vacancyStatuses.length > 0 ? schools.length : count ?? 0,
    page,
    limit: safeLimit,
  };
}

export async function fetchSchoolById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("schools")
    .select(
      `id, school_code, name_tc, name_en, district, address_tc, address_en,
       phone, fax, email, website, logo_url, school_type, kep_participant, session_type,
       language_primary, language_secondary, fee_monthly_hkd, fee_annual_hkd,
       grades_offered, data_source, last_verified_at, is_active, created_at, updated_at`
    )
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    return null;
  }

  return data as School;
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
