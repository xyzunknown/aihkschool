import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { buildReminderEmailHtml } from "@/lib/email/templates";
import { buildProgrammePreOpenHtml } from "@/lib/email/templates/programme";
import { formatDateCN } from "@/lib/utils";

export const dynamic = "force-dynamic";

const actionSchema = z.object({
  action: z.enum(["resend", "cancel"]),
});

const MAX_RETRIES = 3;

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://aihkschool.vercel.app";
}

function rowHead<T>(value: T | T[] | null | undefined): T | null {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { type: string; id: string } },
) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const parsed = actionSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: "Invalid action" } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  if (parsed.data.action === "cancel") {
    const table = params.type === "programme" ? "programme_reminders" : "reminders";
    const statusColumn = params.type === "programme" ? "status" : "reminder_status";
    const cancelled = params.type === "programme" ? "failed" : "cancelled";
    const { data: before } = await supabase.from(table as never).select("*").eq("id", params.id).single();
    const { data, error } = await supabase
      .from(table as never)
      .update({ [statusColumn]: cancelled } as never)
      .eq("id", params.id)
      .select("*")
      .single();
    if (error) {
      return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
    }
    await writeAdminAuditLog({
      user: auth.user!,
      action: `reminder.${params.type}.cancel`,
      targetType: table,
      targetId: params.id,
      before: before as never,
      after: data as never,
    });
    return NextResponse.json({ data });
  }

  if (params.type === "programme") {
    const { data: reminder, error } = await supabase
      .from("programme_reminders")
      .select(`id, retry_count, status, programme_subscriptions ( user_id, programme_id, lcsd_programmes ( id, name_zh, name_en, venue, fee_hkd, enrolment_open_at, raw_url ) )`)
      .eq("id", params.id)
      .single();
    if (error || !reminder) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Reminder not found" } }, { status: 404 });
    }
    if ((reminder as { status?: string }).status !== "failed") {
      return NextResponse.json({ error: { code: "INVALID_STATE", message: "Only failed reminders can be resent" } }, { status: 409 });
    }

    const sub = rowHead((reminder as { programme_subscriptions?: unknown }).programme_subscriptions as never);
    const programme = rowHead((sub as { lcsd_programmes?: unknown } | null)?.lcsd_programmes as never) as {
      id: string; name_zh: string | null; name_en: string | null; venue: string | null; fee_hkd: number | null; enrolment_open_at: string | null; raw_url: string | null;
    } | null;
    const userId = (sub as { user_id?: string } | null)?.user_id;
    const { data: user } = userId
      ? await supabase.from("users").select("email, notification_email").eq("id", userId).single()
      : { data: null };
    const to = user?.notification_email ?? user?.email;
    if (!to || !programme) {
      return NextResponse.json({ error: { code: "MISSING_DATA", message: "Missing user or programme" } }, { status: 409 });
    }

    try {
      await sendEmail({
        to,
        subject: `SmartPLAY 開報提醒 — ${programme.name_zh || programme.name_en || "課程"}`,
        html: buildProgrammePreOpenHtml({
          programmeName: programme.name_zh || programme.name_en || "SmartPLAY 課程",
          venue: programme.venue || "場地待定",
          fee: programme.fee_hkd,
          enrolmentOpenAt: programme.enrolment_open_at || new Date().toISOString(),
          programmeUrl: programme.raw_url || `${siteUrl()}/programmes/${programme.id}`,
        }),
      });
      const { data } = await supabase.from("programme_reminders").update({ status: "sent", sent_at: new Date().toISOString() } as never).eq("id", params.id).select("*").single();
      await writeAdminAuditLog({ user: auth.user!, action: "reminder.programme.resend", targetType: "programme_reminders", targetId: params.id, after: data as never });
      return NextResponse.json({ data });
    } catch {
      const retryCount = Math.min(((reminder as { retry_count?: number | null }).retry_count ?? 0) + 1, MAX_RETRIES);
      const { data } = await supabase.from("programme_reminders").update({ retry_count: retryCount } as never).eq("id", params.id).select("*").single();
      return NextResponse.json({ data, error: { code: "RESEND_FAILED", message: "Resend failed" } }, { status: 500 });
    }
  }

  const { data: reminder, error } = await supabase
    .from("reminders")
    .select(`id, user_id, school_id, reminder_type, reminder_status, retry_count, users ( email, notification_email ), schools ( id, name_tc, website )`)
    .eq("id", params.id)
    .single();
  if (error || !reminder) {
    return NextResponse.json({ error: { code: "NOT_FOUND", message: "Reminder not found" } }, { status: 404 });
  }
  if ((reminder as { reminder_status?: string }).reminder_status !== "failed") {
    return NextResponse.json({ error: { code: "INVALID_STATE", message: "Only failed reminders can be resent" } }, { status: 409 });
  }

  const user = rowHead((reminder as { users?: unknown }).users as never) as { email: string; notification_email: string | null } | null;
  const school = rowHead((reminder as { schools?: unknown }).schools as never) as { id: string; name_tc: string; website: string | null } | null;
  const { data: vacancy } = school
    ? await supabase
        .from("vacancies")
        .select("application_deadline")
        .eq("school_id", school.id)
        .eq("is_current", true)
        .not("application_deadline", "is", null)
        .maybeSingle()
    : { data: null };
  const deadline = vacancy?.application_deadline;
  const to = user?.notification_email ?? user?.email;
  if (!to || !school || !deadline) {
    return NextResponse.json({ error: { code: "MISSING_DATA", message: "Missing user, school, or deadline" } }, { status: 409 });
  }

  const daysMap: Record<string, number> = { deadline_7d: 7, deadline_3d: 3, deadline_1d: 1 };
  const daysRemaining = daysMap[(reminder as { reminder_type: string }).reminder_type] ?? 0;
  try {
    await sendEmail({
      to,
      subject: `申请截止提醒 — ${school.name_tc}（还有 ${daysRemaining} 天）`,
      html: buildReminderEmailHtml({
        schoolName: school.name_tc,
        deadline: formatDateCN(deadline),
        daysRemaining,
        schoolUrl: school.website ?? `${siteUrl()}/kg/${school.id}`,
      }),
    });
    const { data } = await supabase.from("reminders").update({ reminder_status: "sent", sent_at: new Date().toISOString() } as never).eq("id", params.id).select("*").single();
    await writeAdminAuditLog({ user: auth.user!, action: "reminder.school.resend", targetType: "reminders", targetId: params.id, after: data as never });
    return NextResponse.json({ data });
  } catch {
    const retryCount = Math.min(((reminder as { retry_count?: number | null }).retry_count ?? 0) + 1, MAX_RETRIES);
    const { data } = await supabase.from("reminders").update({ retry_count: retryCount } as never).eq("id", params.id).select("*").single();
    return NextResponse.json({ data, error: { code: "RESEND_FAILED", message: "Resend failed" } }, { status: 500 });
  }
}
