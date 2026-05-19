import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const search = request.nextUrl.searchParams.get("search")?.trim();
  const userId = request.nextUrl.searchParams.get("id");
  const supabase = await createServiceClient();

  if (userId) {
    const [user, favorites, subscriptions, reminders, programmeReminders] = await Promise.all([
      supabase.from("users" as never).select("*").eq("id" as never, userId as never).single(),
      supabase.from("favorites").select("id, created_at, reminder_enabled, schools ( id, name_tc, district )").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("programme_subscriptions").select("id, created_at, is_active, lcsd_programmes ( id, name_zh, venue )").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("reminders").select("id, reminder_type, reminder_status, scheduled_date, sent_at, schools ( name_tc )").eq("user_id", userId).order("created_at", { ascending: false }).limit(30),
      supabase.from("programme_reminders").select("id, status, scheduled_at, sent_at, programme_subscriptions!inner ( user_id, lcsd_programmes ( name_zh ) )").eq("programme_subscriptions.user_id", userId).order("scheduled_at", { ascending: false }).limit(30),
    ]);
    if (user.error) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "User not found" } }, { status: 404 });
    }
    return NextResponse.json({
      data: {
        user: user.data,
        favorites: favorites.data ?? [],
        subscriptions: subscriptions.data ?? [],
        reminders: reminders.data ?? [],
        programmeReminders: programmeReminders.data ?? [],
      },
    });
  }

  let query = supabase
    .from("users" as never)
    .select("id, email, display_name, notification_email, created_at, updated_at, admin_disabled, admin_disabled_reason", { count: "exact" });
  if (search) query = query.or(`email.ilike.%${search}%,display_name.ilike.%${search}%` as never);
  const { data, error, count } = await query.order("created_at", { ascending: false }).limit(100);
  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  const rows = (data ?? []) as Array<{ id: string } & Record<string, unknown>>;
  const ids = rows.map((user) => user.id);
  const [favorites, subs] = await Promise.all([
    ids.length ? supabase.from("favorites").select("user_id").in("user_id", ids) : { data: [] },
    ids.length ? supabase.from("programme_subscriptions").select("user_id").eq("is_active", true).in("user_id", ids) : { data: [] },
  ]);
  const favoriteCounts = new Map<string, number>();
  for (const row of favorites.data ?? []) favoriteCounts.set(row.user_id, (favoriteCounts.get(row.user_id) ?? 0) + 1);
  const subCounts = new Map<string, number>();
  for (const row of subs.data ?? []) subCounts.set(row.user_id, (subCounts.get(row.user_id) ?? 0) + 1);

  return NextResponse.json({
    data: rows.map((user) => ({
      ...user,
      favorite_count: favoriteCounts.get(user.id) ?? 0,
      subscription_count: subCounts.get(user.id) ?? 0,
    })),
    count: count ?? 0,
  });
}
