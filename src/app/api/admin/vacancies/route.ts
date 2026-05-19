import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();
  const deadline = params.get("deadline");
  const vacancy = params.get("vacancy");
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.get("limit") ?? 20)));
  const offset = (page - 1) * limit;

  const supabase = await createServiceClient();
  let query = supabase
    .from("vacancies")
    .select("*, schools!inner(id, name_tc, name_en, district, is_active, application_url)", { count: "exact" })
    .eq("is_current", true);

  if (search) query = query.or(`name_tc.ilike.%${search}%,name_en.ilike.%${search}%`, { foreignTable: "schools" });
  if (deadline && ["7", "14", "30"].includes(deadline)) {
    const today = new Date();
    const until = new Date(today);
    until.setDate(until.getDate() + Number(deadline));
    query = query.gte("application_deadline", today.toISOString().slice(0, 10)).lte("application_deadline", until.toISOString().slice(0, 10));
  }
  if (vacancy) {
    query = query.or(`n_vacancy.eq.${vacancy},k1_vacancy.eq.${vacancy},k2_vacancy.eq.${vacancy},k3_vacancy.eq.${vacancy}`);
  }

  const { data, error, count } = await query
    .order("application_deadline", { ascending: true, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [], count: count ?? 0, page, limit });
}
