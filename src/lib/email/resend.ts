import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const EMAIL_FROM = process.env.EMAIL_FROM || "HKSchoolPlace <onboarding@resend.dev>";

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (EMAIL_FROM.includes("resend.dev")) {
    console.warn(
      "[Email] Using Resend test domain — emails may land in spam. " +
      "Set EMAIL_FROM env var to your custom domain (e.g. noreply@hkschoolplace.com)."
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error(`Email send failed: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("Email service error:", err);
    throw err;
  }
}
