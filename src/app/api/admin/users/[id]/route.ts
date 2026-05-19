import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  admin_disabled: z.boolean(),
  admin_disabled_reason: z.string().nullable().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from("users").select("*").eq("id", params.id).single();
  const payload = {
    admin_disabled: parsed.data.admin_disabled,
    admin_disabled_reason: parsed.data.admin_disabled ? parsed.data.admin_disabled_reason || null : null,
    admin_disabled_at: parsed.data.admin_disabled ? new Date().toISOString() : null,
  };
  const { data, error } = await supabase.from("users").update(payload as never).eq("id", params.id).select("*").single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  if (parsed.data.admin_disabled) {
    await supabase.from("programme_subscriptions").update({ is_active: false } as never).eq("user_id", params.id);
    await supabase.from("reminders").update({ reminder_status: "cancelled" } as never).eq("user_id", params.id).eq("reminder_status", "pending");
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: parsed.data.admin_disabled ? "user.disable" : "user.enable",
    targetType: "user",
    targetId: params.id,
    before: before as never,
    after: data as never,
  });

  return NextResponse.json({ data });
}
