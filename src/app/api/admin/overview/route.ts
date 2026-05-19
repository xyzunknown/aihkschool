import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const supabase = await createServiceClient();
  const today = new Date();
  const in14 = new Date(today);
  in14.setDate(in14.getDate() + 14);
  const todayISO = today.toISOString().slice(0, 10);
  const in14ISO = in14.toISOString().slice(0, 10);

  const [
    pendingIntel,
    upcomingDeadlines,
    incompleteSchools,
    staleVacancies,
    expiredOpenDays,
    failedSchoolReminders,
    failedProgrammeReminders,
  ] = await Promise.all([
    supabase.from("admission_intel").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase
      .from("vacancies")
      .select("school_id", { count: "exact", head: true })
      .eq("is_current", true)
      .gte("application_deadline", todayISO)
      .lte("application_deadline", in14ISO),
    supabase
      .from("schools")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
      .or("website.is.null,logo_url.is.null,phone.is.null,fee_monthly_hkd.is.null,last_verified_at.is.null"),
    supabase
      .from("vacancies")
      .select("id", { count: "exact", head: true })
      .eq("is_current", true)
      .lt("updated_at", new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from("school_enrichments")
      .select("school_id", { count: "exact", head: true })
      .lt("open_day_date", todayISO),
    supabase.from("reminders").select("id", { count: "exact", head: true }).eq("reminder_status", "failed"),
    supabase.from("programme_reminders").select("id", { count: "exact", head: true }).eq("status", "failed"),
  ]);

  return NextResponse.json({
    data: {
      pendingIntel: pendingIntel.count ?? 0,
      upcomingDeadlines: upcomingDeadlines.count ?? 0,
      incompleteSchools: incompleteSchools.count ?? 0,
      staleVacancies: staleVacancies.count ?? 0,
      expiredOpenDays: expiredOpenDays.count ?? 0,
      failedSchoolReminders: failedSchoolReminders.count ?? 0,
      failedProgrammeReminders: failedProgrammeReminders.count ?? 0,
    },
  });
}
