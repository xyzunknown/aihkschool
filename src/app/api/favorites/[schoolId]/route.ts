import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteFavorite } from "@/lib/db/favorites";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    // Auth check first
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 }
      );
    }

    await deleteFavorite(user.id, params.schoolId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/favorites/[schoolId] error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to unfavorite" } },
      { status: 500 }
    );
  }
}
