import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { fetchProgrammeById } from "@/lib/db/programmes";
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
import { getProgrammeSceneImage } from "@/lib/media/activity-scenes";

export const revalidate = 600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const programme = await fetchProgrammeById(params.id);
  if (!programme) return { title: "課程未找到" };

  const name = programme.name_zh || programme.name_en || "課程";
  return {
    title: `${name} | SmartPLAY 開報前追蹤`,
    description: `${name} — ${programme.venue || ""}，${formatProgrammeFee(programme.fee_hkd).label}，可加入開報前追蹤。`,
  };
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const programme = await fetchProgrammeById(params.id);
  if (!programme) notFound();

  const fee = formatProgrammeFee(programme.fee_hkd);
  const dateRange = formatProgrammeDateRange(programme.start_date, programme.end_date);
  const ageRange = formatAgeRange(programme.age_min, programme.age_max);
  const enrolmentTime = formatEnrolmentTime(programme.enrolment_open_at);
  const countdown = getEnrolmentCountdown(programme.enrolment_open_at);
  const status = programme.lcsd_programme_status;
  const enrolmentStatus = status?.enrolment_status || "pre_open";
  const sceneImage = getProgrammeSceneImage(programme);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-12">
      {/* 返回 */}
      <a
        href="/programmes"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        返回課程列表
      </a>

      {/* 主卡片 */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="p-6 md:p-8">
          <div className="mb-6 flex gap-4">
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-36 sm:w-36">
              <Image
                src={sceneImage}
                alt=""
                fill
                priority
                sizes="144px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              {/* 類別 + 狀態 */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {PROGRAMME_CATEGORY_LABELS[programme.category || "other"]}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    ENROLMENT_STATUS_COLORS[enrolmentStatus]
                  }`}
                >
                  {ENROLMENT_STATUS_LABELS[enrolmentStatus]}
                </span>
              </div>

              {/* 標題 */}
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950">
                {programme.name_zh || programme.name_en || "未知課程"}
              </h1>
              {programme.name_en && programme.name_zh && (
                <p className="text-sm text-slate-500">{programme.name_en}</p>
              )}
            </div>
          </div>

          {/* 倒計時 banner */}
          {countdown && (
            <div className="mb-6 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm font-medium text-amber-700">{countdown}</span>
            </div>
          )}

        {/* 信息格子 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoCell label="報名開放" value={enrolmentTime} />
          <InfoCell label="課程日期" value={dateRange} />
          <InfoCell label="場地" value={programme.venue || "未知"} />
          <InfoCell
            label="地區"
            value={programme.district ? PROGRAMME_DISTRICT_LABELS[programme.district] || programme.district : "未知"}
          />
          <InfoCell label="費用" value={fee.label} highlight={fee.isFree} />
          <InfoCell label="堂數" value={programme.sessions_count ? `${programme.sessions_count} 堂` : "未知"} />
          {ageRange && <InfoCell label="適合年齡" value={ageRange} />}
          {status?.seats_available !== null && status?.seats_available !== undefined && (
            <InfoCell label="剩餘名額" value={`${status.seats_available} 個`} />
          )}
        </div>

        {/* 操作按鈕 */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <SubscribeButton programmeId={programme.id} />

          {programme.raw_url && (
            <a
              href={programme.raw_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              前往 SmartPLAY 報名
            </a>
          )}
        </div>
        </div>
      </div>

      {/* 免責聲明 */}
      <div className="mt-6 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
        <p className="text-xs text-slate-400">
          課程資料來自康文署 SmartPLAY，僅供參考。實際安排以官方為準。
          HKSchoolPlace 不提供代報名服務，請自行前往官網操作。
        </p>
      </div>
    </div>
  );
}

function InfoCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={`text-sm font-semibold ${
          highlight ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
