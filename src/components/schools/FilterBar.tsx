"use client";

import { FilterBar as SharedFilterBar, type FilterActiveTag, type FilterOptionGroup } from "@/components/ui/FilterBar";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  vacancyFilter: string[];
  selectedGrade: "n" | "k1" | "k2" | "k3" | null;
  sessionFilter: string | null;
  hasNurseryFilter: boolean;
  onToggleDistrict: (district: District) => void;
  onUpdateFilter: (key: string, value: string | null) => void;
  onToggleVacancy: (status: string) => void;
}

const DISTRICT_GROUPS: FilterOptionGroup[] = [
  { label: "港島", options: ["central_and_western", "eastern", "southern", "wan_chai"].map(toDistrictOption) },
  { label: "九龍", options: ["kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong"].map(toDistrictOption) },
  { label: "新界", options: ["kwai_tsing", "north", "sai_kung", "sha_tin", "tai_po", "tsuen_wan", "tuen_mun", "yuen_long"].map(toDistrictOption) },
  { label: "離島", options: ["islands"].map(toDistrictOption) },
];

const vacancyOptions = [
  { key: "has_vacancy", label: "有位" },
  { key: "no_vacancy", label: "滿額" },
  { key: "waiting_list", label: "候補" },
  { key: "no_information", label: "待更新" },
];

const gradeOptions = [
  { key: "n", label: "N" },
  { key: "k1", label: "K1" },
  { key: "k2", label: "K2" },
  { key: "k3", label: "K3" },
];

const sessionOptions = [
  { key: "am", label: "上午" },
  { key: "pm", label: "下午" },
  { key: "whole_day", label: "全日" },
  { key: "half_day", label: "混合/半日" },
];

const schoolTypeOptions = Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => ({ key, label }));

function toDistrictOption(key: string) {
  return { key, label: DISTRICT_LABELS[key as District] ?? key };
}

function districtSummary(selectedDistricts: District[]) {
  if (selectedDistricts.length === 0) return "全部地區";
  if (selectedDistricts.length <= 2) return selectedDistricts.map((district) => DISTRICT_LABELS[district]).join("、");
  return `${DISTRICT_LABELS[selectedDistricts[0]]}等 ${selectedDistricts.length} 區`;
}

export function FilterBar({
  selectedDistricts,
  selectedType,
  vacancyFilter,
  selectedGrade,
  sessionFilter,
  hasNurseryFilter,
  onToggleDistrict,
  onUpdateFilter,
  onToggleVacancy,
}: FilterBarProps) {
  const tags: FilterActiveTag[] = [
    ...selectedDistricts.map((district) => ({
      key: `district-${district}`,
      label: DISTRICT_LABELS[district],
      onRemove: () => onToggleDistrict(district),
    })),
    ...(sessionFilter ? [{ key: "session", label: sessionOptions.find((item) => item.key === sessionFilter)?.label ?? sessionFilter, onRemove: () => onUpdateFilter("session", null) }] : []),
    ...(selectedGrade ? [{ key: "grade", label: selectedGrade.toUpperCase(), onRemove: () => onUpdateFilter("grade", null) }] : []),
    ...(selectedType ? [{ key: "type", label: SCHOOL_TYPE_LABELS[selectedType] ?? selectedType, onRemove: () => onUpdateFilter("type", null) }] : []),
    ...(hasNurseryFilter ? [{ key: "nursery", label: "設有 N 班", onRemove: () => onUpdateFilter("hasNursery", null) }] : []),
  ];

  return (
    <div className="mb-6">
      <SharedFilterBar
        districtGroups={DISTRICT_GROUPS}
        selectedDistrictKeys={selectedDistricts}
        districtSummary={districtSummary(selectedDistricts)}
        onToggleDistrict={(key) => onToggleDistrict(key as District)}
        onClearDistricts={() => selectedDistricts.forEach(onToggleDistrict)}
        sections={[
          {
            key: "vacancy",
            label: "學位狀態",
            options: vacancyOptions,
            selectedKeys: vacancyFilter,
            onToggle: onToggleVacancy,
          },
          {
            key: "grade",
            label: "年級",
            options: gradeOptions,
            selectedKeys: selectedGrade ? [selectedGrade] : [],
            onToggle: (key) => onUpdateFilter("grade", selectedGrade === key ? null : key),
          },
          {
            key: "school-type",
            label: "學校類別",
            options: schoolTypeOptions,
            selectedKeys: selectedType ? [selectedType] : [],
            onToggle: (key) => onUpdateFilter("type", selectedType === key ? null : key),
          },
          {
            key: "session",
            label: "上課時段",
            options: sessionOptions,
            selectedKeys: sessionFilter ? [sessionFilter] : [],
            onToggle: (key) => onUpdateFilter("session", sessionFilter === key ? null : key),
          },
          {
            key: "nursery",
            label: "N 班",
            options: [{ key: "true", label: "設有 N 班" }],
            selectedKeys: hasNurseryFilter ? ["true"] : [],
            onToggle: () => onUpdateFilter("hasNursery", hasNurseryFilter ? null : "true"),
          },
        ]}
        activeTags={tags}
        onReset={() => {
          selectedDistricts.forEach(onToggleDistrict);
          vacancyFilter.forEach(onToggleVacancy);
          onUpdateFilter("grade", null);
          onUpdateFilter("type", null);
          onUpdateFilter("session", null);
          onUpdateFilter("hasNursery", null);
          onUpdateFilter("schoolandFreeScheme", null);
          onUpdateFilter("schoolandGroup", null);
          onUpdateFilter("schoolandSize", null);
        }}
      />
    </div>
  );
}
