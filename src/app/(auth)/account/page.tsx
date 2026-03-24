"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReminderSheet } from "@/components/schools/ReminderSheet";
import { FavoriteCard } from "@/components/schools/FavoriteCard";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { MAX_FAVORITES } from "@/lib/utils";

interface FavoriteItem {
  id: string;
  school_id: string;
  reminder_enabled: boolean;
  reminder_days_before: number[];
  schools: { id: string; name_tc: string; name_en: string | null; district: string; website: string | null; };
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [unfavoriteTarget, setUnfavoriteTarget] = useState<string | null>(null);
  const [reminderTarget, setReminderTarget] = useState<FavoriteItem | null>(null);

  useEffect(() => {
    if (!loading && !user) { showToast({ message: "请先登录" }); router.push("/"); return; }
    if (user) { fetchFavorites(); }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      const json = await res.json();
      if (json.data) setFavorites(json.data);
    } catch { showToast({ message: "加载收藏失败" }); }
    finally { setLoadingFavs(false); }
  };

  const handleUnfavorite = async () => {
    if (!unfavoriteTarget) return;
    setFavorites((prev) => prev.filter((f) => f.school_id !== unfavoriteTarget));
    try {
      await fetch(`/api/favorites/${unfavoriteTarget}`, { method: "DELETE" });
      showToast({ message: "已取消收藏" });
    } catch { fetchFavorites(); showToast({ message: "操作失败" }); }
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
      await fetch(`/api/favorites/${schoolId}/reminder`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminder_enabled: enabled, reminder_days_before: days }),
      });
      showToast({ message: enabled ? "提醒已开启" : "提醒已关闭" });
    } catch { fetchFavorites(); }
  };

  if (loading) return <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center"><p className="text-body text-slate-400">加载中…</p></div>;
  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-8">
      <h1 className="text-h1 text-slate-950 mb-6">我的账号</h1>

      <GlassCard className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body font-semibold text-slate-900">{user.user_metadata?.full_name ?? user.email}</p>
            <p className="text-small text-slate-400">{user.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>退出登录</Button>
        </div>
      </GlassCard>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-label text-slate-400 uppercase">收藏学校 ({favorites.length}/{MAX_FAVORITES})</h2>
        {favorites.length >= MAX_FAVORITES && <span className="text-small text-orange-600 font-medium">已达上限</span>}
      </div>

      {loadingFavs ? (
        <p className="text-body text-slate-400 text-center py-8">加载中…</p>
      ) : favorites.length === 0 ? (
        <GlassCard>
          <p className="text-body text-slate-400 text-center mb-4">还没有收藏学校</p>
          <div className="text-center">
            <Button variant="secondary" size="sm" onClick={() => router.push("/kg")}>浏览学校</Button>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} schoolId={fav.school_id} nameTc={fav.schools.name_tc}
              district={fav.schools.district} reminderEnabled={fav.reminder_enabled}
              onNavigate={() => router.push(`/kg/${fav.school_id}`)}
              onToggleReminder={() => handleReminderToggle(fav)}
              onUnfavorite={() => setUnfavoriteTarget(fav.school_id)} />
          ))}
        </div>
      )}

      <ConfirmDialog isOpen={unfavoriteTarget !== null} onClose={() => setUnfavoriteTarget(null)}
        onConfirm={handleUnfavorite} title="取消收藏"
        message="取消收藏后，已设置的截止提醒也将被删除。确定要取消吗？"
        confirmLabel="取消收藏" cancelLabel="保留" variant="danger" />

      <ReminderSheet isOpen={reminderTarget !== null} onClose={() => setReminderTarget(null)}
        onConfirm={(days) => { if (reminderTarget) updateReminder(reminderTarget.school_id, true, days); }}
        schoolName={reminderTarget?.schools.name_tc} />
    </div>
  );
}
