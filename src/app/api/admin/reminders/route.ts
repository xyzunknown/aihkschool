import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const type = request.nextUrl.searchParams.get("type") || "school";
  const status = request.nextUrl.searchParams.get("status") || "failed";
  const supabase = await createServiceClient();

  if (type === "programme") {
    const { data, error } = await supabase
      .from("programme_reminders")
      .select(`id, subscription_id, reminder_type, scheduled_at, status, retry_count, sent_at, created_at,
        programme_subscriptions ( user_id, programme_id, lcsd_programmes ( id, name_zh, name_en, venue, enrolment_open_at, raw_url, fee_hkd ) )`)
      .eq("status", status)
      .order("scheduled_at", { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
    }

    const rows = (data ?? []) as Array<{
      programme_subscriptions?: { user_id?: string | null } | Array<{ user_id?: string | null }> | null;
    }>;
    const userIds = Array.from(new Set(rows.flatMap((row) => {
      const sub = Array.isArray(row.programme_subscriptions)
        ? row.programme_subscriptions[0]
        : row.programme_subscriptions;
      return sub?.user_id ? [sub.user_id] : [];
    })));
    const { data: users } = userIds.length
      ? await supabase.from("users").select("id, email, notification_email").in("id", userIds)
      : { data: [] };
    const userMap = new Map((users ?? []).map((user) => [user.id, user]));

    return NextResponse.json({
      data: rows.map((row) => {
        const sub = Array.isArray(row.programme_subscriptions)
          ? row.programme_subscriptions[0]
          : row.programme_subscriptions;
        return { ...row, user: sub?.user_id ? userMap.get(sub.user_id) ?? null : null };
      }),
    });
  }

  const { data, error } = await supabase
    .from("reminders")
    .select(`id, favorite_id, user_id, school_id, reminder_type, reminder_status, scheduled_date, sent_at, retry_count, created_at,
      users ( email, notification_email ),
      schools ( id, name_tc, website )`)
    .eq("reminder_status", status)
    .order("scheduled_date", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
