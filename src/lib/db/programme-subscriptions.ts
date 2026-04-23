import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import type { TablesInsert } from "@/types/database";

// ============================================================
// Types
// ============================================================

export interface ProgrammeSubscription {
  id: string;
  user_id: string;
  programme_id: string;
  notify_before_open_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface ProgrammeSubscriptionWithProgramme extends ProgrammeSubscription {
  lcsd_programmes: {
    id: string;
    name_zh: string | null;
    name_en: string | null;
    category: string | null;
    venue: string | null;
    district: string | null;
    fee_hkd: number | null;
    enrolment_open_at: string | null;
    start_date: string | null;
    raw_url: string | null;
  };
}

type SubscriptionProgrammeRow = ProgrammeSubscriptionWithProgramme["lcsd_programmes"];

type ProgrammeSubscriptionRow = ProgrammeSubscription & {
  lcsd_programmes: SubscriptionProgrammeRow | SubscriptionProgrammeRow[] | null;
};

// ============================================================
// Constants
// ============================================================

const MAX_SUBSCRIPTIONS = 20;

const SUB_WITH_PROGRAMME_SELECT = `id, user_id, programme_id, notify_before_open_minutes,
  is_active, created_at,
  lcsd_programmes (id, name_zh, name_en, category, venue, district, fee_hkd,
    enrolment_open_at, start_date, raw_url)`;

// ============================================================
// Queries
// ============================================================

export async function fetchUserSubscriptions(
  userId: string,
): Promise<ProgrammeSubscriptionWithProgramme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("programme_subscriptions")
    .select(SUB_WITH_PROGRAMME_SELECT)
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch subscriptions: ${error.message}`);
  }

  const mapped = ((data ?? []) as ProgrammeSubscriptionRow[]).map((row) => ({
    ...row,
    lcsd_programmes: Array.isArray(row.lcsd_programmes)
      ? row.lcsd_programmes[0] ?? null
      : row.lcsd_programmes ?? null,
  })) as ProgrammeSubscriptionWithProgramme[];

  return mapped;
}

export async function insertSubscription(
  userId: string,
  programmeId: string,
  notifyBeforeMinutes: number = 1440,
) {
  const supabase = await createClient();

  // 檢查上限
  const { count } = await supabase
    .from("programme_subscriptions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_active", true);

  if (count !== null && count >= MAX_SUBSCRIPTIONS) {
    throw new Error("MAX_SUBSCRIPTIONS_REACHED");
  }

  const { data, error } = await supabase
    .from("programme_subscriptions")
    .insert({
      user_id: userId,
      programme_id: programmeId,
      notify_before_open_minutes: notifyBeforeMinutes,
      is_active: true,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("ALREADY_SUBSCRIBED");
    }
    throw new Error(`Failed to subscribe: ${error.message}`);
  }

  return data;
}

export async function deleteSubscription(userId: string, programmeId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("programme_subscriptions")
    .delete()
    .eq("user_id", userId)
    .eq("programme_id", programmeId);

  if (error) {
    throw new Error(`Failed to unsubscribe: ${error.message}`);
  }
}

export async function checkIsSubscribed(
  userId: string,
  programmeId: string,
): Promise<boolean> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("programme_subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("programme_id", programmeId)
    .eq("is_active", true)
    .single();

  return !!data;
}

/**
 * 為訂閱創建提醒記錄（cron 用 service client）
 */
export async function createProgrammeReminders(
  subscriptionId: string,
  _programmeId: string,
  enrolmentOpenAt: string,
  notifyBeforeMinutes: number = 1440,
) {
  const supabase = await createServiceClient();

  const openDate = new Date(enrolmentOpenAt);

  const scheduledAt = new Date(openDate);
  scheduledAt.setMinutes(scheduledAt.getMinutes() - notifyBeforeMinutes);

  const reminders: TablesInsert<"programme_reminders">[] = [
    {
      subscription_id: subscriptionId,
      reminder_type: "day_before",
      scheduled_at: scheduledAt.toISOString(),
      status: "pending",
    },
  ];

  const { error } = await supabase
    .from("programme_reminders")
    .upsert(reminders, {
      onConflict: "subscription_id,reminder_type,scheduled_at",
      ignoreDuplicates: true,
    });

  if (error) {
    for (const reminder of reminders) {
      try {
        await supabase
          .from("programme_reminders")
          .insert(reminder)
          .select("id")
          .single();
      } catch {
        // 忽略重複
      }
    }
  }
}
