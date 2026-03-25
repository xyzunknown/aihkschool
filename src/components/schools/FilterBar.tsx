"use client";

import { useState } from "react";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  vacancyFilter: string[];
  onToggleDistrict: (district: District) => void;
  onUpdateFilter: (key: string, value: string | null) => void;
  onToggleVacancy: (status: string) => void;
}

export function FilterBar({
  selectedDistricts,
  selectedType,
  vacancyFilter,
  onToggleDistrict,
  onUpdateFilter,
  onToggleVacancy,
}: FilterBarProps) {
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);

  const pillBase = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors";
  const pillActive = "bg-slate-950 text-white";
  const pillInactive = "bg-white text-slate-600 border border-slate-200";

  const vacancyOptions = [
    { key: "has_vacancy", label: "空缺" },
    { key: "no_vacancy", label: "滿額" },
    { key: "waiting_list", label: "候補" },
    { key: "no_information", label: "暫無資訊" },
  ];

  const schoolTypeOptions = [
    { key: "all", label: "全部" },
    ...Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => ({ key, label })),
  ];

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
