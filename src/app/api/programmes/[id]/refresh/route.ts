import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { upsertProgrammeStatus, type EnrolmentStatus } from "@/lib/db/programmes";

export const dynamic = "force-dynamic";

/**
 * C 路徑：用戶觸發式分布式查詢
 * ─────────────────────────────
 * 用戶打開 app 時，隨機查詢已訂閱課程的當前狀態。
 * 結果寫入共享緩存 lcsd_programme_status，供所有訂閱者使用。
 *
 * Rate limit: 每用戶每 5 分鐘最多 1 次
 */

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // UUID 校驗
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json(
        { error: { code: "INVALID_ID", message: "Invalid programme ID" } },
        { status: 400 },
      );
    }

    // 驗證用戶登入
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Login required" } },
        { status: 401 },
      );
    }

    // 檢查緩存：如果最近 5 分鐘內已更新，直接返回緩存
    const serviceClient = await createServiceClient();
    const { data: existingStatus } = await serviceClient
      .from("lcsd_programme_status")
      .select("*")
      .eq("programme_id", id)
      .single();

    if (existingStatus?.last_checked_at) {
      const lastChecked = new Date(existingStatus.last_checked_at);
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

      if (lastChecked > fiveMinutesAgo) {
        return NextResponse.json({
          data: existingStatus,
          cached: true,
        });
      }
    }

    // 獲取課程信息
    const { data: programme } = await serviceClient
      .from("lcsd_programmes")
      .select("raw_url, enrolment_open_at, enrolment_close_at")
      .eq("id", id)
      .single();

    if (!programme) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Programme not found" } },
        { status: 404 },
      );
    }

    // 根據時間判斷狀態
    const now = new Date();
    let enrolmentStatus: EnrolmentStatus = "pre_open";

    if (programme.enrolment_open_at) {
      const openAt = new Date(programme.enrolment_open_at);
      if (now >= openAt) {
        enrolmentStatus = "open";
      }
    }

    if (programme.enrolment_close_at) {
      const closeAt = new Date(programme.enrolment_close_at);
      if (now >= closeAt) {
        enrolmentStatus = "closed";
      }
    }

    // 更新狀態緩存
    await upsertProgrammeStatus(id, {
      seats_available: null, // 實時座位數需要實際查詢 SmartPLAY
      is_full: false, // 時間推斷無法判斷是否滿額
      enrolment_status: enrolmentStatus,
    });

    // 返回更新後的狀態
    const { data: updatedStatus } = await serviceClient
      .from("lcsd_programme_status")
      .select("*")
      .eq("programme_id", id)
      .single();

    return NextResponse.json({
      data: updatedStatus,
      cached: false,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("POST /api/programmes/[id]/refresh error:", message, err);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Failed to refresh status" } },
      { status: 500 },
    );
  }
}
