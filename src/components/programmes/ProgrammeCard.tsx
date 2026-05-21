import Image from "next/image";
import Link from "next/link";
import type { ProgrammeWithStatus } from "@/lib/db/programmes";
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
import { getProgrammeSceneImage } from "@/lib/media/activity-scenes";
import { SubscribeButton } from "@/components/programmes/SubscribeButton";
import { CourseTrackAllButton } from "@/components/programmes/CourseTrackAllButton";

interface ProgrammeCardProps {
  programme: ProgrammeWithStatus;
  priority?: boolean;
}

export function ProgrammeCard({ programme, priority = false }: ProgrammeCardProps) {
  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status;
  const enrolmentStatus = status?.enrolment_status || "pre_open";
  const sceneImage = getProgrammeSceneImage(programme);
  const detailHref = `/programmes/${programme.id}`;
  const primaryActionLabel =
    enrolmentStatus === "open"
      ? "前往報名"
      : enrolmentStatus === "pre_open"
        ? "提醒我"
        : "查看詳情";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-cream-200 bg-white shadow-soft transition hover:shadow-card">
      <Link href={detailHref} className="flex flex-1 gap-4 p-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-cream-100 sm:h-28 sm:w-28">
            <Image
              src={sceneImage}
              alt=""
              fill
              priority={priority}
              sizes="112px"
              className="object-cover"
            />
          </div>

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

const CATEGORY_ACCENTS: Record<string, { bar: string; bg: string; text: string; icon: string }> = {
  swimming: { bar: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-700", icon: "泳" },
  dance: { bar: "bg-pink-500", bg: "bg-pink-50", text: "text-pink-700", icon: "舞" },
  parent_child: { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", icon: "親" },
  music: { bar: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700", icon: "音" },
  art: { bar: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", icon: "藝" },
  sport: { bar: "bg-lime-600", bg: "bg-lime-50", text: "text-lime-700", icon: "動" },
  other: { bar: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-700", icon: "課" },
};

const STATUS_ORDER: Record<string, number> = {
  open: 0,
  pre_open: 1,
  full: 2,
  closed: 3,
};

function sortSessions(programmes: ProgrammeWithStatus[]) {
  return [...programmes].sort((a, b) => {
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

function uniqueVenueCount(programmes: ProgrammeWithStatus[]) {
  return new Set(programmes.map((p) => p.venue).filter(Boolean)).size;
}

function districtSummary(programmes: ProgrammeWithStatus[]) {
  const districts = Array.from(new Set(programmes.map((p) => p.district).filter(Boolean)));
  if (districts.length === 0) return "地區待定";
  return districts
    .slice(0, 3)
    .map((d) => PROGRAMME_DISTRICT_LABELS[d as string] || d)
    .join("、") + (districts.length > 3 ? ` 等 ${districts.length} 區` : "");
}

export function ProgrammeCourseCard({ group, expanded, onToggle }: ProgrammeCourseCardProps) {
  const representative = group.representative;
  const programmes = sortSessions(group.programmes);
  const category = representative.category || "other";
  const accent = CATEGORY_ACCENTS[category] || CATEGORY_ACCENTS.other;
  const fee = formatProgrammeFee(representative.fee_hkd);
  const ageRange = formatAgeRange(representative.age_min, representative.age_max);
  const earliest = programmes[0];
  const countdown = getEnrolmentCountdown(earliest.enrolment_open_at);
  const venueCount = uniqueVenueCount(programmes);
  const preview = programmes.slice(0, 2);
  const earliestStatus = earliest.lcsd_programme_status?.enrolment_status || "pre_open";

  return (
    <article className="relative overflow-hidden rounded-xl border border-cream-200 bg-white shadow-soft transition hover:shadow-card">
      <div className={`absolute inset-y-0 left-0 w-1.5 ${accent.bar}`} />
      <div className="p-4 pl-5 sm:p-5 sm:pl-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${accent.bg} ${accent.text}`}>
                <span className="grid h-4 w-4 place-items-center rounded bg-white/70 text-[10px]" aria-hidden="true">
                  {accent.icon}
                </span>
                {PROGRAMME_CATEGORY_LABELS[category]}
              </span>
              <span className="text-xs text-ink-500">
                {venueCount || programmes.length} 個地點開辦 · {districtSummary(programmes)}
              </span>
            </div>
            <Link href={`/programmes/${representative.id}`} className="block">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-ink-900 hover:text-brand-700">
                {group.title}
              </h3>
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-forest-700">{fee.label}</span>
              {representative.sessions_count && <span className="text-ink-500">{representative.sessions_count} 堂</span>}
              {ageRange && <span className="text-ink-500">適合 {ageRange}</span>}
            </div>
          </div>

          <span className={`inline-flex h-8 items-center rounded-lg px-2.5 text-xs font-semibold ${ENROLMENT_STATUS_COLORS[earliestStatus]}`}>
            {ENROLMENT_STATUS_LABELS[earliestStatus]}
          </span>
        </div>

        <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-ink-700">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-900">
              <ClockIcon />
              最快報名：{formatEnrolmentTime(earliest.enrolment_open_at)}
            </span>
            {countdown && <span className="text-xs font-semibold text-rust-600">{countdown}</span>}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {preview.map((programme) => (
            <div key={programme.id} className="flex min-w-0 items-center gap-2 text-sm text-ink-700">
              <PinIcon />
              <Link href={`/programmes/${programme.id}`} className="truncate hover:text-brand-700">
                {programme.venue || "場地待定"}
                {programme.district && ` · ${PROGRAMME_DISTRICT_LABELS[programme.district] || ""}`}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white transition hover:bg-slate-800"
            aria-expanded={expanded}
          >
            {expanded ? "收起場次" : `查看全部 ${programmes.length} 個場次`}
            <ChevronIcon expanded={expanded} />
          </button>
          <CourseTrackAllButton programmeIds={programmes.map((p) => p.id)} />
        </div>

        {expanded && (
          <div className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-100 bg-white">
            {programmes.map((programme) => (
              <div key={programme.id} className="p-3">
                <SessionMetaRow programme={programme} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function SessionMetaRow({ programme }: { programme: ProgrammeWithStatus }) {
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status?.enrolment_status || "pre_open";

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
        <span className={`inline-flex h-8 items-center rounded-lg px-2.5 text-xs font-semibold ${ENROLMENT_STATUS_COLORS[status]}`}>
          {ENROLMENT_STATUS_LABELS[status]}
        </span>
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

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-forest-500" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
