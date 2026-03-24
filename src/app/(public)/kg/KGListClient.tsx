"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/schools/SearchBar";
import { FilterBar } from "@/components/schools/FilterBar";
import type { District, SchoolType, VacancyStatus } from "@/types/database";

interface SchoolData {
  id: string;
  name_tc: string;
  district: string;
  school_type: string;
  language_primary: string | null;
  fee_monthly_hkd: number | null;
  vacancies: Array<{
    id: string;
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

  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedDistricts = searchParams.getAll("district") as District[];
  const selectedType = searchParams.get("type") as SchoolType | null;
  const selectedLanguage = searchParams.get("language");
  const selectedSession = searchParams.get("session");
  const hasVacancy = searchParams.get("has_vacancy") === "true";
  const searchQuery = searchParams.get("search") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      selectedDistricts.forEach((d) => params.append("district", d));
      if (selectedType) params.set("type", selectedType);
      if (selectedLanguage) params.set("language", selectedLanguage);
      if (selectedSession) params.set("session", selectedSession);
      if (hasVacancy) params.set("has_vacancy", "true");
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
      setError("加载失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, [selectedDistricts, selectedType, selectedLanguage, selectedSession, hasVacancy, searchQuery, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) { params.set(key, value); } else { params.delete(key); }
    params.set("page", "1");
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

  const totalPages = Math.ceil(count / 20);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
      <h1 className="text-h1 text-slate-950 mb-6">幼稚园</h1>

      <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />

      <FilterBar
        selectedDistricts={selectedDistricts}
        selectedType={selectedType}
        selectedLanguage={selectedLanguage}
        selectedSession={selectedSession}
        hasVacancy={hasVacancy}
        onToggleDistrict={toggleDistrict}
        onUpdateFilter={updateFilter}
      />

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => <SchoolCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-body text-slate-500">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchData}>重试</Button>
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-h2 text-slate-400 mb-2">没有找到学校</p>
          <p className="text-body text-slate-400">尝试调整筛选条件</p>
        </div>
      ) : (
        <>
          <p className="text-small text-slate-400 mb-4">共 {count} 所学校</p>
          <div className="grid gap-4">
            {schools.map((school) => (
              <SchoolCard
                key={school.id}
                id={school.id}
                nameTc={school.name_tc}
                district={school.district}
                schoolType={school.school_type}
                languagePrimary={school.language_primary}
                feeMonthlyHkd={school.fee_monthly_hkd}
                vacancy={school.vacancies?.[0] ? {
                  k1_vacancy: school.vacancies[0].k1_vacancy,
                  k2_vacancy: school.vacancies[0].k2_vacancy,
                  k3_vacancy: school.vacancies[0].k3_vacancy,
                  application_deadline: school.vacancies[0].application_deadline,
                  edb_published_date: school.vacancies[0].edb_published_date,
                } : null}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="ghost" size="sm" disabled={page <= 1}
                onClick={() => updateFilter("page", String(page - 1))}>上一页</Button>
              <span className="flex items-center text-small text-slate-400 px-3">
                {page} / {totalPages}
              </span>
              <Button variant="ghost" size="sm" disabled={page >= totalPages}
                onClick={() => updateFilter("page", String(page + 1))}>下一页</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
