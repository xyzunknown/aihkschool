"use client";

import { useMemo, useState } from "react";
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

export type ProgrammeSortKey =
  | "deadline"
  | "distance";

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

const DISTRICT_GROUPS = [
  {
    label: "港島",
    districts: ["central_and_western", "wan_chai", "eastern", "southern"],
  },
  {
    label: "九龍",
    districts: ["yau_tsim_mong", "sham_shui_po", "kowloon_city", "wong_tai_sin", "kwun_tong"],
  },
  {
    label: "新界",
    districts: ["tsuen_wan", "tuen_mun", "yuen_long", "north", "tai_po", "sha_tin", "sai_kung", "kwai_tsing"],
  },
  {
    label: "離島",
    districts: ["islands"],
  },
];

const AGE_PRESETS: { key: AgePresetKey; label: string }[] = [
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

const SORT_OPTIONS: { key: ProgrammeSortKey; label: string; hint?: string }[] = [
  { key: "deadline", label: "最快截止報名" },
  { key: "distance", label: "距離最近" },
];

function ageLabel(key: AgePresetKey) {
  return AGE_PRESETS.find((item) => item.key === key)?.label ?? "";
}

function sortLabel(key: ProgrammeSortKey) {
  return SORT_OPTIONS.find((item) => item.key === key)?.label ?? "最快截止報名";
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
  const [openPanel, setOpenPanel] = useState<"district" | "sort" | null>(null);

  const selectedTags = useMemo(() => {
    const tags: { key: string; label: string; remove: () => void }[] = [];
    if (selectedDistricts.length > 0) {
      selectedDistricts.forEach((district) => {
        tags.push({
          key: `district-${district}`,
          label: PROGRAMME_DISTRICT_LABELS[district] ?? district,
          remove: () => onChangeDistricts(selectedDistricts.filter((item) => item !== district)),
        });
      });
    }
    if (agePreset !== "all") {
      tags.push({
        key: `age-${agePreset}`,
        label: ageLabel(agePreset),
        remove: () => onChangeAgePreset("all"),
      });
    }
    if (category) {
      tags.push({
        key: `category-${category}`,
        label: PROGRAMME_CATEGORY_LABELS[category],
        remove: () => onChangeCategory(null),
      });
    }
    return tags;
  }, [agePreset, category, onChangeAgePreset, onChangeCategory, onChangeDistricts, selectedDistricts]);

  const showClear = selectedDistricts.length > 0 || agePreset !== "preschool" || category !== "swimming";
  const selectedDistrictText = districtSummary(selectedDistricts);

  const chooseSort = (key: ProgrammeSortKey) => {
    onChangeSort(key);
    setOpenPanel(null);
  };

  return (
    <div className="relative rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:px-5">
      <div className="grid gap-3 border-b border-surface-border pb-3 md:grid-cols-[88px_1fr] md:items-center">
        <h4 className="text-xs font-semibold text-slate-600">地區位置</h4>
        <div className="relative flex flex-wrap items-center gap-2">
          <div
            className={`inline-flex h-8 overflow-hidden rounded-lg border transition-colors ${
              openPanel === "district" || selectedDistricts.length > 0
                ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                : "border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "district" ? null : "district")}
              className="inline-flex items-center justify-center px-3 text-xs font-semibold"
            >
              {selectedDistrictText}
            </button>
            <button
              type="button"
              aria-label="展開地區選單"
              onClick={() => setOpenPanel(openPanel === "district" ? null : "district")}
              className={`inline-flex w-8 shrink-0 items-center justify-center border-l transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 ${
                openPanel === "district" || selectedDistricts.length > 0
                  ? "border-white/20 bg-brand-600 text-white"
                  : "border-slate-200 bg-surface-soft text-ink-500 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              <ChevronDownIcon expanded={openPanel === "district"} />
            </button>
          </div>
          {openPanel === "district" ? (
            <InlineDistrictPanel
              selectedDistricts={selectedDistricts}
              onChangeDistricts={onChangeDistricts}
              onClose={() => setOpenPanel(null)}
            />
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 border-b border-surface-border py-3 md:grid-cols-[88px_1fr] md:items-center">
        <h4 className="text-xs font-semibold text-slate-600">年齡</h4>
        <div className="flex flex-wrap gap-2">
        {AGE_PRESETS.map((p) => {
          const isActive = agePreset === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onChangeAgePreset(p.key)}
              className={`inline-flex h-8 items-center rounded-lg px-3 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-brand-700 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              {p.label}
            </button>
          );
        })}
        </div>
      </div>

      <div className="grid gap-3 border-b border-surface-border py-3 md:grid-cols-[88px_1fr] md:items-center">
        <h4 className="text-xs font-semibold text-slate-600">課程類別</h4>
        <div className="flex flex-wrap gap-2">
        {TYPE_PRESETS.map((item) => {
          const isActive = category === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeCategory(isActive ? null : item.key)}
              className={`inline-flex h-8 items-center rounded-lg px-3 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-brand-700 text-white"
                  : "border border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
        </div>
      </div>

      {openPanel === "sort" ? (
        <InlineSortPanel activeSort={sort} onChoose={chooseSort} />
      ) : null}

      <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        {selectedTags.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm scrollbar-hide">
            <span className="flex-shrink-0 text-slate-500">已選：</span>
            {selectedTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={tag.remove}
                className="flex-shrink-0 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600 transition hover:bg-slate-200"
              >
                {tag.label} ×
              </button>
            ))}
            {showClear ? (
              <button
                type="button"
                onClick={onReset}
                className="flex-shrink-0 rounded-full px-2 py-1 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                清除全部
              </button>
            ) : null}
          </div>
        ) : (
          <span className="text-sm text-slate-500">已選：無</span>
        )}

        <div className="flex flex-shrink-0 items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === "sort" ? null : "sort")}
            className={`inline-flex h-9 items-center justify-center rounded-lg border bg-white px-3 text-sm font-semibold shadow-sm transition hover:border-brand-400 hover:bg-brand-50 ${
              openPanel === "sort"
                ? "border-brand-700 text-brand-800"
                : "border-slate-200 text-slate-700"
            }`}
          >
            排序：{sortLabel(sort)}
            <span className={`ml-2 ${openPanel === "sort" ? "text-brand-700" : "text-slate-500"}`}>
              <ChevronDownIcon expanded={openPanel === "sort"} />
            </span>
          </button>
          <p className="inline-flex h-9 items-center text-sm font-semibold text-slate-500">共 {courseCount} 個課程</p>
        </div>
      </div>

      {openPanel === "district" ? <div className="fixed inset-0 z-20" onClick={() => setOpenPanel(null)} /> : null}
    </div>
  );
}

function ChevronDownIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function InlineDistrictPanel({
  selectedDistricts,
  onChangeDistricts,
  onClose,
}: {
  selectedDistricts: string[];
  onChangeDistricts: (v: string[]) => void;
  onClose: () => void;
}) {
  const toggleDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      onChangeDistricts(selectedDistricts.filter((item) => item !== district));
    } else {
      onChangeDistricts([...selectedDistricts, district]);
    }
  };

  return (
    <section className="absolute left-0 top-full z-30 mt-2 w-[min(92vw,440px)] overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-surface-border px-4 py-3">
        <h3 className="text-xs font-semibold text-slate-500">共 18 區 · 已選 {selectedDistricts.length}</h3>
        <button
          type="button"
          onClick={() => onChangeDistricts([])}
          className="text-xs font-semibold text-slate-500 transition hover:text-brand-700"
        >
          清除全部
        </button>
      </div>
      <div className="max-h-[300px] overflow-y-auto px-4 py-3">
        <div className="divide-y divide-surface-border overflow-hidden">
          {DISTRICT_GROUPS.map((group) => (
            <div key={group.label} className="grid grid-cols-[70px_1fr]">
              <div className="px-1 py-3 text-xs font-bold text-slate-600">
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2 py-2.5">
                {group.districts.map((district) => (
                  <FilterChip
                    key={district}
                    label={PROGRAMME_DISTRICT_LABELS[district] ?? district}
                    active={selectedDistricts.includes(district)}
                    onClick={() => toggleDistrict(district)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-surface-border px-4 py-3">
        <button type="button" onClick={onClose} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          取消
        </button>
        <button type="button" onClick={onClose} className="rounded-full bg-brand-700 px-5 py-2 text-xs font-bold text-white shadow-sm">
          套用 {selectedDistricts.length}
        </button>
      </div>
    </section>
  );
}

function InlineSortPanel({
  activeSort,
  onChoose,
}: {
  activeSort: ProgrammeSortKey;
  onChoose: (v: ProgrammeSortKey) => void;
}) {
  return (
    <section className="mt-3 overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-surface-border px-4 py-3 md:px-5">
        <h3 className="text-xs font-semibold text-slate-500">排序方式</h3>
      </div>
      <div className="px-4 py-3 md:px-5">
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onChoose(option.key)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                activeSort === option.key
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-brand-700 text-white"
          : "border border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50"
      }`}
    >
      {label}
    </button>
  );
}
