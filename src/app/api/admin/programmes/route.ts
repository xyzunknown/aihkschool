import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();
  const category = params.get("category");
  const district = params.get("district");
  const status = params.get("status");
  const age = params.get("age");
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.get("limit") ?? 50)));
  const offset = (page - 1) * limit;

  const supabase = await createServiceClient();
  let query = supabase
    .from("lcsd_programmes" as never)
    .select(`id, lcsd_programme_id, name_zh, name_en, category, age_min, age_max, venue, district,
      fee_hkd, sessions_count, start_date, end_date, enrolment_open_at, enrolment_close_at,
      raw_url, is_active, publish_channels, admin_status, admin_notes, last_scraped_at, created_at,
      lcsd_programme_status (seats_available, is_full, enrolment_status, last_checked_at)`, { count: "exact" });

  if (search) query = query.or(`name_zh.ilike.%${search}%,name_en.ilike.%${search}%,venue.ilike.%${search}%,lcsd_programme_id.ilike.%${search}%` as never);
  if (category) query = query.eq("category" as never, category as never);
  if (district) query = query.eq("district" as never, district as never);
  if (status) query = query.eq("admin_status" as never, status as never);
  if (age && Number.isFinite(Number(age))) {
    query = query.lte("age_min" as never, Number(age) as never).gte("age_max" as never, Number(age) as never);
  }

  const { data, error, count } = await query
    .order("enrolment_open_at", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  const rows = (data ?? []) as Array<{ id: string } & Record<string, unknown>>;
  const programmeIds = rows.map((row) => row.id);
  const { data: subs } = programmeIds.length
    ? await supabase.from("programme_subscriptions").select("programme_id").eq("is_active", true).in("programme_id", programmeIds)
    : { data: [] };
  const counts = new Map<string, number>();
  for (const sub of subs ?? []) counts.set(sub.programme_id, (counts.get(sub.programme_id) ?? 0) + 1);

  return NextResponse.json({
    data: rows.map((row) => ({ ...row, subscription_count: counts.get(row.id) ?? 0 })),
    count: count ?? 0,
    page,
    limit,
  });
}
