import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

const AI_BOT_UA =
  /GPTBot|ClaudeBot|anthropic-ai|PerplexityBot|CCBot|Google-Extended|Bytespider/i;

let rateLimiter: import("@upstash/ratelimit").Ratelimit | null = null;

function getRateLimiter() {
  if (rateLimiter) return rateLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  // Lazy import to avoid build issues when env vars not set
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Ratelimit } = require("@upstash/ratelimit");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Redis } = require("@upstash/redis");
    rateLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(60, "60 s"),
      analytics: false,
    });
    return rateLimiter;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // 1. Block known AI crawler bots
  const ua = request.headers.get("user-agent") ?? "";
  if (AI_BOT_UA.test(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2. Rate limit (when Upstash is configured)
  const limiter = getRateLimiter();
  if (limiter) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
    const { success } = await limiter.limit(ip);
    if (!success) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  // 3. Normal Supabase session handling
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
