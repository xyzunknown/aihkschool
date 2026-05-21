"use client";

import { useRouter } from "next/navigation";
import { VacancyBadge } from "./VacancyBadge";
import { SchoolAvatar } from "./SchoolAvatar";
import { SchoolActionButton } from "@/components/ui/SchoolActionIcon";
import { getAdmissionSummary } from "@/lib/schools/admissions";
import {
  DISTRICT_LABELS,
  formatEnglishSchoolName,
  formatUpdateDate,
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
  applicationStatus?: string | null;
  applicationDetails?: string | null;
  applicationUrl?: string | null;
  admissionSummary?: string | null;
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
  applicationStatus,
  applicationDetails,
  applicationUrl,
  admissionSummary,
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

  const schoolTypeInfo = getSchoolTypeInfo(schoolType);
  const districtLabel = DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district;
  const primaryStat = formatPrimaryStat(distanceKm, districtLabel);
  const feeText = formatMonthlyFee(feeMonthlyHkd);
  const sessionText = formatSessionLabel(sessionType, schoolandSessionLabel);
  const isPrivateOrInternational = schoolType === "international" || schoolType === "private_independent";
  const admissionText = admissionSummary || getAdmissionSummary({
    schoolType,
    applicationStatus,
    applicationDetails,
    applicationUrl,
    vacancy,
  });
  // Build vacancy grades to display
  const vacancyGrades: Array<{ grade: string; status: VacancyStatus }> = [];
  if (vacancy) {
    vacancyGrades.push({ grade: "K1", status: vacancy.k1_vacancy });
    vacancyGrades.push({ grade: "K2", status: vacancy.k2_vacancy });
    vacancyGrades.push({ grade: "K3", status: vacancy.k3_vacancy });
  }

  return (
    <div
      className="flex h-full min-h-[286px] cursor-pointer flex-col rounded-card border border-surface-border bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
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
        <SchoolAvatar
          schoolId={id}
          schoolName={primaryName}
          logoUrl={logoUrl}
          schoolCode={schoolCode}
          shape="rounded"
        />
        <div className="min-w-0 flex-1">
          <h3 className="min-h-[44px] text-base font-bold leading-snug text-slate-900 line-clamp-2">{primaryName}</h3>
          {secondaryName && (
            <p className="text-sm text-slate-400 leading-snug mt-0.5 line-clamp-1">{secondaryName}</p>
          )}
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold leading-tight text-slate-500">
            <span className={`h-1.5 w-1.5 rounded-full ${schoolTypeInfo.dotClass}`} aria-hidden="true" />
            <span>{schoolTypeInfo.label}</span>
          </p>
        </div>
        {/* Favorite + Compare buttons */}
        <div className="flex-shrink-0 flex items-center gap-1.5">
          {/* Compare button */}
          {onToggleCompare && (
            <SchoolActionButton
              kind="compare"
              active={isInCompare}
              label={isInCompare ? "取消對比" : "加入對比"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare();
              }}
            />
          )}
          {/* Favorite button */}
          <SchoolActionButton
            kind="favorite"
            active={isFavorited}
            label={isFavorited ? "取消收藏" : "加入收藏"}
            className={isFavorited ? "animate-heart-fill" : ""}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
          />
        </div>
      </div>

      <div className="my-4 border-t border-slate-100" />

      {/* Row 2: Three key stats */}
      <div className="grid grid-cols-3">
        <StatCell label={primaryStat.label} value={primaryStat.value} unit={primaryStat.unit} />
        <StatCell label="學費" value={feeText.value} unit={feeText.unit} hasDivider />
        <StatCell label="班別" value={sessionText} hasDivider />
      </div>

      {/* Row 3: KEP vacancy only for schools that participate in the EDB scheme. */}
      <div className="mt-4 min-h-9">
        {vacancyGrades.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
          {vacancyGrades.map(({ grade, status }) => (
            <VacancyBadge key={grade} grade={grade} status={status} isStale={stale} />
          ))}
          </div>
        ) : isPrivateOrInternational ? (
          <div className="flex min-h-9 items-center justify-center rounded-full border border-brand-200 bg-brand-50 px-3 text-xs font-semibold text-brand-700">
            <span className="mr-1 text-[10px] font-bold opacity-75">招生</span>
            <span className="truncate">{admissionText}</span>
          </div>
        ) : null}
      </div>

      {/* Row 4: Footer */}
      <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
        <span className="min-w-0 text-slate-400 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-500/55">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="truncate">{formatUpdateDate(vacancy?.edb_published_date ?? null)} · {districtLabel}</span>
        </span>
        <span className="ml-3 inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-brand-700 font-semibold">
          詳情
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
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

function formatPrimaryStat(distanceKm: number | undefined, districtLabel: string): { label: string; value: string; unit?: string } {
  if (distanceKm == null) return { label: "地區", value: districtLabel };
  if (distanceKm < 1) return { label: "距離", value: String(Math.round(distanceKm * 1000)), unit: "m" };
  return { label: "距離", value: distanceKm.toFixed(1), unit: "km" };
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
  return sessionTags[0]?.replace("班", "") ?? "—";
}

function getSchoolTypeInfo(schoolType?: string) {
  if (schoolType === "international") {
    return {
      label: `${SCHOOL_TYPE_LABELS[schoolType] ?? "國際"} · 國際課程`,
      dotClass: "bg-forest-500",
    };
  }

  if (schoolType === "private_independent") {
    return {
      label: `${SCHOOL_TYPE_LABELS[schoolType] ?? "私立獨立"} · 本地課程`,
      dotClass: "bg-brand-500",
    };
  }

  return {
    label: `${schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : "非牟利"} · 本地課程`,
    dotClass: "bg-emerald-600",
  };
}
