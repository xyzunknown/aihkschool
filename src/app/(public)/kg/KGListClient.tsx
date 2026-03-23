"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS } from "@/lib/utils";
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

  // Parse filter state from URL
  const selectedDistricts = useMemo(
    () => searchParams.getAll("district") as District[],
    [searchParams]
  );
  const selectedType = searchParams.get("type") as SchoolType | null;
  const selectedLanguage = searchParams.get("language");
  const selectedSession = searchParams.get("session");
  const hasVacancy = searchParams.get("has_vacancy") === "true";
  const searchQuery = searchParams.get("search") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);

  // Fetch schools
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`/kg?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
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

      {/* Search */}
      <div className="bg-white/50 backdrop-blur-2xl border border-slate-200/50 rounded-card px-5 py-3 flex items-center gap-3 mb-6">
        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="text"
          placeholder="搜索学校名称…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 bg-transparent text-body text-slate-900 placeholder:text-slate-400 outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* District multi-select */}
        <div className="relative">
          <button
            onClick={() => setShowDistrictFilter(!showDistrictFilter)}
            className={`px-3 py-1.5 rounded-pill text-xs font-medium border transition-colors ${
              selectedDistricts.length > 0
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white/70 text-slate-600 border-slate-200/50"
            }`}
          >
            地区 {selectedDistricts.length > 0 && `(${selectedDistricts.length})`}
          </button>
          {showDistrictFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-slate-200/50 p-4 z-30 w-64 max-h-64 overflow-y-auto">
              {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 py-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDistricts.includes(key as District)}
                    onChange={() => toggleDistrict(key as District)}
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* School type */}
        {Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => updateFilter("type", selectedType === key ? null : key)}
            className={`px-3 py-1.5 rounded-pill text-xs font-medium border transition-colors ${
              selectedType === key
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white/70 text-slate-600 border-slate-200/50"
            }`}
          >
            {label}
          </button>
        ))}

        {/* Has vacancy toggle */}
        <button
          onClick={() => updateFilter("has_vacancy", hasVacancy ? null : "true")}
          className={`px-3 py-1.5 rounded-pill text-xs font-medium border transition-colors ${
            hasVacancy
              ? "bg-green-100/80 text-green-800 border-green-300/40"
              : "bg-white/70 text-slate-600 border-slate-200/50"
          }`}
        >
          仅有空缺
        </button>
      </div>

      {/* Close district filter on click outside */}
      {showDistrictFilter && (
        <div className="fixed inset-0 z-20" onClick={() => setShowDistrictFilter(false)} />
      )}

      {/* Results */}
      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SchoolCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-body text-slate-500">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchData}>
            重试
          </Button>
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-h2 text-slate-400 mb-2">没有找到学校</p>
          <p className="text-body text-slate-400">尝试调整筛选条件</p>
        </div>
      ) : (
        <>
          <p className="text-small text-slate-400 mb-4">
            共 {count} 所学校
          </p>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => updateFilter("page", String(page - 1))}
              >
                上一页
              </Button>
              <span className="flex items-center text-small text-slate-400 px-3">
                {page} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => updateFilter("page", String(page + 1))}
              >
                下一页
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
