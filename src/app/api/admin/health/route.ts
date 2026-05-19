import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const ISSUE_META = [
  { type: "missing_logo", label: "缺 Logo", priority: "中", href: "/admin/health?type=missing_logo" },
  { type: "missing_website", label: "缺官網", priority: "高", href: "/admin/health?type=missing_website" },
  { type: "missing_fee", label: "缺學費", priority: "中", href: "/admin/health?type=missing_fee" },
  { type: "missing_application_link", label: "缺申請連結", priority: "高", href: "/admin/health?type=missing_application_link" },
  { type: "stale_vacancies", label: "學額超過 14 天未更新", priority: "高", href: "/admin/health?type=stale_vacancies" },
  { type: "expired_open_days", label: "開放日過期仍有資料", priority: "高", href: "/admin/health?type=expired_open_days" },
  { type: "duplicate_schools", label: "疑似重複學校", priority: "中", href: "/admin/health?type=duplicate_schools" },
  { type: "website_unreachable", label: "官網無法訪問", priority: "高", href: "/admin/health?type=website_unreachable" },
  { type: "scrape_failed", label: "抓取失敗資料", priority: "高", href: "/admin/health?type=scrape_failed" },
  { type: "stale_programmes", label: "課程太久未更新", priority: "中", href: "/admin/health?type=stale_programmes" },
  { type: "expired_activities", label: "活動已過期仍顯示", priority: "高", href: "/admin/health?type=expired_activities" },
] as const;

type IssueType = (typeof ISSUE_META)[number]["type"];

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeName(name: string) {
  return name.replace(/\s|\(|\)|（|）|幼稚園|幼儿园|kindergarten/gi, "").toLowerCase();
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const type = request.nextUrl.searchParams.get("type") as IssueType | null;
  const supabase = await createServiceClient();

  if (type) {
    const rows = await fetchIssueRows(supabase, type);
    return NextResponse.json({ data: rows });
  }

  const summary = await Promise.all(
    ISSUE_META.map(async (meta) => ({
      ...meta,
      count: (await fetchIssueRows(supabase, meta.type, true)).length,
    })),
  );

  return NextResponse.json({ data: summary });
}

