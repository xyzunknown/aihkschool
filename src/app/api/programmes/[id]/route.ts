import { NextRequest, NextResponse } from "next/server";
import { fetchProgrammeById } from "@/lib/db/programmes";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // 基本 UUID 格式校驗
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json(
        { error: { code: "INVALID_ID", message: "Invalid programme ID" } },
        { status: 400 },
      );
    }

    const programme = await fetchProgrammeById(id);

    if (!programme) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Programme not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: programme });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/programmes/[id] error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch programme" } },
      { status: 500 },
    );
  }
}
