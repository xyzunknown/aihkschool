"use client";

import { useRouter } from "next/navigation";
import { VacancyBadge } from "./VacancyBadge";
import { SchoolAvatar } from "./SchoolAvatar";
import {
  DISTRICT_LABELS,
  formatEnglishSchoolName,
  formatUpdateDate,
  getAvatarColor,
  getSessionTags,
  isVacancyStale,
  SCHOOL_TYPE_LABELS,
  SCHOOLAND_SESSION_LABELS,
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
  schoolandSessionLabel?: string | null;
  feeMonthlyHkd?: number | null;
  vacancy?: {
    n_vacancy: VacancyStatus;
    k1_vacancy: VacancyStatus;
    k2_vacancy: VacancyStatus;
    k3_vacancy: VacancyStatus;
    edb_published_date: string | null;
  } | null;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
  distanceKm?: number;
  isInCompare?: boolean;
  onToggleCompare?: () => void;
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
  schoolandSessionLabel,
  feeMonthlyHkd,
  vacancy,
  isFavorited = false,
  onToggleFavorite,
  distanceKm,
  isInCompare = false,
  onToggleCompare,
}: SchoolCardProps) {
  const router = useRouter();
  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const handleNavigate = () => router.push(`/kg/${id}`);

  const hasChineseName = /[\u3400-\u9fff]/.test(nameTc);
  const displayNameEn = formatEnglishSchoolName(nameEn?.trim() || nameTc);
  const primaryName = hasChineseName ? nameTc : displayNameEn;
  const secondaryName = hasChineseName && displayNameEn !== nameTc ? displayNameEn : null;

  const avatarColors = getAvatarColor(id);
  const schoolTypeInfo = getSchoolTypeInfo(schoolType);
  const districtLabel = DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district;
  const distanceText = formatDistance(distanceKm);
  const feeText = formatMonthlyFee(feeMonthlyHkd);
  const sessionText = formatSessionLabel(sessionType, schoolandSessionLabel);

  // Build vacancy grades to display
  const vacancyGrades: Array<{ grade: string; status: VacancyStatus }> = [];
  if (vacancy) {
    vacancyGrades.push({ grade: "K1", status: vacancy.k1_vacancy });
    vacancyGrades.push({ grade: "K2", status: vacancy.k2_vacancy });
    vacancyGrades.push({ grade: "K3", status: vacancy.k3_vacancy });
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-5 cursor-pointer hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
      role="link"
      tabIndex={0}
      aria-label={`前往 ${primaryName}`}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNavigate();
        }
      }}
    >
      {/* Row 1: Avatar + Name + Favorite */}
      <div className="flex items-start gap-3">
        <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[14px] ${avatarColors.bg}`}>
          <SchoolAvatar
            schoolId={id}
            schoolName={primaryName}
            logoUrl={logoUrl}
            schoolCode={schoolCode}
            size="sm"
            shape="rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">{primaryName}</h3>
          {secondaryName && (
            <p className="text-sm text-slate-400 leading-snug mt-0.5 line-clamp-1">{secondaryName}</p>
          )}
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold leading-tight text-slate-500">
            <span className={`h-1.5 w-1.5 rounded-full ${schoolTypeInfo.dotClass}`} aria-hidden="true" />
            <span>{schoolTypeInfo.label}</span>
          </p>
        </div>
        {/* Favorite + Compare buttons */}
        <div className="flex-shrink-0 flex items-center gap-0.5">
          {/* Compare button */}
          {onToggleCompare && (
            <button
              type="button"
              className="p-1"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare();
              }}
              aria-label={isInCompare ? "取消對比" : "加入對比"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isInCompare ? "#0ea5e9" : "#cbd5e1"} strokeWidth="1.5">
                <rect x="3" y="3" width="8" height="18" rx="1.5" fill={isInCompare ? "#e0f2fe" : "none"} />
                <rect x="13" y="3" width="8" height="18" rx="1.5" fill={isInCompare ? "#e0f2fe" : "none"} />
              </svg>
            </button>
          )}
          {/* Favorite button */}
        <button
          type="button"
          className="p-1 -mr-1"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
            aria-label={isFavorited ? "取消收藏" : "加入收藏"}
          >
          {isFavorited ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#f59e0b" stroke="none" className="animate-heart-fill">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
        </div>
      </div>

      <div className="my-4 border-t border-slate-100" />

      {/* Row 2: Three key stats */}
      <div className="grid grid-cols-3">
        <StatCell label="距離" value={distanceText.value} unit={distanceText.unit} />
        <StatCell label="學費" value={feeText.value} unit={feeText.unit} hasDivider />
        <StatCell label="班別" value={sessionText} hasDivider />
      </div>

      {/* Row 3: Vacancy status badges — K1 K2 K3 horizontal */}
      {vacancyGrades.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {vacancyGrades.map(({ grade, status }) => (
            <VacancyBadge key={grade} grade={grade} status={status} isStale={stale} />
          ))}
        </div>
      )}

      {/* Row 4: Footer */}
      <div className="mt-4 flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
        <span className="min-w-0 text-slate-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="truncate">{formatUpdateDate(vacancy?.edb_published_date ?? null)} · {districtLabel}</span>
        </span>
        <span className="ml-3 flex-shrink-0 text-blue-600 font-medium">
          詳情 &gt;
        </span>
      </div>
    </div>
  );
}

function StatCell({
  label,
  value,
  unit,
  hasDivider = false,
}: {
  label: string;
  value: string;
  unit?: string;
  hasDivider?: boolean;
}) {
  return (
    <div className={`${hasDivider ? "border-l border-slate-100 pl-3" : "pr-3"} min-w-0`}>
      <p className="text-[10px] font-semibold leading-none text-slate-400">{label}</p>
      <p className="mt-1.5 truncate text-[15px] font-extrabold leading-tight text-slate-900">
        {value}
        {unit && <span className="ml-0.5 text-[10px] font-semibold text-slate-400">{unit}</span>}
      </p>
    </div>
  );
}

function formatDistance(distanceKm?: number): { value: string; unit?: string } {
  if (distanceKm == null) return { value: "未定位" };
  if (distanceKm < 1) return { value: String(Math.round(distanceKm * 1000)), unit: "m" };
  return { value: distanceKm.toFixed(1), unit: "km" };
}

function formatMonthlyFee(feeMonthlyHkd?: number | null): { value: string; unit?: string } {
  if (feeMonthlyHkd == null) return { value: "查官網" };
  if (feeMonthlyHkd === 0) return { value: "免費", unit: "計劃" };
  return { value: `$${feeMonthlyHkd.toLocaleString("zh-HK")}`, unit: "/月" };
}

function formatSessionLabel(sessionType?: string | null, schoolandSessionLabel?: string | null): string {
  if (schoolandSessionLabel) {
    return SCHOOLAND_SESSION_LABELS[schoolandSessionLabel] ?? schoolandSessionLabel;
  }

  const sessionTags = getSessionTags(sessionType ?? null);
  return sessionTags[0]?.replace("班", "") ?? "待更新";
}

function getSchoolTypeInfo(schoolType?: string) {
  if (schoolType === "international") {
    return {
      label: `${SCHOOL_TYPE_LABELS[schoolType] ?? "國際"} · 國際課程`,
      dotClass: "bg-violet-500",
    };
  }

  if (schoolType === "private_independent") {
    return {
      label: `${SCHOOL_TYPE_LABELS[schoolType] ?? "私立獨立"} · 本地課程`,
      dotClass: "bg-blue-500",
    };
  }

  return {
    label: `${schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : "非牟利"} · 本地課程`,
    dotClass: "bg-emerald-600",
  };
}
