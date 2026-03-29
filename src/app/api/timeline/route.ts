import { NextRequest, NextResponse } from "next/server";
import { getAllSchoolEvents } from "@/lib/homepage/liveData";
import type { EventType } from "@/types/homepage";

export const revalidate = 21600; // 6 hours ISR

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const eventType = searchParams.get("type") as EventType | null;
    const schoolType = searchParams.get("school_type");
    const districts = searchParams.getAll("district");

    let events = await getAllSchoolEvents();

    // Filter by event type
    if (eventType) {
      events = events.filter((e) => e.event_type === eventType);
    }

    // Filter by school type
    if (schoolType) {
      events = events.filter((e) => e.school_type === schoolType);
    }

    // Filter by districts
    if (districts.length > 0) {
      events = events.filter((e) => e.district && districts.includes(e.district));
    }

    return NextResponse.json({
      data: events,
      count: events.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/timeline error:", message);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch timeline events" } },
      { status: 500 },
    );
  }
}
