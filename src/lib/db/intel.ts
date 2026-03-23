import { createClient } from "@/lib/supabase/server";
import type { AdmissionIntel } from "@/types/database";

export async function fetchApprovedIntel(schoolId: string, page = 1, limit = 20) {
  const supabase = await createClient();
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const offset = (page - 1) * safeLimit;

  const { data, error, count } = await supabase
    .from("admission_intel")
    .select(
      `id, school_id, user_id, academic_year, grade_applied, interview_type,
       interview_language, queue_time, has_second_interview, offer_month,
       application_result, fee_registration_hkd, fee_interview_hkd, notes,
       status, helpful_count, created_at, updated_at`,
      { count: "exact" }
    )
    .eq("school_id", schoolId)
    .eq("status", "approved")
    .order("academic_year", { ascending: false })
    .order("helpful_count", { ascending: false })
    .range(offset, offset + safeLimit - 1);

  if (error) {
    throw new Error(`Failed to fetch intel: ${error.message}`);
  }

  return { data: (data ?? []) as AdmissionIntel[], count: count ?? 0, page, limit: safeLimit };
}

export interface InsertIntelData {
  school_id: string;
  user_id: string;
  academic_year: string;
  grade_applied: string;
  interview_type: string;
  interview_language?: string;
  queue_time?: string;
  has_second_interview?: boolean;
  offer_month?: string;
  application_result: string;
  fee_registration_hkd?: number;
  fee_interview_hkd?: number;
  notes?: string;
}

export async function insertIntel(data: InsertIntelData) {
  const supabase = await createClient();

  const { data: inserted, error } = await supabase
    .from("admission_intel")
    .insert({
      school_id: data.school_id,
      user_id: data.user_id,
      academic_year: data.academic_year,
      grade_applied: data.grade_applied,
      interview_type: data.interview_type as AdmissionIntel["interview_type"],
      interview_language: data.interview_language ?? null,
      queue_time: data.queue_time ?? null,
      has_second_interview: data.has_second_interview ?? null,
      offer_month: data.offer_month ?? null,
      application_result: data.application_result as AdmissionIntel["application_result"],
      fee_registration_hkd: data.fee_registration_hkd ?? null,
      fee_interview_hkd: data.fee_interview_hkd ?? null,
      notes: data.notes ?? null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to submit intel: ${error.message}`);
  }

  return inserted;
}

export async function toggleHelpful(intelId: string, userId: string) {
  const supabase = await createClient();

  // Check if already voted
  const { data: existing } = await supabase
    .from("intel_helpful_votes")
    .select("id")
    .eq("intel_id", intelId)
    .eq("user_id", userId)
    .single();

  if (existing) {
    // Remove vote
    await supabase
      .from("intel_helpful_votes")
      .delete()
      .eq("intel_id", intelId)
      .eq("user_id", userId);

    // Decrement count
    await supabase.rpc("decrement_helpful_count", { p_intel_id: intelId });

    return { voted: false };
  }

  // Add vote
  const { error } = await supabase
    .from("intel_helpful_votes")
    .insert({ intel_id: intelId, user_id: userId });

  if (error) {
    throw new Error(`Failed to vote: ${error.message}`);
  }

  // Increment count
  await supabase.rpc("increment_helpful_count", { p_intel_id: intelId });

  return { voted: true };
}
