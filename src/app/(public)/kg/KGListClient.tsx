"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/schools/SearchBar";
import { FilterBar } from "@/components/schools/FilterBar";
import type { District, SchoolType, VacancyStatus } from "@/types/database";

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
  language_primary: string | null;
  fee_monthly_hkd: number | null;
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

  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(() => {
    const params = new URLSearchParams(queryString);

    return {
      selectedDistricts: params.getAll("district") as District[],
      selectedType: params.get("type") as SchoolType | null,
      vacancyFilter: params.getAll("vacancy"),
      searchQuery: params.get("search") ?? "",
      page: parseInt(params.get("page") ?? "1", 10),
    };
  }, [queryString]);

  const {
    selectedDistricts,
    selectedType,
    vacancyFilter,
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
      if (searchQuery) params.set("search", searchQuery);
      params.set("page", String(page));
      params.set("limit", "20");

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
  }, [selectedDistricts, selectedType, vacancyFilter, searchQuery, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

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

  const totalPages = Math.ceil(count / 20);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-950 mb-2">策劃香港卓越教育藍圖</h1>
      <p className="text-slate-600 mb-8">權威性的教育機構指南，即時更新學位空缺狀態及報名資訊。</p>

      <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />

      <FilterBar
        selectedDistricts={selectedDistricts}
        selectedType={selectedType}
        vacancyFilter={vacancyFilter}
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
          <p className="text-sm text-slate-500 mb-4">共 {count} 所學校</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => {
              const currentVacancy = school.vacancies?.[0];
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
                  vacancy={currentVacancy ? {
                    n_vacancy: currentVacancy.n_vacancy,
                    k1_vacancy: currentVacancy.k1_vacancy,
                    k2_vacancy: currentVacancy.k2_vacancy,
                    k3_vacancy: currentVacancy.k3_vacancy,
                    edb_published_date: currentVacancy.edb_published_date,
                  } : null}
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
    </div>
  );
}
