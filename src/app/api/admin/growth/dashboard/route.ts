import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
const today = new Date();
today.setHours(0, 0, 0, 0);

function countRows(rows: Record<string, unknown>[] | null | undefined, field: string) {
  const map = new Map<string, number>();
  for (const row of rows ?? []) {
    const key = String(row[field] ?? "").trim();
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("analytics_events" as never)
    .select("event_name, page_path, target_type, target_id, target_label, search_term, created_at")
    .gte("created_at" as never, since as never)
    .order("created_at" as never, { ascending: false } as never)
    .limit(5000);

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  const rows = (data ?? []) as Record<string, unknown>[];
  const todayRows = rows.filter((row) => new Date(String(row.created_at)).getTime() >= today.getTime());
  const byName = (name: string) => rows.filter((row) => row.event_name === name);
  const targetRows = rows.filter((row) => row.target_type === "school" || row.target_type === "programme");

  return NextResponse.json({
    data: {
      todayVisits: todayRows.filter((row) => row.event_name === "page_view").length,
      newFavorites: todayRows.filter((row) => row.event_name === "favorite").length,
      newProgrammeFollows: todayRows.filter((row) => row.event_name === "programme_follow").length,
      totalEvents30d: rows.length,
      hotSchools: countRows(targetRows.filter((row) => row.target_type === "school"), "target_label"),
      hotProgrammes: countRows(targetRows.filter((row) => row.target_type === "programme"), "target_label"),
      hotSearches: countRows(byName("search"), "search_term"),
      applicationClicks: countRows(byName("application_click"), "target_label"),
      pageFunnels: countRows(byName("page_view"), "page_path"),
    },
  });
}
