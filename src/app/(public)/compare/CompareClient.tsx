"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SchoolAvatar } from "@/components/schools/SchoolAvatar";
import { VacancyBadge } from "@/components/schools/VacancyBadge";
import { Button } from "@/components/ui/Button";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  SESSION_TYPE_LABELS,
  formatEnglishSchoolName,
  formatFee,
  getLanguageLabel,
} from "@/lib/utils";
import type { VacancyStatus } from "@/types/database";

interface SchoolCompareData {
  id: string;
  school_code: string | null;
  name_tc: string;
  name_en: string | null;
  logo_url: string | null;
  district: string;
  school_type: string;
  kep_participant?: boolean;
  session_type: string | null;
  grades_offered: string[] | null;
  language_primary: string | null;
  fee_monthly_hkd: number | null;
  fee_annual_hkd?: number | null;
  application_fee_hkd?: number | null;
  registration_fee_hkd?: number | null;
  vacancy?: {
    k1_vacancy: VacancyStatus;
    k2_vacancy: VacancyStatus;
    k3_vacancy: VacancyStatus;
    n_vacancy: VacancyStatus;
    edb_published_date: string | null;
  } | null;
}

function hasNursery(grades: string[] | null): boolean {
  if (!grades) return false;
  return grades.some((g) => g.toUpperCase() === "N" || g === "nursery" || g === "PN");
}

// Check if values differ across schools
function valuesDiffer(values: (string | null | undefined)[]): boolean {
  const nonNull = values.filter((v) => v != null);
  if (nonNull.length <= 1) return false;
  return new Set(nonNull).size > 1;
}

async function fetchSchoolForCompare(id: string): Promise<SchoolCompareData | null> {
  try {
    const [schoolRes, vacancyRes] = await Promise.all([
      fetch(`/api/schools/${id}`),
      fetch(`/api/vacancies/${id}`),
    ]);
    const schoolJson = await schoolRes.json();
    const vacancyJson = await vacancyRes.json();

    if (!schoolJson || schoolJson.error) return null;

    const school = schoolJson.data ?? schoolJson;
    return {
      id: school.id,
      school_code: school.school_code,
      name_tc: school.name_tc,
      name_en: school.name_en,
      logo_url: school.logo_url,
      district: school.district,
      school_type: school.school_type,
      kep_participant: school.kep_participant,
      session_type: school.session_type,
      grades_offered: school.grades_offered,
      language_primary: school.language_primary,
      fee_monthly_hkd: school.fee_monthly_hkd,
      fee_annual_hkd: school.fee_annual_hkd ?? null,
      application_fee_hkd: school.application_fee_hkd ?? null,
      registration_fee_hkd: school.registration_fee_hkd ?? null,
      vacancy: vacancyJson?.data
        ? {
            k1_vacancy: vacancyJson.data.k1_vacancy,
            k2_vacancy: vacancyJson.data.k2_vacancy,
            k3_vacancy: vacancyJson.data.k3_vacancy,
            n_vacancy: vacancyJson.data.n_vacancy,
            edb_published_date: vacancyJson.data.edb_published_date,
          }
        : null,
    };
  } catch {
    return null;
  }
}

interface CompareRowProps {
  label: string;
  values: React.ReactNode[];
  schoolIds: string[];
  highlight?: boolean;
}

function CompareRow({ label, values, schoolIds, highlight }: CompareRowProps) {
  return (
    <tr className={highlight ? "bg-amber-50/50" : ""}>
      <td className="sticky left-0 z-10 bg-inherit py-3 px-4 text-xs font-medium text-slate-500 whitespace-nowrap border-b border-slate-100">
        {label}
      </td>
      {values.map((val, i) => (
        <td key={schoolIds[i]} className="py-3 px-4 text-sm text-slate-900 border-b border-slate-100 min-w-[160px]">
          {val ?? "—"}
        </td>
      ))}
    </tr>
  );
}

