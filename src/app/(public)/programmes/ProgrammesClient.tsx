"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProgrammeCategory, ProgrammeWithStatus } from "@/lib/db/programmes";
import { ProgrammeCardSkeleton, ProgrammeCourseCard } from "@/components/programmes/ProgrammeCard";
import {
  ProgrammeFilterBar,
  type AgePresetKey,
  type ProgrammeSortKey,
} from "@/components/programmes/ProgrammeFilterBar";

const PAGE_SIZE = 240;

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

export interface ProgrammeCourseGroup {
  key: string;
  title: string;
  programmes: ProgrammeWithStatus[];
  representative: ProgrammeWithStatus;
}

const CHINESE_NUMERALS: Record<string, string> = {
  一: "1",
  二: "2",
  三: "3",
  四: "4",
  五: "5",
  六: "6",
  七: "7",
  八: "8",
  九: "9",
  十: "10",
};

function normalizeProgrammeName(value: string) {
  return value
    .replace(/\u3000/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/第([一二三四五六七八九十])階段/g, (_, n: string) => `第${CHINESE_NUMERALS[n] ?? n}階段`)
    .toLocaleLowerCase("zh-Hant-HK");
}

function programmeGroupKey(programme: ProgrammeWithStatus) {
  const name = normalizeProgrammeName(programme.name_zh || programme.name_en || "未知課程");
  return [
    name,
    programme.category || "other",
    programme.fee_hkd ?? "fee_pending",
    programme.sessions_count ?? "sessions_pending",
    programme.age_min ?? "age_min_pending",
    programme.age_max ?? "age_max_pending",
  ].join("|");
}

function openAtTime(programme: ProgrammeWithStatus) {
  if (!programme.enrolment_open_at) return Number.POSITIVE_INFINITY;
  const time = new Date(programme.enrolment_open_at).getTime();
  return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
}

function groupProgrammes(programmes: ProgrammeWithStatus[]): ProgrammeCourseGroup[] {
  const map = new Map<string, ProgrammeWithStatus[]>();
  for (const programme of programmes) {
    if (programme.lcsd_programme_status?.enrolment_status === "closed") continue;
    const key = programmeGroupKey(programme);
    map.set(key, [...(map.get(key) ?? []), programme]);
  }

  return Array.from(map.entries())
    .map(([key, items]) => {
      const programmes = [...items].sort((a, b) => {
        const aStatus = a.lcsd_programme_status?.enrolment_status || "pre_open";
        const bStatus = b.lcsd_programme_status?.enrolment_status || "pre_open";
        const statusDiff = (aStatus === "open" ? 0 : 1) - (bStatus === "open" ? 0 : 1);
        if (statusDiff !== 0) return statusDiff;
        const openDiff = openAtTime(a) - openAtTime(b);
        if (openDiff !== 0) return openDiff;
        return (a.venue || "").localeCompare(b.venue || "", "zh-Hant-HK");
      });
      const representative = programmes[0];
      return {
        key,
        title: representative.name_zh || representative.name_en || "未知課程",
        programmes,
        representative,
      };
    })
    .sort((a, b) => {
      const openDiff = openAtTime(a.representative) - openAtTime(b.representative);
      if (openDiff !== 0) return openDiff;
      return a.title.localeCompare(b.title, "zh-Hant-HK");
    });
}

function closingTime(programme: ProgrammeWithStatus) {
  if (!programme.enrolment_close_at) return Number.POSITIVE_INFINITY;
  const time = new Date(programme.enrolment_close_at).getTime();
  return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
}

function applySort(groups: ProgrammeCourseGroup[], sort: ProgrammeSortKey) {
  const nextGroups = [...groups];
  if (sort === "distance") {
    return nextGroups.sort((a, b) => (a.representative.venue || "").localeCompare(b.representative.venue || "", "zh-Hant-HK"));
  }
  return nextGroups.sort((a, b) => closingTime(a.representative) - closingTime(b.representative));
}

