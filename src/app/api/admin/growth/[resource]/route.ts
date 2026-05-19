import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const schemas = {
  placements: z.object({
    slot_type: z.enum(["home", "school_list", "activity", "programme"]),
    title: z.string().min(1),
    target_type: z.enum(["school", "activity", "programme", "topic", "external"]),
    target_id: z.string().nullable().optional(),
    target_url: z.string().nullable().optional(),
    starts_at: z.string().nullable().optional(),
    ends_at: z.string().nullable().optional(),
    is_visible: z.boolean().default(true),
    sort_order: z.number().int().default(100),
    notes: z.string().nullable().optional(),
  }),
  partners: z.object({
    school_id: z.string().uuid().nullable().optional(),
    partner_name: z.string().min(1),
    contact_name: z.string().nullable().optional(),
    contact_email: z.string().nullable().optional(),
    contact_phone: z.string().nullable().optional(),
    status: z.enum(["lead", "contacted", "negotiating", "active", "paused", "ended"]).default("lead"),
    starts_at: z.string().nullable().optional(),
    ends_at: z.string().nullable().optional(),
    placement: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
  }),
  campaigns: z.object({
    title: z.string().min(1),
    audience_filter: z.string().nullable().optional(),
    subject: z.string().min(1),
    body_summary: z.string().nullable().optional(),
    status: z.enum(["draft", "scheduled", "sent", "paused"]).default("draft"),
    scheduled_at: z.string().nullable().optional(),
    sent_at: z.string().nullable().optional(),
  }),
  topics: z.object({
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    summary: z.string().default(""),
    category: z.enum(["district", "nursery", "international", "admission", "open_day", "guide"]).default("guide"),
    hero_image_url: z.string().nullable().optional(),
    body_md: z.string().default(""),
    is_visible: z.boolean().default(false),
    is_featured: z.boolean().default(false),
    published_at: z.string().nullable().optional(),
  }),
  assistant: z.object({
    suggestion_type: z.enum(["school_update", "summary", "open_day", "application_date", "homepage_news"]),
    title: z.string().min(1),
    summary: z.string().default(""),
    target_type: z.string().nullable().optional(),
    target_id: z.string().nullable().optional(),
    status: z.enum(["open", "accepted", "dismissed", "done"]).default("open"),
    source_url: z.string().nullable().optional(),
  }),
};

const tables: Record<string, string> = {
  placements: "recommendation_slots",
  partners: "school_partnerships",
  subscribers: "newsletter_subscribers",
  campaigns: "newsletter_campaigns",
  topics: "content_topics",
  assistant: "ai_ops_suggestions",
};

function tableForResource(resource: string) {
  return tables[resource] ?? null;
}

function schemaForResource(resource: string) {
  return schemas[resource as keyof typeof schemas] ?? null;
}

function cleanPayload(body: Record<string, unknown>) {
  const payload = { ...body };
  delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;
  delete payload.subscribed_at;
  return payload;
}

export async function GET(_request: NextRequest, { params }: { params: { resource: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const table = tableForResource(params.resource);
  if (!table) {
    return NextResponse.json({ error: { code: "INVALID_RESOURCE", message: "Unknown growth resource" } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from(table as never)
    .select("*")
    .order(params.resource === "subscribers" ? "subscribed_at" as never : "created_at" as never, { ascending: false } as never)
    .limit(200);

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: NextRequest, { params }: { params: { resource: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const table = tableForResource(params.resource);
  const schema = schemaForResource(params.resource);
  if (!table || !schema) {
    return NextResponse.json({ error: { code: "INVALID_RESOURCE", message: "Unknown or read-only growth resource" } }, { status: 400 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data, error } = await supabase.from(table as never).insert(parsed.data as never).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: `growth.${params.resource}.create`,
    targetType: table,
    targetId: (data as { id?: string })?.id ?? null,
    after: data as never,
  });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(request: NextRequest, { params }: { params: { resource: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const table = tableForResource(params.resource);
  if (!table || params.resource === "subscribers") {
    return NextResponse.json({ error: { code: "INVALID_RESOURCE", message: "Unknown or read-only growth resource" } }, { status: 400 });
  }

  const body = await request.json();
  const id = String(body.id ?? "");
  if (!id) {
    return NextResponse.json({ error: { code: "MISSING_ID", message: "Missing item id" } }, { status: 400 });
  }

  const schema = schemaForResource(params.resource);
  const parsed = schema?.safeParse(cleanPayload(body));
  if (!parsed?.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed?.error.issues[0]?.message ?? "Invalid input" } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from(table as never).select("*").eq("id", id).single();
  const { data, error } = await supabase.from(table as never).update(parsed.data as never).eq("id", id).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: `growth.${params.resource}.update`,
    targetType: table,
    targetId: id,
    before: before as never,
    after: data as never,
  });
  return NextResponse.json({ data });
}
