"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  PROGRAMME_CATEGORY_LABELS,
  formatProgrammeFee,
  formatEnrolmentTime,
} from "@/lib/programmes/labels";

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
      router.push("/");
      return;
    }
    if (user) fetchSubscriptions();
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch("/api/programme-subscriptions");
      const json = await res.json();
      if (json.data) setSubscriptions(json.data);
    } catch {
      showToast({ message: "載入訂閱失敗" });
    } finally {
      setLoadingSubs(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!unsubTarget) return;
    setSubscriptions((prev) => prev.filter((s) => s.programme_id !== unsubTarget));
    try {
      await fetch(`/api/programme-subscriptions?programme_id=${unsubTarget}`, {
        method: "DELETE",
      });
      showToast({ message: "已取消訂閱" });
    } catch {
      fetchSubscriptions();
      showToast({ message: "取消訂閱失敗" });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center">
        <p className="text-base text-slate-400">載入中…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-950 mb-2">課程提醒</h1>
        <p className="text-sm text-slate-500 mb-6">
          你訂閱嘅 SmartPLAY 課程，系統會在報名開放前發送郵件提醒。
        </p>

        {loadingSubs ? (
          <p className="text-base text-slate-500 text-center py-8">載入中…</p>
        ) : subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-base text-slate-600 mb-6">
              未有訂閱課程，去睇下有咩啱？
            </p>
            <button
              onClick={() => router.push("/programmes")}
              className="bg-slate-950 text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              瀏覽課程
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
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between gap-4"
                >
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => router.push(`/programmes/${prog.id}`)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {catLabel}
                      </span>
                      <span className="text-xs text-slate-400">
                        {fee.isFree ? "免費" : fee.label}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 truncate">
                      {prog.name_zh || prog.name_en || "未知課程"}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {prog.venue || ""} · 報名：{enrolment}
                    </p>
                  </div>

                  <button
                    onClick={() => setUnsubTarget(sub.programme_id)}
                    className="flex-shrink-0 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 transition-colors"
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
          title="取消訂閱"
          message="確定取消訂閱？你將不再收到此課程嘅報名提醒。"
          confirmLabel="取消訂閱"
          cancelLabel="保留"
          variant="danger"
        />
      </div>
    </div>
  );
}
