"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Activity, ActivityCategory, ActivityDistrict } from "@/lib/db/activities";
import { ActivityCard, ActivityCardSkeleton } from "@/components/activities/ActivityCard";
import { ActivityFilterBar } from "@/components/activities/ActivityFilterBar";

const PAGE_SIZE = 18;

interface ApiResponse {
  data: Activity[];
  count: number;
  page: number;
  limit: number;
}

export function ActivitiesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => {
    const cat = searchParams?.get("category");
    const dist = searchParams?.get("district");
    const free = searchParams?.get("free");
    const search = searchParams?.get("search");
    const page = parseInt(searchParams?.get("page") ?? "1", 10);
    return {
      category: (cat || null) as ActivityCategory | null,
      district: (dist || null) as ActivityDistrict | null,
      free: free === "true",
      search: search || "",
      page: isNaN(page) ? 1 : page,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<ActivityCategory | null>(initialFilters.category);
  const [district, setDistrict] = useState<ActivityDistrict | null>(initialFilters.district);
  const [free, setFree] = useState<boolean>(initialFilters.free);
  const [search, setSearch] = useState<string>(initialFilters.search);
  const [page, setPage] = useState<number>(initialFilters.page);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (district) params.set("district", district);
    if (free) params.set("free", "true");
    if (search.trim()) params.set("search", search.trim());
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `/activities?${qs}` : "/activities", { scroll: false });
  }, [category, district, free, search, page, router]);

  // Fetch activities
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (district) params.set("district", district);
      if (free) params.set("free", "true");
      if (search.trim()) params.set("search", search.trim());
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(`/api/activities?${params.toString()}`);
      if (res.ok) {
        const json = (await res.json()) as ApiResponse;
        setActivities(json.data);
        setTotal(json.count);
      } else {
        setActivities([]);
        setTotal(0);
      }
    } catch {
      setActivities([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [category, district, free, search, page]);

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
    setCategory(null);
    setDistrict(null);
    setFree(false);
    setSearch("");
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="mb-6">
        <ActivityFilterBar
          category={category}
          district={district}
          free={free}
          search={search}
          onChangeCategory={handleFilterChange(setCategory)}
          onChangeDistrict={handleFilterChange(setDistrict)}
          onChangeFree={handleFilterChange(setFree)}
          onChangeSearch={handleFilterChange(setSearch)}
          onReset={handleReset}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
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
            共 {total} 個活動
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <ActivityCard key={a.id} activity={a} />
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
