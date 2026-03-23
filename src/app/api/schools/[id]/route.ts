import { NextRequest, NextResponse } from "next/server";
import { fetchSchoolById } from "@/lib/db/schools";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const school = await fetchSchoolById(params.id);

    if (!school) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "School not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: school });
  } catch (err) {
    console.error("GET /api/schools/[id] error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch school" } },
      { status: 500 }
    );
  }
}
