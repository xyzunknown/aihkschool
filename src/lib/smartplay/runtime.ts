import type { SupabaseClient } from "@supabase/supabase-js";
import type { CronRunLog, Database, Json } from "@/types/database";

type TypedSupabaseClient = SupabaseClient<Database>;

const DISABLED_VALUES = new Set(["0", "false", "off", "no", "disabled"]);

function toJsonValue(value: unknown): Json {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map((item) => toJsonValue(item));
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, toJsonValue(entry)]),
    );
  }

  return String(value);
}

function toJsonObject(value: Record<string, unknown>): Json {
  return toJsonValue(value);
}

export function isSmartPlayEnvEnabled() {
  const raw = process.env.SMARTPLAY_ENABLED?.trim().toLowerCase();
  if (!raw) return true;
  return !DISABLED_VALUES.has(raw);
}

export async function isSmartPlayDbEnabled(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase
    .from("app_feature_flags")
    .select("enabled")
    .eq("flag_key", "smartplay_enabled")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load SmartPLAY feature flag: ${error.message}`);
  }

  return data?.enabled ?? true;
}

export async function isSmartPlayEnabled(supabase: TypedSupabaseClient) {
  if (!isSmartPlayEnvEnabled()) {
    return { enabled: false, source: "env" as const };
  }

  const dbEnabled = await isSmartPlayDbEnabled(supabase);
  if (!dbEnabled) {
    return { enabled: false, source: "db" as const };
  }

  return { enabled: true, source: "enabled" as const };
}

export function getSmartPlayFailureThreshold() {
  const raw = process.env.SMARTPLAY_CRON_ALERT_FAILURE_THRESHOLD;
  const parsed = raw ? Number.parseInt(raw, 10) : 1;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 1;
}

export async function createCronRunLog(
  supabase: TypedSupabaseClient,
  jobName: string,
  metadata: Record<string, unknown> = {},
) {
  const { data, error } = await supabase
    .from("cron_run_logs")
    .insert({
      job_name: jobName,
      status: "running",
      metadata: toJsonObject(metadata),
    })
    .select("id")
    .single();

  if (error) {
    console.error(`[SmartPLAY] Failed to create cron_run_logs row for ${jobName}:`, error);
    return null;
  }

  return data.id;
}

export async function completeCronRunLog(
  supabase: TypedSupabaseClient,
  runId: string | null,
  update: Partial<CronRunLog>,
) {
  if (!runId) return;

  const { error } = await supabase
    .from("cron_run_logs")
    .update({
      ...update,
      metadata:
        update.metadata && typeof update.metadata === "object" && !Array.isArray(update.metadata)
          ? toJsonObject(update.metadata as Record<string, unknown>)
          : update.metadata,
      completed_at: update.completed_at ?? new Date().toISOString(),
    })
    .eq("id", runId);

  if (error) {
    console.error(`[SmartPLAY] Failed to update cron_run_logs row ${runId}:`, error);
  }
}

export function emitSmartPlayThresholdAlert(
  jobName: string,
  failedCount: number,
  context: Record<string, unknown> = {},
) {
  const threshold = getSmartPlayFailureThreshold();
  if (failedCount < threshold) return;

  console.error(`[SmartPLAY Alert] ${jobName} failure threshold reached`, {
    threshold,
    failedCount,
    ...context,
  });
}