import Link from "next/link";
import Image from "next/image";
import type { ProgrammeWithStatus } from "@/lib/db/programmes";
import { getProgrammeSceneImage } from "@/lib/media/activity-scenes";
import {
  PROGRAMME_CATEGORY_LABELS,
  PROGRAMME_DISTRICT_LABELS,
  ENROLMENT_STATUS_LABELS,
  ENROLMENT_STATUS_COLORS,
  formatProgrammeFee,
  formatEnrolmentTime,
  formatProgrammeDateRange,
  formatAgeRange,
  getEnrolmentCountdown,
} from "@/lib/programmes/labels";
import { SubscribeButton } from "@/components/programmes/SubscribeButton";
import { CourseTrackAllButton } from "@/components/programmes/CourseTrackAllButton";

interface ProgrammeCardProps {
  programme: ProgrammeWithStatus;
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status;
  const enrolmentStatus = status?.enrolment_status || "pre_open";
  const detailHref = `/programmes/${programme.id}`;
  const primaryActionLabel =
    enrolmentStatus === "open"
      ? "前往報名"
      : enrolmentStatus === "pre_open"
        ? "提醒我"
        : "查看詳情";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-cream-200 bg-white shadow-soft transition hover:shadow-card">
      <Link href={detailHref} className="flex flex-1 p-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <span className="inline-flex items-center rounded-pill bg-leaf-50 px-2.5 py-1 text-[11px] font-semibold text-forest-700">
              {PROGRAMME_CATEGORY_LABELS[programme.category || "other"]}
            </span>
            <span
              className={`inline-flex shrink-0 items-center rounded-pill px-2.5 py-1 text-[11px] font-semibold ${
                ENROLMENT_STATUS_COLORS[enrolmentStatus]
              }`}
            >
              {ENROLMENT_STATUS_LABELS[enrolmentStatus]}
            </span>
          </div>

          <h3 className="mb-1 text-base font-semibold leading-snug text-ink-900 line-clamp-2">
            {programme.name_zh || programme.name_en || "未知課程"}
          </h3>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            {fee.isFree ? (
              <span className="inline-flex items-center rounded-pill bg-leaf-100 px-2.5 py-1 text-[11px] font-bold text-forest-700">
                免費
              </span>
            ) : (
              <span className="text-sm font-semibold text-forest-700">{fee.label}</span>
            )}
            {programme.sessions_count && (
              <span className="text-xs text-ink-500">
                {programme.sessions_count}堂
              </span>
            )}
          </div>

          <div className="mt-auto space-y-1 text-sm text-ink-700">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="truncate">
                報名：{enrolmentTime}
              </span>
            </div>

            {countdown && (
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-rust-500">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="text-rust-600 font-medium text-xs">{countdown}</span>
              </div>
            )}

