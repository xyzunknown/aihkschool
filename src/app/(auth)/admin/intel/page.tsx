"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";
import { Button } from "@/components/ui/Button";

interface PendingIntel {
  id: string;
  school_id: string;
  user_id: string;
  academic_year: string;
  grade_applied: string;
  interview_type: string;
  interview_language: string | null;
  queue_time: string | null;
  has_second_interview: boolean | null;
  offer_month: string | null;
  application_result: string;
  fee_registration_hkd: number | null;
  fee_interview_hkd: number | null;
  notes: string | null;
  status: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  schools: { name_tc: string; district: string } | null;
}

export default function AdminIntelPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<PendingIntel[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  // Redirect non-logged-in users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const fetchPending = async () => {
    setLoadingItems(true);
    try {
      const res = await fetch("/api/admin/intel?status=pending");
      if (res.status === 403 || res.status === 401) {
        setForbidden(true);
        setItems([]);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setItems(data.data ?? []);
      }
    } catch {
      // ignore
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPending();
    }
  }, [user]);

  useEffect(() => {
    if (forbidden) {
      const t = setTimeout(() => router.push("/"), 1500);
      return () => clearTimeout(t);
    }
  }, [forbidden, router]);

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/intel/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } finally {
      setActionId(null);
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

  if (forbidden) {
    return (
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center">
        <p className="text-base text-slate-400">無權訪問，正在跳轉…</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-950 mb-2">面試情報審核</h1>
      <p className="text-sm text-slate-500 mb-8">
        待審核投稿：{items.length} 條
      </p>

      {loadingItems ? (
        <p className="text-sm text-slate-500">載入中…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">暫無待審核投稿</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-950">
                    {item.schools?.name_tc ?? "未知學校"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.schools?.district} · {item.academic_year} · {item.grade_applied}
                  </p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(item.created_at).toLocaleDateString("zh-HK")}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400">面試形式</span>
                  <p className="text-slate-700">{item.interview_type}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">面試語言</span>
                  <p className="text-slate-700">{item.interview_language ?? "—"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">輪候時間</span>
                  <p className="text-slate-700">{item.queue_time ?? "—"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">結果</span>
                  <p className="text-slate-700">{item.application_result}</p>
                </div>
                {item.fee_registration_hkd !== null && (
                  <div>
                    <span className="text-xs text-slate-400">註冊費</span>
                    <p className="text-slate-700">${item.fee_registration_hkd}</p>
                  </div>
                )}
                {item.fee_interview_hkd !== null && (
                  <div>
                    <span className="text-xs text-slate-400">面試費</span>
                    <p className="text-slate-700">${item.fee_interview_hkd}</p>
                  </div>
                )}
                {item.has_second_interview !== null && (
                  <div>
                    <span className="text-xs text-slate-400">二輪面試</span>
                    <p className="text-slate-700">{item.has_second_interview ? "有" : "無"}</p>
                  </div>
                )}
                {item.offer_month && (
                  <div>
                    <span className="text-xs text-slate-400">收錄月份</span>
                    <p className="text-slate-700">{item.offer_month}</p>
                  </div>
                )}
              </div>

              {item.notes && (
                <div className="rounded-xl bg-slate-50 p-3 mb-4">
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {item.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={actionId === item.id}
                  onClick={() => handleAction(item.id, "approved")}
                >
                  通過
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={actionId === item.id}
                  onClick={() => handleAction(item.id, "rejected")}
                >
                  拒絕
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
