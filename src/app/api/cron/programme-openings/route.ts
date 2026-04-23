import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { buildProgrammePreOpenHtml } from "@/lib/email/templates/programme";
import type { Database } from "@/types/database";
import {
  completeCronRunLog,
  createCronRunLog,
  emitSmartPlayThresholdAlert,
  isSmartPlayEnabled,
} from "@/lib/smartplay/runtime";

const MAX_RETRIES = 3;
const PENDING_BATCH_SIZE = 200;
const INSERT_BATCH_SIZE = 500;
const DAILY_CRON_BUFFER_MINUTES = 24 * 60;
const JOB_NAME = "smartplay_programme_openings";

interface PendingReminderProgramme {
  id: string;
  name_zh: string | null;
  name_en: string | null;
  venue: string | null;
  fee_hkd: number | null;
  enrolment_open_at: string | null;
  raw_url: string | null;
}

interface PendingReminderSubscription {
  user_id: string;
  programme_id: string;
  lcsd_programmes: PendingReminderProgramme | PendingReminderProgramme[] | null;
}

interface PendingReminderRow {
  id: string;
  retry_count: number | null;
  programme_subscriptions: {
    user_id: string;
    programme_id: string;
    lcsd_programmes: PendingReminderProgramme | null;
  };
}

export async function GET(request: NextRequest) {
  return handleOpeningsCheck(request);
}

export async function POST(request: NextRequest) {
  return handleOpeningsCheck(request);
}

async function handleOpeningsCheck(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Invalid cron secret" } },
      { status: 403 },
    );
  }

  const supabase = await createServiceClient();
  const runId = await createCronRunLog(supabase, JOB_NAME, {
    method: request.method,
  });

  try {
    const gate = await isSmartPlayEnabled(supabase);
    if (!gate.enabled) {
      await completeCronRunLog(supabase, runId, {
        status: "skipped",
        processed_count: 0,
        sent_count: 0,
        failed_count: 0,
        reminders_created: 0,
        status_updated: 0,
        metadata: {
          disabled_by: gate.source,
        },
      });

      return NextResponse.json({
        success: true,
        skipped: true,
        disabled_by: gate.source,
      });
    }

    const now = new Date();
    const remindersCreated = await createUpcomingReminders(supabase, now);
    const pendingResult = await processPendingReminders(supabase, now);
    const statusUpdated = await updateProgrammeStatuses(supabase, now);

    await completeCronRunLog(supabase, runId, {
      status: "success",
      processed_count: pendingResult.processedCount,
      sent_count: pendingResult.sentCount,
      failed_count: pendingResult.failCount,
      reminders_created: remindersCreated,
      status_updated: statusUpdated,
      metadata: {
        pending_batches: pendingResult.batchCount,
      },
    });

    emitSmartPlayThresholdAlert(JOB_NAME, pendingResult.failCount, {
      reminders_created: remindersCreated,
      processed_count: pendingResult.processedCount,
      status_updated: statusUpdated,
    });

    return NextResponse.json({
      success: true,
      sent: pendingResult.sentCount,
      failed: pendingResult.failCount,
      processed: pendingResult.processedCount,
      reminders_created: remindersCreated,
      status_updated: statusUpdated,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cron job failed";
    console.error("Cron /api/cron/programme-openings error:", err);

    await completeCronRunLog(supabase, runId, {
      status: "failed",
      error_message: message,
    });

    emitSmartPlayThresholdAlert(JOB_NAME, 1, { error: message });

    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Cron job failed" } },
      { status: 500 },
    );
  }
}

