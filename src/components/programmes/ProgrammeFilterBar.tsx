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
    <div className="relative rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:px-5">
      <div className="grid gap-3 border-b border-surface-border pb-3 md:grid-cols-[88px_1fr] md:items-center">
        <h4 className="text-xs font-semibold text-slate-600">地區位置</h4>
        <div className="flex flex-wrap items-center gap-2">
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
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "more" ? null : "more")}
          className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-ink-700 transition hover:border-brand-400 hover:bg-brand-50"
        >
          <span className="hidden md:inline">{moreFilters.length > 0 ? `更多篩選：${moreFilters.length}` : "更多篩選"} {openPanel === "more" ? "⌃" : "⌄"}</span>
          <span className="md:hidden">{moreFilters.length > 0 ? `篩選 ${moreFilters.length}` : "篩選"} {openPanel === "more" ? "⌃" : "⌄"}</span>
        </button>
        </div>
      </div>

      {openPanel === "district" ? (
        <InlineDistrictPanel
          selectedDistricts={selectedDistricts}
          onChangeDistricts={onChangeDistricts}
        />
      ) : null}

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
              {openPanel === "sort" ? "⌃" : "⌄"}
            </span>
          </button>
          <p className="inline-flex h-9 items-center text-sm font-semibold text-slate-500">共 {courseCount} 個課程</p>
        </div>
      </div>

      <div className="hidden md:block">
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
        {openPanel === "more" ? (
          <div className="fixed inset-0 z-[100] bg-slate-950/30" onClick={() => setOpenPanel(null)}>
            <div
              className="absolute inset-x-0 bottom-0 max-h-[82vh] rounded-t-3xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <MorePanel
                title="篩選課程"
                selectedFilters={moreFilters}
                courseCount={courseCount}
                clearLabel="清除全部"
                onChangeFilters={onChangeMoreFilters}
                onClose={() => setOpenPanel(null)}
              />
            </div>
          </div>
        ) : null}
      </div>
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
}: {
  selectedDistricts: string[];
  onChangeDistricts: (v: string[]) => void;
}) {
  const toggleDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      onChangeDistricts(selectedDistricts.filter((item) => item !== district));
    } else {
      onChangeDistricts([...selectedDistricts, district]);
    }
  };

  return (
    <section className="mt-3 overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-surface-border px-4 py-3 md:px-5">
        <h3 className="text-xs font-semibold text-slate-500">共 18 區 · 已選 {selectedDistricts.length}</h3>
        <button
          type="button"
          onClick={() => onChangeDistricts([])}
          className="text-xs font-semibold text-slate-500 transition hover:text-brand-700"
        >
          清除全部
        </button>
      </div>
      <div className="px-4 py-3 md:px-5">
        <div className="divide-y divide-surface-border overflow-hidden md:max-h-[252px]">
          {DISTRICT_GROUPS.map((group) => (
            <div key={group.label} className="grid grid-cols-[70px_1fr] md:grid-cols-[86px_1fr]">
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
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-200/50 md:px-5">
      <div className="border-t border-slate-200 pt-4">
        <h3 className="text-base font-bold text-slate-900">排序</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onChoose(option.key)}
              className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                activeSort === option.key
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              {option.label}
              {option.hint ? <span className="ml-2 text-xs opacity-70">{option.hint}</span> : null}
            </button>
          ))}
        </div>
      </div>
    </section>
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
