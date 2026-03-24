"use client";

import { useState } from "react";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  SESSION_TYPE_LABELS,
  LANGUAGE_OPTIONS,
} from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  selectedLanguage: string | null;
  selectedSession: string | null;
  hasVacancy: boolean;
  onToggleDistrict: (district: District) => void;
  onUpdateFilter: (key: string, value: string | null) => void;
}

export function FilterBar({
  selectedDistricts,
  selectedType,
  selectedLanguage,
  selectedSession,
  hasVacancy,
  onToggleDistrict,
  onUpdateFilter,
}: FilterBarProps) {
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);

  const pillBase =
    "px-3 py-1.5 rounded-pill text-xs font-medium border transition-colors";
  const pillActive = "bg-slate-950 text-white border-slate-950";
  const pillInactive = "bg-white/70 text-slate-600 border-slate-200/50";

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {/* District multi-select */}
        <div className="relative">
          <button
            onClick={() => setShowDistrictFilter(!showDistrictFilter)}
            className={`${pillBase} ${selectedDistricts.length > 0 ? pillActive : pillInactive}`}
          >
            地区 {selectedDistricts.length > 0 && `(${selectedDistricts.length})`}
          </button>
          {showDistrictFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-slate-200/50 p-4 z-30 w-64 max-h-64 overflow-y-auto">
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

        {/* School type */}
        {Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onUpdateFilter("type", selectedType === key ? null : key)}
            className={`${pillBase} ${selectedType === key ? pillActive : pillInactive}`}
          >
            {label}
          </button>
        ))}

        {/* Language filter */}
        {Object.entries(LANGUAGE_OPTIONS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onUpdateFilter("language", selectedLanguage === key ? null : key)}
            className={`${pillBase} ${selectedLanguage === key ? pillActive : pillInactive}`}
          >
            {label}
          </button>
        ))}

        {/* Session type filter */}
        {Object.entries(SESSION_TYPE_LABELS).slice(0, 3).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onUpdateFilter("session", selectedSession === key ? null : key)}
            className={`${pillBase} ${selectedSession === key ? pillActive : pillInactive}`}
          >
            {label}
          </button>
        ))}

        {/* Has vacancy toggle */}
        <button
          onClick={() => onUpdateFilter("has_vacancy", hasVacancy ? null : "true")}
          className={`${pillBase} ${
            hasVacancy
              ? "bg-green-100/80 text-green-800 border-green-300/40"
              : pillInactive
          }`}
        >
          仅有空缺
        </button>
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