async function createUpcomingReminders(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  now: Date,
) {
  const { data: subscriptions, error: subscriptionsError } = await supabase
    .from("programme_subscriptions")
    .select("id, programme_id, notify_before_open_minutes")
    .eq("is_active", true);

  if (subscriptionsError) {
    throw new Error(`Failed to load programme subscriptions: ${subscriptionsError.message}`);
  }

  const activeSubscriptions = (subscriptions ?? []) as Array<
    Pick<
      Database["public"]["Tables"]["programme_subscriptions"]["Row"],
      "id" | "programme_id" | "notify_before_open_minutes"
    >
  >;

  if (activeSubscriptions.length === 0) {
    return 0;
  }

  const programmeIds = Array.from(new Set(activeSubscriptions.map((sub) => sub.programme_id)));
  const maxLeadMinutes = activeSubscriptions.reduce(
    (max, sub) => Math.max(max, sub.notify_before_open_minutes ?? 1440),
    0,
  );

  const lookahead = new Date(now);
  lookahead.setMinutes(lookahead.getMinutes() + maxLeadMinutes + DAILY_CRON_BUFFER_MINUTES);

  const { data: programmes, error: programmesError } = await supabase
    .from("lcsd_programmes")
    .select("id, enrolment_open_at")
    .in("id", programmeIds)
    .eq("is_active", true)
    .not("enrolment_open_at", "is", null)
    .gte("enrolment_open_at", now.toISOString())
    .lte("enrolment_open_at", lookahead.toISOString());

  if (programmesError) {
    throw new Error(`Failed to load upcoming programmes: ${programmesError.message}`);
  }

  const upcomingProgrammes = (programmes ?? []) as Array<
    Pick<
      Database["public"]["Tables"]["lcsd_programmes"]["Row"],
      "id" | "enrolment_open_at"
    >
  >;

  const programmeMap = new Map(
    upcomingProgrammes.map((programme) => [programme.id, programme]),
  );

  const remindersToCreate = activeSubscriptions.flatMap((subscription) => {
    const programme = programmeMap.get(subscription.programme_id);
    if (!programme?.enrolment_open_at) return [];

    const openAt = new Date(programme.enrolment_open_at);
    if (Number.isNaN(openAt.getTime()) || openAt <= now) return [];

    const leadMinutes = subscription.notify_before_open_minutes ?? 1440;
    const scheduledAt = new Date(openAt);
    scheduledAt.setMinutes(scheduledAt.getMinutes() - leadMinutes);

    return [
      {
        subscription_id: subscription.id,
        reminder_type: "day_before" as const,
        scheduled_at: scheduledAt.toISOString(),
        status: "pending" as const,
      },
    ];
  });

  if (remindersToCreate.length === 0) {
    return 0;
  }

  let createdCount = 0;

  for (let index = 0; index < remindersToCreate.length; index += INSERT_BATCH_SIZE) {
    const chunk = remindersToCreate.slice(index, index + INSERT_BATCH_SIZE);
    const { data, error } = await supabase
      .from("programme_reminders")
      .upsert(chunk as never, {
        onConflict: "subscription_id,reminder_type,scheduled_at",
        ignoreDuplicates: true,
      })
      .select("id");

    if (error) {
      throw new Error(`Failed to upsert programme reminders: ${error.message}`);
    }

    createdCount += data?.length ?? 0;
  }

  return createdCount;
}

