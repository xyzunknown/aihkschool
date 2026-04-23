import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  completeCronRunLog,
  createCronRunLog,
  emitSmartPlayThresholdAlert,
  isSmartPlayEnabled,
} from "@/lib/smartplay/runtime";
import type { Database, District, ProgrammeCategory } from "@/types/database";

const JOB_NAME = "smartplay_lcsd_sync";

/**
 * 每日 LCSD 課程 meta 同步 cron
 * ─────────────────────────────
 * 凌晨跑一次，從 data/lcsd/programmes.json 同步到 DB。
 * Vercel Cron 發 GET；手動測試發 POST。
 */

export async function GET(request: NextRequest) {
  return handleSync(request);
}

export async function POST(request: NextRequest) {
  return handleSync(request);
}

async function handleSync(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Invalid cron secret" } },
      { status: 403 },
    );
  }

  const supabase = await createServiceClient();
  const runId = await createCronRunLog(supabase, JOB_NAME, {
    method: request.method,
  });

  try {
    const gate = await isSmartPlayEnabled(supabase);
    if (!gate.enabled) {
      await completeCronRunLog(supabase, runId, {
        status: "skipped",
        metadata: {
          disabled_by: gate.source,
        },
      });

      return NextResponse.json({
        success: true,
        skipped: true,
        disabled_by: gate.source,
      });
    }

    // 讀取爬蟲產出的 JSON（由 Python 爬蟲寫入）
    // 在 Vercel 環境中，這些數據會通過 API 上傳或直接從爬蟲寫入 DB
    // 本地開發時，從 data/lcsd/programmes.json 讀取
    let programmes: LcsdProgrammeInput[] = [];

    // 嘗試從請求 body 獲取數據（API 上傳模式）
    try {
      const body = await request.json();
      if (Array.isArray(body.programmes)) {
        programmes = body.programmes;
      }
    } catch {
      // 無 body，嘗試從文件讀取（本地開發模式）
      try {
        const fs = await import("fs");
        const path = await import("path");
        const filePath = path.join(process.cwd(), "data", "lcsd", "programmes.json");
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, "utf-8");
          programmes = JSON.parse(raw);
        }
      } catch {
        // 文件不存在也正常
      }
    }

    if (programmes.length === 0) {
      await completeCronRunLog(supabase, runId, {
        status: "success",
        processed_count: 0,
        sent_count: 0,
        failed_count: 0,
        reminders_created: 0,
        status_updated: 0,
      });

      return NextResponse.json({
        success: true,
        message: "No programmes to sync",
        upserted: 0,
      });
    }

    let upsertedCount = 0;
    let errorCount = 0;
    const needsNotify: string[] = [];

    for (const prog of programmes) {
      try {
        // 檢查是否已存在
        const { data: existing } = await supabase
          .from("lcsd_programmes")
          .select("id, enrolment_open_at")
          .eq("lcsd_programme_id", prog.lcsd_programme_id)
          .maybeSingle();

        const existingProgramme = existing as {
          id: string;
          enrolment_open_at: string | null;
        } | null;

        const programmePayload: Database["public"]["Tables"]["lcsd_programmes"]["Insert"] = {
          lcsd_programme_id: prog.lcsd_programme_id,
          name_zh: prog.name_zh,
          name_en: prog.name_en,
          category: prog.category,
          age_min: prog.age_min,
          age_max: prog.age_max,
          venue: prog.venue,
          district: prog.district,
          fee_hkd: prog.fee_hkd,
          sessions_count: prog.sessions_count,
          start_date: prog.start_date,
          end_date: prog.end_date,
          enrolment_open_at: prog.enrolment_open_at ?? existingProgramme?.enrolment_open_at ?? null,
          enrolment_close_at: prog.enrolment_close_at ?? null,
          raw_url: prog.raw_url,
          is_active: true,
          last_scraped_at: new Date().toISOString(),
        };

        if (existingProgramme) {
          // 檢測開放日期變動 → 標記需要通知
          if (
            prog.enrolment_open_at &&
            prog.enrolment_open_at !== existingProgramme.enrolment_open_at
          ) {
            needsNotify.push(existingProgramme.id);
          }
        }

        await supabase
          .from("lcsd_programmes")
          .upsert(programmePayload as never, { onConflict: "lcsd_programme_id" });

        upsertedCount++;
      } catch (err) {
        errorCount++;
        console.error(`Failed to upsert programme ${prog.lcsd_programme_id}:`, err);
      }
    }

    // 標記不在本次爬取中的課程為不活躍
    const activeIds = programmes.map((p) => p.lcsd_programme_id);
    if (activeIds.length > 0) {
      // 只停用超過 7 天未更新的課程
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      await supabase
        .from("lcsd_programmes")
        .update({ is_active: false } as never)
        .lt("last_scraped_at", sevenDaysAgo.toISOString())
        .eq("is_active", true);
    }

    // 如果有開放日期變動，通知訂閱者（異步，不阻塞響應）
    if (needsNotify.length > 0) {
      console.log(
        `[LCSD Sync] ${needsNotify.length} programmes have enrolment date changes`,
      );
    }

    await completeCronRunLog(supabase, runId, {
      status: errorCount > 0 ? "failed" : "success",
      processed_count: programmes.length,
      failed_count: errorCount,
      metadata: {
        upserted: upsertedCount,
        needs_notify: needsNotify.length,
      },
    });

    emitSmartPlayThresholdAlert(JOB_NAME, errorCount, {
      total_input: programmes.length,
      upserted: upsertedCount,
    });

    return NextResponse.json({
      success: true,
      upserted: upsertedCount,
      errors: errorCount,
      needs_notify: needsNotify.length,
      total_input: programmes.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cron job failed";
    console.error("Cron /api/cron/lcsd-programmes error:", err);

    await completeCronRunLog(supabase, runId, {
      status: "failed",
      error_message: message,
    });

    emitSmartPlayThresholdAlert(JOB_NAME, 1, { error: message });

    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Cron job failed" } },
      { status: 500 },
    );
  }
}

// ── Input Type ──

interface LcsdProgrammeInput {
  lcsd_programme_id: string;
  name_zh?: string;
  name_en?: string;
  category?: ProgrammeCategory;
  age_min?: number;
  age_max?: number;
  venue?: string;
  district?: District;
  fee_hkd?: number;
  sessions_count?: number;
  start_date?: string;
  end_date?: string;
  enrolment_open_at?: string;
  enrolment_close_at?: string;
  raw_url?: string;
}
