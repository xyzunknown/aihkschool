"use client";

import { useRouter } from "next/navigation";
import { VacancyBadge } from "./VacancyBadge";
import { SchoolAvatar } from "./SchoolAvatar";
import { SchoolActionButton } from "@/components/ui/SchoolActionIcon";
import { getAdmissionSummary } from "@/lib/schools/admissions";
import {
  DISTRICT_LABELS,
  formatEnglishSchoolName,
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
      className="flex h-full min-h-[376px] cursor-pointer flex-col rounded-card border border-surface-border bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
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
      {/* Row 1: Avatar + Name + Actions */}
      <div className="flex items-start gap-4">
        <SchoolAvatar
          schoolId={id}
          schoolName={primaryName}
          logoUrl={logoUrl}
          schoolCode={schoolCode}
          size="lg"
          shape="rounded"
        />
        <div className="min-w-0 flex-1">
          <h3 className="min-h-[44px] text-[20px] font-extrabold leading-tight text-slate-950 line-clamp-2">{primaryName}</h3>
          {secondaryName && (
            <p className="mt-1 text-base leading-snug text-slate-400 line-clamp-1">{secondaryName}</p>
          )}
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
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

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
        <InfoChip label={schoolTypeInfo.shortLabel} tone="brand" />
        <InfoChip label={sessionText === "—" ? "班別待更新" : `${sessionText}班`} />
        <InfoChip label={hasNurseryVacancy(vacancy?.n_vacancy) ? "設 N 班" : "N 班待查"} />
        <InfoChip label={formatLocationChip(distanceKm, districtLabel)} />
      </div>

      {/* Row 3: K1/K2/K3 vacancy spectrum. */}
      <div className="mt-5 rounded-[18px] border border-cream-200 bg-cream-50/60 p-3">
        {vacancyGrades.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {vacancyGrades.map(({ grade, status }) => (
              <VacancyBadge key={grade} grade={grade} status={status} isStale={stale} variant="block" />
            ))}
          </div>
        ) : isPrivateOrInternational ? (
          <div className="flex min-h-[86px] items-center justify-center rounded-[14px] border border-brand-200 bg-brand-50 px-3 text-sm font-semibold text-brand-700">
            <span className="mr-1 text-xs font-bold opacity-75">招生</span>
            <span className="truncate">{admissionText}</span>
          </div>
        ) : null}
      </div>

      {/* Row 4: Footer */}
      <div className="mt-auto flex items-end justify-between gap-4 pt-5 text-sm">
        <span className="min-w-0 text-slate-400">
          <span className="truncate">{formatFullUpdateDate(vacancy?.edb_published_date ?? null)}</span>
        </span>
        <span className="inline-flex h-12 flex-shrink-0 items-center gap-2 rounded-full bg-forest-700 px-6 text-base font-extrabold text-white shadow-sm">
          詳情
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function InfoChip({ label, tone = "neutral" }: { label: string; tone?: "brand" | "neutral" }) {
  return (
    <span className={`inline-flex min-h-9 items-center rounded-full px-3 font-semibold leading-none ${
      tone === "brand" ? "bg-brand-50 text-brand-700" : "bg-cream-100 text-slate-600"
    }`}>
      {label}
    </span>
  );
}

function formatLocationChip(distanceKm: number | undefined, districtLabel: string): string {
  const district = districtLabel.replace(/區$/, "");
  if (distanceKm == null) return `📍 ${district}`;
  if (distanceKm < 1) return `📍 ${district} · ${Math.round(distanceKm * 1000)}m`;
  return `📍 ${district} · ${distanceKm.toFixed(1)}km`;
}

function hasNurseryVacancy(status?: VacancyStatus): boolean {
  return status === "has_vacancy" || status === "waiting_list" || status === "no_vacancy";
}

function formatFullUpdateDate(dateStr: string | null): string {
  if (!dateStr) return "更新於 暫無日期";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "更新於 暫無日期";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `更新於 ${year}-${month}-${day}`;
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
      shortLabel: SCHOOL_TYPE_LABELS[schoolType] ?? "國際",
      dotClass: "bg-forest-500",
    };
  }

  if (schoolType === "private_independent") {
    return {
      label: `${SCHOOL_TYPE_LABELS[schoolType] ?? "私立獨立"} · 本地課程`,
      shortLabel: SCHOOL_TYPE_LABELS[schoolType] ?? "私立獨立",
      dotClass: "bg-brand-500",
    };
  }

  return {
    label: `${schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : "非牟利"} · 本地課程`,
    shortLabel: schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : "非牟利",
    dotClass: "bg-emerald-600",
  };
}
