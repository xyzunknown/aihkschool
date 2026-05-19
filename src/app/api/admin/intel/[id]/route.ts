import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  rejectionReason: z.string().optional(),
  is_hidden: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;

    const parsed = patchSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Invalid request body" } },
        { status: 400 }
      );
    }

    const updateData: Record<string, string | boolean> = {};
    if (parsed.data.status) updateData.status = parsed.data.status;
    if (parsed.data.status === "rejected" && parsed.data.rejectionReason) {
      updateData.rejection_reason = parsed.data.rejectionReason;
    }
    if (typeof parsed.data.is_hidden === "boolean") {
      updateData.is_hidden = parsed.data.is_hidden;
    }

    const supabase = await createServiceClient();
    const { data: before } = await supabase.from("admission_intel").select("*").eq("id", params.id).single();
    const { data, error } = await supabase
      .from("admission_intel")
      .update(updateData as never)
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: { code: "INTERNAL_ERROR", message: error.message } },
        { status: 500 }
      );
    }

    await writeAdminAuditLog({
      user: auth.user!,
      action: "intel.update",
      targetType: "admission_intel",
      targetId: params.id,
      before: before as never,
      after: data as never,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin intel PATCH error:", err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to update intel status" } },
      { status: 500 }
    );
  }
}