export function CompareClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [schools, setSchools] = useState<SchoolCompareData[]>([]);
  const [loading, setLoading] = useState(true);

  const idsParam = searchParams.get("ids") ?? "";
  const ids = idsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  const fetchAll = useCallback(async () => {
    const currentIds = idsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
    if (currentIds.length === 0) {
      setSchools([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const results = await Promise.all(currentIds.map(fetchSchoolForCompare));
    setSchools(results.filter((r): r is SchoolCompareData => r !== null));
    setLoading(false);
  }, [idsParam]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const removeSchool = (id: string) => {
    const newIds = ids.filter((i) => i !== id);
    if (newIds.length === 0) {
      router.push("/kg");
    } else {
      router.push(`/compare?ids=${newIds.join(",")}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="h-64 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (schools.length < 2) {
    return (
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 text-center">
        <p className="text-xl font-semibold text-slate-950 mb-2">
          請至少選擇 2 所學校進行對比
        </p>
        <p className="text-base text-slate-500 mb-6">
          前往學校列表添加學校到對比
        </p>
        <Link href="/kg">
          <Button variant="primary">搵學校</Button>
        </Link>
      </div>
    );
  }

  const schoolIds = schools.map((s) => s.id);
  const districtValues = schools.map((s) => DISTRICT_LABELS[s.district as keyof typeof DISTRICT_LABELS] ?? s.district);
  const typeValues = schools.map((s) => SCHOOL_TYPE_LABELS[s.school_type] ?? s.school_type);
  const kepValues = schools.map((s) => (s.kep_participant ? "✅ 已參加" : "❌ 未參加"));
  const sessionValues = schools.map((s) => SESSION_TYPE_LABELS[s.session_type ?? ""] ?? "—");
  const nurseryValues = schools.map((s) => (hasNursery(s.grades_offered) ? "✅" : "❌"));
  const langValues = schools.map((s) => getLanguageLabel(s.language_primary));
  const monthlyValues = schools.map((s) => formatFee(s.fee_monthly_hkd));
  const annualValues = schools.map((s) => formatFee(s.fee_annual_hkd));
  const appFeeValues = schools.map((s) => formatFee(s.application_fee_hkd));
  const regFeeValues = schools.map((s) => formatFee(s.registration_fee_hkd));

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 mb-1">
            學校對比
          </h1>
          <p className="text-sm text-slate-500">
            並排對比 {schools.length} 所學校的關鍵資訊
          </p>
        </div>
        <Link href="/kg">
          <Button variant="secondary" size="sm">
            + 搵更多學校
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white py-3 px-4 border-b border-slate-200" />
              {schools.map((school) => {
                const displayNameEn = formatEnglishSchoolName(school.name_en?.trim() || school.name_tc);
                return (
                  <th key={school.id} className="py-4 px-4 border-b border-slate-200 min-w-[160px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative">
                        <SchoolAvatar
                          schoolId={school.id}
                          schoolName={school.name_tc}
                          logoUrl={school.logo_url}
                          schoolCode={school.school_code}
                        />
                        <button
                          onClick={() => removeSchool(school.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                          aria-label={`移除 ${school.name_tc}`}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                      <Link href={`/kg/${school.id}`} className="hover:underline text-center">
                        <p className="text-sm font-bold text-slate-950 leading-snug">{school.name_tc}</p>
                        <p className="text-xs text-slate-400 leading-snug mt-0.5">{displayNameEn}</p>
                      </Link>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="地區" values={districtValues} schoolIds={schoolIds} highlight={valuesDiffer(districtValues)} />
            <CompareRow label="學校類別" values={typeValues} schoolIds={schoolIds} highlight={valuesDiffer(typeValues)} />
            <CompareRow label="KEP 計劃" values={kepValues} schoolIds={schoolIds} highlight={valuesDiffer(kepValues)} />
            <CompareRow label="班制" values={sessionValues} schoolIds={schoolIds} highlight={valuesDiffer(sessionValues)} />
            <CompareRow label="設 N 班" values={nurseryValues} schoolIds={schoolIds} highlight={valuesDiffer(nurseryValues)} />
            <CompareRow
              label="K1 學位"
              schoolIds={schoolIds}
              values={schools.map((s) =>
                s.vacancy ? (
                  <VacancyBadge key={s.id} grade="K1" status={s.vacancy.k1_vacancy} isStale={false} />
                ) : (
                  "—"
                ),
              )}
            />
            <CompareRow
              label="K2 學位"
              schoolIds={schoolIds}
              values={schools.map((s) =>
                s.vacancy ? (
                  <VacancyBadge key={s.id} grade="K2" status={s.vacancy.k2_vacancy} isStale={false} />
                ) : (
                  "—"
                ),
              )}
            />
            <CompareRow
              label="K3 學位"
              schoolIds={schoolIds}
              values={schools.map((s) =>
                s.vacancy ? (
                  <VacancyBadge key={s.id} grade="K3" status={s.vacancy.k3_vacancy} isStale={false} />
                ) : (
                  "—"
                ),
              )}
            />
            <CompareRow label="月費" values={monthlyValues} schoolIds={schoolIds} highlight={valuesDiffer(monthlyValues)} />
            <CompareRow label="全年學費" values={annualValues} schoolIds={schoolIds} highlight={valuesDiffer(annualValues)} />
            <CompareRow label="報名費" values={appFeeValues} schoolIds={schoolIds} highlight={valuesDiffer(appFeeValues)} />
            <CompareRow label="註冊費" values={regFeeValues} schoolIds={schoolIds} highlight={valuesDiffer(regFeeValues)} />
            <CompareRow label="教學語言" values={langValues} schoolIds={schoolIds} highlight={valuesDiffer(langValues)} />
          </tbody>
        </table>
      </div>

      {/* Share hint */}
      <p className="mt-4 text-xs text-slate-400 text-center">
        💡 你可以複製網址分享對比結果給家人
      </p>
    </div>
  );
}
