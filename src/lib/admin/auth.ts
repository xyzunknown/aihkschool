import "server-only";

import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean) ?? [];

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}

export async function getAdminUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

export async function requireAdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/");
  return user;
}

export async function requireAdminApi() {
  const user = await getAdminUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Admin access required" } },
        { status: 403 },
      ),
    };
  }

  return { user, response: null };
}
