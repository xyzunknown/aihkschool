"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/schools/SearchBar";
import { FilterBar } from "@/components/schools/FilterBar";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { useGeolocation, haversineDistance } from "@/lib/hooks/useGeolocation";
import { useCompare } from "@/lib/hooks/useCompare";
import type { District, SchoolType, VacancyStatus } from "@/types/database";

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const json = await response.json();
    return json?.error?.message || fallback;
  } catch {
    return fallback;
  }
}

const PAGE_SIZE = 18;
const HOT_SCHOOL_PAGE_SIZE = 100;
const SORT_OPTIONS = [
  { key: "default", label: "推薦排序" },
  { key: "distance", label: "距離最近" },
];

interface SchoolData {
  id: string;
  school_code: string | null;
  name_tc: string;
  name_en: string | null;
  logo_url: string | null;
  district: string;
  school_type: string;
  session_type: string | null;
  grades_offered: string[] | null;
  application_status: string | null;
  application_details: string | null;
  application_url: string | null;
  admission_summary: string;
  show_admission_summary: boolean;
  language_primary: string | null;
  schooland_operator_name: string | null;
  schooland_group_tag: string | null;
  schooland_free_scheme: boolean | null;
  schooland_nursery_service: string | null;
  schooland_size_label: string | null;
  schooland_session_label: string | null;
  schooland_url: string | null;
  schooland_source_fields: Record<string, string> | null;
  fee_monthly_hkd: number | null;
  latitude: number | null;
  longitude: number | null;
  enrichment?: {
    application_url: string | null;
    open_day_date: string | null;
    open_day_details: string | null;
  } | null;
  vacancies: Array<{
    id: string;
    n_vacancy: VacancyStatus;
    k1_vacancy: VacancyStatus;
    k2_vacancy: VacancyStatus;
    k3_vacancy: VacancyStatus;
    application_deadline: string | null;
    edb_published_date: string | null;
  }>;
}

