import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { syncFavoriteReminders } from "@/lib/db/favorites";

const reminderSchema = z.object({
  reminder_enabled: z.boolean(),
  reminder_days_before: z.array(z.number().int().min(1).max(30)),
});

export async function PATCH(
  request: NextRequest,
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

    const body = await request.json();
    const parsed = reminderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0].message } },
        { status: 400 }
      );
    }

    const result = await syncFavoriteReminders(
      user.id,
      params.schoolId,
      parsed.data.reminder_enabled,
      parsed.data.reminder_days_before
    );

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update reminder";

    if (message === "NO_ACTIVE_DEADLINE") {
      return NextResponse.json(
        { error: { code: "NO_ACTIVE_DEADLINE", message: "目前未有可用的真實截止日，暫時無法建立提醒" } },
        { status: 409 }
      );
    }

    if (message === "NO_PENDING_REMINDERS") {
      return NextResponse.json(
        { error: { code: "NO_PENDING_REMINDERS", message: "所選提醒時間已錯過，未能建立待發提醒" } },
        { status: 409 }
      );
    }

    console.error("PATCH /api/favorites/[schoolId]/reminder error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to update reminder" } },
      { status: 500 }
    );
  }
}
