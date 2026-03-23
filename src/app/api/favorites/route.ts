import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchUserFavorites, insertFavorite } from "@/lib/db/favorites";

export async function GET() {
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

    const data = await fetchUserFavorites(user.id);

    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET /api/favorites error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch favorites" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const { school_id } = await request.json();

    if (!school_id) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "school_id is required" } },
        { status: 400 }
      );
    }

    const result = await insertFavorite(user.id, school_id);
    void result;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message === "MAX_FAVORITES_REACHED") {
      return NextResponse.json(
        { error: { code: "MAX_FAVORITES_REACHED", message: "最多只能收藏 10 所学校" } },
        { status: 409 }
      );
    }
    if (message === "ALREADY_FAVORITED") {
      return NextResponse.json(
        { error: { code: "ALREADY_FAVORITED", message: "已经收藏过了" } },
        { status: 409 }
      );
    }

    console.error("POST /api/favorites error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to favorite" } },
      { status: 500 }
    );
  }
}
