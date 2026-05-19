import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;

    const status = request.nextUrl.searchParams.get("status") || "pending";
    const search = request.nextUrl.searchParams.get("search")?.trim();
    const page = Math.max(1, parseInt(request.nextUrl.searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(request.nextUrl.searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;
    const supabase = await createServiceClient();

    let query = supabase
      .from("admission_intel")
      .select(
        `id, school_id, user_id, academic_year, grade_applied, interview_type,
         interview_language, queue_time, has_second_interview, offer_month,
         application_result, fee_registration_hkd, fee_interview_hkd, notes,
         status, helpful_count, rejection_reason, is_hidden, created_at, updated_at,
         schools:school_id ( name_tc, district ),
         users:user_id ( email )`,
        { count: "exact" },
      )
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (search) query = query.ilike("schools.name_tc", `%${search}%`);

    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) {
      return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [], count: count ?? 0, page, limit });
  } catch (err) {
    console.error("Admin intel GET error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch intel" } },
      { status: 500 }
    );
  }
}
