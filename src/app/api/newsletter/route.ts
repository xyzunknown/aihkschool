import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/resend";

export const dynamic = "force-dynamic";

const newsletterSchema = z.object({
  email: z.string().email(),
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

    if (process.env.NODE_ENV !== "production" || !process.env.RESEND_API_KEY) {
      console.info("[Newsletter] Subscription received in local/dev mode:", {
        email: parsed.data.email,
        source: siteUrl,
      });

      return NextResponse.json({ success: true });
    }

    await sendEmail({
      to: supportEmail,
      subject: `Newsletter signup — ${parsed.data.email}`,
      html: `
        <p>新的站內訂閱請求：</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
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
