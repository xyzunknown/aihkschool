import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const publishChannelsSchema = z.array(z.enum(["web", "ios", "android"])).min(1).default(["web", "ios", "android"]);

const bannerSchema = z.object({
  layout: z.enum(["classic", "event", "minimal"]).default("classic"),
  source_label: z.string().default("HKSchoolPlace"),
  title_tc: z.string().min(1),
  subtitle_en: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  cta_primary_label: z.string().min(1).default("查看詳情"),
  cta_primary_url: z.string().min(1).default("/"),
  cta_secondary_label: z.string().nullable().optional(),
  cta_secondary_url: z.string().nullable().optional(),
  footer_note: z.string().nullable().optional(),
  image_src: z.string().min(1),
  image_alt: z.string().default(""),
  is_visible: z.boolean().default(true),
  publish_channels: publishChannelsSchema,
  sort_order: z.number().int().default(100),
});

const featuredSchema = z.object({
  school_id: z.string().uuid().nullable().optional(),
  custom_title: z.string().nullable().optional(),
  custom_name_en: z.string().nullable().optional(),
  custom_tags: z.array(z.string()).default([]),
  is_visible: z.boolean().default(true),
  publish_channels: publishChannelsSchema,
  sort_order: z.number().int().default(100),
});

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
  publish_channels: publishChannelsSchema,
  sort_order: z.number().int().default(100),
});

function tableForType(type: string | null) {
  if (type === "banners") return "homepage_banners";
  if (type === "featured") return "homepage_featured_schools";
  if (type === "news") return "homepage_news_items";
  return null;
}

function schemaForType(type: string | null) {
  if (type === "banners") return bannerSchema;
  if (type === "featured") return featuredSchema;
  if (type === "news") return newsSchema;
  return null;
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const type = request.nextUrl.searchParams.get("type");
  const table = tableForType(type);
  if (!table) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown homepage type" } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const select = type === "featured"
    ? "*, schools ( id, name_tc, name_en, district, school_type, session_type, has_nursery, school_code )"
    : "*";
  const { data, error } = await supabase
    .from(table as never)
    .select(select)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const type = request.nextUrl.searchParams.get("type");
  const table = tableForType(type);
  const schema = schemaForType(type);
  if (!table || !schema) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown homepage type" } }, { status: 400 });
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
    action: `homepage.${type}.create`,
    targetType: table,
    targetId: (data as { id?: string })?.id ?? null,
    after: data as never,
  });

  return NextResponse.json({ data }, { status: 201 });
}
