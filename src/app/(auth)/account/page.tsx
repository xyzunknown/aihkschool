"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { DISTRICT_LABELS } from "@/lib/utils";

interface FavoriteItem {
  id: string;
  school_id: string;
  reminder_enabled: boolean;
  reminder_days_before: number[];
  schools: {
    id: string;
    name_tc: string;
    name_en: string | null;
    district: string;
    website: string | null;
  };
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      showToast({ message: "请先登录" });
      router.push("/");
      return;
    }

    if (user) {
      fetchFavorites();
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      const json = await res.json();
      if (json.data) {
        setFavorites(json.data);
      }
    } catch {
      showToast({ message: "加载收藏失败" });
    } finally {
      setLoadingFavorites(false);
    }
  };

  const handleUnfavorite = async (schoolId: string) => {
    setFavorites((prev) => prev.filter((f) => f.school_id !== schoolId));
    try {
      await fetch(`/api/favorites/${schoolId}`, { method: "DELETE" });
      showToast({ message: "已取消收藏" });
    } catch {
      fetchFavorites(); // Revert
      showToast({ message: "操作失败" });
    }
  };

  const toggleReminder = async (schoolId: string, currentEnabled: boolean, currentDays: number[]) => {
    const newEnabled = !currentEnabled;
    const days = newEnabled ? [7, 3, 1] : currentDays;

    // Optimistic
    setFavorites((prev) =>
      prev.map((f) =>
        f.school_id === schoolId
          ? { ...f, reminder_enabled: newEnabled, reminder_days_before: days }
          : f
      )
    );

    try {
      await fetch(`/api/favorites/${schoolId}/reminder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminder_enabled: newEnabled, reminder_days_before: days }),
      });
      showToast({ message: newEnabled ? "提醒已开启" : "提醒已关闭" });
    } catch {
      fetchFavorites(); // Revert
    }
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
        <p className="text-body text-slate-400">加载中…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-8">
      <h1 className="text-h1 text-slate-950 mb-6">我的账号</h1>

      {/* User info */}
      <GlassCard className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body font-semibold text-slate-900">{user.user_metadata?.full_name ?? user.email}</p>
            <p className="text-small text-slate-400">{user.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            退出登录
          </Button>
        </div>
      </GlassCard>

      {/* Favorites */}
      <h2 className="text-label text-slate-400 uppercase mb-4">
        收藏学校 ({favorites.length}/10)
      </h2>

      {loadingFavorites ? (
        <p className="text-body text-slate-400 text-center py-8">加载中…</p>
      ) : favorites.length === 0 ? (
        <GlassCard>
          <p className="text-body text-slate-400 text-center mb-4">还没有收藏学校</p>
          <div className="text-center">
            <Button variant="secondary" size="sm" onClick={() => router.push("/kg")}>
              浏览学校
            </Button>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {favorites.map((fav) => (
            <GlassCard key={fav.id}>
              <div className="flex justify-between items-start">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => router.push(`/kg/${fav.school_id}`)}
                >
                  <p className="text-small text-slate-400">
                    {DISTRICT_LABELS[fav.schools.district as keyof typeof DISTRICT_LABELS]}
                  </p>
                  <p className="text-body font-semibold text-slate-900 mt-0.5">
                    {fav.schools.name_tc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-200/20">
                <button
                  onClick={() => toggleReminder(fav.school_id, fav.reminder_enabled, fav.reminder_days_before)}
                  className={`text-xs font-medium flex items-center gap-1 ${
                    fav.reminder_enabled ? "text-green-700" : "text-slate-400"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {fav.reminder_enabled ? "提醒已开启" : "开启提醒"}
                </button>
                <button
                  onClick={() => handleUnfavorite(fav.school_id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  取消收藏
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
