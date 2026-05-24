"use client";

import { useRouter } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react";
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
  hasNursery?: boolean;
  compact?: boolean;
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
  hasNursery,
  compact = false,
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
  const showNurseryChip = hasNursery ?? hasNurseryVacancy(vacancy?.n_vacancy);
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
      className={`flex h-full cursor-pointer flex-col rounded-card border border-surface-border bg-white p-5 shadow-soft transition-colors duration-200 hover:border-forest-200 ${
        compact ? "min-h-[280px]" : "min-h-[280px]"
      }`}
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
      <div className={`flex items-start ${compact ? "gap-3" : "gap-4"}`}>
        <SchoolAvatar
          schoolId={id}
          schoolName={primaryName}
          logoUrl={logoUrl}
          schoolCode={schoolCode}
          size={compact ? "md" : "lg"}
          shape="rounded"
        />
        <div className="min-w-0 flex-1">
          <h3 className="min-h-[44px] text-h2 font-extrabold text-ink-900 line-clamp-2">{primaryName}</h3>
          {secondaryName && (
            <p className="mt-1 text-small leading-snug text-ink-500 line-clamp-1">{secondaryName}</p>
          )}
        </div>
        <div className={`flex-shrink-0 flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
          {onToggleCompare && (
            <SchoolActionButton
              kind="compare"
              active={isInCompare}
              size={compact ? "sm" : "md"}
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
            size={compact ? "sm" : "md"}
            label={isFavorited ? "取消收藏" : "加入收藏"}
            className={isFavorited ? "animate-heart-fill" : ""}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
          />
        </div>
      </div>

      <div className={`${compact ? "mt-3 gap-1.5" : "mt-5 gap-2"} flex flex-wrap items-center text-small`}>
        <InfoChip label={schoolTypeInfo.shortLabel} tone="brand" compact={compact} />
        <InfoChip label={sessionText === "—" ? "班別待更新" : `${sessionText}班`} compact={compact} />
        {showNurseryChip ? <InfoChip label="設有 N 班" compact={compact} /> : null}
        <InfoChip label={formatLocationChip(distanceKm, districtLabel)} compact={compact} />
      </div>

      {/* Row 3: K1/K2/K3 vacancy spectrum. */}
      <div className={`${compact ? "mt-3 p-2" : "mt-5 p-3"} rounded-button border border-surface-border bg-cream-50/60`}>
        {vacancyGrades.length > 0 ? (
          <div className={`grid grid-cols-3 ${compact ? "gap-2" : "gap-3"}`}>
            {vacancyGrades.map(({ grade, status }) => (
              <VacancyBadge key={grade} grade={grade} status={status} isStale={stale} variant={compact ? "compactBlock" : "block"} />
            ))}
          </div>
        ) : isPrivateOrInternational ? (
          <div className={`${compact ? "min-h-[58px] text-label" : "min-h-[86px] text-small"} flex items-center justify-center rounded-button border border-forest-200 bg-forest-50 px-3 font-semibold text-forest-700`}>
            <span className="mr-1 text-label font-bold opacity-75">招生</span>
            <span className="truncate">{admissionText}</span>
          </div>
        ) : null}
      </div>

      {/* Row 4: Footer */}
      <div className={`${compact ? "gap-3 pt-3" : "gap-4 pt-4"} mt-auto flex items-center justify-between text-small`}>
        <span className="min-w-0 text-ink-500">
          <span className="truncate">{formatFullUpdateDate(vacancy?.edb_published_date ?? null)}</span>
        </span>
        <span className="inline-flex h-9 flex-shrink-0 items-center gap-1.5 rounded-pill border border-forest-600/60 bg-white px-4 text-small font-extrabold text-forest-700">
          詳情
          <CaretRight aria-hidden="true" size={16} weight="bold" />
        </span>
      </div>
    </div>
  );
}

function InfoChip({ label, tone = "neutral", compact = false }: { label: string; tone?: "brand" | "neutral"; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full font-semibold leading-none ${compact ? "min-h-7 px-2.5" : "min-h-9 px-3"} ${
      tone === "brand" ? "bg-forest-50 text-forest-700" : "bg-cream-100 text-ink-700"
    }`}>
      {label}
    </span>
  );
}

function formatLocationChip(distanceKm: number | undefined, districtLabel: string): string {
  const district = districtLabel.replace(/區$/, "");
  if (distanceKm == null) return district;
  if (distanceKm < 1) return `${district} · ${Math.round(distanceKm * 1000)}m`;
  return `${district} · ${distanceKm.toFixed(1)}km`;
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
      dotClass: "bg-forest-500",
    };
  }

  return {
    label: `${schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : "非牟利"} · 本地課程`,
    shortLabel: schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : "非牟利",
    dotClass: "bg-forest-600",
  };
}
