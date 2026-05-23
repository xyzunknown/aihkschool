"use client";

import { useState } from "react";
import type { ReactNode } from "react";
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

const DISTRICT_GROUPS: { label: string; districts: District[] }[] = [
  { label: "港島", districts: ["central_and_western", "eastern", "southern", "wan_chai"] },
  { label: "九龍", districts: ["kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong"] },
  { label: "新界", districts: ["kwai_tsing", "north", "sai_kung", "sha_tin", "tai_po", "tsuen_wan", "tuen_mun", "yuen_long"] },
  { label: "離島", districts: ["islands"] },
];

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
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(
    !!(
      sessionFilter ||
      hasNurseryFilter
    )
  );

  const pillBase = "inline-flex h-8 items-center rounded-lg px-3 text-xs font-semibold transition-colors";
  const pillActive = "bg-brand-700 text-white shadow-sm";
  const pillInactive = "border border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50";

  const vacancyOptions = [
    { key: "has_vacancy", label: "有位" },
    { key: "no_vacancy", label: "满额" },
    { key: "waiting_list", label: "候补" },
    { key: "no_information", label: "待更新" },
  ];

  const gradeOptions = [
    { key: "all", label: "全部年级" },
    { key: "n", label: "N" },
    { key: "k1", label: "K1" },
    { key: "k2", label: "K2" },
    { key: "k3", label: "K3" },
  ] as const;

  const schoolTypeOptions = [
    { key: "all", label: "全部" },
    ...Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => ({ key, label })),
  ];

  const sessionOptions = [
    { key: "all", label: "全部" },
    { key: "am", label: "上午" },
    { key: "pm", label: "下午" },
    { key: "whole_day", label: "全日" },
    { key: "half_day", label: "混合/半日" },
  ];

  const moreFilterCount =
    (sessionFilter ? 1 : 0) +
    (selectedGrade ? 1 : 0) +
    (hasNurseryFilter ? 1 : 0);

  const activeTags = [
    ...selectedDistricts.map((district) => ({
      key: `district-${district}`,
      label: DISTRICT_LABELS[district],
      onRemove: () => onToggleDistrict(district),
    })),
    ...(sessionFilter ? [{ key: "session", label: sessionOptions.find((item) => item.key === sessionFilter)?.label ?? sessionFilter, onRemove: () => onUpdateFilter("session", null) }] : []),
    ...(hasNurseryFilter ? [{ key: "nursery", label: "設有 N 班", onRemove: () => onUpdateFilter("hasNursery", null) }] : []),
  ];

  const districtSummary =
    selectedDistricts.length === 0
      ? "選擇地區"
      : selectedDistricts.length <= 2
        ? selectedDistricts.map((district) => DISTRICT_LABELS[district]).join("、")
        : `${DISTRICT_LABELS[selectedDistricts[0]]}等 ${selectedDistricts.length} 區`;

  const hasAnyFilter =
    selectedDistricts.length > 0 ||
    !!selectedType ||
    vacancyFilter.length > 0 ||
    !!selectedGrade ||
    moreFilterCount > 0;

  return (
    <>
      <div className="mb-6 rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:px-5">
        <div className="grid gap-0 divide-y divide-surface-border">
          <div className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-xs font-semibold text-slate-600">地區位置</h4>
            <div className="relative flex flex-wrap items-center gap-2">
            <div
              className={`inline-flex h-8 overflow-hidden rounded-lg border transition-colors ${
                selectedDistricts.length > 0
                  ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                  : "border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              <button
                type="button"
                onClick={() => setShowDistrictFilter(!showDistrictFilter)}
                className="inline-flex items-center px-3 text-xs font-semibold"
              >
                {districtSummary}
              </button>
              <button
                type="button"
                aria-label="展開地區選單"
                onClick={() => setShowDistrictFilter(!showDistrictFilter)}
                className={`inline-flex w-8 shrink-0 items-center justify-center border-l transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 ${
                  selectedDistricts.length > 0
                    ? "border-white/20 bg-brand-600 text-white"
                    : "border-slate-200 bg-surface-soft text-ink-500 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <ChevronDownIcon expanded={showDistrictFilter} />
              </button>
            </div>
            {showDistrictFilter && (
              <div className="absolute left-0 top-full z-30 mt-2 w-[min(92vw,440px)] overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-surface-border px-4 py-3 text-xs text-slate-500">
                  <span>共 18 區 · 已選 {selectedDistricts.length}</span>
                  <button type="button" onClick={() => selectedDistricts.forEach(onToggleDistrict)} className="font-semibold hover:text-brand-700">
                    清除全部
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto px-4 py-3">
                  {DISTRICT_GROUPS.map((group) => (
                    <div key={group.label} className="mb-4 last:mb-0">
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                        <span>{group.label}</span>
                        <button
                          type="button"
                          onClick={() => group.districts.filter((district) => !selectedDistricts.includes(district)).forEach(onToggleDistrict)}
                          className="text-brand-700 hover:text-brand-800"
                        >
                          選擇全部
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.districts.map((district) => (
                          <button
                            key={district}
                            type="button"
                            onClick={() => onToggleDistrict(district)}
                            className={`${pillBase} ${selectedDistricts.includes(district) ? "bg-brand-50 text-brand-800 ring-1 ring-brand-200" : pillInactive}`}
                          >
                            {selectedDistricts.includes(district) ? "✓ " : ""}{DISTRICT_LABELS[district]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-surface-border px-4 py-3">
                  <button type="button" onClick={() => setShowDistrictFilter(false)} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
                    取消
                  </button>
                  <button type="button" onClick={() => setShowDistrictFilter(false)} className="rounded-full bg-brand-700 px-5 py-2 text-xs font-bold text-white shadow-sm">
                    套用 {selectedDistricts.length}
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>

          <div className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-xs font-semibold text-slate-600">學位狀態</h4>
            <div className="flex flex-wrap items-center gap-2">
              {vacancyOptions.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onToggleVacancy(key)}
                  className={`${pillBase} ${vacancyFilter.includes(key) ? pillActive : pillInactive}`}
                >
                  {label}
                </button>
              ))}
              <span className="mx-1 hidden h-5 w-px bg-surface-border md:inline-block" />
              {gradeOptions.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onUpdateFilter("grade", key === "all" ? null : selectedGrade === key ? null : key)}
                  className={`${pillBase} ${
                    (key === "all" && !selectedGrade) || selectedGrade === key
                      ? pillActive
                      : pillInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-xs font-semibold text-slate-600">學校類別</h4>
            <div className="flex flex-wrap gap-2">
              {schoolTypeOptions.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onUpdateFilter("type", selectedType === key || (key === "all" && selectedType === null) ? null : key === "all" ? null : key)}
                  className={`${pillBase} ${
                    (key === "all" && selectedType === null) || selectedType === key
                      ? pillActive
                      : pillInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="inline-flex h-8 items-center gap-2 rounded-lg text-xs font-semibold text-slate-700 transition hover:text-brand-700"
            >
              <span>{showMoreFilters ? "−" : "+"}</span>
              更多篩選
              {moreFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1.5 text-[10px] text-white">
                  {moreFilterCount}
                </span>
              )}
            </button>
            {hasAnyFilter && (
              <button
                type="button"
                onClick={() => {
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
                className="text-xs font-semibold text-slate-500 hover:text-brand-700"
              >
                清除全部
              </button>
            )}
            {activeTags.length > 0 && (
              <div className="flex w-full flex-wrap gap-2">
                {activeTags.map((tag) => (
                  <button
                    key={tag.key}
                    type="button"
                    onClick={tag.onRemove}
                    className="inline-flex h-7 items-center rounded-md bg-brand-50 px-2.5 text-xs font-semibold text-brand-800"
                  >
                    × {tag.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showMoreFilters && (
            <div className="grid gap-4 border-t border-surface-border py-4 md:grid-cols-2">
              <FilterSection title="上課時段">
                {sessionOptions.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() =>
                      onUpdateFilter(
                        "session",
                        key === "all" ? null : sessionFilter === key ? null : key
                      )
                    }
                    className={`${pillBase} ${
                      (key === "all" && !sessionFilter) || sessionFilter === key
                        ? pillActive
                        : pillInactive
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="設有N班（2-3歲）">
                <button
                  onClick={() =>
                    onUpdateFilter("hasNursery", hasNurseryFilter ? null : "true")
                  }
                  className={`${pillBase} ${hasNurseryFilter ? pillActive : pillInactive}`}
                >
                  設有N班
                </button>
              </FilterSection>
            </div>
          )}
        </div>
      </div>

      {/* Close district filter on click outside */}
      {showDistrictFilter && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowDistrictFilter(false)}
        />
      )}
    </>
  );
}

function ChevronDownIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FilterSection({
  title,
  wide,
  children,
}: {
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <h4 className="mb-2 text-xs font-semibold text-slate-600">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
