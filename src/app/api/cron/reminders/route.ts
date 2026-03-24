import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { buildReminderEmailHtml } from "@/lib/email/templates";
import { formatDateCN } from "@/lib/utils";

const MAX_RETRIES = 3;

export async function POST(request: NextRequest) {
  return handleCronReminders(request);
}

// Vercel Cron sends GET requests
export async function GET(request: NextRequest) {
  return handleCronReminders(request);
}

async function handleCronReminders(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Invalid cron secret" } },
        { status: 403 }
      );
    }

    const supabase = await createServiceClient();
    const today = new Date().toISOString().split("T")[0];

    // Fetch today's pending reminders with joined data
    const { data: reminders, error } = await supabase
      .from("reminders")
      .select(
        `id, user_id, school_id, reminder_type, retry_count,
         users ( email, notification_email ),
         schools ( name_tc, website )`
      )
      .eq("scheduled_date", today)
      .eq("reminder_status", "pending");

    if (error) {
      console.error("Failed to fetch reminders:", error);
      return NextResponse.json(
        { error: { code: "INTERNAL_ERROR", message: "Failed to fetch reminders" } },
        { status: 500 }
      );
    }

    if (!reminders || reminders.length === 0) {
      return NextResponse.json({ success: true, sent: 0 });
    }

    let sentCount = 0;
    let failCount = 0;

    for (const reminder of reminders) {
      // Type narrow the joined records
      const userRecord = reminder.users as unknown as { email: string; notification_email: string | null } | null;
      const schoolRecord = reminder.schools as unknown as { name_tc: string; website: string | null } | null;

      if (!userRecord || !schoolRecord) continue;

      const recipientEmail = userRecord.notification_email ?? userRecord.email;
      if (!recipientEmail) continue;

      const daysMap: Record<string, number> = {
        deadline_7d: 7,
        deadline_3d: 3,
        deadline_1d: 1,
      };

      const daysRemaining = daysMap[reminder.reminder_type] ?? 0;

      try {
        await sendEmail({
          to: recipientEmail,
          subject: `申请截止提醒 — ${schoolRecord.name_tc}（还有 ${daysRemaining} 天）`,
          html: buildReminderEmailHtml({
            schoolName: schoolRecord.name_tc,
            deadline: formatDateCN(today),
            daysRemaining,
            schoolUrl: schoolRecord.website ?? `https://aihkschool.vercel.app/kg/${reminder.school_id}`,
          }),
        });

        // Mark as sent
        await supabase
          .from("reminders")
          .update({ reminder_status: "sent" as const, sent_at: new Date().toISOString() })
          .eq("id", reminder.id);

        sentCount++;
      } catch {
        const newRetryCount = (reminder.retry_count ?? 0) + 1;

        if (newRetryCount >= MAX_RETRIES) {
          await supabase
            .from("reminders")
            .update({ reminder_status: "failed" as const, retry_count: newRetryCount })
            .eq("id", reminder.id);
          failCount++;
        } else {
          await supabase
            .from("reminders")
            .update({ retry_count: newRetryCount })
            .eq("id", reminder.id);
        }
      }
    }

    return NextResponse.json({ success: true, sent: sentCount, failed: failCount });
  } catch (err) {
    console.error("Cron /api/cron/reminders error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Cron job failed" } },
      { status: 500 }
    );
  }
}
