import { createServiceClient } from "@/lib/supabase/server";
import type { TablesInsert } from "@/types/database";

const MAX_FAVORITES = 10;
const REMINDER_TYPES = [
  { days: 7, type: "deadline_7d" },
  { days: 3, type: "deadline_3d" },
  { days: 1, type: "deadline_1d" },
] as const;

function parseDateOnly(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTodayInHongKong() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function buildPendingReminderRows(
  favoriteId: string,
  userId: string,
  schoolId: string,
  deadline: string,
  reminderDaysBefore: number[],
) {
  const today = parseDateOnly(getTodayInHongKong());
  const deadlineDate = parseDateOnly(deadline);

  if (Number.isNaN(deadlineDate.getTime()) || deadlineDate < today) {
    return [];
  }

  const selectedDays = new Set(reminderDaysBefore);

  return REMINDER_TYPES.flatMap(({ days, type }) => {
    if (!selectedDays.has(days)) return [];

    const scheduledDate = new Date(deadlineDate);
    scheduledDate.setUTCDate(scheduledDate.getUTCDate() - days);

    if (scheduledDate < today) {
      return [];
    }

    const row: TablesInsert<"reminders"> = {
      favorite_id: favoriteId,
      user_id: userId,
      school_id: schoolId,
      reminder_type: type,
      scheduled_date: formatDateOnly(scheduledDate),
      reminder_status: "pending",
      retry_count: 0,
    };

    return [row];
  });
}

async function clearPendingReminders(favoriteId: string) {
  const supabase = await createServiceClient();

  const { error } = await supabase
    .from("reminders")
    .delete()
    .eq("favorite_id", favoriteId)
    .in("reminder_status", ["pending", "failed", "cancelled"]);

  if (error) {
    throw new Error(`Failed to clear reminders: ${error.message}`);
  }
}

async function loadFavoriteForReminder(userId: string, schoolId: string) {
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("id, user_id, school_id")
    .eq("user_id", userId)
    .eq("school_id", schoolId)
    .single();

  if (error) {
    throw new Error(`Failed to load favorite: ${error.message}`);
  }

  return data;
}

async function loadCurrentDeadline(schoolId: string) {
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("vacancies")
    .select("application_deadline")
    .eq("school_id", schoolId)
    .eq("is_current", true)
    .not("application_deadline", "is", null)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load application deadline: ${error.message}`);
  }

  return data?.application_deadline ?? null;
}

export async function fetchUserFavorites(userId: string) {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("favorites")
    .select("id, user_id, school_id, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch favorites: ${error.message}`);
  }

  return data ?? [];
}

export async function fetchUserFavoritesWithSchools(userId: string) {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `id, user_id, school_id, reminder_enabled, reminder_days_before,
       created_at, updated_at,
       schools ( id, name_tc, name_en, district, phone, website, logo_url, school_type,
                 session_type, language_primary, fee_monthly_hkd )`
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!error) {
    return data ?? [];
  }

  const { data: baseFavorites, error: baseError } = await supabase
    .from("favorites")
    .select("id, user_id, school_id, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (baseError) {
    throw new Error(`Failed to fetch favorites: ${baseError.message}`);
  }

  const favorites = baseFavorites ?? [];
  const schoolIds = favorites.map((favorite) => favorite.school_id);

  const schoolMap = new Map<string, {
    id: string;
    name_tc: string;
    name_en: string | null;
    district: string;
    website: string | null;
  }>();

  if (schoolIds.length > 0) {
    const { data: schools, error: schoolsError } = await supabase
      .from("schools")
      .select("id, name_tc, name_en, district, website")
      .in("id", schoolIds);

    if (schoolsError) {
      throw new Error(`Failed to fetch favorite schools: ${schoolsError.message}`);
    }

    for (const school of schools ?? []) {
      schoolMap.set(school.id, school);
    }
  }

  return favorites.map((favorite) => ({
    ...favorite,
    reminder_enabled: false,
    reminder_days_before: [],
    schools: schoolMap.get(favorite.school_id) ?? {
      id: favorite.school_id,
      name_tc: "學校資料暫不可用",
      name_en: null,
      district: "central_and_western",
      website: null,
    },
  }));
}

