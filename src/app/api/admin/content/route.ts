import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const newsSchema = z.object({
  source: z.string().default("hkschoolplace"),
  source_category: z.enum(["government", "media", "school"]).default("school"),
  source_label: z.string().default("HKSchoolPlace"),
  title: z.string().min(1),
  summary: z.string().default(""),
  display_date: z.string().default(""),
  published_at: z.string().min(1),
  href: z.string().min(1),
  is_external: z.boolean().default(false),
  content_type: z.enum(["open_day", "admission", "interview", "policy", "feature", "school_event"]).nullable().optional(),
  content_type_label: z.string().nullable().optional(),
  is_visible: z.boolean().default(true),
  is_pinned: z.boolean().default(false),
  sort_order: z.number().int().default(100),
});

const timelineSchema = z.object({
  school_id: z.string().uuid().nullable().optional(),
  school_name: z.string().min(1),
  event_type: z.enum(["open_day", "interview", "briefing", "deadline", "trial", "talk"]),
  event_label: z.string().min(1),
  event_date: z.string().min(1),
  event_time: z.string().nullable().optional(),
  href: z.string().min(1).default("/"),
  detail_href: z.string().nullable().optional(),
  source_label: z.string().default("HKSchoolPlace"),
  is_visible: z.boolean().default(true),
  is_pinned: z.boolean().default(false),
  notes: z.string().nullable().optional(),
});

function tableForType(type: string | null) {
  if (type === "news") return "homepage_news_items";
  if (type === "timeline") return "timeline_events";
  return null;
}

function schemaForType(type: string | null) {
  if (type === "news") return newsSchema;
  if (type === "timeline") return timelineSchema;
  return null;
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const type = request.nextUrl.searchParams.get("type") || "news";
  const table = tableForType(type);
  if (!table) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown content type" } }, { status: 400 });
  }
  const supabase = await createServiceClient();
  const order = type === "timeline" ? "event_date" : "published_at";
  const { data, error } = await supabase
    .from(table as never)
    .select(type === "timeline" ? "*, schools:school_id ( id, name_tc, district )" : "*")
    .order("is_pinned" as never, { ascending: false } as never)
    .order(order as never, { ascending: false } as never)
    .limit(100);
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const type = request.nextUrl.searchParams.get("type") || "news";
  const table = tableForType(type);
  const schema = schemaForType(type);
  if (!table || !schema) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown content type" } }, { status: 400 });
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
    action: `content.${type}.create`,
    targetType: table,
    targetId: (data as { id?: string })?.id ?? null,
    after: data as never,
  });
  return NextResponse.json({ data }, { status: 201 });
}
