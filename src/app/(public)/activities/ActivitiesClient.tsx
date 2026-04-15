"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  Activity,
  ActivityCategory,
  ActivityDistrict,
} from "@/lib/db/activities";
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
    const cat = searchParams.get("category");
    const dist = searchParams.get("district");
    const free = searchParams.get("free") === "true";
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    return {
      category: (cat || null) as ActivityCategory | null,
      district: (dist || null) as ActivityDistrict | null,
      free,
      page: isNaN(page) ? 1 : page,
    };
    // Only read from URL on mount; filters owned by local state after.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<ActivityCategory | null>(
    initialFilters.category,
  );
  const [district, setDistrict] = useState<ActivityDistrict | null>(
    initialFilters.district,
  );
  const [free, setFree] = useState<boolean>(initialFilters.free);
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
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `/activities?${qs}` : "/activities", { scroll: false });
  }, [category, district, free, page, router]);

  // Fetch activities
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (district) params.set("district", district);
      if (free) params.set("free", "true");
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
  }, [category, district, free, page]);

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
          onChangeCategory={handleFilterChange(setCategory)}
          onChangeDistrict={handleFilterChange(setDistrict)}
          onToggleFree={handleFilterChange(setFree)}
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
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            暫無符合條件的活動，試試調整篩選條件
          </p>
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
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                上一頁
              </button>
              <span className="text-sm text-slate-500">
                第 {page} / {totalPages} 頁
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
