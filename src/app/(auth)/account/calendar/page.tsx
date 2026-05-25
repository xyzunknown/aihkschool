"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  CalendarBlank,
  CaretRight,
  Clock,
  MapPin,
  Sparkle,
  Student,
  Trash,
} from "@phosphor-icons/react";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { readSavedCalendarActivities, removeCalendarActivity, type SavedCalendarActivity } from "@/lib/account/calendar-storage";
import { DISTRICT_LABELS } from "@/lib/utils";
import { formatEnrolmentTime } from "@/lib/programmes/labels";
import type { SchoolEventItem } from "@/types/homepage";

type CalendarTab = "all" | "schools" | "programmes" | "activities";

interface SubscriptionItem {
  id: string;
  programme_id: string;
  lcsd_programmes: {
    id: string;
    name_zh: string | null;
    name_en: string | null;
    venue: string | null;
    district: string | null;
    enrolment_open_at: string | null;
    start_date: string | null;
  };
}

interface CalendarItem {
  id: string;
  type: "school" | "programme" | "activity";
  date: string | null;
  title: string;
  meta: string;
  href: string;
}

const TABS: Array<{ key: CalendarTab; label: string }> = [
  { key: "all", label: "全部" },
  { key: "schools", label: "學校" },
  { key: "programmes", label: "SmartPLAY" },
  { key: "activities", label: "課外活動" },
];

