"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
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
  | "distance"
  | "price_asc"
  | "price_desc"
  | "latest";

export type MoreFilterKey =
  | "available"
  | "tight"
  | "closing"
  | "single"
  | "multi"
  | "trial"
  | "weekday"
  | "weekend"
  | "mtr"
  | "indoor"
  | "outdoor";

interface ProgrammeFilterBarProps {
  category: ProgrammeCategory | null;
  selectedDistricts: string[];
  agePreset: AgePresetKey;
  sort: ProgrammeSortKey;
  moreFilters: MoreFilterKey[];
  courseCount: number;
  onChangeCategory: (v: ProgrammeCategory | null) => void;
  onChangeDistricts: (v: string[]) => void;
  onChangeAgePreset: (v: AgePresetKey) => void;
  onChangeSort: (v: ProgrammeSortKey) => void;
  onChangeMoreFilters: (v: MoreFilterKey[]) => void;
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
  { key: "distance", label: "距離最近", hint: "需開啟定位" },
  { key: "price_asc", label: "價格低至高" },
  { key: "price_desc", label: "價格高至低" },
  { key: "latest", label: "最新上架" },
];

const MORE_GROUPS: { title: string; items: { key: MoreFilterKey; label: string }[] }[] = [
  {
    title: "報名狀態",
    items: [
      { key: "available", label: "只看可報名" },
      { key: "tight", label: "名額緊張" },
      { key: "closing", label: "即將截止" },
    ],
  },
  {
    title: "課程形式",
    items: [
      { key: "single", label: "單堂" },
      { key: "multi", label: "多堂課程" },
      { key: "trial", label: "體驗課" },
    ],
  },
  {
    title: "上課日子",
    items: [
      { key: "weekday", label: "平日" },
      { key: "weekend", label: "週末" },
    ],
  },
  {
    title: "地點特性",
    items: [
      { key: "mtr", label: "近港鐵" },
      { key: "indoor", label: "室內" },
      { key: "outdoor", label: "戶外" },
    ],
  },
];

