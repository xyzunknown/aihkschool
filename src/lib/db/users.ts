import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createServiceClient } from "@/lib/supabase/server";

function getDisplayName(user: SupabaseUser) {
  const metadata = user.user_metadata;

  if (typeof metadata?.full_name === "string" && metadata.full_name.trim()) {
    return metadata.full_name.trim();
  }

  if (typeof metadata?.name === "string" && metadata.name.trim()) {
    return metadata.name.trim();
  }

  if (user.email && user.email.includes("@")) {
    return user.email.split("@")[0];
  }

  return user.id;
}

export async function ensurePublicUser(user: SupabaseUser) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey || serviceKey.includes("your_")) {
    return false;
  }

  const supabase = await createServiceClient();
  const email = user.email ?? `${user.id}@users.local`;

  const { error } = await supabase
    .from("users")
    .upsert(
      {
        id: user.id,
        email,
        display_name: getDisplayName(user),
      },
      { onConflict: "id" },
    );

  if (error) {
    throw new Error(`Failed to ensure public user: ${error.message}`);
  }

  return true;
}

export async function assertUserNotDisabled(userId: string) {
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("users")
    .select("admin_disabled")
    .eq("id", userId)
    .maybeSingle();

  if (!error && (data as { admin_disabled?: boolean } | null)?.admin_disabled) {
    throw new Error("USER_DISABLED");
  }
}
