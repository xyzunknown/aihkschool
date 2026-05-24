"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CaretRight, Clock, MapPin } from "@phosphor-icons/react";
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
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center">
        <p className="text-base text-ink-500">載入中…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <section className="mb-7 rounded-[24px] border border-surface-border bg-white p-6 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-forest-50 text-forest-700">
              <Bell aria-hidden="true" size={25} weight="regular" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink-900">開報前追蹤</h1>
              <p className="mt-1 text-sm leading-6 text-ink-500">
                你已追蹤的 SmartPLAY 課程，系統會在報名開放前提醒你。
              </p>
            </div>
          </div>
        </section>

        {loadingSubs ? (
          <p className="text-base text-ink-500 text-center py-8">載入中…</p>
        ) : subscriptions.length === 0 ? (
          <div className="bg-white rounded-card border border-surface-border p-8 text-center">
            <p className="text-base text-ink-700 mb-6">
              你仲未追蹤任何課程，去睇下有咩啱？
            </p>
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
                  className="bg-white rounded-[20px] border border-surface-border p-5 flex items-center justify-between gap-4 shadow-soft"
                >
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => router.push(`/programmes/${prog.id}`)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center rounded-full bg-cream-100 px-2.5 py-0.5 text-xs font-medium text-ink-700">
                        {catLabel}
                      </span>
                      <span className="text-xs text-ink-500">
                        {fee.isFree ? "免費" : fee.label}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-ink-900 truncate">
                      {prog.name_zh || prog.name_en || "未知課程"}
                    </h3>
                    <p className="text-sm text-ink-500 truncate">
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden="true" size={14} weight="regular" className="text-forest-600" />
                        {prog.venue || "場地待定"}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden="true" size={14} weight="regular" className="text-forest-600" />
                        報名：{enrolment}
                      </span>
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-forest-700">
                      查看詳情
                      <CaretRight aria-hidden="true" size={12} weight="bold" />
                    </span>
                  </div>

                  <button
                    onClick={() => setUnsubTarget(sub.programme_id)}
                    className="flex-shrink-0 rounded-button border border-surface-border px-3 py-1.5 text-xs text-ink-500 hover:bg-cream-50 transition-colors"
                  >
                    取消
                  </button>
                </div>
              );
            })}
          </div>
        )}

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
    </div>
  );
}
