"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarBlank,
  CaretRight,
  GearSix,
  Heart,
  IdentificationCard,
  Lifebuoy,
  ListChecks,
  PencilSimple,
  SignOut,
  Sparkle,
  Student,
  UserCircle,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReminderSheet } from "@/components/schools/ReminderSheet";
import { FavoriteCard } from "@/components/schools/FavoriteCard";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { useCompare } from "@/lib/hooks/useCompare";
import { readSavedCalendarActivities } from "@/lib/account/calendar-storage";
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

function shortMemberId(id: string) {
  return `HKSP-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

function userDisplayName(user: NonNullable<ReturnType<typeof useAuth>["user"]>) {
  return user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split("@")[0] ?? "HKSchoolPlace 用戶";
}

function avatarUrl(user: NonNullable<ReturnType<typeof useAuth>["user"]>) {
  const value = user.user_metadata?.avatar_url;
  return typeof value === "string" && value ? value : null;
}

function AccountAvatar({ user, size = "lg" }: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; size?: "lg" | "sm" }) {
  const src = avatarUrl(user);
  const label = userDisplayName(user).charAt(0).toUpperCase();
  const className = size === "lg" ? "h-20 w-20" : "h-11 w-11";

  return (
    <div className={`${className} relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest-50 text-forest-700 ring-1 ring-forest-100`}>
      {src ? (
        <Image src={src} alt="" fill sizes={size === "lg" ? "80px" : "44px"} className="object-cover" />
      ) : (
        <span className={size === "lg" ? "text-2xl font-bold" : "text-base font-bold"}>{label}</span>
      )}
    </div>
  );
}

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function MetricButton({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: typeof Heart;
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[92px] items-center gap-3 rounded-card border border-surface-border bg-white px-4 py-3 text-left transition hover:border-forest-200 hover:bg-forest-50"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-forest-50 text-forest-700">
        <Icon aria-hidden="true" size={21} weight="regular" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink-500">{label}</span>
        <span className="mt-1 block text-base font-semibold text-ink-900">{value}</span>
      </span>
    </button>
  );
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const { compareCount, maxCompare, compareUrl } = useCompare();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [programmeSubscriptions, setProgrammeSubscriptions] = useState<ProgrammeSubscriptionItem[]>([]);
  const [savedActivityCount, setSavedActivityCount] = useState(0);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [unfavoriteTarget, setUnfavoriteTarget] = useState<string | null>(null);
  const [reminderTarget, setReminderTarget] = useState<FavoriteItem | null>(null);

  useEffect(() => {
    if (!loading && !user) { showToast({ message: "請先登入" }); router.push("/login"); return; }
    if (user) {
      void fetchFavorites();
      void fetchProgrammeSubscriptions();
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSavedActivityCount(readSavedCalendarActivities().length);
  }, []);

  const reminderEnabledCount = useMemo(
    () => favorites.filter((favorite) => favorite.reminder_enabled).length,
    [favorites],
  );

  const nextProgramme = useMemo(() => {
    return programmeSubscriptions
      .map((subscription) => subscription.lcsd_programmes)
      .filter((programme) => programme.enrolment_open_at)
      .sort((a, b) => new Date(a.enrolment_open_at!).getTime() - new Date(b.enrolment_open_at!).getTime())[0];
  }, [programmeSubscriptions]);

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
    }
  };

  const handleUnfavorite = async () => {
    if (!unfavoriteTarget) return;
    setFavorites((prev) => prev.filter((f) => f.school_id !== unfavoriteTarget));
    try {
      const res = await fetch(`/api/favorites/${unfavoriteTarget}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "取消收藏失敗"));
      }
      showToast({ message: "已取消收藏" });
    } catch (error: unknown) {
      fetchFavorites();
      showToast({ message: error instanceof Error ? error.message : "取消收藏失敗" });
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

  if (loading) return <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8"><p className="text-base text-ink-500">載入中...</p></div>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-[24px] border border-surface-border bg-white p-6 shadow-soft md:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <AccountAvatar user={user} />
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-ink-900 md:text-3xl">{userDisplayName(user)}</h1>
                  <p className="mt-1 truncate text-sm text-ink-500">{user.email}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold text-ink-700">
                    <IdentificationCard aria-hidden="true" size={15} weight="regular" />
                    {shortMemberId(user.id)}
                  </p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => router.push("/account/settings")}>
                <PencilSimple aria-hidden="true" size={18} weight="regular" />
                編輯資料
              </Button>
            </div>
          </section>

          <SectionCard
            title="我的日程"
            action={
              <button onClick={() => router.push("/account/calendar")} className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700">
                查看全部
                <CaretRight aria-hidden="true" size={14} weight="bold" />
              </button>
            }
          >
            <div className="rounded-card bg-cream-50 p-4">
              {nextProgramme ? (
                <button
                  type="button"
                  onClick={() => router.push("/account/calendar")}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">下一個 SmartPLAY 開報</span>
                    <span className="mt-1 block text-sm text-ink-600">
                      {nextProgramme.name_zh || nextProgramme.name_en || "未知課程"} · {formatEnrolmentTime(nextProgramme.enrolment_open_at)}
                    </span>
                  </span>
                  <CalendarBlank aria-hidden="true" size={22} weight="regular" className="text-forest-700" />
                </button>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">暫時沒有即將到期事項</p>
                    <p className="mt-1 text-sm text-ink-600">申請截止、SmartPLAY 開報和已加入的課外活動會集中在這裡。</p>
                  </div>
                  <CalendarBlank aria-hidden="true" size={22} weight="regular" className="text-forest-700" />
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="我的選校">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricButton icon={Heart} label="收藏學校" value={`${favorites.length}/${MAX_FAVORITES}`} onClick={() => document.getElementById("favorites")?.scrollIntoView({ behavior: "smooth" })} />
              <MetricButton icon={Bell} label="申請截止提醒" value={`${reminderEnabledCount} 間已開啟`} onClick={() => document.getElementById("favorites")?.scrollIntoView({ behavior: "smooth" })} />
              <MetricButton icon={ListChecks} label="學校比較" value={`${compareCount}/${maxCompare}`} onClick={() => router.push(compareUrl ?? "/kg")} />
              <MetricButton icon={Student} label="學校活動時間線" value="查看開放日與截止" onClick={() => router.push("/timeline")} />
            </div>
          </SectionCard>

          <SectionCard title="我的課程與活動">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricButton icon={Bell} label="SmartPLAY 追蹤" value={`${programmeSubscriptions.length}/20`} onClick={() => router.push("/account/alerts")} />
              <MetricButton icon={CalendarBlank} label="課外活動日曆" value={`${savedActivityCount} 個已加入`} onClick={() => router.push("/account/calendar?tab=activities")} />
            </div>
          </SectionCard>

          <section id="favorites" className="scroll-mt-24 rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-ink-900">
                <Heart aria-hidden="true" size={20} weight="regular" className="text-forest-700" />
                收藏學校
              </h2>
              {favorites.length >= MAX_FAVORITES ? <span className="text-sm font-medium text-orange-600">已達上限，先刪一所再加新收藏</span> : null}
            </div>

            {loadingFavs ? (
              <p className="py-8 text-center text-base text-ink-500">載入中...</p>
            ) : favorites.length === 0 ? (
              <div className="rounded-card border border-dashed border-surface-border bg-cream-50 p-8 text-center">
                <p className="mb-5 text-base text-ink-700">未有收藏學校</p>
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
          </section>
        </div>

        <aside className="space-y-6">
          <SectionCard title="偏好設定">
            <div className="space-y-2">
              <button onClick={() => router.push("/account/settings")} className="flex w-full items-center justify-between rounded-button px-3 py-3 text-left text-sm font-medium text-ink-800 hover:bg-forest-50">
                <span className="inline-flex items-center gap-2"><GearSix aria-hidden="true" size={18} className="text-forest-700" />帳戶資料</span>
                <CaretRight aria-hidden="true" size={14} />
              </button>
              <button onClick={() => router.push("/account/settings#preferences")} className="flex w-full items-center justify-between rounded-button px-3 py-3 text-left text-sm font-medium text-ink-800 hover:bg-forest-50">
                <span className="inline-flex items-center gap-2"><Sparkle aria-hidden="true" size={18} className="text-forest-700" />孩子年份與地區</span>
                <CaretRight aria-hidden="true" size={14} />
              </button>
            </div>
          </SectionCard>

          <SectionCard title="支援與帳戶">
            <div className="space-y-2">
              <button onClick={() => router.push("/contact")} className="flex w-full items-center justify-between rounded-button px-3 py-3 text-left text-sm font-medium text-ink-800 hover:bg-forest-50">
                <span className="inline-flex items-center gap-2"><Lifebuoy aria-hidden="true" size={18} className="text-forest-700" />聯絡我們</span>
                <CaretRight aria-hidden="true" size={14} />
              </button>
              <button onClick={() => router.push("/privacy")} className="flex w-full items-center justify-between rounded-button px-3 py-3 text-left text-sm font-medium text-ink-800 hover:bg-forest-50">
                <span className="inline-flex items-center gap-2"><UserCircle aria-hidden="true" size={18} className="text-forest-700" />私隱與條款</span>
                <CaretRight aria-hidden="true" size={14} />
              </button>
              <button
                type="button"
                onClick={signOut}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-button border border-surface-border px-4 py-3 text-sm font-semibold text-ink-600 hover:bg-cream-50"
              >
                <SignOut aria-hidden="true" size={18} />
                退出登入
              </button>
            </div>
          </SectionCard>
        </aside>
      </div>

      <ConfirmDialog isOpen={unfavoriteTarget !== null} onClose={() => setUnfavoriteTarget(null)}
        onConfirm={handleUnfavorite} title="取消收藏"
        message="確定取消收藏？相關提醒將一併刪除。"
        confirmLabel="取消收藏" cancelLabel="保留" variant="danger" />

      <ReminderSheet isOpen={reminderTarget !== null} onClose={() => setReminderTarget(null)}
        onConfirm={(days) => { if (reminderTarget) updateReminder(reminderTarget.school_id, true, days); }}
        schoolName={reminderTarget?.schools.name_tc} />
    </div>
  );
}
