import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { ensurePublicUser } from "@/lib/db/users";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  try {
    if (code) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        if (data.user) {
          try {
            await ensurePublicUser(data.user);
          } catch (ensureError) {
            console.error("Failed to ensure public user during auth callback:", ensureError);
          }
        }
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  } catch {
    return NextResponse.redirect(`${origin}/?error=auth_config`);
  }

  return NextResponse.redirect(`${origin}/?error=auth`);
}
