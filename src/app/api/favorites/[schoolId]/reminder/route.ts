import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { updateReminderSettings } from "@/lib/db/favorites";

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

    await updateReminderSettings(
      user.id,
      params.schoolId,
      parsed.data.reminder_enabled,
      parsed.data.reminder_days_before
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH /api/favorites/[schoolId]/reminder error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to update reminder" } },
      { status: 500 }
    );
  }
}
