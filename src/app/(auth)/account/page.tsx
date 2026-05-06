"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReminderSheet } from "@/components/schools/ReminderSheet";
import { FavoriteCard } from "@/components/schools/FavoriteCard";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { MAX_FAVORITES } from "@/lib/utils";
import { formatEnrolmentTime } from "@/lib/programmes/labels";

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const json = await response.json();
    return json?.error?.message || fallback;
  } catch {
    return fallback;
  }
}

interface FavoriteItem {
  id: string;
  school_id: string;
  reminder_enabled: boolean;
  reminder_days_before: number[];
  schools: { id: string; name_tc: string; name_en: string | null; district: string; website: string | null; };
}

interface ProgrammeSubscriptionItem {
  id: string;
  programme_id: string;
  lcsd_programmes: {
    id: string;
    name_zh: string | null;
    name_en: string | null;
    venue: string | null;
    enrolment_open_at: string | null;
  };
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [programmeSubscriptions, setProgrammeSubscriptions] = useState<ProgrammeSubscriptionItem[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [loadingProgrammeSubs, setLoadingProgrammeSubs] = useState(true);
  const [unfavoriteTarget, setUnfavoriteTarget] = useState<string | null>(null);
  const [reminderTarget, setReminderTarget] = useState<FavoriteItem | null>(null);

  useEffect(() => {
    if (!loading && !user) { showToast({ message: "請先登入" }); router.push("/"); return; }
    if (user) {
      void fetchFavorites();
      void fetchProgrammeSubscriptions();
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites?include=schools");
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "載入收藏失敗"));
      }
      const json = await res.json();
      if (json.data) setFavorites(json.data);
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "載入收藏失敗" });
    }
    finally { setLoadingFavs(false); }
  };

  const fetchProgrammeSubscriptions = async () => {
    try {
      const res = await fetch("/api/programme-subscriptions");
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "載入開報前追蹤失敗"));
      }
      const json = await res.json();
      if (json.data) setProgrammeSubscriptions(json.data);
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "載入開報前追蹤失敗" });
    } finally {
      setLoadingProgrammeSubs(false);
    }
  };

  const handleUnfavorite = async () => {
    if (!unfavoriteTarget) return;
    setFavorites((prev) => prev.filter((f) => f.school_id !== unfavoriteTarget));
    try {
      const res = await fetch(`/api/favorites/${unfavoriteTarget}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "已取消收藏失敗"));
      }
      showToast({ message: "已取消收藏" });
    } catch (error: unknown) {
      fetchFavorites();
      showToast({ message: error instanceof Error ? error.message : "已取消收藏失敗" });
    }
  };

  const handleReminderToggle = (fav: FavoriteItem) => {
    if (fav.reminder_enabled) {
      updateReminder(fav.school_id, false, fav.reminder_days_before);
    } else {
      setReminderTarget(fav);
    }
  };

  const updateReminder = async (schoolId: string, enabled: boolean, days: number[]) => {
    setFavorites((prev) =>
      prev.map((f) => f.school_id === schoolId ? { ...f, reminder_enabled: enabled, reminder_days_before: days } : f)
    );
    try {
      const res = await fetch(`/api/favorites/${schoolId}/reminder`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminder_enabled: enabled, reminder_days_before: days }),
      });
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "設定提醒失敗"));
      }
      showToast({ message: enabled ? "提醒已開啟" : "提醒已關閉" });
    } catch (error: unknown) {
      fetchFavorites();
      showToast({ message: error instanceof Error ? error.message : "設定提醒失敗" });
    }
  };

  if (loading) return <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center"><p className="text-base text-slate-400">載入中…</p></div>;
  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-950 mb-6">你好，{user.user_metadata?.full_name ?? user.email?.split("@")[0]}</h1>

        {/* User card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-slate-950">{user.user_metadata?.full_name ?? user.email}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={signOut}>登出</Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">開報前追蹤</h2>
              <p className="text-sm text-slate-500 mt-1">
                全局管理你追蹤中的 SmartPLAY 課程，不用再回列表逐個找。
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => router.push("/account/alerts")}>管理追蹤</Button>
          </div>

          {loadingProgrammeSubs ? (
            <p className="text-sm text-slate-500">載入中…</p>
          ) : programmeSubscriptions.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-5">
              <p className="text-sm text-slate-600 mb-4">你仲未追蹤任何 SmartPLAY 課程。</p>
              <Button variant="primary" size="sm" onClick={() => router.push("/programmes")}>去追蹤課程</Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-500 mb-4">共 {programmeSubscriptions.length} 個課程追蹤</p>
              <div className="space-y-3">
                {programmeSubscriptions.slice(0, 3).map((subscription) => {
                  const programme = subscription.lcsd_programmes;
                  return (
                    <button
                      key={subscription.id}
                      onClick={() => router.push(`/programmes/${programme.id}`)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                    >
                      <p className="text-sm font-semibold text-slate-950">
                        {programme.name_zh || programme.name_en || "未知課程"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {programme.venue || "場地待定"} · 報名：{formatEnrolmentTime(programme.enrolment_open_at)}
                      </p>
                    </button>
                  );
                })}
              </div>
              {programmeSubscriptions.length > 3 && (
                <button
                  onClick={() => router.push("/account/alerts")}
                  className="mt-4 text-sm font-medium text-slate-700 underline underline-offset-4"
                >
                  查看全部追蹤
                </button>
              )}
            </div>
          )}
        </div>

        {/* Favorites section */}
        <div id="favorites" className="flex items-center justify-between mb-6 scroll-mt-24">
          <h2 className="text-lg font-semibold text-slate-950">收藏中的學校 ({favorites.length}/{MAX_FAVORITES})</h2>
          {favorites.length >= MAX_FAVORITES && <span className="text-sm text-orange-600 font-medium">已達上限</span>}
        </div>

        {loadingFavs ? (
          <p className="text-base text-slate-500 text-center py-8">載入中…</p>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-base text-slate-600 mb-6">未有收藏學校，去搵學校睇下？</p>
            <Button variant="primary" onClick={() => router.push("/kg")}>瀏覽學校</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => (
              <FavoriteCard key={fav.id} schoolId={fav.school_id} nameTc={fav.schools.name_tc}
                nameEn={fav.schools.name_en ?? fav.schools.name_tc}
                district={fav.schools.district} reminderEnabled={fav.reminder_enabled}
                onNavigate={() => router.push(`/kg/${fav.school_id}`)}
                onToggleReminder={() => handleReminderToggle(fav)}
                onUnfavorite={() => setUnfavoriteTarget(fav.school_id)} />
            ))}
          </div>
        )}

        <ConfirmDialog isOpen={unfavoriteTarget !== null} onClose={() => setUnfavoriteTarget(null)}
          onConfirm={handleUnfavorite} title="取消收藏"
          message="確定取消收藏？相關提醒將一併刪除。"
          confirmLabel="取消收藏" cancelLabel="保留" variant="danger" />

        <ReminderSheet isOpen={reminderTarget !== null} onClose={() => setReminderTarget(null)}
          onConfirm={(days) => { if (reminderTarget) updateReminder(reminderTarget.school_id, true, days); }}
          schoolName={reminderTarget?.schools.name_tc} />
      </div>
    </div>
  );
}
