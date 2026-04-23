import { NextRequest, NextResponse } from "next/server";
import { fetchSchools } from "@/lib/db/schools";
import type { SessionFilter } from "@/lib/db/schools";
import type { District, SchoolType } from "@/types/database";

export const dynamic = "force-dynamic";

const SESSION_FILTERS: SessionFilter[] = [
  "am",
  "pm",
  "whole_day",
  "am_pm",
  "am_whole_day",
  "pm_whole_day",
  "am_pm_whole_day",
  "half_day",
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const districts = searchParams.getAll("district") as District[];
    const type = searchParams.get("type") as SchoolType | null;
    const language = searchParams.get("language");
    const sessionParam = searchParams.get("session");
    const session = sessionParam && SESSION_FILTERS.includes(sessionParam as SessionFilter)
      ? (sessionParam as SessionFilter)
      : undefined;
    const hasNursery = searchParams.get("hasNursery");
    const vacancyStatuses = searchParams.getAll("vacancy");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    const result = await fetchSchools({
      districts: districts.length > 0 ? districts : undefined,
      type: type ?? undefined,
      language: language ?? undefined,
      session,
      hasNursery: hasNursery === "true" ? true : undefined,
      vacancyStatuses: vacancyStatuses.length > 0 ? vacancyStatuses : undefined,
      search: search ?? undefined,
      page: isNaN(page) ? 1 : page,
      limit: isNaN(limit) ? 20 : limit,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/schools error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch schools" } },
      { status: 500 }
    );
  }
}
