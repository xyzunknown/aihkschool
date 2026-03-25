import { GlassCard } from "@/components/ui/GlassCard";
import { SCHOOL_TYPE_LABELS, formatDateCN, SESSION_TYPE_LABELS, LANGUAGE_OPTIONS } from "@/lib/utils";
import type { School } from "@/types/database";

interface BasicInfoSectionProps {
  school: School;
}

export function BasicInfoSection({ school }: BasicInfoSectionProps) {
  const fields = [
    {
      label: "地址",
      value: school.address_tc,
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

        {/* Stats pills — reserved for future data fields (師生比例, 校舍面積) */}

        {/* Map placeholder */}
        <div className="mt-5 aspect-[4/3] rounded-2xl bg-slate-100 flex items-center justify-center">
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(school.address_tc || school.name_tc)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 underline"
          >
            在 Google 地圖中開啟
          </a>
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