async function fetchIssueRows(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  type: IssueType,
  countOnly = false,
) {
  const limit = countOnly ? 1000 : 100;
  if (type === "missing_logo" || type === "missing_website" || type === "missing_fee") {
    const field = type === "missing_logo" ? "logo_url" : type === "missing_website" ? "website" : "fee_monthly_hkd";
    const { data } = await supabase
      .from("schools")
      .select("id, name_tc, district, website, logo_url, fee_monthly_hkd, updated_at")
      .eq("is_active", true)
      .is(field, null)
      .limit(limit);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.name_tc,
      subtitle: row.district,
      detail: type === "missing_fee" ? "沒有月費資料" : type === "missing_logo" ? "沒有 Logo" : "沒有官網",
      actionHref: `/admin/schools?search=${encodeURIComponent(row.name_tc)}`,
    }));
  }

  if (type === "missing_application_link") {
    const { data } = await supabase
      .from("schools")
      .select("id, name_tc, district, application_url, updated_at")
      .eq("is_active", true)
      .is("application_url", null)
      .limit(limit);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.name_tc,
      subtitle: row.district,
      detail: "沒有申請連結",
      actionHref: `/admin/vacancies?search=${encodeURIComponent(row.name_tc)}`,
    }));
  }

  if (type === "stale_vacancies") {
    const { data } = await supabase
      .from("vacancies")
      .select("id, school_id, updated_at, academic_year, schools ( name_tc, district )")
      .eq("is_current", true)
      .lt("updated_at", daysAgo(14))
      .limit(limit);
    return (data ?? []).map((row) => {
      const school = Array.isArray(row.schools) ? row.schools[0] : row.schools;
      return {
        id: row.id,
        title: school?.name_tc ?? row.school_id,
        subtitle: school?.district ?? row.academic_year,
        detail: row.updated_at ? `最後更新：${row.updated_at.slice(0, 10)}` : "沒有更新時間",
        actionHref: `/admin/vacancies?search=${encodeURIComponent(school?.name_tc ?? "")}`,
      };
    });
  }

  if (type === "expired_open_days") {
    const { data } = await supabase
      .from("school_enrichments")
      .select("school_id, open_day_date, open_day_details, schools:school_id ( name_tc, district )")
      .lt("open_day_date", today())
      .limit(limit);
    return (data ?? []).map((row) => {
      const school = Array.isArray(row.schools) ? row.schools[0] : row.schools;
      return {
        id: row.school_id,
        title: school?.name_tc ?? row.school_id,
        subtitle: school?.district ?? "",
        detail: `開放日：${row.open_day_date ?? "-"} ${row.open_day_details ?? ""}`,
        actionHref: `/admin/schools?search=${encodeURIComponent(school?.name_tc ?? "")}`,
      };
    });
  }

  if (type === "website_unreachable" || type === "scrape_failed") {
    const statuses = type === "website_unreachable"
      ? ["unreachable", "robots_blocked", "no_website"]
      : ["content_insufficient", "pdf_only", "spa_detected", "error"];
    const { data } = await supabase
      .from("school_enrichments")
      .select("school_id, scrape_status, scrape_notes, last_crawled_at, schools:school_id ( name_tc, district )")
      .in("scrape_status", statuses)
      .limit(limit);
    return (data ?? []).map((row) => {
      const school = Array.isArray(row.schools) ? row.schools[0] : row.schools;
      return {
        id: row.school_id,
        title: school?.name_tc ?? row.school_id,
        subtitle: school?.district ?? row.scrape_status,
        detail: row.scrape_notes || row.scrape_status || "抓取異常",
        actionHref: `/admin/schools?search=${encodeURIComponent(school?.name_tc ?? "")}`,
      };
    });
  }

  if (type === "stale_programmes") {
    const { data } = await supabase
      .from("lcsd_programmes")
      .select("id, name_zh, venue, last_scraped_at")
      .eq("is_active", true)
      .lt("last_scraped_at", daysAgo(7))
      .limit(limit);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.name_zh ?? row.id,
      subtitle: row.venue ?? "",
      detail: row.last_scraped_at ? `最後同步：${row.last_scraped_at.slice(0, 10)}` : "沒有同步時間",
      actionHref: `/admin/programmes?search=${encodeURIComponent(row.name_zh ?? "")}`,
    }));
  }

  if (type === "expired_activities") {
    const { data } = await supabase
      .from("activities")
      .select("id, title, organizer, end_date")
      .eq("is_active", true)
      .lt("end_date", today())
      .limit(limit);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.organizer ?? "",
      detail: row.end_date ? `結束日：${row.end_date}` : "已過期",
      actionHref: `/admin/activities?search=${encodeURIComponent(row.title)}`,
    }));
  }

  const { data: schools } = await supabase
    .from("schools")
    .select("id, name_tc, district, school_code")
    .eq("is_active", true)
    .limit(5000);
  const groups = new Map<string, Array<{ id: string; name_tc: string; district: string; school_code: string | null }>>();
  for (const school of schools ?? []) {
    const key = normalizeName(school.name_tc);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), school]);
  }
  return Array.from(groups.values())
    .filter((group) => group.length > 1)
    .slice(0, limit)
    .map((group) => ({
      id: group.map((s) => s.id).join(","),
      title: group.map((s) => s.name_tc).join(" / "),
      subtitle: group.map((s) => s.district).join(" / "),
      detail: `共 ${group.length} 筆疑似重複`,
      actionHref: `/admin/schools?search=${encodeURIComponent(group[0]?.name_tc ?? "")}`,
    }));
}
