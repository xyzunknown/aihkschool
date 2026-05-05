"use client";

import type { ProgrammeCategory } from "@/lib/db/programmes";
import {
  PROGRAMME_CATEGORY_LABELS,
  PROGRAMME_CATEGORY_ORDER,
  PROGRAMME_DISTRICT_LABELS,
} from "@/lib/programmes/labels";

export type AgePresetKey =
  | "all"
  | "infant"      // 0-2
  | "preschool"   // 3-5  (default)
  | "primary"     // 6-11
  | "teen"        // 12-17
  | "adult"       // 18+
  | "family";     // parent_child category

interface ProgrammeFilterBarProps {
  category: ProgrammeCategory | null;
  district: string | null;
  agePreset: AgePresetKey;
  onChangeCategory: (v: ProgrammeCategory | null) => void;
  onChangeDistrict: (v: string | null) => void;
  onChangeAgePreset: (v: AgePresetKey) => void;
  onReset: () => void;
}

const DISTRICT_ORDER = [
  "central_and_western", "eastern", "southern", "wan_chai",
  "kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong",
  "sha_tin", "tsuen_wan", "kwai_tsing", "tai_po", "north",
  "sai_kung", "tuen_mun", "yuen_long", "islands",
];

const AGE_PRESETS: { key: AgePresetKey; label: string }[] = [
  { key: "preschool", label: "幼兒 3-5" },
  { key: "infant", label: "嬰幼兒 0-2" },
  { key: "primary", label: "兒童 6-11" },
  { key: "teen", label: "青少年 12-17" },
  { key: "adult", label: "成人 18+" },
  { key: "family", label: "親子" },
  { key: "all", label: "全部" },
];

export function ProgrammeFilterBar({
  category,
  district,
  agePreset,
  onChangeCategory,
  onChangeDistrict,
  onChangeAgePreset,
  onReset,
}: ProgrammeFilterBarProps) {
  const hasFilter = !!category || !!district || agePreset !== "preschool";

  return (
    <div className="space-y-3">
      {/* 年齡預設 pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {AGE_PRESETS.map((p) => {
          const isActive = agePreset === p.key;
          return (
            <button
              key={p.key}
              onClick={() => onChangeAgePreset(p.key)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

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
