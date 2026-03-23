import { NextRequest, NextResponse } from "next/server";
import { fetchApprovedIntel } from "@/lib/db/intel";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    const result = await fetchApprovedIntel(
      params.schoolId,
      isNaN(page) ? 1 : page,
      isNaN(limit) ? 20 : limit
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/intel/school/[schoolId] error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch intel" } },
      { status: 500 }
    );
  }
}