export function ProgrammesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => {
    const cat = searchParams?.get("category");
    const dist = searchParams?.get("district");
    const districtsRaw = searchParams?.get("districts");
    const ageRaw = searchParams?.get("age") as AgePresetKey | null;
    const age: AgePresetKey =
      ageRaw && VALID_PRESETS.has(ageRaw) ? ageRaw : "all";
    const page = parseInt(searchParams?.get("page") ?? "1", 10);
    return {
      category: (cat || null) as ProgrammeCategory | null,
      selectedDistricts: districtsRaw
        ? districtsRaw.split(",").filter(Boolean)
        : dist
          ? [dist]
          : [],
      agePreset: age,
      page: isNaN(page) ? 1 : page,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [category, setCategory] = useState<ProgrammeCategory | null>(initialFilters.category);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(initialFilters.selectedDistricts);
  const [agePreset, setAgePreset] = useState<AgePresetKey>(initialFilters.agePreset);
  const [sort, setSort] = useState<ProgrammeSortKey>("deadline");
  const [page, setPage] = useState<number>(initialFilters.page);
  const [programmes, setProgrammes] = useState<ProgrammeWithStatus[]>([]);
  const [total, setTotal] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (selectedDistricts.length > 0) params.set("districts", selectedDistricts.join(","));
    if (agePreset !== "all") params.set("age", agePreset);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `/programmes?${qs}` : "/programmes", { scroll: false });
  }, [category, selectedDistricts, agePreset, page, router]);

  // Fetch programmes
  const fetchData = useCallback(async () => {
    const isFirst = isInitialLoad;
    if (!isFirst) {
      setIsRefreshing(true);
    }
    try {
      const range = AGE_PRESET_RANGES[agePreset];
      const effectiveCategory: ProgrammeCategory | null =
        range.forceCategory ?? category;
      const params = new URLSearchParams();
      if (effectiveCategory) params.set("category", effectiveCategory);
      if (selectedDistricts.length > 0) params.set("districts", selectedDistricts.join(","));
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
      if (isFirst) {
        setIsInitialLoad(false);
      }
      setIsRefreshing(false);
    }
  }, [category, selectedDistricts, agePreset, page, isInitialLoad]);

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
    setSelectedDistricts([]);
    setAgePreset("all");
    setSort("deadline");
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const courseGroups = useMemo(
    () => applySort(groupProgrammes(programmes), sort),
    [programmes, sort],
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    setExpandedGroups(new Set());
  }, [category, selectedDistricts, agePreset, sort, page]);

  const toggleGroup = useCallback((key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <>
      <div className="mb-6">
        <ProgrammeFilterBar
          category={category}
          selectedDistricts={selectedDistricts}
          agePreset={agePreset}
          sort={sort}
          courseCount={courseGroups.length}
          onChangeCategory={handleFilterChange(setCategory)}
          onChangeDistricts={handleFilterChange(setSelectedDistricts)}
          onChangeAgePreset={handleFilterChange(setAgePreset)}
          onChangeSort={setSort}
          onReset={handleReset}
        />
      </div>

      {isRefreshing && programmes.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-label text-ink-500">
          <div className="h-1 w-8 animate-pulse rounded-pill bg-forest-700" />
          <span>更新中...</span>
        </div>
      )}

      {isInitialLoad ? (
        <>
          <p className="mb-4 text-small text-ink-500">載入課程中...</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProgrammeCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : courseGroups.length === 0 ? (
        <div className="rounded-card border border-surface-border bg-white p-10 text-center">
          <p className="text-small text-ink-500">
            暫無符合條件嘅課程，試試調整篩選條件
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {courseGroups.map((group) => (
              <ProgrammeCourseCard
                key={group.key}
                group={group}
                expanded={expandedGroups.has(group.key)}
                onToggle={() => toggleGroup(group.key)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className="rounded-pill border border-surface-border bg-white px-5 py-2 text-small font-medium text-ink-700 transition-colors hover:bg-forest-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                上一頁
              </button>
              <span className="text-small text-ink-500">
                第 {page} / {totalPages} 頁
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
                className="rounded-pill border border-surface-border bg-white px-5 py-2 text-small font-medium text-ink-700 transition-colors hover:bg-forest-50 disabled:cursor-not-allowed disabled:opacity-50"
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
