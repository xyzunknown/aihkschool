import { updateSession } from "@/lib/supabase/middleware";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";
import { NextResponse, type NextRequest } from "next/server";

function getRateLimiter(authenticated: boolean) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(authenticated ? 120 : 60, "60 s"),
      analytics: false,
    });
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Rate limit — 仅 /api/* 路径（避免正常页面浏览被 429）
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const isAuth = !!request.cookies.get("sb-access-token");
    const limiter = getRateLimiter(isAuth);
    if (limiter) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
      const { success } = await limiter.limit(`${ip}:${isAuth ? "auth" : "anon"}`);
      if (!success) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    }
  }

  // Normal Supabase session handling
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
