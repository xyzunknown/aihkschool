"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProgrammeCategory, ProgrammeWithStatus } from "@/lib/db/programmes";
import { ProgrammeCard, ProgrammeCardSkeleton } from "@/components/programmes/ProgrammeCard";
import { ProgrammeFilterBar, type AgePresetKey } from "@/components/programmes/ProgrammeFilterBar";

const PAGE_SIZE = 18;

// Age presets surfaced in the filter bar. The API uses range-overlap
// matching: a programme matches when its [age_min, age_max] overlaps with
// the filter [ageMin, ageMax]. We keep ranges tight to the label to avoid
// cross-contamination between tabs (e.g. 4-6歲 courses leaking into the
// 0-2歲 infant tab).
//
// "all" disables the age filter entirely. "family" funnels through
// category=parent_child rather than age.
const AGE_PRESET_RANGES: Record<AgePresetKey, { ageMin: number | null; ageMax: number | null; forceCategory?: ProgrammeCategory }> = {
  all: { ageMin: null, ageMax: null },
  infant: { ageMin: 0, ageMax: 2 },
  preschool: { ageMin: 2, ageMax: 6 },
  primary: { ageMin: 6, ageMax: 12 },
  teen: { ageMin: 12, ageMax: 18 },
  adult: { ageMin: 18, ageMax: 99 },
  family: { ageMin: null, ageMax: null, forceCategory: "parent_child" },
};

const VALID_PRESETS = new Set<AgePresetKey>([
  "all", "infant", "preschool", "primary", "teen", "adult", "family",
]);

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
    const cat = searchParams?.get("category");
    const dist = searchParams?.get("district");
    const ageRaw = searchParams?.get("age") as AgePresetKey | null;
    const age: AgePresetKey =
      ageRaw && VALID_PRESETS.has(ageRaw) ? ageRaw : "preschool";
    const page = parseInt(searchParams?.get("page") ?? "1", 10);
    return {
      category: (cat || null) as ProgrammeCategory | null,
      district: dist || null,
      agePreset: age,
      page: isNaN(page) ? 1 : page,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<ProgrammeCategory | null>(initialFilters.category);
  const [district, setDistrict] = useState<string | null>(initialFilters.district);
  const [agePreset, setAgePreset] = useState<AgePresetKey>(initialFilters.agePreset);
  const [page, setPage] = useState<number>(initialFilters.page);
  const [programmes, setProgrammes] = useState<ProgrammeWithStatus[]>([]);
  const [total, setTotal] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (district) params.set("district", district);
    if (agePreset !== "preschool") params.set("age", agePreset);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `/programmes?${qs}` : "/programmes", { scroll: false });
  }, [category, district, agePreset, page, router]);

  // Fetch programmes
  const fetchData = useCallback(async () => {
    const isFirst = isInitialLoad;
    if (isFirst) {
      setIsInitialLoad(false);
    } else {
      setIsRefreshing(true);
    }
    try {
      const range = AGE_PRESET_RANGES[agePreset];
      const effectiveCategory: ProgrammeCategory | null =
        range.forceCategory ?? category;
      const params = new URLSearchParams();
      if (effectiveCategory) params.set("category", effectiveCategory);
      if (district) params.set("district", district);
      if (range.ageMin !== null) params.set("ageMin", String(range.ageMin));
      if (range.ageMax !== null) params.set("ageMax", String(range.ageMax));
      if (agePreset === "infant" || agePreset === "preschool" || agePreset === "primary") {
        params.set("excludeAllAges", "1");
      }
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(`/api/programmes?${params.toString()}`);
      if (res.ok) {
        const json = (await res.json()) as ApiResponse;
        setProgrammes(json.data);
        setTotal(json.count);
      } else {
        if (isFirst) {
          setProgrammes([]);
          setTotal(0);
        }
      }
    } catch {
      if (isFirst) {
        setProgrammes([]);
        setTotal(0);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [category, district, agePreset, page, isInitialLoad]);

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
    setAgePreset("preschool");
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="mb-6">
        <ProgrammeFilterBar
          category={category}
          district={district}
          agePreset={agePreset}
          onChangeCategory={handleFilterChange(setCategory)}
          onChangeDistrict={handleFilterChange(setDistrict)}
          onChangeAgePreset={handleFilterChange(setAgePreset)}
          onReset={handleReset}
        />
      </div>

      {isRefreshing && programmes.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
          <div className="h-1 w-8 animate-pulse rounded-full bg-brand-700" />
          <span>更新中...</span>
        </div>
      )}

      {isInitialLoad ? (
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
