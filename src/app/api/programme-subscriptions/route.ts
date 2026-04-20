import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  fetchUserSubscriptions,
  insertSubscription,
  deleteSubscription,
} from "@/lib/db/programme-subscriptions";

export const dynamic = "force-dynamic";

const subscribeSchema = z.object({
  programme_id: z.string().uuid(),
  notify_before_open_minutes: z.number().int().min(10).max(1440).default(60),
});

/**
 * GET: 獲取用戶的課程訂閱列表
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 },
      );
    }

    const subscriptions = await fetchUserSubscriptions(user.id);
    return NextResponse.json({ data: subscriptions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/programme-subscriptions error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to fetch subscriptions" } },
      { status: 500 },
    );
  }
}

/**
 * POST: 訂閱課程提醒
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message: parsed.error.issues[0]?.message ?? "Invalid input",
          },
        },
        { status: 400 },
      );
    }

    const { programme_id, notify_before_open_minutes } = parsed.data;

    const result = await insertSubscription(
      user.id,
      programme_id,
      notify_before_open_minutes,
    );

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);

    if (message === "MAX_SUBSCRIPTIONS_REACHED") {
      return NextResponse.json(
        { error: { code: "MAX_SUBSCRIPTIONS_REACHED", message: "已達訂閱上限（20 個）" } },
        { status: 400 },
      );
    }
    if (message === "ALREADY_SUBSCRIBED") {
      return NextResponse.json(
        { error: { code: "ALREADY_SUBSCRIBED", message: "已訂閱此課程" } },
        { status: 409 },
      );
    }

    console.error("POST /api/programme-subscriptions error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to subscribe" } },
      { status: 500 },
    );
  }
}

/**
 * DELETE: 取消訂閱
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const programmeId = searchParams.get("programme_id");

    if (!programmeId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(programmeId)) {
      return NextResponse.json(
        { error: { code: "INVALID_ID", message: "Invalid programme ID" } },
        { status: 400 },
      );
    }

    await deleteSubscription(user.id, programmeId);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("DELETE /api/programme-subscriptions error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to unsubscribe" } },
      { status: 500 },
    );
  }
}
