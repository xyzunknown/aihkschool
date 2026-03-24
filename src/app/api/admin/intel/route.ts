import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchPendingIntel, updateIntelStatus } from "@/lib/db/intel";

function verifyAdmin(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  return auth.slice(7) === process.env.CRON_SECRET;
}

// GET /api/admin/intel — List pending intel submissions
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Invalid admin token" } },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);

    const result = await fetchPendingIntel(page, limit);
    return NextResponse.json({
      data: result.data,
      count: result.count,
      page: result.page,
      limit: result.limit,
    });
  } catch (err) {
    console.error("GET /api/admin/intel error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch pending intel" } },
      { status: 500 }
    );
  }
}

const updateSchema = z.object({
  intel_id: z.string().uuid(),
  status: z.enum(["approved", "rejected"]),
  rejection_reason: z.string().optional(),
});

// PATCH /api/admin/intel — Approve or reject an intel submission
export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Invalid admin token" } },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0].message } },
        { status: 400 }
      );
    }

    await updateIntelStatus(
      parsed.data.intel_id,
      parsed.data.status,
      parsed.data.rejection_reason
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH /api/admin/intel error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to update intel" } },
      { status: 500 }
    );
  }
}
