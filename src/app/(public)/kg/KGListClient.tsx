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
import { CompareBar } from "@/components/compare/CompareBar";
import type { District, SchoolType, VacancyStatus } from "@/types/database";

const PAGE_SIZE = 18;

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
  fee_monthly_hkd: number | null;
  latitude: number | null;
  longitude: number | null;
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
  const queryString = searchParams.toString();
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();

  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const { latitude: userLat, longitude: userLng, requestLocation, loading: geoLoading } = useGeolocation();
  const {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareUrl,
    canAdd,
  } = useCompare();

  const filters = useMemo(() => {
    const params = new URLSearchParams(queryString);

    return {
      selectedDistricts: params.getAll("district") as District[],
      selectedType: params.get("type") as SchoolType | null,
      vacancyFilter: params.getAll("vacancy"),
      sessionFilter: params.get("session") as string | null,
      hasNurseryFilter: params.get("hasNursery") === "true",
      searchQuery: params.get("search") ?? "",
      page: parseInt(params.get("page") ?? "1", 10),
    };
  }, [queryString]);

  const {
    selectedDistricts,
    selectedType,
    vacancyFilter,
    sessionFilter,
    hasNurseryFilter,
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
      if (sessionFilter) params.set("session", sessionFilter);
      if (hasNurseryFilter) params.set("hasNursery", "true");
      if (searchQuery) params.set("search", searchQuery);
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(`/api/schools?${params.toString()}`);
      const json = await res.json();

      if (json.error) {
        setError(json.error.message);
      } else {
        setSchools(json.data ?? []);
        setCount(json.count ?? 0);
      }
    } catch {
      setError("載入失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  }, [selectedDistricts, selectedType, vacancyFilter, sessionFilter, hasNurseryFilter, searchQuery, page]);

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
        .then(() => showToast({ message: "已取消收藏" }))
        .catch(() => {
          setFavoriteIds((prev) => new Set(prev).add(schoolId));
          showToast({ message: "取消收藏失敗" });
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
        const json = await res.json();
        if (json.error) {
          setFavoriteIds((prev) => { const next = new Set(prev); next.delete(schoolId); return next; });
          showToast({ message: json.error.message });
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
    const params = new URLSearchParams(searchParams.toString());
    if (value) { params.set(key, value); } else { params.delete(key); }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/kg?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) { params.set("search", query); } else { params.delete("search"); }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  const toggleDistrict = (district: District) => {
    const params = new URLSearchParams(searchParams.toString());
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
    const params = new URLSearchParams(searchParams.toString());
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

  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-950 mb-2">策劃香港卓越教育藍圖</h1>
      <p className="text-slate-600 mb-8">權威性的教育機構指南，即時更新學位空缺狀態及報名資訊。</p>

      <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />

      <FilterBar
        selectedDistricts={selectedDistricts}
        selectedType={selectedType}
        vacancyFilter={vacancyFilter}
        sessionFilter={sessionFilter}
        hasNurseryFilter={hasNurseryFilter}
        onToggleDistrict={toggleDistrict}
        onUpdateFilter={updateFilter}
        onToggleVacancy={toggleVacancy}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <SchoolCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-base text-slate-500">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchData}>重試</Button>
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-semibold text-slate-950 mb-2">沒有搵到學校</p>
          <p className="text-base text-slate-500">試下調整篩選條件</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">共 {count} 所學校</p>
            {!userLat && (
              <button
                onClick={requestLocation}
                disabled={geoLoading}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
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
              <span className="text-xs text-emerald-600 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20.4 7.6 19 6.2z"/></svg>
                已定位
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => {
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
                  gradesOffered={school.grades_offered}
                  admissionSummary={school.admission_summary}
                  showAdmissionSummary={school.show_admission_summary}
                  vacancy={vacancy}
                  isFavorited={favoriteIds.has(school.id)}
                  onToggleFavorite={() => handleToggleFavorite(school.id)}
                  distanceKm={distanceKm}
                  isInCompare={isInCompare(school.id)}
                  onToggleCompare={() => {
                    if (isInCompare(school.id)) {
                      removeFromCompare(school.id);
                    } else if (canAdd) {
                      addToCompare({ id: school.id, nameTc: school.name_tc, logoUrl: school.logo_url });
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
              <span className="flex items-center text-sm text-slate-400 px-3">
                {page} / {totalPages}
              </span>
              <Button variant="secondary" size="sm" disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}>下一頁</Button>
            </div>
          )}
        </>
      )}

      {/* Compare floating bar */}
      <CompareBar
        items={compareItems}
        compareUrl={compareUrl}
        onRemove={removeFromCompare}
        onClear={clearCompare}
      />
    </div>
  );
}
