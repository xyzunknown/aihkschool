import { createClient } from "@/lib/supabase/server";

const MAX_FAVORITES = 10;

export async function fetchUserFavorites(userId: string) {
  const supabase = await createClient();

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

  if (error) {
    throw new Error(`Failed to fetch favorites: ${error.message}`);
  }

  return data ?? [];
}

export async function insertFavorite(userId: string, schoolId: string) {
  const supabase = await createClient();

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
      reminder_enabled: false,
      reminder_days_before: [],
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("ALREADY_FAVORITED");
    }
    throw new Error(`Failed to favorite: ${error.message}`);
  }

  return data;
}

export async function deleteFavorite(userId: string, schoolId: string) {
  const supabase = await createClient();

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
  const supabase = await createClient();

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

export async function checkIsFavorited(userId: string, schoolId: string): Promise<boolean> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("school_id", schoolId)
    .single();

  return !!data;
}
