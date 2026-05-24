import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowSquareOut,
  Bell,
  Calendar,
  CaretDown,
  Clock,
  MapPin,
  Tag,
  UserCircle,
  Waves,
} from "@phosphor-icons/react/dist/ssr";
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

interface ProgrammeCardProps {
  programme: ProgrammeWithStatus;
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const enrolmentStatus = programme.lcsd_programme_status?.enrolment_status || "pre_open";
  const detailHref = `/programmes/${programme.id}`;
  const primaryActionLabel = enrolmentStatus === "open" ? "前往報名" : enrolmentStatus === "pre_open" ? "提醒我" : "查看詳情";

  return (
    <article className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-card border border-surface-border bg-white p-5 shadow-soft transition-colors hover:border-forest-200">
      <Link href={detailHref} className="flex flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <span className="inline-flex items-center rounded-pill bg-leaf-50 px-2.5 py-1 text-label font-semibold text-forest-700">
              {PROGRAMME_CATEGORY_LABELS[programme.category || "other"]}
            </span>
            <span className={`inline-flex shrink-0 items-center rounded-pill px-2.5 py-1 text-label font-semibold ${ENROLMENT_STATUS_COLORS[enrolmentStatus]}`}>
              {ENROLMENT_STATUS_LABELS[enrolmentStatus]}
            </span>
          </div>

          <h3 className="mb-1 text-h2 font-semibold text-ink-900 line-clamp-2">
            {programme.name_zh || programme.name_en || "未知課程"}
          </h3>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            {fee.isFree ? (
              <span className="inline-flex items-center rounded-pill bg-leaf-100 px-2.5 py-1 text-label font-bold text-forest-700">
                免費
              </span>
            ) : (
              <span className="text-small font-semibold text-forest-700">{fee.label}</span>
            )}
            {programme.sessions_count ? <span className="text-label text-ink-500">{programme.sessions_count}堂</span> : null}
          </div>

          <div className="mt-auto space-y-1 text-small text-ink-700">
            <MetaLine icon={<ClockIcon />}>報名：{enrolmentTime}</MetaLine>
            {countdown ? <MetaLine icon={<ClockIcon className="text-rust-500" />} className="text-rust-600">{countdown}</MetaLine> : null}
            {programme.venue ? (
              <MetaLine icon={<MapPin aria-hidden="true" size={16} weight="regular" className="shrink-0 text-forest-500" />}>
                {programme.district && `${PROGRAMME_DISTRICT_LABELS[programme.district] || ""} · `}
                {programme.venue}
              </MetaLine>
            ) : null}
            <MetaLine icon={<CalendarIcon />}>{dateRange}</MetaLine>
            {ageRange ? <MetaLine icon={<UserCircle aria-hidden="true" size={16} weight="regular" className="shrink-0 text-forest-500" />}>適合 {ageRange}</MetaLine> : null}
          </div>
        </div>
      </Link>

      <div className="mt-auto flex items-center gap-2 border-t border-surface-border pt-3">
        <Link href={detailHref} className="inline-flex h-9 flex-1 items-center justify-center rounded-pill border border-surface-border bg-white px-3 text-small font-medium text-forest-700 transition hover:bg-leaf-50">
          查看詳情
        </Link>
        {enrolmentStatus === "open" && programme.raw_url ? (
          <a href={programme.raw_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 flex-1 items-center justify-center rounded-pill bg-forest-600 px-3 text-small font-medium text-white transition hover:bg-forest-700">
            {primaryActionLabel}
          </a>
        ) : (
          <Link href={detailHref} className="inline-flex h-9 flex-1 items-center justify-center rounded-pill bg-forest-600 px-3 text-small font-medium text-white transition hover:bg-forest-700">
            {primaryActionLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

export function ProgrammeCardSkeleton() {
  return (
    <div className="min-h-[280px] animate-pulse rounded-card border border-surface-border bg-white p-5 shadow-soft">
      <div className="space-y-4">
        <div className="h-5 w-28 rounded-chip bg-cream-100" />
        <div className="h-6 w-48 rounded-chip bg-cream-100" />
        <div className="h-4 w-64 max-w-full rounded-chip bg-cream-100" />
        <div className="h-10 rounded-button bg-cream-100" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-chip bg-cream-100" />
          <div className="h-4 w-5/6 rounded-chip bg-cream-100" />
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

const CATEGORY_ACCENTS: Record<string, { bg: string; text: string; icon: "wave" | "user" | "clock" | "calendar" }> = {
  swimming: { bg: "bg-sky-50", text: "text-sky-700", icon: "wave" },
  dance: { bg: "bg-rose-50", text: "text-rose-700", icon: "clock" },
  parent_child: { bg: "bg-leaf-50", text: "text-forest-700", icon: "user" },
  music: { bg: "bg-violet-50", text: "text-violet-700", icon: "clock" },
  art: { bg: "bg-cream-100", text: "text-rust-700", icon: "calendar" },
  sport: { bg: "bg-leaf-50", text: "text-forest-700", icon: "clock" },
  other: { bg: "bg-cream-50", text: "text-ink-700", icon: "calendar" },
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
    <article className="overflow-hidden rounded-card border border-surface-border bg-white p-4 shadow-soft transition-colors hover:border-forest-200 md:p-5">
      <div className="flex flex-col md:flex-row">
        <Link href={`/programmes/${representative.id}`} className="relative block h-[180px] overflow-hidden rounded-button bg-cream-100 md:h-[196px] md:w-[260px] md:shrink-0" aria-label={`${group.title} 課程詳情`}>
          <Image src={imageSrc} alt="" fill sizes="(min-width: 768px) 260px, 100vw" className={`object-cover ${imagePositionClass} saturate-[0.82] brightness-[1.06]`} priority={false} />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col pt-4 md:pl-5 md:pt-0">
          <div className="min-w-0">
            <span className={`inline-flex h-6 items-center gap-1 rounded-pill px-2.5 text-label font-medium ${accent.bg} ${accent.text}`}>
              <CategoryIcon icon={accent.icon} />
              {PROGRAMME_CATEGORY_LABELS[category]}
            </span>
            <Link href={`/programmes/${representative.id}`} className="block">
              <h3 className="mt-3 line-clamp-2 text-h2 font-semibold text-ink-900 hover:text-forest-700">{group.title}</h3>
            </Link>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-1 text-small font-medium text-ink-500">
              <span className="font-semibold text-forest-700">{fee.label}</span>
              {representative.sessions_count ? <span> · {representative.sessions_count}堂</span> : null}
              {ageRange ? <span> · {ageRange}</span> : null}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-small font-medium text-ink-500">
            <ClockIcon />
            <span>{formatEnrolmentTime(earliest.enrolment_open_at)} 開報</span>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={onToggle} className="inline-flex h-10 min-w-0 flex-[1.15] items-center justify-center gap-2 whitespace-nowrap rounded-pill border border-forest-700 bg-forest-700 px-4 text-small font-semibold text-white shadow-soft transition hover:border-forest-800 hover:bg-forest-800" aria-expanded={expanded}>
              {expanded ? "收起場次" : "查看場次"}
              <CaretDown aria-hidden="true" size={15} weight="bold" className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {expanded ? (
        <div className="mt-5 rounded-[20px] border border-surface-border bg-[#FBFDF8] p-3 shadow-soft">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <p className="text-small font-bold text-ink-900">可追蹤場次</p>
              <p className="mt-0.5 text-label font-medium text-ink-500">選一個地點或時間，開報前會提醒你。</p>
            </div>
            <span className="inline-flex h-7 items-center rounded-pill bg-forest-50 px-3 text-label font-semibold text-forest-700">
              {programmes.length} 個場次
            </span>
          </div>
          <div className="grid gap-2">
          {programmes.map((programme) => (
            <SessionMetaRow key={programme.id} programme={programme} />
          ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function SessionMetaRow({ programme }: { programme: ProgrammeWithStatus }) {
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const fee = formatProgrammeFee(programme.fee_hkd);
  const statusKey = programme.lcsd_programme_status?.enrolment_status || "pre_open";
  const statusLabel = ENROLMENT_STATUS_LABELS[statusKey] ?? "待開放";

  return (
    <div className="grid gap-3 rounded-[16px] border border-surface-border bg-white p-4 text-small text-ink-700 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={`inline-flex h-6 items-center rounded-pill px-2.5 text-label font-semibold ${ENROLMENT_STATUS_COLORS[statusKey] ?? "bg-cream-100 text-ink-700"}`}>
            {statusLabel}
          </span>
          <span className="inline-flex h-6 items-center gap-1 rounded-pill bg-cream-100 px-2.5 text-label font-semibold text-ink-700">
            <Tag aria-hidden="true" size={13} weight="regular" />
            {fee.isFree ? "免費" : fee.label}
          </span>
        </div>
        <Link href={`/programmes/${programme.id}`} className="inline-flex max-w-full items-center gap-1 font-bold text-ink-900 hover:text-forest-700">
          <MapPin aria-hidden="true" size={16} weight="regular" className="shrink-0 text-forest-600" />
          <span className="truncate">{programme.venue || "場地待定"}</span>
          {programme.district ? <span className="shrink-0 font-medium text-ink-500"> · {PROGRAMME_DISTRICT_LABELS[programme.district] || ""}</span> : null}
        </Link>
        <div className="mt-2 grid gap-1.5 text-label text-ink-500 sm:grid-cols-2">
          <span className="inline-flex items-center gap-1"><CalendarIcon />{dateRange}</span>
          <span className="inline-flex items-center gap-1"><ClockIcon />報名 {enrolmentTime}</span>
        </div>
        {countdown ? (
          <p className="mt-2 inline-flex items-center gap-1 text-label font-semibold text-rust-600">
            <Bell aria-hidden="true" size={14} weight="regular" />
            {countdown}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <SubscribeButton programmeId={programme.id} size="sm" />
        {programme.raw_url ? (
          <a
            href={programme.raw_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-pill border border-surface-border bg-white px-3 text-label font-bold text-forest-700 transition hover:bg-forest-50"
          >
            報名
            <ArrowSquareOut aria-hidden="true" size={14} weight="regular" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function MetaLine({ icon, children, className = "" }: { icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {icon}
      <span className="truncate">{children}</span>
    </div>
  );
}

function ClockIcon({ className = "text-forest-500" }: { className?: string }) {
  return <Clock aria-hidden="true" size={16} weight="regular" className={`shrink-0 ${className}`} />;
}

function CalendarIcon() {
  return <Calendar aria-hidden="true" size={16} weight="regular" className="shrink-0 text-forest-500" />;
}

function CategoryIcon({ icon }: { icon: "wave" | "user" | "clock" | "calendar" }) {
  const Icon = icon === "wave" ? Waves : icon === "user" ? UserCircle : icon === "clock" ? Clock : Calendar;
  return <Icon aria-hidden="true" size={14} weight="regular" />;
}
