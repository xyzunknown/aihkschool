import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const params = request.nextUrl.searchParams;
  const action = params.get("action");
  const targetType = params.get("targetType");
  const admin = params.get("admin");
  const supabase = await createServiceClient();

  let query = supabase
    .from("admin_audit_logs" as never)
    .select("*", { count: "exact" });
  if (action) query = query.ilike("action" as never, `%${action}%` as never);
  if (targetType) query = query.eq("target_type" as never, targetType as never);
  if (admin) query = query.ilike("admin_email" as never, `%${admin}%` as never);

  const { data, error, count } = await query.order("created_at", { ascending: false }).limit(100);
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [], count: count ?? 0 });
}