export default function KGListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() ?? "";
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();

  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [showSortFilter, setShowSortFilter] = useState(false);
  const { latitude: userLat, longitude: userLng, requestLocation, loading: geoLoading } = useGeolocation();
  const {
    addToCompare,
    removeFromCompare,
    isInCompare,
    canAdd,
  } = useCompare();

  const filters = useMemo(() => {
    const params = new URLSearchParams(queryString);

    return {
      selectedDistricts: params.getAll("district") as District[],
      selectedType: params.get("type") as SchoolType | null,
      vacancyFilter: params.getAll("vacancy"),
      selectedGrade: (params.get("grade") as "n" | "k1" | "k2" | "k3" | null),
      sessionFilter: params.get("session") as string | null,
      hasNurseryFilter: params.get("hasNursery") === "true",
      hotFilter: params.get("hot") === "100" ? "100" : null,
      sortBy: params.get("sort") ?? "default",
      searchQuery: params.get("search") ?? "",
      page: parseInt(params.get("page") ?? "1", 10),
    };
  }, [queryString]);

  const {
    selectedDistricts,
    selectedType,
    vacancyFilter,
    selectedGrade,
    sessionFilter,
    hasNurseryFilter,
    hotFilter,
    sortBy,
    searchQuery,
    page,
  } = filters;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      selectedDistricts.forEach((d) => params.append("district", d));
      if (selectedType) params.set("type", selectedType);
      vacancyFilter.forEach((v) => params.append("vacancy", v));
      if (selectedGrade) params.set("grade", selectedGrade);
      if (sessionFilter) params.set("session", sessionFilter);
      if (hasNurseryFilter) params.set("hasNursery", "true");
      if (hotFilter) params.set("hot", hotFilter);
      if (searchQuery) params.set("search", searchQuery);
      if (sortBy === "distance") params.set("sort", sortBy);
      if (sortBy === "distance" && userLat != null && userLng != null) {
        params.set("lat", String(userLat));
        params.set("lng", String(userLng));
      }
      params.set("page", String(page));
      params.set("limit", String(hotFilter ? HOT_SCHOOL_PAGE_SIZE : PAGE_SIZE));

      const res = await fetch(`/api/schools?${params.toString()}`);
      const json = await res.json();

      if (json.error) {
        setError(json.error.message);
      } else {
        const schoolsData: SchoolData[] = json.data ?? [];
        setSchools(schoolsData);
        setCount(json.count ?? 0);
      }
    } catch {
      setError("載入失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  }, [
    selectedDistricts,
    selectedType,
    vacancyFilter,
    selectedGrade,
    sessionFilter,
    hasNurseryFilter,
    hotFilter,
    sortBy,
    userLat,
    userLng,
    searchQuery,
    page,
  ]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Fetch user favorites
  useEffect(() => {
    if (!user) { setFavoriteIds(new Set()); return; }
    const loadFavorites = async () => {
      try {
        const res = await fetch("/api/favorites");
        const json = await res.json();
        if (json.data) {
          setFavoriteIds(new Set(json.data.map((f: { school_id: string }) => f.school_id)));
        }
      } catch { /* non-critical */ }
    };
    loadFavorites();
  }, [user]);

  const handleToggleFavorite = useCallback((schoolId: string) => {
    const alreadyFavorited = favoriteIds.has(schoolId);

    if (alreadyFavorited) {
      // Optimistic remove
      setFavoriteIds((prev) => { const next = new Set(prev); next.delete(schoolId); return next; });
      fetch(`/api/favorites/${schoolId}`, { method: "DELETE" })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(await getErrorMessage(res, "取消收藏失敗"));
          }
          showToast({ message: "已取消收藏" });
        })
        .catch((error: unknown) => {
          setFavoriteIds((prev) => new Set(prev).add(schoolId));
          showToast({ message: error instanceof Error ? error.message : "取消收藏失敗" });
        });
      return;
    }

    requireAuth(async () => {
      // Optimistic add
      setFavoriteIds((prev) => new Set(prev).add(schoolId));
      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ school_id: schoolId }),
        });
        if (!res.ok) {
          const message = await getErrorMessage(res, "收藏失敗，請稍後再試");
          setFavoriteIds((prev) => { const next = new Set(prev); next.delete(schoolId); return next; });
          showToast({ message });
        } else {
          showToast({ message: "已加入收藏" });
        }
      } catch {
        setFavoriteIds((prev) => { const next = new Set(prev); next.delete(schoolId); return next; });
        showToast({ message: "收藏失敗，請稍後再試" });
      }
    });
  }, [favoriteIds, requireAuth, showToast]);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value) { params.set(key, value); } else { params.delete(key); }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", String(nextPage));
    router.push(`/kg?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (query) { params.set("search", query); } else { params.delete("search"); }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "default") { params.delete("sort"); } else { params.set("sort", value); }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
    setShowSortFilter(false);
    if (value === "distance" && !userLat && !geoLoading) {
      requestLocation();
    }
  };

  // Client-side sorting
  const displaySchools = useMemo(() => {
    return schools;
  }, [schools]);

  const toggleDistrict = (district: District) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const current = params.getAll("district");
    params.delete("district");
    if (current.includes(district)) {
      current.filter((d) => d !== district).forEach((d) => params.append("district", d));
    } else {
      [...current, district].forEach((d) => params.append("district", d));
    }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  const toggleVacancy = (status: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const current = params.getAll("vacancy");
    params.delete("vacancy");
    if (current.includes(status)) {
      current.filter((v) => v !== status).forEach((v) => params.append("vacancy", v));
    } else {
      [...current, status].forEach((v) => params.append("vacancy", v));
    }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  const totalPages = Math.ceil(count / (hotFilter ? HOT_SCHOOL_PAGE_SIZE : PAGE_SIZE));

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-6 md:px-8">
      <h1 className="mb-2 text-h1 font-bold text-ink-900">
        {hotFilter ? "熱點學校 100" : "策劃香港卓越教育藍圖"}
      </h1>
      <p className="mb-8 text-body text-ink-700">
        {hotFilter ? "這裡集中顯示家長討論度高、平台已匹配資料的熱門幼稚園。" : "權威性的教育機構指南，即時更新學位空缺狀態及報名資訊。"}
      </p>

      <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />

      <FilterBar
        selectedDistricts={selectedDistricts}
        selectedType={selectedType}
        vacancyFilter={vacancyFilter}
        selectedGrade={selectedGrade}
        sessionFilter={sessionFilter}
        hasNurseryFilter={hasNurseryFilter}
        onToggleDistrict={toggleDistrict}
        onUpdateFilter={updateFilter}
        onToggleVacancy={toggleVacancy}
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <SchoolCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-body text-ink-500">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchData}>重試</Button>
        </div>
      ) : schools.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto max-w-md rounded-card border border-surface-border bg-white px-6 py-8 shadow-soft">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <p className="mb-2 text-h2 font-semibold text-ink-900">沒有搵到學校</p>
            <p className="text-body text-ink-500">試下調整篩選條件</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-small text-ink-500">{hotFilter ? `共 ${count} 所熱點學校` : `共 ${count} 所學校`}</p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSortFilter(!showSortFilter)}
                  className={`inline-flex h-9 items-center justify-center rounded-chip border bg-white px-3 text-small font-semibold shadow-soft transition hover:border-forest-400 hover:bg-forest-50 ${
                    showSortFilter ? "border-forest-700 text-forest-800" : "border-surface-border text-ink-700"
                  }`}
                >
                  排序：{SORT_OPTIONS.find((item) => item.key === sortBy)?.label ?? "推薦排序"}
                  <ChevronDownIcon expanded={showSortFilter} />
                </button>
                {showSortFilter && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
                    <div className="border-b border-surface-border px-4 py-3 text-label font-semibold text-ink-500">
                      排序方式
                    </div>
                    <div className="p-2">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleSortChange(option.key)}
                          className={`flex w-full items-center justify-between rounded-chip px-3 py-2 text-left text-sm font-semibold transition ${
                            sortBy === option.key
                              ? "bg-forest-700 text-white"
                              : "text-ink-700 hover:bg-forest-50 hover:text-forest-800"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.key ? <span aria-hidden="true">✓</span> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {!userLat && (
                <button
                  onClick={requestLocation}
                  disabled={geoLoading}
                  className="inline-flex h-9 items-center gap-1.5 text-small font-semibold text-ink-500 transition-colors hover:text-ink-700"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                  </svg>
                  {geoLoading ? "定位中…" : "顯示距離"}
                </button>
              )}
              {userLat && (
                <span className="flex items-center gap-1 text-label text-forest-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20.4 7.6 19 6.2z"/></svg>
                  已定位
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {displaySchools.map((school) => {
              const currentVacancy = school.vacancies?.[0];
              const vacancy = currentVacancy ? {
                n_vacancy: currentVacancy.n_vacancy,
                k1_vacancy: currentVacancy.k1_vacancy,
                k2_vacancy: currentVacancy.k2_vacancy,
                k3_vacancy: currentVacancy.k3_vacancy,
                edb_published_date: currentVacancy.edb_published_date,
              } : null;

              const distanceKm =
                userLat && userLng && school.latitude && school.longitude
                  ? haversineDistance(userLat, userLng, school.latitude, school.longitude)
                  : undefined;

              return (
                <SchoolCard
                  key={school.id}
                  id={school.id}
                  nameTc={school.name_tc}
                  nameEn={school.name_en ?? undefined}
                  logoUrl={school.logo_url}
                  schoolCode={school.school_code}
                  district={school.district}
                  schoolType={school.school_type}
                  sessionType={school.session_type}
                  schoolandSessionLabel={school.schooland_session_label}
                  feeMonthlyHkd={school.fee_monthly_hkd}
                  applicationStatus={school.application_status}
                  applicationDetails={school.application_details}
                  applicationUrl={school.enrichment?.application_url ?? school.application_url}
                  admissionSummary={school.admission_summary}
                  vacancy={vacancy}
                  isFavorited={favoriteIds.has(school.id)}
                  onToggleFavorite={() => handleToggleFavorite(school.id)}
                  distanceKm={distanceKm}
                  isInCompare={isInCompare(school.id)}
                  compact
                  onToggleCompare={() => {
                    if (isInCompare(school.id)) {
                      removeFromCompare(school.id);
                    } else if (canAdd) {
                      requireAuth(() => {
                        addToCompare({ id: school.id, nameTc: school.name_tc, logoUrl: school.logo_url });
                      });
                    }
                  }}
                />
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="secondary" size="sm" disabled={page <= 1}
                onClick={() => goToPage(page - 1)}>上一頁</Button>
              <span className="flex items-center px-3 text-small text-ink-500">
                {page} / {totalPages}
              </span>
              <Button variant="secondary" size="sm" disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}>下一頁</Button>
            </div>
          )}
        </>
      )}
      {showSortFilter && <div className="fixed inset-0 z-20" onClick={() => setShowSortFilter(false)} />}
    </div>
  );
}

function ChevronDownIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`ml-2 h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
