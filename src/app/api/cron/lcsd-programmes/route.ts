import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

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
  try {
    // 驗證 cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Invalid cron secret" } },
        { status: 403 },
      );
    }

    const supabase = await createServiceClient();

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
          .single();

        if (existing) {
          // 更新現有記錄
          const updates: Record<string, unknown> = {
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
            raw_url: prog.raw_url,
            is_active: true,
            last_scraped_at: new Date().toISOString(),
          };

          // 檢測開放日期變動 → 標記需要通知
          if (
            prog.enrolment_open_at &&
            prog.enrolment_open_at !== existing.enrolment_open_at
          ) {
            updates.enrolment_open_at = prog.enrolment_open_at;
            needsNotify.push(existing.id);
          }
          if (prog.enrolment_close_at) {
            updates.enrolment_close_at = prog.enrolment_close_at;
          }

          await supabase
            .from("lcsd_programmes")
            .update(updates)
            .eq("id", existing.id);
        } else {
          // 插入新記錄
          await supabase.from("lcsd_programmes").insert({
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
            enrolment_open_at: prog.enrolment_open_at,
            enrolment_close_at: prog.enrolment_close_at,
            raw_url: prog.raw_url,
            is_active: true,
            last_scraped_at: new Date().toISOString(),
          });
        }

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
        .update({ is_active: false })
        .lt("last_scraped_at", sevenDaysAgo.toISOString())
        .eq("is_active", true);
    }

    // 如果有開放日期變動，通知訂閱者（異步，不阻塞響應）
    if (needsNotify.length > 0) {
      console.log(
        `[LCSD Sync] ${needsNotify.length} programmes have enrolment date changes`,
      );
    }

    return NextResponse.json({
      success: true,
      upserted: upsertedCount,
      errors: errorCount,
      needs_notify: needsNotify.length,
      total_input: programmes.length,
    });
  } catch (err) {
    console.error("Cron /api/cron/lcsd-programmes error:", err);
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
  category?: string;
  age_min?: number;
  age_max?: number;
  venue?: string;
  district?: string;
  fee_hkd?: number;
  sessions_count?: number;
  start_date?: string;
  end_date?: string;
  enrolment_open_at?: string;
  enrolment_close_at?: string;
  raw_url?: string;
}
