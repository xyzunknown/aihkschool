"use client";

import { useRouter } from "next/navigation";
import { VacancyBadge } from "./VacancyBadge";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS, deadlineStatus, formatDateCN, isVacancyStale } from "@/lib/utils";
import type { VacancyStatus } from "@/types/database";

interface SchoolCardProps {
  id: string;
  nameTc: string;
  district: string;
  schoolType: string;
  languagePrimary: string | null;
  feeMonthlyHkd: number | null;
  vacancy?: {
    k1_vacancy: VacancyStatus;
    k2_vacancy: VacancyStatus;
    k3_vacancy: VacancyStatus;
    application_deadline: string | null;
    edb_published_date: string | null;
  } | null;
}

export function SchoolCard({
  id,
  nameTc,
  district,
  schoolType,
  languagePrimary,
  feeMonthlyHkd,
  vacancy,
}: SchoolCardProps) {
  const router = useRouter();
  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const dlStatus = vacancy ? deadlineStatus(vacancy.application_deadline) : null;

  const deadlineColors: Record<string, string> = {
    safe: "bg-green-100/80 border-green-300/40 text-green-800",
    warn: "bg-orange-100/80 border-orange-300/40 text-orange-800",
    urgent: "bg-red-100/80 border-red-300/40 text-red-800",
    past: "bg-slate-100/80 border-slate-200/40 text-slate-500",
  };

  return (
    <div
      className="relative glass-card rounded-card p-7 cursor-pointer transition-all duration-200 ease-out hover:scale-[1.02]"
      onClick={() => router.push(`/kg/${id}`)}
    >
      {/* Deadline pill */}
      {vacancy?.application_deadline && dlStatus && dlStatus !== "past" && (
        <div
          className={`absolute top-6 right-6 px-3 py-1 rounded-pill text-[11px] font-semibold backdrop-blur-sm border ${deadlineColors[dlStatus]}`}
        >
          截止 {formatDateCN(vacancy.application_deadline)}
        </div>
      )}

      {/* District */}
      <div className="text-[11px] font-medium text-slate-400 tracking-wide">
        {DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district}
      </div>

      {/* Name */}
      <h3 className="text-[17px] font-semibold text-slate-950 leading-tight mt-1 pr-24 tracking-[-0.02em]">
        {nameTc}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-[7px] mt-4">
        <span className="px-2.5 py-1 rounded-pill text-[11px] font-medium bg-slate-100/80 text-slate-600 border border-slate-200/40">
          {SCHOOL_TYPE_LABELS[schoolType] ?? schoolType}
        </span>
        {feeMonthlyHkd !== null && (
          <span className="px-2.5 py-1 rounded-pill text-[11px] font-medium bg-slate-100/80 text-slate-600 border border-slate-200/40">
            HKD {feeMonthlyHkd.toLocaleString()}
          </span>
        )}
        {languagePrimary && (
          <span className="px-2.5 py-1 rounded-pill text-[11px] font-medium bg-slate-100/80 text-slate-600 border border-slate-200/40">
            {languagePrimary}
          </span>
        )}
      </div>

      {/* Vacancy badges */}
      {vacancy && (
        <div className="flex flex-wrap gap-2 mt-4">
          <VacancyBadge grade="K1" status={vacancy.k1_vacancy} isStale={stale} />
          <VacancyBadge grade="K2" status={vacancy.k2_vacancy} isStale={stale} />
          <VacancyBadge grade="K3" status={vacancy.k3_vacancy} isStale={stale} />
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200/20 flex justify-between items-center">
        <div className="text-[11px] text-slate-400">
          {vacancy?.edb_published_date
            ? `更新于 ${formatDateCN(vacancy.edb_published_date)}`
            : "暂无更新"}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>详情</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