const MORE_FILTER_LABELS = Object.fromEntries(
  MORE_GROUPS.flatMap((group) => group.items.map((item) => [item.key, item.label])),
) as Record<MoreFilterKey, string>;

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
  moreFilters,
  courseCount,
  onChangeCategory,
  onChangeDistricts,
  onChangeAgePreset,
  onChangeSort,
  onChangeMoreFilters,
  onReset,
}: ProgrammeFilterBarProps) {
  const [openPanel, setOpenPanel] = useState<"district" | "sort" | "more" | null>(null);

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
    moreFilters.forEach((filter) => {
      tags.push({
        key: `more-${filter}`,
        label: MORE_FILTER_LABELS[filter],
        remove: () => onChangeMoreFilters(moreFilters.filter((item) => item !== filter)),
      });
    });
    return tags;
  }, [agePreset, category, moreFilters, onChangeAgePreset, onChangeCategory, onChangeDistricts, onChangeMoreFilters, selectedDistricts]);

  const showClear = selectedDistricts.length > 0 || agePreset !== "preschool" || category !== "swimming" || moreFilters.length > 0;
  const selectedDistrictText = districtSummary(selectedDistricts);

  const chooseSort = (key: ProgrammeSortKey) => {
    if (key === "distance") {
      window.alert("開啟定位後，可按距離最近排序附近課程。");
      return;
    }
    onChangeSort(key);
    setOpenPanel(null);
  };

  return (
    <div className="relative rounded-2xl bg-white/90 px-1 py-1 md:px-0 md:py-0">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "district" ? null : "district")}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-200 bg-white px-4 text-sm font-semibold text-brand-800 shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
        >
          地區：{selectedDistrictText} <span className="ml-2 text-brand-600">⌄</span>
        </button>

        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "sort" ? null : "sort")}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-slate-50"
        >
          <span className="hidden md:inline">排序：{sortLabel(sort)}</span>
          <span className="md:hidden">排序</span>
          <span className="ml-2 text-slate-500">⌄</span>
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {AGE_PRESETS.map((p) => {
          const isActive = agePreset === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onChangeAgePreset(p.key)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-700 text-white shadow-sm"
                  : "border border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TYPE_PRESETS.map((item) => {
          const isActive = category === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeCategory(isActive ? null : item.key)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "more" ? null : "more")}
          className="flex-shrink-0 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50"
        >
          <span className="hidden md:inline">{moreFilters.length > 0 ? `更多篩選：${moreFilters.length}` : "更多篩選"} ⌄</span>
          <span className="md:hidden">{moreFilters.length > 0 ? `篩選 ${moreFilters.length}` : "篩選"} ⌄</span>
        </button>
      </div>

      {selectedTags.length > 0 ? (
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 text-sm scrollbar-hide">
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
      ) : null}

      <p className="mt-3 text-sm text-slate-500">共 {courseCount} 個課程</p>

      <div className="hidden md:block">
        {openPanel === "district" ? (
          <FloatingPanel align="left">
            <DistrictPanel
              selectedDistricts={selectedDistricts}
              courseCount={courseCount}
              onChangeDistricts={onChangeDistricts}
              onClose={() => setOpenPanel(null)}
            />
          </FloatingPanel>
        ) : null}

        {openPanel === "sort" ? (
          <FloatingPanel align="right" compact>
            <SortPanel activeSort={sort} onChoose={chooseSort} />
          </FloatingPanel>
        ) : null}

        {openPanel === "more" ? (
          <FloatingPanel align="left">
            <MorePanel
              selectedFilters={moreFilters}
              courseCount={courseCount}
              clearLabel="清除"
              onChangeFilters={onChangeMoreFilters}
              onClose={() => setOpenPanel(null)}
            />
          </FloatingPanel>
        ) : null}
      </div>

      <div className="md:hidden">
        {openPanel ? (
          <div className="fixed inset-0 z-[100] bg-slate-950/30" onClick={() => setOpenPanel(null)}>
            <div
              className="absolute inset-x-0 bottom-0 max-h-[82vh] rounded-t-3xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {openPanel === "district" ? (
                <DistrictPanel
                  title="選擇地區"
                  selectedDistricts={selectedDistricts}
                  courseCount={courseCount}
                  onChangeDistricts={onChangeDistricts}
                  onClose={() => setOpenPanel(null)}
                />
              ) : null}
              {openPanel === "sort" ? (
                <SortPanel activeSort={sort} onChoose={chooseSort} mobile />
              ) : null}
              {openPanel === "more" ? (
                <MorePanel
                  title="篩選課程"
                  selectedFilters={moreFilters}
                  courseCount={courseCount}
                  clearLabel="清除全部"
                  onChangeFilters={onChangeMoreFilters}
                  onClose={() => setOpenPanel(null)}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FloatingPanel({
  align,
  compact,
  children,
}: {
  align: "left" | "right";
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute top-full z-30 mt-3 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 ${
        align === "right" ? "right-0" : "left-0"
      } ${compact ? "w-72" : "w-[680px]"}`}
    >
      {children}
    </div>
  );
}

function DistrictPanel({
  title = "地區",
  selectedDistricts,
  courseCount,
  onChangeDistricts,
  onClose,
}: {
  title?: string;
  selectedDistricts: string[];
  courseCount: number;
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
    <div className="flex max-h-[82vh] flex-col">
      <div className="overflow-y-auto px-5 pt-5 md:px-6">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <div className="mt-4">
          <FilterChip
            label="全部地區"
            active={selectedDistricts.length === 0}
            onClick={() => onChangeDistricts([])}
          />
        </div>
        <div className="mt-5 space-y-5 pb-5">
          {DISTRICT_GROUPS.map((group) => (
            <section key={group.label}>
              <h4 className="mb-2 text-sm font-semibold text-slate-500">{group.label}</h4>
              <div className="flex flex-wrap gap-2">
                {group.districts.map((district) => (
                  <FilterChip
                    key={district}
                    label={PROGRAMME_DISTRICT_LABELS[district] ?? district}
                    active={selectedDistricts.includes(district)}
                    onClick={() => toggleDistrict(district)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <PanelFooter
        clearLabel="清除"
        courseCount={courseCount}
        onClear={() => onChangeDistricts([])}
        onApply={onClose}
      />
    </div>
  );
}

function MorePanel({
  title = "更多篩選",
  selectedFilters,
  courseCount,
  clearLabel,
  onChangeFilters,
  onClose,
}: {
  title?: string;
  selectedFilters: MoreFilterKey[];
  courseCount: number;
  clearLabel: string;
  onChangeFilters: (v: MoreFilterKey[]) => void;
  onClose: () => void;
}) {
  const toggleFilter = (filter: MoreFilterKey) => {
    if (selectedFilters.includes(filter)) {
      onChangeFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      onChangeFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="flex max-h-[82vh] flex-col">
      <div className="overflow-y-auto px-5 pt-5 md:px-6">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <div className="mt-5 space-y-5 pb-5">
          {MORE_GROUPS.map((group) => (
            <section key={group.title}>
              <h4 className="mb-2 text-sm font-semibold text-slate-500">{group.title}</h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <FilterChip
                    key={item.key}
                    label={item.label}
                    active={selectedFilters.includes(item.key)}
                    onClick={() => toggleFilter(item.key)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <PanelFooter
        clearLabel={clearLabel}
        courseCount={courseCount}
        onClear={() => onChangeFilters([])}
        onApply={onClose}
      />
    </div>
  );
}

function SortPanel({
  activeSort,
  onChoose,
  mobile,
}: {
  activeSort: ProgrammeSortKey;
  onChoose: (v: ProgrammeSortKey) => void;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "px-5 pb-5 pt-5" : "p-3"}>
      {mobile ? <h3 className="mb-3 text-base font-bold text-slate-900">排序</h3> : null}
      <div className="space-y-1">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChoose(option.key)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeSort === option.key
                ? "bg-brand-50 text-brand-800"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>{option.label}</span>
            {option.hint ? <span className="text-xs font-medium text-slate-400">{option.hint}</span> : null}
          </button>
        ))}
      </div>
    </div>
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
      className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
        active
          ? "bg-brand-700 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50"
      }`}
    >
      {label}
    </button>
  );
}

function PanelFooter({
  clearLabel,
  courseCount,
  onClear,
  onApply,
}: {
  clearLabel: string;
  courseCount: number;
  onClear: () => void;
  onApply: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white px-5 py-4 md:px-6">
      <button
        type="button"
        onClick={onClear}
        className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
      >
        {clearLabel}
      </button>
      <button
        type="button"
        onClick={onApply}
        className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
      >
        查看 {courseCount} 個課程
      </button>
    </div>
  );
}