async function processPendingReminders(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  now: Date,
) {
  const pendingReminderQuery = supabase
    .from("programme_reminders")
    .select(
      `id, subscription_id, reminder_type, retry_count, scheduled_at,
       programme_subscriptions!inner (
         id, user_id, notify_before_open_minutes, programme_id,
         lcsd_programmes!inner ( id, name_zh, name_en, venue, fee_hkd, enrolment_open_at, raw_url )
       )`,
    )
    .eq("status", "pending")
    .eq("reminder_type", "day_before")
    .lte("scheduled_at", now.toISOString())
    .order("scheduled_at", { ascending: true })
    .limit(PENDING_BATCH_SIZE);

  let processedCount = 0;
  let sentCount = 0;
  let failCount = 0;
  let batchCount = 0;

  while (true) {
    const { data: pendingReminders, error } = await pendingReminderQuery;

    if (error) {
      throw new Error(`Failed to fetch pending reminders: ${error.message}`);
    }

    if (!pendingReminders || pendingReminders.length === 0) {
      break;
    }

    const reminderRows: PendingReminderRow[] = pendingReminders.flatMap((row) => {
      const subscription = Array.isArray(row.programme_subscriptions)
        ? row.programme_subscriptions[0]
        : (row.programme_subscriptions as PendingReminderSubscription | null);

      if (!subscription) return [];

      const programme = Array.isArray(subscription.lcsd_programmes)
        ? subscription.lcsd_programmes[0] ?? null
        : subscription.lcsd_programmes ?? null;

      return [
        {
          id: row.id,
          retry_count: row.retry_count,
          programme_subscriptions: {
            user_id: subscription.user_id,
            programme_id: subscription.programme_id,
            lcsd_programmes: programme,
          },
        },
      ];
    });

    batchCount += 1;
    processedCount += reminderRows.length;

    const userIds = Array.from(
      new Set(reminderRows.map((row) => row.programme_subscriptions.user_id)),
    );
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, email, notification_email")
      .in("id", userIds);

    if (usersError) {
      throw new Error(`Failed to fetch reminder recipients: ${usersError.message}`);
    }

    const reminderUsers = (users ?? []) as Array<
      Pick<Database["public"]["Tables"]["users"]["Row"], "id" | "email" | "notification_email">
    >;

    const userMap = new Map(reminderUsers.map((user) => [user.id, user]));

    for (const reminder of reminderRows) {
      const userRecord = userMap.get(reminder.programme_subscriptions.user_id);
      const recipientEmail = userRecord?.notification_email ?? userRecord?.email;
      const programme = reminder.programme_subscriptions.lcsd_programmes;

      if (!programme?.enrolment_open_at || !recipientEmail) {
        await markReminderFailed(supabase, reminder.id, reminder.retry_count ?? 0, true);
        failCount += 1;
        continue;
      }

      const programmeName = programme.name_zh || programme.name_en || "未知課程";
      const programmeUrl =
        programme.raw_url ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://aihkschool.vercel.app"}/programmes/${programme.id}`;

      try {
        await sendEmail({
          to: recipientEmail,
          subject: `即將開放報名 — ${programmeName}`,
          html: buildProgrammePreOpenHtml({
            programmeName,
            venue: programme.venue || "未知",
            fee: programme.fee_hkd,
            enrolmentOpenAt: programme.enrolment_open_at,
            programmeUrl,
          }),
        });

        await supabase
          .from("programme_reminders")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
          } as never)
          .eq("id", reminder.id);

        sentCount += 1;
      } catch (error) {
        console.error("Failed to send SmartPLAY reminder:", {
          reminderId: reminder.id,
          programmeId: reminder.programme_subscriptions.programme_id,
          error,
        });

        const markedFailed = await markReminderFailed(
          supabase,
          reminder.id,
          reminder.retry_count ?? 0,
          false,
        );

        if (markedFailed) {
          failCount += 1;
        }
      }
    }

    if (reminderRows.length < PENDING_BATCH_SIZE) {
      break;
    }
  }

  return {
    processedCount,
    sentCount,
    failCount,
    batchCount,
  };
}

async function markReminderFailed(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  reminderId: string,
  currentRetryCount: number,
  forceFail: boolean,
) {
  const newRetryCount = currentRetryCount + 1;

  if (forceFail || newRetryCount >= MAX_RETRIES) {
    await supabase
      .from("programme_reminders")
      .update({
        status: "failed",
        retry_count: newRetryCount,
      } as never)
      .eq("id", reminderId);

    return true;
  }

  await supabase
    .from("programme_reminders")
    .update({ retry_count: newRetryCount } as never)
    .eq("id", reminderId);

  return false;
}

async function updateProgrammeStatuses(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  now: Date,
) {
  const { data: pendingStatuses, error: statusError } = await supabase
    .from("lcsd_programme_status")
    .select("programme_id")
    .eq("enrolment_status", "pre_open");

  if (statusError) {
    throw new Error(`Failed to fetch programme statuses: ${statusError.message}`);
  }

  const preOpenStatuses = (pendingStatuses ?? []) as Array<
    Pick<Database["public"]["Tables"]["lcsd_programme_status"]["Row"], "programme_id">
  >;

  const programmeIds = preOpenStatuses.map((status) => status.programme_id);
  if (programmeIds.length === 0) {
    return 0;
  }

  const { data: openedProgrammes, error: programmesError } = await supabase
    .from("lcsd_programmes")
    .select("id")
    .in("id", programmeIds)
    .not("enrolment_open_at", "is", null)
    .lte("enrolment_open_at", now.toISOString());

  if (programmesError) {
    throw new Error(`Failed to fetch opened programmes: ${programmesError.message}`);
  }

  const openedIds = ((openedProgrammes ?? []) as Array<
    Pick<Database["public"]["Tables"]["lcsd_programmes"]["Row"], "id">
  >).map((programme) => programme.id);
  if (openedIds.length === 0) {
    return 0;
  }

  const { error: updateError } = await supabase
    .from("lcsd_programme_status")
    .update({
      enrolment_status: "open",
      last_checked_at: now.toISOString(),
    } as never)
    .in("programme_id", openedIds);

  if (updateError) {
    throw new Error(`Failed to update programme statuses: ${updateError.message}`);
  }

  return openedIds.length;
}
