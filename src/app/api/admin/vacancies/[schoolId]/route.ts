import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";
import { syncAllFavoriteReminders } from "@/lib/db/favorites";

export const dynamic = "force-dynamic";

const statusSchema = z.enum(["has_vacancy", "no_vacancy", "waiting_list", "no_information", "not_offered", "check_school"]);
const vacancySchema = z.object({
  id: z.string().uuid().optional(),
  academic_year: z.string().min(1),
  n_vacancy: statusSchema,
  k1_vacancy: statusSchema,
  k2_vacancy: statusSchema,
  k3_vacancy: statusSchema,
  application_deadline: z.string().nullable().optional(),
  edb_source_url: z.string().nullable().optional(),
  edb_published_date: z.string().nullable().optional(),
  is_current: z.boolean(),
  application_url: z.string().nullable().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: { schoolId: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const parsed = vacancySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_INPUT", message: parsed.error.issues[0]?.message } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const current = parsed.data.id
    ? await supabase.from("vacancies").select("*").eq("id", parsed.data.id).single()
    : await supabase.from("vacancies").select("*").eq("school_id", params.schoolId).eq("is_current", true).maybeSingle();

  const payload = {
    school_id: params.schoolId,
    academic_year: parsed.data.academic_year,
    n_vacancy: parsed.data.n_vacancy,
    k1_vacancy: parsed.data.k1_vacancy,
    k2_vacancy: parsed.data.k2_vacancy,
    k3_vacancy: parsed.data.k3_vacancy,
    application_deadline: parsed.data.application_deadline || null,
    edb_source_url: parsed.data.edb_source_url || null,
    edb_published_date: parsed.data.edb_published_date || null,
    is_current: parsed.data.is_current,
  };

  let result;
  if (current.data?.id) {
    result = await supabase.from("vacancies").update(payload).eq("id", current.data.id).select("*").single();
  } else {
    result = await supabase.from("vacancies").insert(payload).select("*").single();
  }

  if (result.error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: result.error.message } }, { status: 500 });
  }

  await supabase
    .from("schools")
    .update({ application_url: parsed.data.application_url || null, last_verified_at: new Date().toISOString() } as never)
    .eq("id", params.schoolId);

  const remindersSynced = await syncAllFavoriteReminders();

  await writeAdminAuditLog({
    user: auth.user!,
    action: "vacancy.update",
    targetType: "vacancy",
    targetId: result.data.id,
    before: (current.data ?? {}) as never,
    after: { ...result.data, remindersSynced } as never,
  });

  return NextResponse.json({ data: result.data, remindersSynced });
}
