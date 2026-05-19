import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function tableForType(type: string) {
  if (type === "banners") return "homepage_banners";
  if (type === "featured") return "homepage_featured_schools";
  if (type === "news") return "homepage_news_items";
  return null;
}

const patchSchema = z.object({
  publish_channels: z.array(z.enum(["web", "ios", "android"])).min(1).optional(),
}).passthrough();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { type: string; id: string } },
) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  const table = tableForType(params.type);
  if (!table) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown homepage type" } }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }
  const payload = parsed.data;
  const supabase = await createServiceClient();
  const { data: before } = await supabase.from(table as never).select("*").eq("id", params.id).single();
  const { data, error } = await supabase.from(table as never).update(payload as never).eq("id", params.id).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: `homepage.${params.type}.update`,
    targetType: table,
    targetId: params.id,
    before: before as never,
    after: data as never,
  });

  return NextResponse.json({ data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { type: string; id: string } },
) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  const table = tableForType(params.type);
  if (!table) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown homepage type" } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from(table as never).select("*").eq("id", params.id).single();
  const { error } = await supabase.from(table as never).delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: `homepage.${params.type}.delete`,
    targetType: table,
    targetId: params.id,
    before: before as never,
  });

  return NextResponse.json({ success: true });
}
