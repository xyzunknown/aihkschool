import { createClient } from "@/lib/supabase/server";
import type { Vacancy } from "@/types/database";

export async function fetchCurrentVacancy(schoolId: string): Promise<Vacancy | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vacancies")
    .select(
      `id, school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy,
       application_deadline, edb_source_url, edb_published_date, is_current,
       created_at, updated_at`
    )
    .eq("school_id", schoolId)
    .eq("is_current", true)
    .single();

  if (error) {
    return null;
  }

  return data as Vacancy;
}

export async function fetchVacanciesBySchool(schoolId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vacancies")
    .select(
      `id, school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy,
       application_deadline, edb_source_url, edb_published_date, is_current,
       created_at, updated_at`
    )
    .eq("school_id", schoolId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch vacancies: ${error.message}`);
  }

  return data ?? [];
}
