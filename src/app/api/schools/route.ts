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

const SCHOOLAND_SIZE_FILTERS = ["small", "medium", "large"] as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const districts = searchParams.getAll("district") as District[];
    const type = searchParams.get("type") as SchoolType | null;
    const language = searchParams.get("language");
    const gradeParam = searchParams.get("grade");
    const grade = ["n", "k1", "k2", "k3"].includes(gradeParam ?? "")
      ? (gradeParam as "n" | "k1" | "k2" | "k3")
      : undefined;
    const sessionParam = searchParams.get("session");
    const session = sessionParam && SESSION_FILTERS.includes(sessionParam as SessionFilter)
      ? (sessionParam as SessionFilter)
      : undefined;
    const hasNursery = searchParams.get("hasNursery");
    const schoolandFreeScheme = searchParams.get("schoolandFreeScheme");
    const schoolandNurseryService = searchParams.get("schoolandNurseryService");
    const schoolandGroup = searchParams.get("schoolandGroup");
    const schoolandSizeParam = searchParams.get("schoolandSize");
    const schoolandSize = schoolandSizeParam && SCHOOLAND_SIZE_FILTERS.includes(schoolandSizeParam as (typeof SCHOOLAND_SIZE_FILTERS)[number])
      ? schoolandSizeParam as (typeof SCHOOLAND_SIZE_FILTERS)[number]
      : undefined;
    const vacancyStatuses = searchParams.getAll("vacancy");
    const search = searchParams.get("search");
    const sortParam = searchParams.get("sort");
    const sort = sortParam === "distance" ? "distance" : "default";
    const latitudeParam = searchParams.get("lat");
    const longitudeParam = searchParams.get("lng");
    const latitude = latitudeParam ? Number(latitudeParam) : undefined;
    const longitude = longitudeParam ? Number(longitudeParam) : undefined;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    const result = await fetchSchools({
      districts: districts.length > 0 ? districts : undefined,
      type: type ?? undefined,
      language: language ?? undefined,
      grade,
      session,
      hasNursery: hasNursery === "true" ? true : undefined,
      schoolandFreeScheme: schoolandFreeScheme === "true" ? true : undefined,
      schoolandNurseryService: schoolandNurseryService === "yes" ? "yes" : undefined,
      schoolandGroup: schoolandGroup ?? undefined,
      schoolandSize,
      vacancyStatuses: vacancyStatuses.length > 0 ? vacancyStatuses : undefined,
      search: search ?? undefined,
      sort,
      latitude: typeof latitude === "number" && Number.isFinite(latitude) ? latitude : undefined,
      longitude: typeof longitude === "number" && Number.isFinite(longitude) ? longitude : undefined,
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
