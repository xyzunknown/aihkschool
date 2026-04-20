import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { buildProgrammeDayBeforeHtml } from "@/lib/email/templates/programme";

const MAX_RETRIES = 3;

/**
 * 課程提醒 cron
 * ─────────────────────────────
 * Hobby 套餐下暫時只發送 day_before 類型的開報前提醒。
 * 不建立也不發送 open_imminent / now_open，避免產生延遲通知。
 *
 * Cadence: 每日一次（由 Vercel Cron 配置）
 */

export async function GET(request: NextRequest) {
  return handleOpeningsCheck(request);
}

export async function POST(request: NextRequest) {
  return handleOpeningsCheck(request);
}

async function handleOpeningsCheck(request: NextRequest) {
  try {
    // 驗證 cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Invalid cron secret" } },
        { status: 403 },
      );
    }

    const supabase = await createServiceClient();
    const now = new Date();
    let sentCount = 0;
    let failCount = 0;

    // ── Part 1: 處理到期的 pending 提醒 ──
    const { data: pendingReminders, error: remindersError } = await supabase
      .from("programme_reminders")
      .select(
        `id, reminder_type, retry_count, scheduled_at,
         programme_subscriptions!inner (
           user_id, programme_id,
           lcsd_programmes!inner ( id, name_zh, name_en, venue, fee_hkd, enrolment_open_at, raw_url )
         )`
      )
      .eq("reminder_type", "day_before")
      .eq("status", "pending")
      .lte("scheduled_at", now.toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(100);

    if (remindersError) {
      console.error("Failed to fetch pending reminders:", remindersError);
      return NextResponse.json(
        { error: { code: "INTERNAL_ERROR", message: "Failed to fetch reminders" } },
        { status: 500 },
      );
    }

    for (const reminder of pendingReminders ?? []) {
      const sub = reminder.programme_subscriptions as unknown as {
        user_id: string;
        programme_id: string;
        lcsd_programmes: {
          id: string;
          name_zh: string | null;
          name_en: string | null;
          venue: string | null;
          fee_hkd: number | null;
          enrolment_open_at: string | null;
          raw_url: string | null;
        };
      };

      if (!sub?.lcsd_programmes) continue;

      // 獲取用戶郵箱
      const { data: userRecord } = await supabase
        .from("users")
        .select("email, notification_email")
        .eq("id", sub.user_id)
        .single();

      if (!userRecord) continue;

      const recipientEmail = userRecord.notification_email ?? userRecord.email;
      if (!recipientEmail) continue;

      const programme = sub.lcsd_programmes;
      const programmeName = programme.name_zh || programme.name_en || "未知課程";
      const programmeUrl =
        programme.raw_url ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://aihkschool.vercel.app"}/programmes/${programme.id}`;

      try {
        const subject = `明天開放報名 — ${programmeName}`;
        const html = buildProgrammeDayBeforeHtml({
          programmeName,
          venue: programme.venue || "未知",
          fee: programme.fee_hkd,
          enrolmentOpenAt: programme.enrolment_open_at || "",
          programmeUrl,
        });

        await sendEmail({ to: recipientEmail, subject, html });

        await supabase
          .from("programme_reminders")
          .update({ status: "sent" as const, sent_at: now.toISOString() })
          .eq("id", reminder.id);

        sentCount++;
      } catch {
        const newRetryCount = (reminder.retry_count ?? 0) + 1;

        if (newRetryCount >= MAX_RETRIES) {
          await supabase
            .from("programme_reminders")
            .update({ status: "failed" as const, retry_count: newRetryCount })
            .eq("id", reminder.id);
          failCount++;
        } else {
          await supabase
            .from("programme_reminders")
            .update({ retry_count: newRetryCount })
            .eq("id", reminder.id);
        }
      }
    }

    // ── Part 2: 檢查即將開放的課程，自動創建 day_before 提醒 ──
    // 查找 24 小時內即將開放且尚未設置提醒的訂閱
    const tomorrow = new Date(now);
    tomorrow.setHours(tomorrow.getHours() + 24);

    const { data: upcomingProgs } = await supabase
      .from("lcsd_programmes")
      .select("id, enrolment_open_at")
      .eq("is_active", true)
      .gte("enrolment_open_at", now.toISOString())
      .lte("enrolment_open_at", tomorrow.toISOString());

    let remindersCreated = 0;

    for (const prog of upcomingProgs ?? []) {
      // 查找此課程的活躍訂閱
      const { data: subs } = await supabase
        .from("programme_subscriptions")
        .select("id")
        .eq("programme_id", prog.id)
        .eq("is_active", true);

      for (const sub of subs ?? []) {
        // 檢查是否已有提醒
        const { count } = await supabase
          .from("programme_reminders")
          .select("id", { count: "exact", head: true })
          .eq("subscription_id", sub.id);

        if (!count || count === 0) {
          // 創建提醒
          const openDate = new Date(prog.enrolment_open_at!);

          const dayBefore = new Date(openDate);
          dayBefore.setDate(dayBefore.getDate() - 1);
          dayBefore.setHours(9, 0, 0, 0);

          const remindersToCreate = [];

          // 只創建未過期的提醒
          if (dayBefore > now) {
            remindersToCreate.push({
              subscription_id: sub.id,
              reminder_type: "day_before",
              scheduled_at: dayBefore.toISOString(),
              status: "pending",
            });
          }

          if (remindersToCreate.length > 0) {
            await supabase.from("programme_reminders").insert(remindersToCreate);
            remindersCreated += remindersToCreate.length;
          }
        }
      }
    }

    // ── Part 3: 更新課程開放狀態，不發送 now_open 提醒 ──
    // 查找已到開放時間但狀態仍為 pre_open 的課程
    const { data: justOpened } = await supabase
      .from("lcsd_programme_status")
      .select("programme_id, enrolment_status")
      .eq("enrolment_status", "pre_open");

    let statusUpdated = 0;

    for (const status of justOpened ?? []) {
      const { data: prog } = await supabase
        .from("lcsd_programmes")
        .select("enrolment_open_at")
        .eq("id", status.programme_id)
        .single();

      if (prog?.enrolment_open_at && new Date(prog.enrolment_open_at) <= now) {
        // 更新狀態為 open
        await supabase
          .from("lcsd_programme_status")
          .update({ enrolment_status: "open", last_checked_at: now.toISOString() })
          .eq("programme_id", status.programme_id);

        statusUpdated++;
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentCount,
      failed: failCount,
      reminders_created: remindersCreated,
      status_updated: statusUpdated,
    });
  } catch (err) {
    console.error("Cron /api/cron/programme-openings error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Cron job failed" } },
      { status: 500 },
    );
  }
}
