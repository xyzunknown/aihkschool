import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const schoolSchema = z.object({
  name_tc: z.string().min(1),
  name_en: z.string().nullable().optional(),
  district: z.string().min(1),
  address_tc: z.string().nullable().optional(),
  address_en: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  school_type: z.enum(["non_profit", "private_independent", "international"]),
  kep_participant: z.boolean(),
  session_type: z.string().nullable().optional(),
  language_primary: z.string().nullable().optional(),
  language_secondary: z.string().nullable().optional(),
  fee_monthly_hkd: z.number().nullable().optional(),
  fee_annual_hkd: z.number().nullable().optional(),
  grades_offered: z.array(z.string()).default([]),
  is_active: z.boolean(),
  publish_channels: z.array(z.enum(["web", "ios", "android"])).min(1).default(["web", "ios", "android"]),
  last_verified_at: z.string().nullable().optional(),
});

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const supabase = await createServiceClient();
  const { data, error } = await supabase.from("schools").select("*").eq("id", params.id).single();
  if (error) {
    return NextResponse.json({ error: { code: "NOT_FOUND", message: "School not found" } }, { status: 404 });
  }
  return NextResponse.json({ data });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const body = await request.json();
  const parsed = schoolSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from("schools").select("*").eq("id", params.id).single();
  const payload = {
    ...parsed.data,
    name_en: parsed.data.name_en || null,
    address_tc: parsed.data.address_tc || null,
    address_en: parsed.data.address_en || null,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    website: parsed.data.website || null,
    logo_url: parsed.data.logo_url || null,
    session_type: parsed.data.session_type || null,
    language_primary: parsed.data.language_primary || null,
    language_secondary: parsed.data.language_secondary || null,
    last_verified_at: parsed.data.last_verified_at || null,
  };

  const { data, error } = await supabase.from("schools").update(payload).eq("id", params.id).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: "school.update",
    targetType: "school",
    targetId: params.id,
    before: before as never,
    after: data as never,
  });

  return NextResponse.json({ data });
}
