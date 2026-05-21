"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Activity, ActivityDistrict } from "@/lib/db/activities";
import type { ActivityCategoryGroup } from "@/lib/activities/labels";
import { ActivityCard, ActivityCardSkeleton } from "@/components/activities/ActivityCard";
import { ActivityFilterBar } from "@/components/activities/ActivityFilterBar";

const PAGE_SIZE = 18;

interface ApiResponse {
  data: Activity[];
  count: number;
  expiredCount: number;
  page: number;
  limit: number;
}

export function ActivitiesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => {
    const group = searchParams?.get("group");
    const dist = searchParams?.get("district");
    const free = searchParams?.get("free");
    const includeExpired = searchParams?.get("includeExpired");
    const page = parseInt(searchParams?.get("page") ?? "1", 10);
    return {
      group: (group || null) as ActivityCategoryGroup | null,
      district: (dist || null) as ActivityDistrict | null,
      free: free === "true",
      includeExpired: includeExpired === "true",
      page: isNaN(page) ? 1 : page,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [group, setGroup] = useState<ActivityCategoryGroup | null>(initialFilters.group);
  const [district, setDistrict] = useState<ActivityDistrict | null>(initialFilters.district);
  const [free, setFree] = useState<boolean>(initialFilters.free);
  const [includeExpired, setIncludeExpired] = useState<boolean>(initialFilters.includeExpired);
  const [page, setPage] = useState<number>(initialFilters.page);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (group) params.set("group", group);
    if (district) params.set("district", district);
    if (free) params.set("free", "true");
    if (includeExpired) params.set("includeExpired", "true");
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `/activities?${qs}` : "/activities", { scroll: false });
  }, [group, district, free, includeExpired, page, router]);

  // Fetch activities
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (group) params.set("group", group);
      if (district) params.set("district", district);
      if (free) params.set("free", "true");
      if (includeExpired) params.set("includeExpired", "true");
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(`/api/activities?${params.toString()}`);
      if (res.ok) {
        const json = (await res.json()) as ApiResponse;
        setActivities(json.data);
        setTotal(json.count);
        setExpiredCount(json.expiredCount);
      } else {
        setActivities([]);
        setTotal(0);
        setExpiredCount(0);
      }
    } catch {
      setActivities([]);
      setTotal(0);
      setExpiredCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [group, district, free, includeExpired, page]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleFilterChange = <T,>(setter: (v: T) => void) => {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  };

  const handleReset = () => {
    setGroup(null);
    setDistrict(null);
    setFree(false);
    setIncludeExpired(false);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="mb-6">
        <ActivityFilterBar
          group={group}
          district={district}
          free={free}
          includeExpired={includeExpired}
          expiredCount={expiredCount}
          onChangeGroup={handleFilterChange(setGroup)}
          onChangeDistrict={handleFilterChange(setDistrict)}
          onChangeFree={handleFilterChange(setFree)}
          onChangeIncludeExpired={handleFilterChange(setIncludeExpired)}
          onReset={handleReset}
        />
      </div>

      {isLoading ? (
        <>
          <p className="mb-4 text-sm text-slate-500">載入活動中...</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ActivityCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : activities.length === 0 ? (
        <div className="rounded-[24px] border border-surface-border bg-white p-8 text-center shadow-[0_8px_24px_rgba(30,82,56,0.05)] md:p-10">
          <p className="text-lg font-semibold text-ink-900">
            暫時未有已核實嘅課外活動
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-600">
            我哋只會展示有來源頁可核對嘅活動，避免家長去到先發現報名方式唔清楚。
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-pill border border-forest-600 px-5 text-sm font-medium text-forest-700 transition hover:bg-forest-50"
          >
            清除篩選
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            共 {total} 個{includeExpired ? "活動" : "即將開始 / 長期可參與活動"}
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a, index) => (
              <ActivityCard key={a.id} activity={a} priority={index < 3} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                上一頁
              </button>
              <span className="text-sm text-slate-500">
                第 {page} / {totalPages} 頁
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                下一頁
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
