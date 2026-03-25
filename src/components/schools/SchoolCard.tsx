"use client";

import { useRouter } from "next/navigation";
import { VacancyBadge } from "./VacancyBadge";
import { SchoolAvatar } from "./SchoolAvatar";
import {
  DISTRICT_LABELS,
  formatEnglishSchoolName,
  formatUpdateDate,
  getSessionTags,
  hasNurseryClass,
  isVacancyStale,
  SCHOOL_TYPE_LABELS,
} from "@/lib/utils";
import type { VacancyStatus } from "@/types/database";

interface SchoolCardProps {
  id: string;
  nameTc: string;
  nameEn?: string;
  logoUrl?: string | null;
  schoolCode?: string | null;
  district: string;
  schoolType?: string;
  sessionType?: string | null;
  gradesOffered?: string[] | null;
  vacancy?: {
    n_vacancy: VacancyStatus;
    k1_vacancy: VacancyStatus;
    k2_vacancy: VacancyStatus;
    k3_vacancy: VacancyStatus;
    edb_published_date: string | null;
  } | null;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

export function SchoolCard({
  id,
  nameTc,
  nameEn,
  logoUrl,
  schoolCode,
  district,
  schoolType,
  sessionType,
  gradesOffered,
  vacancy,
  isFavorited = false,
  onToggleFavorite,
}: SchoolCardProps) {
  const router = useRouter();
  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;

  const hasChineseName = /[\u3400-\u9fff]/.test(nameTc);
  const displayNameEn = formatEnglishSchoolName(nameEn?.trim() || nameTc);
  const primaryName = hasChineseName ? nameTc : displayNameEn;
  const secondaryName = hasChineseName && displayNameEn !== nameTc ? displayNameEn : null;

  // Derive tags
  const sessionTags = getSessionTags(sessionType ?? null);
  const showNursery = hasNurseryClass(gradesOffered ?? null);
  const schoolTypeTag = schoolType
    ? {
        label: SCHOOL_TYPE_LABELS[schoolType] ?? schoolType,
        className:
          schoolType === "international"
            ? "bg-violet-50 text-violet-700"
            : schoolType === "private_independent"
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700",
      }
    : null;

  // Build vacancy grades to display
  const vacancyGrades: Array<{ grade: string; status: VacancyStatus }> = [];
  if (vacancy) {
    vacancyGrades.push({ grade: "K1", status: vacancy.k1_vacancy });
    vacancyGrades.push({ grade: "K2", status: vacancy.k2_vacancy });
    vacancyGrades.push({ grade: "K3", status: vacancy.k3_vacancy });
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-sm transition-shadow duration-200"
      onClick={() => router.push(`/kg/${id}`)}
    >
      {/* Row 1: Avatar + Name + Favorite */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0">
          <SchoolAvatar schoolId={id} schoolName={primaryName} logoUrl={logoUrl} schoolCode={schoolCode} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">{primaryName}</h3>
          {secondaryName && (
            <p className="text-sm text-slate-400 leading-snug mt-0.5 line-clamp-1">{secondaryName}</p>
          )}
        </div>
        {/* Favorite button — no border */}
        <button
          className="flex-shrink-0 p-1 -mr-1 -mt-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          aria-label={isFavorited ? "取消收藏" : "加入收藏"}
        >
          {isFavorited ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>

      {/* Row 2: District */}
      <div className="flex items-center gap-1 text-sm text-slate-500 mb-2.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district}</span>
      </div>

      {/* Row 3: Tags */}
      {(sessionTags.length > 0 || showNursery || schoolTypeTag) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {sessionTags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
              {tag}
            </span>
          ))}
          {showNursery && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
              設 N 班
            </span>
          )}
          {schoolTypeTag && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${schoolTypeTag.className}`}>
              {schoolTypeTag.label}
            </span>
          )}
        </div>
      )}

      {/* Row 4: Vacancy status badges — K1 K2 K3 horizontal */}
      {vacancyGrades.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {vacancyGrades.map(({ grade, status }) => (
            <VacancyBadge key={grade} grade={grade} status={status} isStale={stale} />
          ))}
        </div>
      )}

      {/* Row 5: Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
        <span className="text-slate-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatUpdateDate(vacancy?.edb_published_date ?? null)}
        </span>
        <span className="text-blue-600 font-medium">
          詳情 &gt;
        </span>
      </div>
    </div>
  );
}
