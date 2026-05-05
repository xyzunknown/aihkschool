import { GlassCard } from "@/components/ui/GlassCard";
import {
  SCHOOL_TYPE_LABELS,
  formatDateCN,
  SESSION_TYPE_LABELS,
  LANGUAGE_OPTIONS,
  SCHOOLAND_NURSERY_SERVICE_LABELS,
  SCHOOLAND_SESSION_LABELS,
  SCHOOLAND_SIZE_LABELS,
} from "@/lib/utils";
import type { School } from "@/types/database";

interface BasicInfoSectionProps {
  school: School;
}

export function BasicInfoSection({ school }: BasicInfoSectionProps) {
  const mapQuery = [school.name_tc, school.address_tc].filter(Boolean).join(" ");
  const mapSearchHref = mapQuery
    ? `https://www.google.com/maps/search/${encodeURIComponent(mapQuery)}`
    : null;
  const mapEmbedSrc = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`
    : null;
  const schoolandFields = [
    { label: "辦學團體", value: school.schooland_operator_name },
    { label: "集團標籤", value: school.schooland_group_tag },
    {
      label: "免費計劃",
      value: school.schooland_free_scheme === null || school.schooland_free_scheme === undefined
        ? null
        : school.schooland_free_scheme ? "是" : "否",
    },
    {
      label: "幼兒服務",
      value: school.schooland_nursery_service
        ? SCHOOLAND_NURSERY_SERVICE_LABELS[school.schooland_nursery_service] ?? school.schooland_nursery_service
        : null,
    },
    {
      label: "規模",
      value: school.schooland_size_label
        ? SCHOOLAND_SIZE_LABELS[school.schooland_size_label] ?? school.schooland_size_label
        : null,
    },
    {
      label: "上課時間",
      value: school.schooland_session_label
        ? SCHOOLAND_SESSION_LABELS[school.schooland_session_label] ?? school.schooland_session_label
        : null,
    },
  ].filter((field) => field.value !== null && field.value !== undefined && field.value !== "");

  const fields = [
    {
      label: "地址",
      value: school.address_tc ? (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([school.name_tc, school.address_tc].filter(Boolean).join(" "))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-slate-950 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-950"
        >
          {school.address_tc}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-slate-400">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      ) : null,
    },
    {
      label: "官方網站",
      value: school.website ? <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-slate-950 hover:underline">{school.website}</a> : null,
    },
    {
      label: "聯絡電話",
      value: school.phone ? <a href={`tel:${school.phone}`} className="text-slate-950 hover:underline">{school.phone}</a> : null,
    },
    {
      label: "學校類別",
      value: SCHOOL_TYPE_LABELS[school.school_type] ?? school.school_type,
    },
    {
      label: "資助計劃",
      value:
        school.school_type === "international"
          ? null
          : school.kep_participant
            ? "已參加幼稚園教育計劃"
            : "未參加幼稚園教育計劃",
    },
    {
      label: "教學語言",
      value: school.language_primary ? LANGUAGE_OPTIONS[school.language_primary] ?? school.language_primary : null,
    },
    {
      label: "時段",
      value: school.session_type ? SESSION_TYPE_LABELS[school.session_type] ?? school.session_type : null,
    },
  ];

  const displayedFields = fields.filter((f) => f.value !== null);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">學校概況</h2>
      <GlassCard>
        <div className="space-y-4">
          {displayedFields.map((field) => (
            <div key={field.label} className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                {field.label}
              </span>
              <div className="text-base text-slate-900">{field.value}</div>
            </div>
          ))}
        </div>

        {schoolandFields.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-800">補充資料</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {schoolandFields.map((field) => (
                <div key={field.label} className="flex flex-col">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    {field.label}
                  </span>
                  <div className="text-sm text-slate-900">{field.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats pills */}
        {(school.schooland_founded_year || school.schooland_staff_count || school.schooland_teacher_student_ratio) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {school.schooland_founded_year && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                創校 {school.schooland_founded_year} 年
              </span>
            )}
            {school.schooland_staff_count && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                教職員約 {school.schooland_staff_count} 人
              </span>
            )}
            {school.schooland_teacher_student_ratio && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                師生比例 1:{school.schooland_teacher_student_ratio}
              </span>
            )}
          </div>
        )}

        {/* Schooland text blocks */}
        {(school.schooland_intro || school.schooland_teaching_summary || school.schooland_facilities_summary) && (
          <div className="mt-5 border-t border-slate-100 pt-5 space-y-4">
            {school.schooland_intro && (
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">教學理念及課程</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{school.schooland_intro}</p>
              </div>
            )}
            {school.schooland_teaching_summary && (
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">教學情況</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{school.schooland_teaching_summary}</p>
              </div>
            )}
            {school.schooland_facilities_summary && (
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">學校設施</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{school.schooland_facilities_summary}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          {mapEmbedSrc ? (
            <iframe
              title={`${school.name_tc} 地圖`}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 md:h-80"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center px-6 text-center text-sm text-slate-500">
              暫時未有足夠位置資料顯示地圖
            </div>
          )}

          {mapSearchHref && (
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3">
              <p className="text-sm text-slate-500">地圖會根據學校名稱和地址自動定位</p>
              <a
                href={mapSearchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-slate-700 underline hover:text-slate-950"
              >
                在 Google 地圖中開啟
              </a>
            </div>
          )}
        </div>
      </GlassCard>

      {school.last_verified_at && (
        <p className="text-sm text-slate-500 mt-4">
          最後核實於 {formatDateCN(school.last_verified_at)}
        </p>
      )}
    </section>
  );
}
