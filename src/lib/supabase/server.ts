import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes("your_") || anonKey.includes("your_")) {
    throw new Error(
      "Supabase environment variables not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables."
    );
  }

  return { url, anonKey };
}

export async function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from Server Component — cannot set cookies, ignore
        }
      },
    },
  });
}

export async function createServiceClient() {
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey || serviceKey.includes("your_")) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel → Settings → Environment Variables."
    );
  }

  return createServerClient(url, serviceKey, {
    cookies: {
      getAll() { return []; },
      setAll() {},
    },
  });
}
