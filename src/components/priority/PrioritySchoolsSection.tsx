import Link from "next/link";
import type { PrioritySchoolItem } from "@/lib/prioritySchools";
import { SCHOOL_TYPE_LABELS, formatEnglishSchoolName } from "@/lib/utils";

const SOURCE_LABELS: Record<string, string> = {
  ocr_branch_top: "OCR 分校熱度",
  ocr_brand_top: "OCR 品牌熱度",
  curated_brand_pool: "人工品牌池",
};

const CONFIDENCE_LABELS: Record<string, string> = {
  high: "高置信",
  medium: "中置信",
  low: "低置信",
};

function trimSummary(text: string | null, maxLength = 140) {
  if (!text) return null;
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function sourceLabel(source: string) {
  return SOURCE_LABELS[source] ?? source;
}

function formatOpenDayLine(school: PrioritySchoolItem) {
  if (!school.open_day_date && !school.open_day_details) return null;
  if (school.open_day_signal_tier === "activity_signal") {
    return school.open_day_details;
  }
  if (school.open_day_date && school.open_day_details) {
    return `開放日 ${school.open_day_date} · ${school.open_day_details}`;
  }
  if (school.open_day_date) {
    return `開放日 ${school.open_day_date}`;
  }
  return school.open_day_details;
}

function openDayHeader(school: PrioritySchoolItem) {
  if (school.open_day_signal_tier === "validated_open_day") return "已核驗開放日";
  if (school.open_day_signal_tier === "pending_open_day") return "待核驗開放日";
  if (school.open_day_signal_tier === "activity_signal") return "活動線索";
  return "待核驗";
}

interface PrioritySchoolsSectionProps {
  schools: PrioritySchoolItem[];
  title: string;
  description: string;
  maxItems?: number;
  ctaHref?: string;
  ctaLabel?: string;
}

export function PrioritySchoolsSection({
  schools,
  title,
  description,
  maxItems,
  ctaHref,
  ctaLabel,
}: PrioritySchoolsSectionProps) {
  if (schools.length === 0) return null;

  const items = typeof maxItems === "number" ? schools.slice(0, maxItems) : schools;

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-12">
      <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-[radial-gradient(circle_at_top_left,_rgba(218,245,229,0.9),_rgba(255,255,255,0.96)_45%,_rgba(245,250,247,0.96)_100%)] p-6 md:p-8 shadow-[0_18px_60px_rgba(26,71,52,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/85 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-emerald-800 uppercase">
              Priority 65
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-600 md:text-base">
              {description}
            </p>
          </div>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-medium text-emerald-900 transition hover:-translate-y-0.5 hover:border-emerald-300"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((school) => {
            const schoolTypeLabel = SCHOOL_TYPE_LABELS[school.school_type] ?? school.school_type;
            const confidenceLabel = school.scrape_confidence
              ? CONFIDENCE_LABELS[school.scrape_confidence] ?? school.scrape_confidence
              : null;
            const summary = trimSummary(school.application_process_summary);
            const searchHref = `/kg?search=${encodeURIComponent(school.name_tc)}`;
            const openDayLine = formatOpenDayLine(school);
            const openDayHeaderLabel = openDayHeader(school);

            return (
              <article
                key={school.school_code}
                className="rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-[0_12px_30px_rgba(26,71,52,0.06)] backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      #{school.rank}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-tight text-slate-950">
                      {school.name_tc}
                    </h3>
                    {school.name_en ? (
                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {formatEnglishSchoolName(school.name_en)}
                      </p>
                    ) : null}
                  </div>
                  {confidenceLabel ? (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {confidenceLabel}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                    {schoolTypeLabel}
                  </span>
                  {school.has_application_signal ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      有報名信號
                    </span>
                  ) : null}
                  {school.queue_sources.slice(0, 2).map((source) => (
                    <span
                      key={source}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {sourceLabel(source)}
                    </span>
                  ))}
                </div>

                {summary ? (
                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
                    {summary}
                  </p>
                ) : (
                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-400">
                    暫未提取到可展示的報名摘要。
                  </p>
                )}

                {school.has_open_day_signal && openDayLine ? (
                  <div
                    className={
                      school.has_validated_open_day
                        ? "mt-4 rounded-2xl border border-sky-100 bg-sky-50/80 px-3 py-2 text-xs text-sky-800"
                        : school.open_day_signal_tier === "activity_signal"
                          ? "mt-4 rounded-2xl border border-violet-100 bg-violet-50/90 px-3 py-2 text-xs text-violet-900"
                          : "mt-4 rounded-2xl border border-amber-100 bg-amber-50/90 px-3 py-2 text-xs text-amber-900"
                    }
                  >
                    <div
                      className={
                        school.has_validated_open_day
                          ? "mb-1 font-semibold tracking-[0.08em] text-sky-700 uppercase"
                          : school.open_day_signal_tier === "activity_signal"
                            ? "mb-1 font-semibold tracking-[0.08em] text-violet-700 uppercase"
                            : "mb-1 font-semibold tracking-[0.08em] text-amber-700 uppercase"
                      }
                    >
                      {openDayHeaderLabel}
                    </div>
                    <div>{openDayLine}</div>
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={searchHref}
                    className="inline-flex items-center rounded-xl bg-slate-950 px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-92"
                  >
                    平台內查看
                  </Link>
                  {school.application_url ? (
                    <a
                      href={school.application_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-300"
                    >
                      官方招生
                    </a>
                  ) : school.website ? (
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-300"
                    >
                      學校官網
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
