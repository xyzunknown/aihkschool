import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";
import { upsertProgrammeStatus, type EnrolmentStatus } from "@/lib/db/programmes";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  admin_status: z.enum(["visible", "hidden", "ended"]).optional(),
  admin_notes: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  publish_channels: z.array(z.enum(["web", "ios", "android"])).min(1).optional(),
  enrolment_status: z.enum(["pre_open", "open", "closed", "full"]).optional(),
  seats_available: z.number().int().nullable().optional(),
  is_full: z.boolean().optional(),
  action: z.enum(["refresh"]).optional(),
});

function inferStatus(openAt: string | null, closeAt: string | null): EnrolmentStatus {
  const now = Date.now();
  if (closeAt && new Date(closeAt).getTime() <= now) return "closed";
  if (openAt && new Date(openAt).getTime() <= now) return "open";
  return "pre_open";
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { data: before } = await supabase.from("lcsd_programmes").select("*").eq("id", params.id).single();
  if (!before) {
    return NextResponse.json({ error: { code: "NOT_FOUND", message: "Programme not found" } }, { status: 404 });
  }

  if (parsed.data.action === "refresh") {
    await upsertProgrammeStatus(params.id, {
      seats_available: parsed.data.seats_available ?? null,
      is_full: parsed.data.is_full ?? false,
      enrolment_status: inferStatus(before.enrolment_open_at, before.enrolment_close_at),
    });
    await writeAdminAuditLog({
      user: auth.user!,
      action: "programme.refresh",
      targetType: "lcsd_programme",
      targetId: params.id,
      before: before as never,
      after: { refreshed_at: new Date().toISOString() } as never,
    });
    return NextResponse.json({ success: true });
  }

  const payload: Record<string, unknown> = {
    admin_updated_at: new Date().toISOString(),
  };
  if (parsed.data.admin_status) payload.admin_status = parsed.data.admin_status;
  if ("admin_notes" in parsed.data) payload.admin_notes = parsed.data.admin_notes || null;
  if (typeof parsed.data.is_active === "boolean") payload.is_active = parsed.data.is_active;
  if (parsed.data.publish_channels) payload.publish_channels = parsed.data.publish_channels;

  const { data, error } = await supabase
    .from("lcsd_programmes")
    .update(payload as never)
    .eq("id", params.id)
    .select("*")
    .single();
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  if (parsed.data.enrolment_status) {
    await upsertProgrammeStatus(params.id, {
      seats_available: parsed.data.seats_available ?? null,
      is_full: parsed.data.is_full ?? parsed.data.enrolment_status === "full",
      enrolment_status: parsed.data.enrolment_status,
    });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: "programme.update",
    targetType: "lcsd_programme",
    targetId: params.id,
    before: before as never,
    after: data as never,
  });

  return NextResponse.json({ data });
}
