import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateIntelStatus } from "@/lib/db/intel";
import { z } from "zod";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) ?? [];

function isAdmin(userEmail: string | undefined): boolean {
  if (!userEmail) return false;
  // Secure-by-default: if ADMIN_EMAILS is not set, deny everyone.
  if (ADMIN_EMAILS.length === 0) return false;
  return ADMIN_EMAILS.includes(userEmail);
}

const patchSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Please log in" } },
        { status: 401 }
      );
    }

    if (!isAdmin(user.email)) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Admin access required" } },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Invalid request body" } },
        { status: 400 }
      );
    }

    const { status, rejectionReason } = parsed.data;
    await updateIntelStatus(id, status, rejectionReason);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin intel PATCH error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to update intel status" } },
      { status: 500 }
    );
  }
}
