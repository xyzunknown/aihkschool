import { GlassCard } from "@/components/ui/GlassCard";
import {
  ArrowSquareOut,
  Buildings,
  Clock,
  Globe,
  MapPin,
  Phone,
  Student,
  Translate,
} from "@phosphor-icons/react/dist/ssr";
import type { ElementType, ReactNode } from "react";
import {
  formatDateCN,
  SESSION_TYPE_LABELS,
  LANGUAGE_OPTIONS,
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
  const hasNurseryService =
    school.has_nursery === true || school.schooland_nursery_service === "yes";

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
      label: "N 班 / 2-3 歲幼兒服務",
      value: hasNurseryService ? "設有" : null,
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

  const fields: Array<{ label: string; value: ReactNode; icon: ElementType }> = [
    {
      label: "地址",
      value: school.address_tc ? (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([school.name_tc, school.address_tc].filter(Boolean).join(" "))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-ink-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-950"
        >
          {school.address_tc}
          <ArrowSquareOut size={14} weight="regular" className="flex-shrink-0 text-ink-500" aria-hidden="true" />
        </a>
      ) : null,
      icon: MapPin,
    },
    {
      label: "聯絡電話",
      value: school.phone ? <a href={`tel:${school.phone}`} className="text-ink-900 hover:underline">{school.phone}</a> : null,
      icon: Phone,
    },
    {
      label: "教學語言",
      value: school.language_primary ? LANGUAGE_OPTIONS[school.language_primary] ?? school.language_primary : null,
      icon: Translate,
    },
    {
      label: "時段",
      value: school.session_type ? SESSION_TYPE_LABELS[school.session_type] ?? school.session_type : null,
      icon: Clock,
    },
    {
      label: "N 班 / 2-3 歲幼兒服務",
      value: hasNurseryService ? "設有" : null,
      icon: Student,
    },
    {
      label: "辦學團體",
      value: school.schooland_operator_name,
      icon: Buildings,
    },
  ];

  const displayedFields = fields.filter((f) => f.value !== null);

  return (
    <section className="mb-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <GlassCard className="p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink-900">重點資料</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {displayedFields.map((field) => (
              <InfoTile key={field.label} label={field.label} icon={field.icon}>
                {field.value}
              </InfoTile>
            ))}
          </div>

          {schoolandFields.length > 0 && (
            <div className="mt-5 border-t border-surface-border pt-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-ink-800">補充資料</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {schoolandFields.map((field) => (
                  <div key={field.label} className="flex flex-col rounded-button bg-cream-50 px-4 py-3">
                    <span className="mb-1 text-xs font-medium text-ink-500">
                      {field.label}
                    </span>
                    <div className="text-sm font-semibold text-ink-900">{field.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(school.schooland_founded_year || school.schooland_staff_count || school.schooland_teacher_student_ratio) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {school.schooland_founded_year && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                  創校 {school.schooland_founded_year} 年
                </span>
              )}
              {school.schooland_staff_count && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                  教職員約 {school.schooland_staff_count} 人
                </span>
              )}
              {school.schooland_teacher_student_ratio && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                  師生比例 {school.schooland_teacher_student_ratio}
                </span>
              )}
            </div>
          )}

          {(school.schooland_intro || school.schooland_teaching_summary || school.schooland_facilities_summary) && (
            <div className="mt-5 space-y-4 border-t border-surface-border pt-5">
              {school.schooland_intro && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-ink-800">教學理念及課程</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{school.schooland_intro}</p>
                </div>
              )}
              {school.schooland_teaching_summary && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-ink-800">教學情況</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{school.schooland_teaching_summary}</p>
                </div>
              )}
              {school.schooland_facilities_summary && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-ink-800">學校設施</h3>
                  <p className="text-sm leading-relaxed text-ink-700">{school.schooland_facilities_summary}</p>
                </div>
              )}
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink-900">位置</h2>
          <div className="overflow-hidden rounded-card border border-surface-border bg-cream-100">
          {mapEmbedSrc ? (
            <iframe
              title={`${school.name_tc} 地圖`}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-48 w-full border-0"
            />
          ) : (
            <div className="flex h-48 items-center justify-center px-6 text-center text-sm text-ink-500">
              暫時未有足夠位置資料顯示地圖
            </div>
          )}

          {mapSearchHref && (
            <div className="flex flex-col gap-3 border-t border-surface-border bg-white px-4 py-3">
              <p className="text-sm text-ink-500">地圖會根據學校名稱和地址自動定位</p>
              <a
                href={mapSearchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-pill border border-forest-700 px-4 text-sm font-semibold text-forest-700 hover:bg-forest-50"
              >
                <Globe size={16} weight="regular" aria-hidden="true" />
                打開 Google 地圖
              </a>
            </div>
          )}
          </div>
        </GlassCard>
      </div>

      {school.last_verified_at && (
        <p className="text-sm text-ink-500 mt-4">
          最後核實於 {formatDateCN(school.last_verified_at)}
        </p>
      )}
    </section>
  );
}

function InfoTile({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: ElementType;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[92px] gap-4 rounded-button border border-[#E8ECE3] bg-[#FFFDF8] px-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-forest-50 text-forest-700">
        <Icon aria-hidden="true" size={20} weight="regular" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink-500">{label}</p>
        <div className="mt-1 text-base font-bold leading-relaxed text-ink-900">{children}</div>
      </div>
    </div>
  );
}
