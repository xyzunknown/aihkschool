import { NextRequest, NextResponse } from "next/server";
import { fetchCurrentVacancy } from "@/lib/db/vacancies";

export async function GET(
  _request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const vacancy = await fetchCurrentVacancy(params.schoolId);

    if (!vacancy) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "No current vacancy data found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: vacancy });
  } catch (err) {
    console.error("GET /api/vacancies/[schoolId] error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch vacancy" } },
      { status: 500 }
    );
  }
}
