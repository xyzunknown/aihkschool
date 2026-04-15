import { NextRequest, NextResponse } from "next/server";
import { fetchActivityById } from "@/lib/db/activities";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const activity = await fetchActivityById(params.id);
    if (!activity) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Activity not found" } },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: activity });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/activities/[id] error:", message, err);
    return NextResponse.json(
      {
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch activity" },
      },
      { status: 500 },
    );
  }
}
