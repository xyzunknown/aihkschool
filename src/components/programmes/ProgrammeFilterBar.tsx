import type { ProgrammeCategory } from "@/lib/db/programmes";
import {
  PROGRAMME_CATEGORY_LABELS,
  PROGRAMME_CATEGORY_ORDER,
  PROGRAMME_DISTRICT_LABELS,
} from "@/lib/programmes/labels";

interface ProgrammeFilterBarProps {
  category: ProgrammeCategory | null;
  district: string | null;
  onChangeCategory: (v: ProgrammeCategory | null) => void;
  onChangeDistrict: (v: string | null) => void;
  onReset: () => void;
}

const DISTRICT_ORDER = [
  "central_and_western", "eastern", "southern", "wan_chai",
  "kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong",
  "sha_tin", "tsuen_wan", "kwai_tsing", "tai_po", "north",
  "sai_kung", "tuen_mun", "yuen_long", "islands",
];

export function ProgrammeFilterBar({
  category,
  district,
  onChangeCategory,
  onChangeDistrict,
  onReset,
}: ProgrammeFilterBarProps) {
  const hasFilter = !!category || !!district;

  return (
    <div className="space-y-3">
      {/* 類別 pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {PROGRAMME_CATEGORY_ORDER.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              onClick={() => onChangeCategory(isActive ? null : cat)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {PROGRAMME_CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {/* 地區下拉 + 清除 */}
      <div className="flex items-center gap-3">
        <select
          value={district ?? ""}
          onChange={(e) => onChangeDistrict(e.target.value || null)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
        >
          <option value="">全部地區</option>
          {DISTRICT_ORDER.map((d) => (
            <option key={d} value={d}>
              {PROGRAMME_DISTRICT_LABELS[d]}
            </option>
          ))}
        </select>

        {hasFilter && (
          <button
            onClick={onReset}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50"
          >
            清除篩選
          </button>
        )}
      </div>
    </div>
  );
}