export async function insertFavorite(userId: string, schoolId: string) {
  const supabase = await createServiceClient();

  // Check limit
  const { count } = await supabase
    .from("favorites")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (count !== null && count >= MAX_FAVORITES) {
    throw new Error("MAX_FAVORITES_REACHED");
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      school_id: schoolId,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("ALREADY_FAVORITED");
    }
    if (error.code === "23503" && error.message.includes("favorites_user_id_fkey")) {
      throw new Error("MISSING_USER_PROFILE");
    }
    throw new Error(`Failed to favorite: ${error.message}`);
  }

  return data;
}

export async function deleteFavorite(userId: string, schoolId: string) {
  const supabase = await createServiceClient();

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("school_id", schoolId);

  if (error) {
    throw new Error(`Failed to unfavorite: ${error.message}`);
  }
}

export async function updateReminderSettings(
  userId: string,
  schoolId: string,
  reminderEnabled: boolean,
  reminderDaysBefore: number[]
) {
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from("favorites")
    .update({
      reminder_enabled: reminderEnabled,
      reminder_days_before: reminderDaysBefore,
    })
    .eq("user_id", userId)
    .eq("school_id", schoolId)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to update reminder: ${error.message}`);
  }

  return data;
}

export async function syncFavoriteReminders(
  userId: string,
  schoolId: string,
  reminderEnabled: boolean,
  reminderDaysBefore: number[],
) {
  const favorite = await loadFavoriteForReminder(userId, schoolId);

  let deadline: string | null = null;
  let reminderRows: TablesInsert<"reminders">[] = [];

  if (reminderEnabled) {
    deadline = await loadCurrentDeadline(schoolId);

    if (!deadline) {
      throw new Error("NO_ACTIVE_DEADLINE");
    }

    reminderRows = buildPendingReminderRows(
      favorite.id,
      userId,
      schoolId,
      deadline,
      reminderDaysBefore,
    );

    if (reminderRows.length === 0) {
      throw new Error("NO_PENDING_REMINDERS");
    }
  }

  await updateReminderSettings(userId, schoolId, reminderEnabled, reminderDaysBefore);
  await clearPendingReminders(favorite.id);

  if (reminderRows.length > 0) {
    const serviceSupabase = await createServiceClient();
    const { error } = await serviceSupabase.from("reminders").insert(reminderRows);

    if (error) {
      throw new Error(`Failed to create reminders: ${error.message}`);
    }
  }

  return {
    deadline,
    remindersCreated: reminderRows.length,
  };
}

export async function syncAllFavoriteReminders() {
  const supabase = await createServiceClient();
  const { data: favorites, error } = await supabase
    .from("favorites")
    .select("id, user_id, school_id, reminder_days_before")
    .eq("reminder_enabled", true);

  if (error) {
    throw new Error(`Failed to load active favorites: ${error.message}`);
  }

  if (!favorites || favorites.length === 0) {
    return 0;
  }

  const schoolIds = Array.from(new Set(favorites.map((favorite) => favorite.school_id)));
  const { data: vacancies, error: vacanciesError } = await supabase
    .from("vacancies")
    .select("school_id, application_deadline")
    .in("school_id", schoolIds)
    .eq("is_current", true)
    .not("application_deadline", "is", null);

  if (vacanciesError) {
    throw new Error(`Failed to load current deadlines: ${vacanciesError.message}`);
  }

  const deadlineMap = new Map(
    (vacancies ?? []).map((vacancy) => [vacancy.school_id, vacancy.application_deadline]),
  );

  let syncedReminderCount = 0;

  for (const favorite of favorites) {
    await clearPendingReminders(favorite.id);

    const deadline = deadlineMap.get(favorite.school_id);
    if (!deadline) continue;

    const rows = buildPendingReminderRows(
      favorite.id,
      favorite.user_id,
      favorite.school_id,
      deadline,
      favorite.reminder_days_before,
    );

    if (rows.length === 0) continue;

    const { error: insertError } = await supabase.from("reminders").insert(rows);
    if (insertError) {
      throw new Error(`Failed to sync reminders: ${insertError.message}`);
    }

    syncedReminderCount += rows.length;
  }

  return syncedReminderCount;
}

export async function checkIsFavorited(userId: string, schoolId: string): Promise<boolean> {
  const supabase = await createServiceClient();

  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("school_id", schoolId)
    .single();

  return !!data;
}
