import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertIntel } from "@/lib/db/intel";
import { createClient } from "@/lib/supabase/server";
import { fetchSchoolById } from "@/lib/db/schools";
import { sendEmail } from "@/lib/email/resend";
import { buildSubmissionConfirmHtml } from "@/lib/email/templates";

const intelSchema = z.object({
  school_id: z.string().uuid(),
  academic_year: z.string().min(1),
  grade_applied: z.string().min(1),
  interview_type: z.enum(["parent_child", "child_only", "none", "unknown"]),
  interview_language: z.string().optional(),
  queue_time: z.string().optional(),
  has_second_interview: z.boolean().optional(),
  offer_month: z.string().optional(),
  application_result: z.enum(["accepted", "waitlisted", "rejected", "pending"]),
  fee_registration_hkd: z.number().optional(),
  fee_interview_hkd: z.number().optional(),
  notes: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Auth check first
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 }
      );
    }

    // Validate body
    const body = await request.json();
    const parsed = intelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0].message } },
        { status: 400 }
      );
    }

    const result = await insertIntel({
      ...parsed.data,
      user_id: user.id,
    });
    void result;

    // Send confirmation email
    try {
      const school = await fetchSchoolById(parsed.data.school_id);
      if (school && user.email) {
        await sendEmail({
          to: user.email,
          subject: "HKSchoolPlace — 投稿已收到",
          html: buildSubmissionConfirmHtml({
            schoolName: school.name_tc,
            academicYear: parsed.data.academic_year,
          }),
        });
      }
    } catch {
      // Email failure should not block submission
      console.error("Failed to send confirmation email");
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/intel error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to submit intel" } },
      { status: 500 }
    );
  }
}
