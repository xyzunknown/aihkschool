"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, CalendarBlank, CaretRight, Clock, MapPin, Trash } from "@phosphor-icons/react";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  PROGRAMME_CATEGORY_LABELS,
  formatProgrammeFee,
  formatEnrolmentTime,
} from "@/lib/programmes/labels";

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const json = await response.json();
    return json?.error?.message || fallback;
  } catch {
    return fallback;
  }
}

interface SubscriptionItem {
  id: string;
  programme_id: string;
  notify_before_open_minutes: number;
  is_active: boolean;
  lcsd_programmes: {
    id: string;
    name_zh: string | null;
    name_en: string | null;
    category: string | null;
    venue: string | null;
    district: string | null;
    fee_hkd: number | null;
    enrolment_open_at: string | null;
    start_date: string | null;
    raw_url: string | null;
  };
}

export default function AlertsPage() {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [unsubTarget, setUnsubTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      showToast({ message: "請先登入" });
      router.push("/login");
      return;
    }
    if (user) fetchSubscriptions();
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextOpening = useMemo(() => {
    return subscriptions
      .map((sub) => sub.lcsd_programmes)
      .filter((programme) => programme.enrolment_open_at)
      .sort((a, b) => new Date(a.enrolment_open_at!).getTime() - new Date(b.enrolment_open_at!).getTime())[0];
  }, [subscriptions]);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch("/api/programme-subscriptions");
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "載入追蹤失敗"));
      }
      const json = await res.json();
      if (json.data) setSubscriptions(json.data);
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "載入追蹤失敗" });
    } finally {
      setLoadingSubs(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!unsubTarget) return;
    setSubscriptions((prev) => prev.filter((s) => s.programme_id !== unsubTarget));
    try {
      const res = await fetch(`/api/programme-subscriptions?programme_id=${unsubTarget}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "取消追蹤失敗"));
      }
      showToast({ message: "已取消追蹤" });
    } catch (error: unknown) {
      fetchSubscriptions();
      showToast({ message: error instanceof Error ? error.message : "取消追蹤失敗" });
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <p className="text-base text-ink-500">載入中...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-10">
      <button onClick={() => router.push("/account")} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
        <ArrowLeft aria-hidden="true" size={17} weight="bold" />
        返回我的
      </button>

      <section className="rounded-[24px] border border-surface-border bg-white p-6 shadow-soft md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-forest-50 text-forest-700">
              <Bell aria-hidden="true" size={25} weight="regular" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-ink-900 md:text-3xl">SmartPLAY 追蹤</h1>
              <p className="mt-2 text-sm leading-6 text-ink-600">開放報名前提醒，方便你集中管理已追蹤課程。</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/programmes")}
            className="inline-flex h-11 items-center justify-center rounded-pill bg-forest-600 px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-forest-700"
          >
            找課程
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink-900">追蹤概覽</h2>
          <span className="rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold text-ink-700">{subscriptions.length}/20</span>
        </div>
        <div className="rounded-card bg-cream-50 p-4">
          {nextOpening ? (
            <div>
              <p className="text-sm font-semibold text-ink-900">下一個開報</p>
              <p className="mt-1 text-sm text-ink-600">{nextOpening.name_zh || nextOpening.name_en || "未知課程"}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-forest-700">
                <CalendarBlank aria-hidden="true" size={16} weight="regular" />
                {formatEnrolmentTime(nextOpening.enrolment_open_at)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-ink-600">暫時沒有即將開報的追蹤課程。</p>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
        {loadingSubs ? (
          <p className="py-8 text-center text-base text-ink-500">載入中...</p>
        ) : subscriptions.length === 0 ? (
          <div className="rounded-card border border-dashed border-surface-border bg-cream-50 p-8 text-center">
            <Bell aria-hidden="true" size={32} weight="regular" className="mx-auto mb-3 text-forest-700" />
            <p className="mb-5 text-base font-semibold text-ink-900">你未追蹤任何課程</p>
            <button
              onClick={() => router.push("/programmes")}
              className="rounded-pill bg-forest-700 px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-forest-800"
            >
              開始追蹤
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((sub) => {
              const prog = sub.lcsd_programmes;
              const fee = formatProgrammeFee(prog.fee_hkd);
              const enrolment = formatEnrolmentTime(prog.enrolment_open_at);
              const catLabel =
                PROGRAMME_CATEGORY_LABELS[
                  (prog.category as keyof typeof PROGRAMME_CATEGORY_LABELS) || "other"
                ] || "其他";

              return (
                <div
                  key={sub.id}
                  className="flex items-center justify-between gap-4 rounded-[18px] border border-surface-border bg-white p-4 transition hover:bg-cream-50"
                >
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => router.push(`/programmes/${prog.id}`)}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-cream-100 px-2.5 py-0.5 text-xs font-medium text-ink-700">
                        {catLabel}
                      </span>
                      <span className="text-xs text-ink-500">
                        {fee.isFree ? "免費" : fee.label}
                      </span>
                    </div>
                    <h3 className="truncate text-base font-semibold text-ink-900">
                      {prog.name_zh || prog.name_en || "未知課程"}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden="true" size={14} weight="regular" className="text-forest-600" />
                        {prog.venue || "場地待定"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden="true" size={14} weight="regular" className="text-forest-600" />
                        {enrolment}
                      </span>
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-forest-700">
                      查看詳情
                      <CaretRight aria-hidden="true" size={12} weight="bold" />
                    </span>
                  </button>

                  <button
                    onClick={() => setUnsubTarget(sub.programme_id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-cream-100 hover:text-rust-600"
                    aria-label="取消追蹤"
                  >
                    <Trash aria-hidden="true" size={18} weight="regular" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={unsubTarget !== null}
        onClose={() => setUnsubTarget(null)}
        onConfirm={handleUnsubscribe}
        title="取消追蹤"
        message="確定取消追蹤？你將不再收到此課程嘅開報前提醒。"
        confirmLabel="取消追蹤"
        cancelLabel="保留"
        variant="danger"
      />
    </div>
  );
}