            {programme.venue && (
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="truncate">
                  {programme.district && `${PROGRAMME_DISTRICT_LABELS[programme.district] || ""} · `}
                  {programme.venue}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="truncate">{dateRange}</span>
            </div>

            {ageRange && (
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-forest-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>適合 {ageRange}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-auto flex items-center gap-2 border-t border-cream-100 px-4 py-3">
        <Link
          href={detailHref}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-pill border border-cream-200 bg-white px-3 text-sm font-medium text-forest-700 transition hover:bg-leaf-50"
        >
          查看詳情
        </Link>
        {enrolmentStatus === "open" && programme.raw_url ? (
          <a
            href={programme.raw_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 flex-1 items-center justify-center rounded-pill bg-forest-600 px-3 text-sm font-medium text-white transition hover:bg-forest-700"
          >
            {primaryActionLabel}
          </a>
        ) : (
          <Link
            href={detailHref}
            className="inline-flex h-9 flex-1 items-center justify-center rounded-pill bg-forest-600 px-3 text-sm font-medium text-white transition hover:bg-forest-700"
          >
            {primaryActionLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

export function ProgrammeCardSkeleton() {
  return (
    <div className="h-64 animate-pulse rounded-xl border border-cream-200 bg-white p-5 shadow-soft">
      <div className="space-y-4">
        <div className="h-5 w-28 rounded-lg bg-cream-100" />
        <div className="h-6 w-48 rounded bg-cream-100" />
        <div className="h-4 w-64 max-w-full rounded bg-cream-100" />
        <div className="h-10 rounded-lg bg-cream-100" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-cream-100" />
          <div className="h-4 w-5/6 rounded bg-cream-100" />
        </div>
      </div>
    </div>
  );
}

interface ProgrammeCourseCardProps {
  group: {
    key: string;
    title: string;
    programmes: ProgrammeWithStatus[];
    representative: ProgrammeWithStatus;
  };
  expanded: boolean;
  onToggle: () => void;
}

const CATEGORY_ACCENTS: Record<string, { bg: string; text: string; icon: string }> = {
  swimming: { bg: "bg-sky-50", text: "text-sky-700", icon: "泳" },
  dance: { bg: "bg-rose-50", text: "text-rose-700", icon: "舞" },
  parent_child: { bg: "bg-leaf-50", text: "text-forest-700", icon: "親" },
  music: { bg: "bg-violet-50", text: "text-violet-700", icon: "音" },
  art: { bg: "bg-cream-100", text: "text-rust-700", icon: "藝" },
  sport: { bg: "bg-leaf-50", text: "text-forest-700", icon: "動" },
  other: { bg: "bg-slate-50", text: "text-slate-700", icon: "課" },
};

function cleanAgeRangeLabel(ageRange: string | null) {
  return ageRange?.replace(/^適合\s*/, "") ?? null;
}

const STATUS_ORDER: Record<string, number> = {
  open: 0,
  pre_open: 1,
  full: 2,
  closed: 3,
};

function sortSessions(programmes: ProgrammeWithStatus[]) {
  return programmes
    .filter((programme) => programme.lcsd_programme_status?.enrolment_status !== "closed")
    .sort((a, b) => {
    const statusDiff =
      (STATUS_ORDER[a.lcsd_programme_status?.enrolment_status || "pre_open"] ?? 1) -
      (STATUS_ORDER[b.lcsd_programme_status?.enrolment_status || "pre_open"] ?? 1);
    if (statusDiff !== 0) return statusDiff;
    const aTime = a.enrolment_open_at ? new Date(a.enrolment_open_at).getTime() : Number.POSITIVE_INFINITY;
    const bTime = b.enrolment_open_at ? new Date(b.enrolment_open_at).getTime() : Number.POSITIVE_INFINITY;
    if (aTime !== bTime) return aTime - bTime;
    return (a.venue || "").localeCompare(b.venue || "", "zh-Hant-HK");
    });
}

export function ProgrammeCourseCard({ group, expanded, onToggle }: ProgrammeCourseCardProps) {
  const representative = group.representative;
  const programmes = sortSessions(group.programmes);
  if (programmes.length === 0) return null;
  const category = representative.category || "other";
  const accent = CATEGORY_ACCENTS[category] || CATEGORY_ACCENTS.other;
  const fee = formatProgrammeFee(representative.fee_hkd);
  const ageRange = cleanAgeRangeLabel(formatAgeRange(representative.age_min, representative.age_max));
  const earliest = programmes[0];
  const imageSrc = getProgrammeSceneImage(representative);
  const imagePositionClass = category === "swimming" ? "object-[45%_center]" : "object-center";

  return (
    <article className="overflow-hidden rounded-card border border-cream-200 bg-white shadow-soft transition hover:shadow-card">
      <div className="flex flex-col md:h-[252px] md:flex-row">
        <Link
          href={`/programmes/${representative.id}`}
          className="relative block h-[180px] overflow-hidden bg-cream-100 md:h-full md:w-[34%] md:shrink-0"
          aria-label={`${group.title} 課程詳情`}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 220px, (min-width: 1024px) 17vw, (min-width: 768px) 34vw, 100vw"
            className={`object-cover ${imagePositionClass} saturate-[0.82] brightness-[1.06]`}
            priority={false}
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <div className="min-w-0">
            <div className="flex items-center">
              <span className={`inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[12px] font-medium ${accent.bg} ${accent.text}`}>
                <span className="grid h-3.5 w-3.5 place-items-center rounded bg-white/70 text-[9px]" aria-hidden="true">
                  {accent.icon}
                </span>
                {PROGRAMME_CATEGORY_LABELS[category]}
              </span>
            </div>
            <Link href={`/programmes/${representative.id}`} className="block">
              <h3 className="mt-3 line-clamp-2 text-[18px] font-semibold leading-snug text-ink-900 hover:text-brand-700 lg:text-[19px]">
                {group.title}
              </h3>
            </Link>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-1 text-[13px] font-medium leading-[1.45] text-ink-500">
              <span className="font-semibold text-forest-700">{fee.label}</span>
              {representative.sessions_count && <span> · {representative.sessions_count}堂</span>}
              {ageRange && <span> · {ageRange}</span>}
            </div>
          </div>

        <div className="mt-4 flex items-center gap-2 text-[13px] font-medium text-ink-500">
            <span className="text-forest-600">
              <ClockIcon />
            </span>
            <span>{formatEnrolmentTime(earliest.enrolment_open_at)} 開報</span>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row md:mt-auto">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-9 min-w-0 flex-[1.15] items-center justify-center whitespace-nowrap rounded-pill border border-brand-700 bg-brand-700 px-3 text-[14px] font-semibold text-white transition hover:border-brand-800 hover:bg-brand-800"
            aria-expanded={expanded}
          >
            {expanded ? "收起場次" : "查看場次"}
          </button>
          <CourseTrackAllButton
            programmeIds={programmes.map((p) => p.id)}
            className="inline-flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill border border-brand-200 bg-white px-3 text-[14px] font-semibold text-brand-700 transition hover:bg-brand-50 disabled:opacity-50"
          />
        </div>
        </div>
      </div>

      {expanded && (
        <div className="mx-4 mb-4 divide-y divide-cream-100 rounded-card border border-cream-200 bg-cream-50/40">
          {programmes.map((programme) => (
            <div key={programme.id} className="p-3">
              <SessionMetaRow programme={programme} />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function SessionMetaRow({ programme }: { programme: ProgrammeWithStatus }) {
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);

  return (
    <div className="grid gap-2 text-sm text-ink-700 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0 space-y-1">
        <Link href={`/programmes/${programme.id}`} className="block truncate font-semibold text-ink-900 hover:text-brand-700">
          {programme.venue || "場地待定"}
          {programme.district && (
            <span className="font-normal text-ink-500"> · {PROGRAMME_DISTRICT_LABELS[programme.district] || ""}</span>
          )}
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon />
            {dateRange}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon />
            報名 {enrolmentTime}
          </span>
        </div>
        {countdown && (
          <p className="text-xs font-medium text-rust-600">{countdown}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <SubscribeButton programmeId={programme.id} size="sm" />
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-forest-500" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-forest-500" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
