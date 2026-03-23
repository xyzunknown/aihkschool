import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toggleHelpful } from "@/lib/db/intel";

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
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

    const result = await toggleHelpful(params.id, user.id);

    return NextResponse.json({ success: true, voted: result.voted });
  } catch (err) {
    console.error("POST /api/intel/[id]/helpful error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to toggle helpful" } },
      { status: 500 }
    );
  }
}
