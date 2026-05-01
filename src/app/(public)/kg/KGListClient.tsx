"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { FilterBar } from "@/components/schools/FilterBar";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { useGeolocation, haversineDistance } from "@/lib/hooks/useGeolocation";
import { useCompare } from "@/lib/hooks/useCompare";
import { CompareBar } from "@/components/compare/CompareBar";
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
  const queryString = searchParams.toString();
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();

  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [heroSearch, setHeroSearch] = useState("");
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
      schoolandFreeSchemeFilter: params.get("schoolandFreeScheme") === "true",
      schoolandNurseryServiceFilter: params.get("schoolandNurseryService") === "yes",
      schoolandGroupFilter: params.get("schoolandGroup"),
      schoolandSizeFilter: params.get("schoolandSize"),
      sortBy: params.get("sort") ?? "default",
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
    schoolandFreeSchemeFilter,
    schoolandNurseryServiceFilter,
    schoolandGroupFilter,
    schoolandSizeFilter,
    sortBy,
    searchQuery,
    page,
  } = filters;

  useEffect(() => {
    setHeroSearch(searchQuery);
  }, [searchQuery]);

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
      if (schoolandFreeSchemeFilter) params.set("schoolandFreeScheme", "true");
      if (schoolandNurseryServiceFilter) params.set("schoolandNurseryService", "yes");
      if (schoolandGroupFilter) params.set("schoolandGroup", schoolandGroupFilter);
      if (schoolandSizeFilter) params.set("schoolandSize", schoolandSizeFilter);
      if (searchQuery) params.set("search", searchQuery);
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

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
    sessionFilter,
    hasNurseryFilter,
    schoolandFreeSchemeFilter,
    schoolandNurseryServiceFilter,
    schoolandGroupFilter,
    schoolandSizeFilter,
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

  const handleHeroSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(heroSearch.trim());
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") { params.delete("sort"); } else { params.set("sort", value); }
    params.set("page", "1");
    router.push(`/kg?${params.toString()}`);
  };

  // Client-side sorting
  const displaySchools = useMemo(() => {
    return schools;
  }, [schools]);

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
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(229,238,214,0.55),transparent_360px),radial-gradient(circle_at_bottom_right,rgba(248,231,190,0.45),transparent_420px),#fffdf8]">
      <div className="pointer-events-none fixed left-0 top-[180px] hidden h-[360px] w-[180px] opacity-35 xl:block leaf-decor leaf-decor-tl" />
      <div className="pointer-events-none fixed bottom-[48px] right-0 hidden h-[360px] w-[180px] opacity-35 xl:block leaf-decor leaf-decor-br" />

      <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-8 md:px-8">
        <section
          className="relative overflow-hidden rounded-[32px] border border-[rgba(32,85,59,0.08)] shadow-[0_24px_60px_rgba(31,80,55,0.10)]"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(255,248,231,.96) 0%, rgba(255,248,231,.72) 46%, rgba(255,248,231,.2) 100%), url('/brand/hero/hero-banner@2x.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        >
          <span className="leaf-decor leaf-decor-tl opacity-70" />
          <div className="relative grid min-h-[280px] grid-cols-1 items-center gap-8 px-6 py-10 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:px-10 lg:px-16 lg:py-12">
            <div className="relative z-10 max-w-[640px]">
              <h1 className="text-[34px] font-bold leading-[1.18] text-[#173d2c] md:text-[42px]">
                策劃香港卓越教育藍圖
              </h1>
              <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-[#5f7167] md:text-[17px]">
                根據您的教育機構指南，即時更新學位空缺狀態及報名資訊。
              </p>

              <form
                onSubmit={handleHeroSearchSubmit}
                className="mt-7 flex h-14 w-full max-w-[620px] items-center rounded-full border border-[rgba(32,85,59,0.1)] bg-white pl-5 pr-2 shadow-[0_12px_32px_rgba(31,122,77,0.08)]"
              >
                <svg className="h-5 w-5 flex-shrink-0 text-[#b0b7b0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(event) => setHeroSearch(event.target.value)}
                  placeholder="搜尋學校名稱、地區或特色..."
                  className="h-full flex-1 bg-transparent px-4 text-[15px] text-[#284536] outline-none placeholder:text-[#b1b7af]"
                />
                <button
                  type="submit"
                  className="h-[42px] rounded-full bg-[#1f7a4d] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,122,77,0.22)] transition hover:bg-[#19653f]"
                >
                  搜尋
                </button>
              </form>
            </div>

            <div className="hidden items-end justify-end md:flex">
              <div className="relative h-[220px] w-full max-w-[430px]">
                <Image
                  src="/brand/hero/family.png"
                  alt="家庭閱讀插畫"
                  fill
                  sizes="430px"
                  className="absolute bottom-0 right-0 object-contain drop-shadow-[0_24px_30px_rgba(71,96,71,0.14)]"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="-mt-4 md:-mt-6">
          <FilterBar
            selectedDistricts={selectedDistricts}
            selectedType={selectedType}
            vacancyFilter={vacancyFilter}
            sessionFilter={sessionFilter}
            hasNurseryFilter={hasNurseryFilter}
            schoolandFreeSchemeFilter={schoolandFreeSchemeFilter}
            schoolandNurseryServiceFilter={schoolandNurseryServiceFilter}
            schoolandGroupFilter={schoolandGroupFilter}
            schoolandSizeFilter={schoolandSizeFilter}
            onToggleDistrict={toggleDistrict}
            onUpdateFilter={updateFilter}
            onToggleVacancy={toggleVacancy}
          />
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <SchoolCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="py-16 text-center">
          <p className="text-base text-slate-500">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchData}>重試</Button>
        </div>
      ) : schools.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-2 text-xl font-semibold text-slate-950">沒有搵到學校</p>
          <p className="text-base text-slate-500">試下調整篩選條件</p>
        </div>
      ) : (
        <>
          <div className="mb-5 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[18px] font-semibold text-[#294735]">共 {count} 所學校</p>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-10 rounded-full border border-[#e3eadf] bg-white px-4 text-sm text-[#506457] shadow-[0_8px_20px_rgba(31,80,55,0.04)] outline-none"
              >
                <option value="default">預設排序</option>
              </select>
              {!userLat && (
                <button
                  onClick={requestLocation}
                  disabled={geoLoading}
                  className="flex h-10 items-center gap-2 rounded-full border border-[#e3eadf] bg-white px-4 text-sm text-[#6d7e72] transition hover:bg-[#f5f8f2] hover:text-[#405445]"
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
                <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#edf8f0] px-4 text-sm text-emerald-700">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20.4 7.6 19 6.2z"/></svg>
                  已定位
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                  schoolandGroupTag={school.schooland_group_tag}
                  schoolandFreeScheme={school.schooland_free_scheme}
                  schoolandNurseryService={school.schooland_nursery_service}
                  schoolandSizeLabel={school.schooland_size_label}
                  schoolandSessionLabel={school.schooland_session_label}
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
                  enrichment={school.enrichment ?? null}
                />
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                className="h-[38px] rounded-full border border-[#e2eadf] bg-white px-4 text-sm text-[#3f5548] transition hover:bg-[#f4f8f1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                上一頁
              </button>
              <span className="flex items-center px-3 text-sm text-[#819084]">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
                className="h-[38px] rounded-full border border-[#e2eadf] bg-white px-4 text-sm text-[#3f5548] transition hover:bg-[#f4f8f1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                下一頁
              </button>
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
    </div>
  );
}
