"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OverviewData {
  pendingIntel: number;
  upcomingDeadlines: number;
  incompleteSchools: number;
  staleVacancies: number;
  expiredOpenDays: number;
  failedSchoolReminders: number;
  failedProgrammeReminders: number;
}

const CARDS = [
  { key: "pendingIntel", label: "待審核投稿", href: "/admin/intel" },
  { key: "upcomingDeadlines", label: "14 天內截止", href: "/admin/vacancies?deadline=14" },
  { key: "incompleteSchools", label: "資料不完整", href: "/admin/health" },
  { key: "staleVacancies", label: "學額太久未更新", href: "/admin/health?type=stale_vacancies" },
  { key: "expiredOpenDays", label: "開放日過期", href: "/admin/health?type=expired_open_days" },
  { key: "failedSchoolReminders", label: "學校提醒失敗", href: "/admin/reminders?type=school&status=failed" },
  { key: "failedProgrammeReminders", label: "課程提醒失敗", href: "/admin/reminders?type=programme&status=failed" },
] as const;

export function AdminOverviewClient() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error?.message ?? "載入失敗");
        setData(json.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "載入失敗"));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">今日概覽</h1>
        <p className="mt-1 text-sm text-ink-500">集中處理今天最重要的資料、投稿和提醒。</p>
      </div>

      {error ? <div className="rounded-button border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        {CARDS.map((card) => (
          <Link key={card.key} href={card.href} className="rounded-card border border-surface-border bg-white p-5 hover:border-surface-border">
            <p className="text-sm text-ink-500">{card.label}</p>
            <p className="mt-3 text-3xl font-bold text-ink-900">{data ? data[card.key] : "..."}</p>
          </Link>
        ))}
      </div>

      <section className="mt-6 rounded-card border border-surface-border bg-white">
        <div className="border-b border-surface-border px-5 py-4">
          <h2 className="font-semibold text-ink-900">今日待處理</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {CARDS.map((card) => (
            <Link key={card.key} href={card.href} className="flex items-center justify-between px-5 py-4 text-sm hover:bg-cream-50">
              <span className="text-ink-700">{data ? data[card.key] : "..."} 條 {card.label}</span>
              <span className="font-medium text-ink-900">去處理</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
