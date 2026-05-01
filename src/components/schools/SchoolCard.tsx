"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SchoolAvatar } from "./SchoolAvatar";
import {
  DISTRICT_LABELS,
  formatEnglishSchoolName,
  formatUpdateDate,
  getSessionTags,
  hasNurseryClass,
  isVacancyStale,
  normalizeVacancyStatus,
  SCHOOL_TYPE_LABELS,
  SCHOOLAND_NURSERY_SERVICE_LABELS,
  SCHOOLAND_SESSION_LABELS,
  SCHOOLAND_SIZE_LABELS,
  VACANCY_STATUS_LABELS,
} from "@/lib/utils";
import type { VacancyStatus } from "@/types/database";

const COVER_IMAGES = [
  "/images/banners/暖金色晨光-Banner-01.png",
  "/images/banners/美术室午后-Banner-02.png",
  "/images/banners/阅读角午后-Banner-03.png",
  "/images/banners/树叶-Banner-04.png",
  "/images/banners/积木-Banner-05.png",
  "/images/banners/柜子-Banner-06.png",
];

interface SchoolCardProps {
  id: string;
  nameTc: string;
  nameEn?: string;
  logoUrl?: string | null;
  schoolCode?: string | null;
  district: string;
  schoolType?: string;
  sessionType?: string | null;
  schoolandGroupTag?: string | null;
  schoolandFreeScheme?: boolean | null;
  schoolandNurseryService?: string | null;
  schoolandSizeLabel?: string | null;
  schoolandSessionLabel?: string | null;
  gradesOffered?: string[] | null;
  admissionSummary?: string | null;
  showAdmissionSummary?: boolean;
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
  enrichment?: {
    application_url: string | null;
    open_day_date: string | null;
    open_day_details: string | null;
  } | null;
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
  schoolandGroupTag,
  schoolandFreeScheme,
  schoolandNurseryService,
  schoolandSizeLabel,
  schoolandSessionLabel,
  gradesOffered,
  admissionSummary,
  showAdmissionSummary = false,
  vacancy,
  isFavorited = false,
  onToggleFavorite,
  distanceKm,
  isInCompare = false,
  onToggleCompare,
  enrichment,
}: SchoolCardProps) {
  const router = useRouter();
  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const coverImage = COVER_IMAGES[id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % COVER_IMAGES.length];

  const hasChineseName = /[\u3400-\u9fff]/.test(nameTc);
  const displayNameEn = formatEnglishSchoolName(nameEn?.trim() || nameTc);
  const primaryName = hasChineseName ? nameTc : displayNameEn;
  const secondaryName = hasChineseName && displayNameEn !== nameTc ? displayNameEn : null;

  // Derive tags
  const sessionTags = getSessionTags(sessionType ?? null);
  const showNursery = hasNurseryClass(gradesOffered ?? null);
  const supplementTags = [
    schoolandGroupTag,
    schoolandFreeScheme ? "免費計劃" : null,
    schoolandNurseryService === "yes"
      ? `幼兒服務${SCHOOLAND_NURSERY_SERVICE_LABELS[schoolandNurseryService]}`
      : null,
    schoolandSizeLabel ? SCHOOLAND_SIZE_LABELS[schoolandSizeLabel] : null,
    schoolandSessionLabel ? SCHOOLAND_SESSION_LABELS[schoolandSessionLabel] : null,
  ].filter(Boolean) as string[];
  const schoolTypeTag = schoolType ? SCHOOL_TYPE_LABELS[schoolType] ?? schoolType : null;

  const buildTagClassName = (kind: "blue" | "green" | "orange" | "purple") => {
    const styles = {
      blue: "bg-[#eef5ff] text-[#3b6ea8]",
      green: "bg-[#edf8f0] text-[#2c8a55]",
      orange: "bg-[#fff5e5] text-[#c07421]",
      purple: "bg-[#f4efff] text-[#7d5ac7]",
    };

    return `inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-semibold ${styles[kind]}`;
  };

  // Build vacancy grades to display
  const vacancyGrades: Array<{ grade: string; status: VacancyStatus }> = [];
  if (vacancy) {
    vacancyGrades.push({ grade: "K1", status: vacancy.k1_vacancy });
    vacancyGrades.push({ grade: "K2", status: vacancy.k2_vacancy });
    vacancyGrades.push({ grade: "K3", status: vacancy.k3_vacancy });
  }

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-[22px] border border-[rgba(32,85,59,0.08)] bg-white shadow-[0_12px_28px_rgba(35,75,50,0.06)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_18px_42px_rgba(35,75,50,0.11)]"
      onClick={() => router.push(`/kg/${id}`)}
    >
      <div className="relative h-[118px] overflow-hidden bg-[#f6efe0]">
        <Image
          src={coverImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,231,0.04)_0%,rgba(255,248,231,0.38)_100%)]" />
        <div className="absolute right-4 top-3 flex items-center gap-2">
          {onToggleCompare && (
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(32,85,59,0.08)] bg-[rgba(255,255,255,0.86)] text-[#96a49a] shadow-[0_8px_18px_rgba(31,80,55,0.08)] transition hover:bg-white"
              onClick={(event) => {
                event.stopPropagation();
                onToggleCompare();
              }}
              aria-label={isInCompare ? "取消對比" : "加入對比"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isInCompare ? "#1f7a4d" : "currentColor"} strokeWidth="1.5">
                <rect x="4" y="4" width="6.5" height="16" rx="1.5" fill={isInCompare ? "#edf8f0" : "none"} />
                <rect x="13.5" y="4" width="6.5" height="16" rx="1.5" fill={isInCompare ? "#edf8f0" : "none"} />
              </svg>
            </button>
          )}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(32,85,59,0.08)] bg-[rgba(255,255,255,0.86)] shadow-[0_8px_18px_rgba(31,80,55,0.08)] transition hover:bg-white"
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavorite?.();
            }}
            aria-label={isFavorited ? "取消收藏" : "加入收藏"}
          >
            {isFavorited ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#d58d2d" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a8b3ab" strokeWidth="1.8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="px-5 pb-[18px]">
        <div className="-mt-[26px] inline-flex rounded-[18px] border border-[#eef1e8] bg-white p-1.5 shadow-[0_6px_14px_rgba(32,85,59,0.08)]">
          <SchoolAvatar
            schoolId={id}
            schoolName={primaryName}
            logoUrl={logoUrl}
            schoolCode={schoolCode}
            size="lg"
            shape="rounded"
          />
        </div>

        <h3 className="mt-3 line-clamp-2 text-[16px] font-bold leading-[1.45] text-[#243c2e]">{primaryName}</h3>
        {secondaryName && (
          <p className="mt-1 line-clamp-1 text-[13px] text-[#849188]">{secondaryName}</p>
        )}

        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6a7c70]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district}</span>
          {distanceKm != null && (
            <>
              <span className="mx-1 text-[#c6cdc7]">·</span>
              <span>{distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm.toFixed(1)}km`}</span>
            </>
          )}
        </div>

        {(sessionTags.length > 0 || showNursery || schoolTypeTag || supplementTags.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {sessionTags.map((tag) => (
              <span key={tag} className={buildTagClassName("blue")}>{tag}</span>
            ))}
            {schoolTypeTag && (
              <span className={buildTagClassName(
                schoolType === "international"
                  ? "orange"
                  : schoolType === "private_independent"
                    ? "purple"
                    : "green"
              )}>
                {schoolTypeTag}
              </span>
            )}
            {showNursery && <span className={buildTagClassName("green")}>設 N 班</span>}
            {supplementTags.slice(0, 2).map((tag, index) => (
              <span key={tag} className={buildTagClassName(index % 2 === 0 ? "blue" : "green")}>{tag}</span>
            ))}
          </div>
        )}

        {vacancyGrades.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {vacancyGrades.map(({ grade, status }) => {
              const normalized = stale ? "no_information" : normalizeVacancyStatus(status);
              const gradeStatusStyles = {
                has_vacancy: "border-[#cce8d3] bg-[#edf8f0] text-[#2c8a55]",
                no_vacancy: "border-[#f0e7d9] bg-[#fff5e5] text-[#c07421]",
                waiting_list: "border-[#dde7fb] bg-[#eef5ff] text-[#3b6ea8]",
                no_information: "border-[#e6eee3] bg-[#f8faf6] text-[#6a7c70]",
              } as const;

              return (
                <div key={grade} className={`rounded-full border px-3 py-2 text-center ${gradeStatusStyles[normalized]}`}>
                  <span className="block text-[11px] font-semibold text-[#7a8d80]">{grade}</span>
                  <strong className="mt-0.5 block text-[12px] font-semibold">
                    {VACANCY_STATUS_LABELS[normalized]}
                  </strong>
                </div>
              );
            })}
          </div>
        )}

        {showAdmissionSummary && admissionSummary && (
          <div className="mt-4 rounded-[18px] border border-[#eef2e8] bg-[#fbfcf8] px-4 py-3">
            <p className="text-[12px] font-medium leading-relaxed text-[#657568]">{admissionSummary}</p>
          </div>
        )}

        {enrichment && (enrichment.application_url || (enrichment.open_day_date && enrichment.open_day_date >= new Date().toISOString().slice(0, 10))) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {enrichment.application_url && <span className={buildTagClassName("green")}>已開放申請</span>}
            {enrichment.open_day_date && enrichment.open_day_date >= new Date().toISOString().slice(0, 10) && (
              <span className={buildTagClassName("orange")}>
                開放日 {new Date(`${enrichment.open_day_date}T00:00:00`).toLocaleDateString("zh-HK", { month: "numeric", day: "numeric" })}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-[#edf1ea] pt-4 text-[12px]">
          <span className="flex items-center gap-1.5 text-[#9ba7a0]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formatUpdateDate(vacancy?.edb_published_date ?? null)}
          </span>
          <span className="font-semibold text-[#1f7a4d]">詳情 →</span>
        </div>
      </div>
    </article>
  );
}
