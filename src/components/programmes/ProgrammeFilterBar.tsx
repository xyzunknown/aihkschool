"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FilterBar, type FilterActiveTag, type FilterOptionGroup } from "@/components/ui/FilterBar";
import type { ProgrammeCategory } from "@/lib/db/programmes";
import {
  PROGRAMME_CATEGORY_LABELS,
  PROGRAMME_DISTRICT_LABELS,
} from "@/lib/programmes/labels";

export type AgePresetKey =
  | "all"
  | "infant"
  | "preschool"
  | "primary"
  | "teen"
  | "adult"
  | "family";

export type ProgrammeSortKey = "deadline" | "distance";

interface ProgrammeFilterBarProps {
  category: ProgrammeCategory | null;
  selectedDistricts: string[];
  agePreset: AgePresetKey;
  sort: ProgrammeSortKey;
  courseCount: number;
  onChangeCategory: (v: ProgrammeCategory | null) => void;
  onChangeDistricts: (v: string[]) => void;
  onChangeAgePreset: (v: AgePresetKey) => void;
  onChangeSort: (v: ProgrammeSortKey) => void;
  onReset: () => void;
}

const DISTRICT_GROUPS: FilterOptionGroup[] = [
  { label: "港島", options: ["central_and_western", "wan_chai", "eastern", "southern"].map(toDistrictOption) },
  { label: "九龍", options: ["yau_tsim_mong", "sham_shui_po", "kowloon_city", "wong_tai_sin", "kwun_tong"].map(toDistrictOption) },
  { label: "新界", options: ["tsuen_wan", "tuen_mun", "yuen_long", "north", "tai_po", "sha_tin", "sai_kung", "kwai_tsing"].map(toDistrictOption) },
  { label: "離島", options: ["islands"].map(toDistrictOption) },
];

const AGE_PRESETS: { key: AgePresetKey; label: string }[] = [
  { key: "all", label: "全部年齡" },
  { key: "preschool", label: "幼兒 3–5" },
  { key: "infant", label: "嬰幼兒 0–2" },
  { key: "primary", label: "兒童 6–11" },
  { key: "teen", label: "青少年 12–17" },
  { key: "adult", label: "成人 18+" },
];

const TYPE_PRESETS: { key: ProgrammeCategory; label: string }[] = [
  { key: "swimming", label: "游泳" },
  { key: "sport", label: "運動" },
  { key: "music", label: "音樂" },
  { key: "dance", label: "舞蹈" },
  { key: "art", label: "美術" },
  { key: "other", label: "其他" },
];

const SORT_OPTIONS: { key: ProgrammeSortKey; label: string }[] = [
  { key: "deadline", label: "最快截止報名" },
  { key: "distance", label: "距離最近" },
];

function toDistrictOption(key: string) {
  return { key, label: PROGRAMME_DISTRICT_LABELS[key] ?? key };
}

function districtSummary(selectedDistricts: string[]) {
  if (selectedDistricts.length === 0) return "全部地區";
  const names = selectedDistricts.map((d) => PROGRAMME_DISTRICT_LABELS[d] ?? d);
  if (names.length <= 2) return names.join("、");
  return `${names[0]}等 ${names.length} 區`;
}

export function ProgrammeFilterBar({
  category,
  selectedDistricts,
  agePreset,
  sort,
  courseCount,
  onChangeCategory,
  onChangeDistricts,
  onChangeAgePreset,
  onChangeSort,
  onReset,
}: ProgrammeFilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);

  const selectedTags = useMemo<FilterActiveTag[]>(() => {
    const tags: FilterActiveTag[] = selectedDistricts.map((district) => ({
      key: `district-${district}`,
      label: PROGRAMME_DISTRICT_LABELS[district] ?? district,
      onRemove: () => onChangeDistricts(selectedDistricts.filter((item) => item !== district)),
    }));
    if (agePreset !== "all") {
      tags.push({
        key: `age-${agePreset}`,
        label: AGE_PRESETS.find((item) => item.key === agePreset)?.label ?? agePreset,
        onRemove: () => onChangeAgePreset("all"),
      });
    }
    if (category) {
      tags.push({
        key: `category-${category}`,
        label: PROGRAMME_CATEGORY_LABELS[category],
        onRemove: () => onChangeCategory(null),
      });
    }
    return tags;
  }, [agePreset, category, onChangeAgePreset, onChangeCategory, onChangeDistricts, selectedDistricts]);

  const toggleDistrict = (district: string) => {
    onChangeDistricts(
      selectedDistricts.includes(district)
        ? selectedDistricts.filter((item) => item !== district)
        : [...selectedDistricts, district],
    );
  };

  return (
    <FilterBar
      districtGroups={DISTRICT_GROUPS}
      selectedDistrictKeys={selectedDistricts}
      districtSummary={districtSummary(selectedDistricts)}
      onToggleDistrict={toggleDistrict}
      onClearDistricts={() => onChangeDistricts([])}
      sections={[
        {
          key: "age",
          label: "年齡",
          options: AGE_PRESETS,
          selectedKeys: [agePreset],
          onToggle: (key) => onChangeAgePreset(key as AgePresetKey),
        },
        {
          key: "category",
          label: "課程類別",
          options: TYPE_PRESETS,
          selectedKeys: category ? [category] : [],
          onToggle: (key) => onChangeCategory(category === key ? null : (key as ProgrammeCategory)),
        },
      ]}
      activeTags={selectedTags}
      onReset={onReset}
      footer={
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSortOpen((value) => !value)}
            className={`inline-flex h-8 items-center gap-2 rounded-chip border px-3 text-label font-semibold transition-colors ${
              sortOpen ? "border-forest-700 text-forest-800" : "border-surface-border text-ink-700"
            }`}
            aria-expanded={sortOpen}
          >
            排序：{SORT_OPTIONS.find((item) => item.key === sort)?.label}
            <ChevronDown aria-hidden="true" size={16} strokeWidth={1.7} className={sortOpen ? "rotate-180" : ""} />
          </button>
          <p className="text-small font-semibold text-ink-500">共 {courseCount} 個課程</p>
          {sortOpen ? (
            <div className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-card border border-surface-border bg-white p-2 shadow-card">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    onChangeSort(option.key);
                    setSortOpen(false);
                  }}
                  className={`flex w-full rounded-chip px-3 py-2 text-left text-small font-semibold transition ${
                    sort === option.key ? "bg-forest-700 text-white" : "text-ink-700 hover:bg-forest-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      }
    />
  );
}
