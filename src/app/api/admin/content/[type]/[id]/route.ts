import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function tableForType(type: string) {
  if (type === "news") return "homepage_news_items";
  if (type === "timeline") return "timeline_events";
  return null;
}

export async function PATCH(request: NextRequest, { params }: { params: { type: string; id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  const table = tableForType(params.type);
  if (!table) {
    return NextResponse.json({ error: { code: "INVALID_TYPE", message: "Unknown content type" } }, { status: 400 });
  }

  const body = await request.json();
  delete body.id;
  delete body.created_at;
  delete body.updated_at;
  delete body.schools;

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from(table as never).select("*").eq("id", params.id).single();
  const { data, error } = await supabase.from(table as never).update(body as never).eq("id", params.id).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }
  await writeAdminAuditLog({
    user: auth.user!,
    action: `content.${params.type}.update`,
    targetType: table,
    targetId: params.id,
    before: before as never,
    after: data as never,
  });
  return NextResponse.json({ data });
}
