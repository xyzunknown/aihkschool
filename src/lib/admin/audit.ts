import "server-only";

import type { User } from "@supabase/supabase-js";
import { createServiceClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export async function writeAdminAuditLog(params: {
  user: User;
  action: string;
  targetType: string;
  targetId?: string | null;
  before?: Json;
  after?: Json;
}) {
  const supabase = await createServiceClient();
  await supabase.from("admin_audit_logs" as never).insert({
    admin_user_id: params.user.id,
    admin_email: params.user.email ?? null,
    action: params.action,
    target_type: params.targetType,
    target_id: params.targetId ?? null,
    before_summary: params.before ?? {},
    after_summary: params.after ?? {},
  } as never);
}
