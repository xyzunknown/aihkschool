"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProgrammeCategory, ProgrammeWithStatus } from "@/lib/db/programmes";
import { ProgrammeCard, ProgrammeCardSkeleton } from "@/components/programmes/ProgrammeCard";
import { ProgrammeFilterBar } from "@/components/programmes/ProgrammeFilterBar";

const PAGE_SIZE = 18;

interface ApiResponse {
  data: ProgrammeWithStatus[];
  count: number;
  page: number;
  limit: number;
}

export function ProgrammesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => {
    const cat = searchParams.get("category");
    const dist = searchParams.get("district");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    return {
      category: (cat || null) as ProgrammeCategory | null,
      district: dist || null,
      page: isNaN(page) ? 1 : page,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<ProgrammeCategory | null>(initialFilters.category);
  const [district, setDistrict] = useState<string | null>(initialFilters.district);
  const [page, setPage] = useState<number>(initialFilters.page);
  const [programmes, setProgrammes] = useState<ProgrammeWithStatus[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (district) params.set("district", district);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `/programmes?${qs}` : "/programmes", { scroll: false });
  }, [category, district, page, router]);

  // Fetch programmes
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (district) params.set("district", district);
      // 默認只顯示 2-6 歲
      params.set("ageMin", "2");
      params.set("ageMax", "6");
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(`/api/programmes?${params.toString()}`);
      if (res.ok) {
        const json = (await res.json()) as ApiResponse;
        setProgrammes(json.data);
        setTotal(json.count);
      } else {
        setProgrammes([]);
        setTotal(0);
      }
    } catch {
      setProgrammes([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [category, district, page]);

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
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="mb-6">
        <ProgrammeFilterBar
          category={category}
          district={district}
          onChangeCategory={handleFilterChange(setCategory)}
          onChangeDistrict={handleFilterChange(setDistrict)}
          onReset={handleReset}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProgrammeCardSkeleton key={i} />
          ))}
        </div>
      ) : programmes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            暫無符合條件嘅課程，試試調整篩選條件
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            共 {total} 個課程
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p) => (
              <ProgrammeCard key={p.id} programme={p} />
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