function formatDate(date: string | null) {
  if (!date) return "日期待定";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "日期待定";
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function getTabFromQuery(value: string | null): CalendarTab {
  return value === "schools" || value === "programmes" || value === "activities" ? value : "all";
}

function typeIcon(type: CalendarItem["type"]) {
  if (type === "school") return Student;
  if (type === "programme") return Bell;
  return Sparkle;
}

export default function AccountCalendarPage() {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<CalendarTab>(() => getTabFromQuery(searchParams?.get("tab") ?? null));
  const [schoolEvents, setSchoolEvents] = useState<SchoolEventItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [activities, setActivities] = useState<SavedCalendarActivity[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      showToast({ message: "請先登入" });
      router.push("/login");
      return;
    }
    if (user) void fetchCalendarItems();
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTab(getTabFromQuery(searchParams?.get("tab") ?? null));
  }, [searchParams]);

  const fetchCalendarItems = async () => {
    setLoadingItems(true);
    try {
      const [timelineRes, subscriptionsRes] = await Promise.all([
        fetch("/api/timeline"),
        fetch("/api/programme-subscriptions"),
      ]);

      if (!timelineRes.ok) throw new Error("載入學校日程失敗");
      if (!subscriptionsRes.ok) throw new Error("載入課程追蹤失敗");

      const timelineJson = await timelineRes.json();
      const subscriptionsJson = await subscriptionsRes.json();
      setSchoolEvents((timelineJson.data ?? []).slice(0, 60));
      setSubscriptions(subscriptionsJson.data ?? []);
      setActivities(readSavedCalendarActivities());
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "載入日程失敗" });
    } finally {
      setLoadingItems(false);
    }
  };

  const items = useMemo<CalendarItem[]>(() => {
    const schoolItems: CalendarItem[] = schoolEvents
      .filter((event) => !event.is_past)
      .slice(0, 30)
      .map((event) => ({
        id: `school-${event.id}`,
        type: "school",
        date: event.date_iso,
        title: event.school_name,
        meta: event.event_label,
        href: event.detail_href,
      }));

    const programmeItems: CalendarItem[] = subscriptions.map((subscription) => {
      const programme = subscription.lcsd_programmes;
      return {
        id: `programme-${subscription.id}`,
        type: "programme",
        date: programme.enrolment_open_at,
        title: programme.name_zh || programme.name_en || "未知課程",
        meta: `${programme.venue || "場地待定"} · ${formatEnrolmentTime(programme.enrolment_open_at)}`,
        href: `/programmes/${programme.id}`,
      };
    });

    const activityItems: CalendarItem[] = activities.map((activity) => {
      const district = activity.district ? DISTRICT_LABELS[activity.district as keyof typeof DISTRICT_LABELS] ?? activity.district : "地點待定";
      return {
        id: `activity-${activity.id}`,
        type: "activity",
        date: activity.start_date,
        title: activity.title,
        meta: `${activity.schedule || formatDate(activity.start_date)} · ${district}`,
        href: activity.href,
      };
    });

    return [...schoolItems, ...programmeItems, ...activityItems].sort((a, b) => {
      if (!a.date && !b.date) return a.title.localeCompare(b.title);
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [activities, schoolEvents, subscriptions]);

  const filteredItems = items.filter((item) => {
    if (tab === "all") return true;
    if (tab === "schools") return item.type === "school";
    if (tab === "programmes") return item.type === "programme";
    return item.type === "activity";
  });

  const removeActivity = (activityId: string) => {
    removeCalendarActivity(activityId);
    setActivities(readSavedCalendarActivities());
    showToast({ message: "已從我的日程移除" });
  };

  if (loading || loadingItems) {
    return <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8"><p className="text-base text-ink-500">載入中...</p></div>;
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
          <div>
            <h1 className="text-2xl font-bold text-ink-900 md:text-3xl">我的日程</h1>
            <p className="mt-2 text-sm leading-6 text-ink-600">申請截止、SmartPLAY 開報和課外活動集中查看。</p>
          </div>
          <Link href="/activities" className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-forest-200 bg-white px-5 text-sm font-semibold text-forest-700 transition hover:bg-forest-50">
            <CalendarBlank aria-hidden="true" size={18} weight="regular" />
            添加課外活動
          </Link>
        </div>
      </section>

      <div className="mt-6 flex gap-2 overflow-x-auto rounded-[18px] border border-surface-border bg-white p-2 shadow-soft">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`h-10 shrink-0 rounded-pill px-4 text-sm font-semibold transition ${
              tab === item.key ? "bg-forest-600 text-white" : "text-ink-600 hover:bg-forest-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-6 rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
        {filteredItems.length === 0 ? (
          <div className="rounded-card border border-dashed border-surface-border bg-cream-50 p-8 text-center">
            <CalendarBlank aria-hidden="true" size={32} weight="regular" className="mx-auto mb-3 text-forest-700" />
            <p className="text-base font-semibold text-ink-900">暫時沒有日程</p>
            <p className="mt-2 text-sm text-ink-600">收藏學校、追蹤 SmartPLAY 或把課外活動加入日曆後會出現在這裡。</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const Icon = typeIcon(item.type);
              const activityId = item.type === "activity" ? item.id.replace("activity-", "") : null;
              return (
                <div key={item.id} className="flex items-start gap-4 rounded-card border border-surface-border p-4 transition hover:bg-cream-50">
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-card bg-forest-50 px-2 py-3 text-center text-forest-800">
                    <span className="text-xs font-semibold">{formatDate(item.date).split("月")[0]}月</span>
                    <span className="mt-1 text-xl font-bold">{formatDate(item.date).includes("月") ? formatDate(item.date).split("月")[1].replace("日", "") : "--"}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-2.5 py-1 text-xs font-semibold text-ink-700">
                      <Icon aria-hidden="true" size={14} weight="regular" />
                      {item.type === "school" ? "學校" : item.type === "programme" ? "SmartPLAY" : "課外活動"}
                    </span>
                    <Link href={item.href} className="block text-base font-semibold leading-snug text-ink-900 hover:text-forest-700">
                      {item.title}
                    </Link>
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
                      {item.type === "programme" ? <Clock aria-hidden="true" size={15} className="text-forest-700" /> : <MapPin aria-hidden="true" size={15} className="text-forest-700" />}
                      {item.meta}
                    </p>
                  </div>
                  {activityId ? (
                    <button
                      type="button"
                      onClick={() => removeActivity(activityId)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-white hover:text-rust-600"
                      aria-label="移除課外活動"
                    >
                      <Trash aria-hidden="true" size={17} weight="regular" />
                    </button>
                  ) : (
                    <CaretRight aria-hidden="true" size={17} className="mt-2 shrink-0 text-ink-300" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
