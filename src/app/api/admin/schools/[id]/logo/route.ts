import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { writeAdminAuditLog } from "@/lib/admin/audit";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: { code: "NO_FILE", message: "Missing file" } }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${params.id}/${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("school-logos")
    .upload(path, file, { contentType: file.type || "image/png", upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: { code: "UPLOAD_FAILED", message: uploadError.message } }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage.from("school-logos").getPublicUrl(path);
  const { data: before } = await supabase.from("schools").select("id, logo_url").eq("id", params.id).single();
  const { data, error } = await supabase
    .from("schools")
    .update({ logo_url: publicUrl.publicUrl })
    .eq("id", params.id)
    .select("id, logo_url")
    .single();

  if (error) {
    return NextResponse.json({ error: { code: "DB_ERROR", message: error.message } }, { status: 500 });
  }

  await writeAdminAuditLog({
    user: auth.user!,
    action: "school.logo.upload",
    targetType: "school",
    targetId: params.id,
    before: before as never,
    after: data as never,
  });

  return NextResponse.json({ data });
}
