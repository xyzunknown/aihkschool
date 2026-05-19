import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  publish_channels: z.array(z.enum(["web", "ios", "android"])).min(1).optional(),
}).passthrough();

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }
  const body = parsed.data;
  delete body.id;
  delete body.created_at;
  delete body.updated_at;
  body.admin_updated_at = new Date().toISOString();

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from("activities").select("*").eq("id", params.id).single();
  const { data, error } = await supabase.from("activities").update(body as never).eq("id", params.id).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: "activity.update",
    targetType: "activity",
    targetId: params.id,
    before: before as never,
    after: data as never,
  });

  return NextResponse.json({ data });
}
