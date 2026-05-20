"use client";

import { useState } from "react";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS, SCHOOLAND_GROUP_OPTIONS, SCHOOLAND_SIZE_LABELS } from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  vacancyFilter: string[];
  selectedGrade: "n" | "k1" | "k2" | "k3" | null;
  sessionFilter: string | null;
  hasNurseryFilter: boolean;
  schoolandFreeSchemeFilter: boolean;
  schoolandNurseryServiceFilter: boolean;
  schoolandGroupFilter: string | null;
  schoolandSizeFilter: string | null;
  onToggleDistrict: (district: District) => void;
  onUpdateFilter: (key: string, value: string | null) => void;
  onToggleVacancy: (status: string) => void;
}

export function FilterBar({
  selectedDistricts,
  selectedType,
  vacancyFilter,
  selectedGrade,
  sessionFilter,
  hasNurseryFilter,
  schoolandFreeSchemeFilter,
  schoolandNurseryServiceFilter,
  schoolandGroupFilter,
  schoolandSizeFilter,
  onToggleDistrict,
  onUpdateFilter,
  onToggleVacancy,
}: FilterBarProps) {
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(
    !!(
      sessionFilter ||
      hasNurseryFilter ||
      schoolandFreeSchemeFilter ||
      schoolandNurseryServiceFilter ||
      schoolandGroupFilter ||
      schoolandSizeFilter
    )
  );

  const pillBase = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors";
  const pillActive = "bg-brand-600 text-white shadow-soft";
  const pillInactive = "bg-white text-ink-700 border border-surface-border hover:border-brand-200 hover:bg-brand-50";

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
    (hasNurseryFilter ? 1 : 0) +
    (schoolandFreeSchemeFilter ? 1 : 0) +
    (schoolandNurseryServiceFilter ? 1 : 0) +
    (schoolandGroupFilter ? 1 : 0) +
    (schoolandSizeFilter ? 1 : 0);

  return (
    <>
      <div className="space-y-4 mb-6">
        {/* 地區位置 */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-2">地區位置</h4>
          <div className="relative">
            <button
              onClick={() => setShowDistrictFilter(!showDistrictFilter)}
              className={`${pillBase} ${selectedDistricts.length > 0 ? pillActive : pillInactive}`}
            >
              {selectedDistricts.length === 0 ? "選擇地區" : `已選 ${selectedDistricts.length}`}
            </button>
            {showDistrictFilter && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-card shadow-card border border-surface-border p-4 z-30 w-64 max-h-64 overflow-y-auto">
                {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDistricts.includes(key as District)}
                      onChange={() => onToggleDistrict(key as District)}
                      className="rounded"
                    />
                    <span className="text-sm text-slate-700">{label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 學位狀態 */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-2">學位狀態</h4>
          <div className="flex flex-wrap gap-2">
            {vacancyOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onToggleVacancy(key)}
                className={`${pillBase} ${vacancyFilter.includes(key) ? pillActive : pillInactive}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
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

        {/* 學校類別 */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-2">學校類別</h4>
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

        {/* 更多篩選 toggle */}
        <button
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform ${showMoreFilters ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          更多篩選
          {moreFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-600 text-white text-[10px]">
              {moreFilterCount}
            </span>
          )}
        </button>

        {/* 更多篩選 panel */}
        {showMoreFilters && (
          <div className="space-y-4 pl-3 border-l-2 border-brand-100">
            {/* 上課時段 */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">上課時段</h4>
              <div className="flex flex-wrap gap-2">
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
              </div>
            </div>

            {/* 設有N班 */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">設有N班（2-3歲）</h4>
              <button
                onClick={() =>
                  onUpdateFilter("hasNursery", hasNurseryFilter ? null : "true")
                }
                className={`${pillBase} ${hasNurseryFilter ? pillActive : pillInactive}`}
              >
                設有N班
              </button>
            </div>

            {/* Schooland structured filters */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">免費計劃</h4>
              <button
                onClick={() =>
                  onUpdateFilter("schoolandFreeScheme", schoolandFreeSchemeFilter ? null : "true")
                }
                className={`${pillBase} ${schoolandFreeSchemeFilter ? pillActive : pillInactive}`}
              >
                參加
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">幼兒服務</h4>
              <button
                onClick={() =>
                  onUpdateFilter("schoolandNurseryService", schoolandNurseryServiceFilter ? null : "yes")
                }
                className={`${pillBase} ${schoolandNurseryServiceFilter ? pillActive : pillInactive}`}
              >
                有
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">集團</h4>
              <div className="flex flex-wrap gap-2">
                {SCHOOLAND_GROUP_OPTIONS.slice(0, 12).map((group) => (
                  <button
                    key={group}
                    onClick={() =>
                      onUpdateFilter("schoolandGroup", schoolandGroupFilter === group ? null : group)
                    }
                    className={`${pillBase} ${schoolandGroupFilter === group ? pillActive : pillInactive}`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">規模</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SCHOOLAND_SIZE_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      onUpdateFilter("schoolandSize", schoolandSizeFilter === key ? null : key)
                    }
                    className={`${pillBase} ${schoolandSizeFilter === key ? pillActive : pillInactive}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
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
