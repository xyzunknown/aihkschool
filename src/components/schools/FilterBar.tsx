"use client";

import { useState } from "react";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  vacancyFilter: string[];
  sessionFilter: string | null;
  hasNurseryFilter: boolean;
  onToggleDistrict: (district: District) => void;
  onUpdateFilter: (key: string, value: string | null) => void;
  onToggleVacancy: (status: string) => void;
}

export function FilterBar({
  selectedDistricts,
  selectedType,
  vacancyFilter,
  sessionFilter,
  hasNurseryFilter,
  onToggleDistrict,
  onUpdateFilter,
  onToggleVacancy,
}: FilterBarProps) {
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(
    !!(sessionFilter || hasNurseryFilter)
  );

  const pillBase = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors";
  const pillActive = "bg-slate-950 text-white";
  const pillInactive = "bg-white text-slate-600 border border-slate-200";

  const vacancyOptions = [
    { key: "has_vacancy", label: "有位" },
    { key: "no_vacancy", label: "满额" },
    { key: "waiting_list", label: "候补" },
    { key: "no_information", label: "待更新" },
  ];

  const schoolTypeOptions = [
    { key: "all", label: "全部" },
    ...Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => ({ key, label })),
  ];

  const sessionOptions = [
    { key: "all", label: "全部" },
    { key: "half_day", label: "半日班" },
    { key: "whole_day", label: "全日班" },
  ];

  const moreFilterCount =
    (sessionFilter ? 1 : 0) + (hasNurseryFilter ? 1 : 0);

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
              <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 z-30 w-64 max-h-64 overflow-y-auto">
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
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-950 text-white text-[10px]">
              {moreFilterCount}
            </span>
          )}
        </button>

        {/* 更多篩選 panel */}
        {showMoreFilters && (
          <div className="space-y-4 pl-3 border-l-2 border-slate-100">
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
