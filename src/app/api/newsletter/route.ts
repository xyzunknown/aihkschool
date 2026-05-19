import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/resend";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const newsletterSchema = z.object({
  email: z.string().email(),
  interest_tags: z.array(z.string()).optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "INVALID_EMAIL", message: "請輸入有效電郵" } },
        { status: 400 },
      );
    }

    const supportEmail = process.env.SUPPORT_EMAIL || "support@hkschoolplace.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkschool.vercel.app";
    const email = parsed.data.email.toLowerCase();

    try {
      const supabase = await createServiceClient();
      await supabase.from("newsletter_subscribers" as never).upsert({
        email,
        interest_tags: parsed.data.interest_tags ?? [],
        source: parsed.data.source ?? "site",
        status: "active",
        unsubscribed_at: null,
      } as never, { onConflict: "email" } as never);
    } catch (error) {
      console.warn("[Newsletter] Subscriber storage skipped:", error instanceof Error ? error.message : error);
    }

    if (process.env.NODE_ENV !== "production" || !process.env.RESEND_API_KEY) {
      console.info("[Newsletter] Subscription received in local/dev mode:", {
        email,
        source: siteUrl,
      });

      return NextResponse.json({ success: true });
    }

    await sendEmail({
      to: supportEmail,
      subject: `Newsletter signup — ${parsed.data.email}`,
      html: `
        <p>新的站內訂閱請求：</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${siteUrl}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message } },
      { status: 500 },
    );
  }
}
