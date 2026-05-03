import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchPendingIntel } from "@/lib/db/intel";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) ?? [];

function isAdmin(userEmail: string | undefined): boolean {
  if (!userEmail) return false;
  // Secure-by-default: if ADMIN_EMAILS is not set, deny everyone.
  // Solo dev can set ADMIN_EMAILS=dev@local.com in .env.local.
  if (ADMIN_EMAILS.length === 0) return false;
  return ADMIN_EMAILS.includes(userEmail);
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Please log in" } },
        { status: 401 }
      );
    }

    if (!isAdmin(user.email)) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Admin access required" } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") ?? "pending";
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    if (status === "pending") {
      const result = await fetchPendingIntel(page, limit);
      return NextResponse.json({
        data: result.data,
        count: result.count,
        page: result.page,
        limit: result.limit,
      });
    }

    // For other statuses, fetch directly
    const { data, error, count } = await supabase
      .from("admission_intel")
      .select(
        `id, school_id, user_id, academic_year, grade_applied, interview_type,
         interview_language, queue_time, has_second_interview, offer_month,
         application_result, fee_registration_hkd, fee_interview_hkd, notes,
         status, helpful_count, created_at, updated_at,
         schools:school_id ( name_tc, district )`,
        { count: "exact" }
      )
      .eq("status", status)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      return NextResponse.json(
        { error: { code: "INTERNAL_ERROR", message: error.message } },
        { status: 500 }
      );
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
