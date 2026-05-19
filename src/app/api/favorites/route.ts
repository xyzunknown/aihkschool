import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchUserFavorites, fetchUserFavoritesWithSchools, insertFavorite } from "@/lib/db/favorites";
import { assertUserNotDisabled, ensurePublicUser } from "@/lib/db/users";

export async function GET(request: NextRequest) {
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

    const includeSchools = request.nextUrl.searchParams.get("include") === "schools";
    const data = includeSchools
      ? await fetchUserFavoritesWithSchools(user.id)
      : await fetchUserFavorites(user.id);

    return NextResponse.json({ data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("GET /api/favorites error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: message === "Unknown error" ? "Failed to fetch favorites" : message } },
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
    await assertUserNotDisabled(user.id);

    const { school_id } = await request.json();

    if (!school_id) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "school_id is required" } },
        { status: 400 }
      );
    }

    let result;

    try {
      result = await insertFavorite(user.id, school_id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";

      if (message !== "MISSING_USER_PROFILE") {
        throw err;
      }

      const ensured = await ensurePublicUser(user);
      if (!ensured) {
        return NextResponse.json(
          {
            error: {
              code: "AUTH_PROFILE_MISSING",
              message: "登入已成功，但帳戶資料未完成初始化。請聯絡管理員補上 SUPABASE_SERVICE_ROLE_KEY，或稍後再試。",
            },
          },
          { status: 503 }
        );
      }

      result = await insertFavorite(user.id, school_id);
    }

    void result;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message === "MAX_FAVORITES_REACHED") {
      return NextResponse.json(
        { error: { code: "MAX_FAVORITES_REACHED", message: "已達收藏上限，請先到我的帳戶刪除一所收藏再加入新的學校" } },
        { status: 409 }
      );
    }
    if (message === "ALREADY_FAVORITED") {
      return NextResponse.json(
        { error: { code: "ALREADY_FAVORITED", message: "已经收藏过了" } },
        { status: 409 }
      );
    }
    if (message === "MISSING_USER_PROFILE") {
      return NextResponse.json(
        { error: { code: "AUTH_PROFILE_MISSING", message: "登入帳戶資料缺失，請重新登入後再試。" } },
        { status: 503 }
      );
    }
    if (message === "USER_DISABLED") {
      return NextResponse.json(
        { error: { code: "USER_DISABLED", message: "此帳戶已被停用，暫時不能新增收藏。" } },
        { status: 403 }
      );
    }

    console.error("POST /api/favorites error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: message === "Unknown error" ? "Failed to favorite" : message } },
      { status: 500 }
    );
  }
}
