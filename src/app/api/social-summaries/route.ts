import { NextRequest, NextResponse } from "next/server";
import { fetchSocialSummariesBySchoolIds } from "@/lib/db/socialIntel";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { schoolIds } = await request.json();

    if (!Array.isArray(schoolIds) || schoolIds.length === 0) {
      return NextResponse.json({ data: {} });
    }

    // Limit to 50 IDs per request
    const ids = schoolIds.slice(0, 50);
    const data = await fetchSocialSummariesBySchoolIds(ids);

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("POST /api/social-summaries error:", message);
    // Graceful degradation: return empty map on error
    return NextResponse.json({ data: {} });
  }
}
