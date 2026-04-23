import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { buildReminderEmailHtml } from "@/lib/email/templates";
import { formatDateCN } from "@/lib/utils";
import { syncAllFavoriteReminders } from "@/lib/db/favorites";

interface SchoolReminderRawRow {
  id: string;
  user_id: string;
  school_id: string;
  reminder_type: string;
  retry_count: number | null;
  users:
    | {
        email: string;
        notification_email: string | null;
      }
    | Array<{
        email: string;
        notification_email: string | null;
      }>;
  schools:
    | {
        name_tc: string;
        website: string | null;
      }
    | Array<{
        name_tc: string;
        website: string | null;
      }>;
}

interface SchoolReminderRow {
  id: string;
  user_id: string;
  school_id: string;
  reminder_type: string;
  retry_count: number | null;
  users: {
    email: string;
    notification_email: string | null;
  } | null;
  schools: {
    name_tc: string;
    website: string | null;
  } | null;
}

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
    const syncedReminderCount = await syncAllFavoriteReminders();

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

    const reminderRows: SchoolReminderRow[] = (reminders ?? []).flatMap((reminder) => {
      const rawReminder = reminder as SchoolReminderRawRow;
      const userRecord = Array.isArray(rawReminder.users) ? rawReminder.users[0] ?? null : rawReminder.users;
      const schoolRecord = Array.isArray(rawReminder.schools)
        ? rawReminder.schools[0] ?? null
        : rawReminder.schools;

      return [
        {
          id: rawReminder.id,
          user_id: rawReminder.user_id,
          school_id: rawReminder.school_id,
          reminder_type: rawReminder.reminder_type,
          retry_count: rawReminder.retry_count,
          users: userRecord,
          schools: schoolRecord,
        },
      ];
    });

    const schoolIds = Array.from(new Set(reminderRows.map((reminder) => reminder.school_id)));
    const { data: vacancies, error: vacanciesError } = schoolIds.length > 0
      ? await supabase
          .from("vacancies")
          .select("school_id, application_deadline")
          .in("school_id", schoolIds)
          .eq("is_current", true)
          .not("application_deadline", "is", null)
      : { data: [], error: null };

    if (vacanciesError) {
      console.error("Failed to fetch current deadlines:", vacanciesError);
      return NextResponse.json(
        { error: { code: "INTERNAL_ERROR", message: "Failed to fetch deadlines" } },
        { status: 500 }
      );
    }

    const deadlineMap = new Map(
      (vacancies ?? []).map((vacancy) => [vacancy.school_id, vacancy.application_deadline]),
    );

    for (const reminder of reminderRows) {
      const userRecord = reminder.users;
      const schoolRecord = reminder.schools;

      if (!userRecord || !schoolRecord) continue;

      const recipientEmail = userRecord.notification_email ?? userRecord.email;
      if (!recipientEmail) continue;

      const daysMap: Record<string, number> = {
        deadline_7d: 7,
        deadline_3d: 3,
        deadline_1d: 1,
      };

      const daysRemaining = daysMap[reminder.reminder_type] ?? 0;
      const deadline = deadlineMap.get(reminder.school_id);

      if (!deadline) {
        await supabase
          .from("reminders")
          .update({ reminder_status: "cancelled" as const } as never)
          .eq("id", reminder.id);
        continue;
      }

      try {
        await sendEmail({
          to: recipientEmail,
          subject: `申请截止提醒 — ${schoolRecord.name_tc}（还有 ${daysRemaining} 天）`,
          html: buildReminderEmailHtml({
            schoolName: schoolRecord.name_tc,
            deadline: formatDateCN(deadline),
            daysRemaining,
            schoolUrl: schoolRecord.website ?? `https://aihkschool.vercel.app/kg/${reminder.school_id}`,
          }),
        });

        // Mark as sent
        await supabase
          .from("reminders")
          .update({ reminder_status: "sent" as const, sent_at: new Date().toISOString() } as never)
          .eq("id", reminder.id);

        sentCount++;
      } catch {
        const newRetryCount = (reminder.retry_count ?? 0) + 1;

        if (newRetryCount >= MAX_RETRIES) {
          await supabase
            .from("reminders")
            .update({ reminder_status: "failed" as const, retry_count: newRetryCount } as never)
            .eq("id", reminder.id);
          failCount++;
        } else {
          await supabase
            .from("reminders")
            .update({ retry_count: newRetryCount } as never)
            .eq("id", reminder.id);
        }
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      failed: failCount,
      synced_pending: syncedReminderCount,
    });
  } catch (err) {
    console.error("Cron /api/cron/reminders error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Cron job failed" } },
      { status: 500 }
    );
  }
}
