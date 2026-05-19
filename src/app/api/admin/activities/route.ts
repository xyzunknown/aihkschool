import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const publishChannelsSchema = z.array(z.enum(["web", "ios", "android"])).min(1).default(["web", "ios", "android"]);

const activitySchema = z.object({
  title: z.string().min(1),
  category: z.enum(["music", "sports", "art", "dance", "stem", "language", "drama", "other"]),
  organizer: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  age_min: z.number().int().nullable().optional(),
  age_max: z.number().int().nullable().optional(),
  fee: z.number().nullable().optional(),
  fee_note: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  schedule: z.string().nullable().optional(),
  contact_phone: z.string().nullable().optional(),
  contact_url: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  source: z.enum(["lcsd", "ymca", "polok", "tungwah", "manual", "other"]).default("manual"),
  source_url: z.string().nullable().optional(),
  match_confidence: z.enum(["high", "medium", "low"]).nullable().optional(),
  is_active: z.boolean().default(true),
  publish_channels: publishChannelsSchema,
  admin_status: z.enum(["visible", "hidden", "low_quality"]).default("visible"),
  admin_notes: z.string().nullable().optional(),
});

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();
  const category = params.get("category");
  const district = params.get("district");
  const status = params.get("status");
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.get("limit") ?? 50)));
  const offset = (page - 1) * limit;

  const supabase = await createServiceClient();
  let query = supabase
    .from("activities")
    .select("*", { count: "exact" });
  if (search) query = query.or(`title.ilike.%${search}%,organizer.ilike.%${search}%`);
  if (category) query = query.eq("category", category);
  if (district) query = query.eq("district", district);
  if (status) query = query.eq("admin_status" as never, status as never);

  const { data, error, count } = await query
    .order("start_date", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [], count: count ?? 0, page, limit });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const parsed = activitySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const payload = { ...parsed.data, raw_extracted: {}, admin_updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from("activities").insert(payload as never).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  await writeAdminAuditLog({
    user: auth.user!,
    action: "activity.create",
    targetType: "activity",
    targetId: (data as { id?: string })?.id ?? null,
    after: data as never,
  });
  return NextResponse.json({ data }, { status: 201 });
}
