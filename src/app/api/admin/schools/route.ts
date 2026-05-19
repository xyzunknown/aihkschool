import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();
  const district = params.get("district");
  const type = params.get("type");
  const active = params.get("active");
  const completeness = params.get("completeness");
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.get("limit") ?? 20)));
  const offset = (page - 1) * limit;

  const supabase = await createServiceClient();
  let query = supabase
    .from("schools")
    .select("id, school_code, name_tc, name_en, district, school_type, phone, website, logo_url, fee_monthly_hkd, last_verified_at, is_active, publish_channels, updated_at", { count: "exact" });

  if (search) query = query.or(`name_tc.ilike.%${search}%,name_en.ilike.%${search}%,school_code.ilike.%${search}%`);
  if (district) query = query.eq("district", district);
  if (type) query = query.eq("school_type", type);
  if (active === "true") query = query.eq("is_active", true);
  if (active === "false") query = query.eq("is_active", false);
  if (completeness === "incomplete") {
    query = query.or("website.is.null,logo_url.is.null,phone.is.null,fee_monthly_hkd.is.null,last_verified_at.is.null");
  }

  const { data, error, count } = await query.order("updated_at", { ascending: false }).range(offset, offset + limit - 1);
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [], count: count ?? 0, page, limit });
}
