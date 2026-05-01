"use client";

import { useState } from "react";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS, SCHOOLAND_GROUP_OPTIONS, SCHOOLAND_SIZE_LABELS } from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  vacancyFilter: string[];
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

  const chipBase = "inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200";
  const chipActive = "border-[#1f7a4d] bg-[#1f7a4d] text-white shadow-[0_10px_22px_rgba(31,122,77,0.18)]";
  const chipInactive = "border-[#e5eadf] bg-white text-[#4b5f52] hover:border-[#bfd1c3] hover:bg-[#f7fbf6]";
  const sectionLabel = "mb-2 text-[12px] font-semibold tracking-[0.02em] text-[#617467]";

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
    { key: "am", label: "上午" },
    { key: "pm", label: "下午" },
    { key: "whole_day", label: "全日" },
    { key: "half_day", label: "混合/半日" },
  ];

  const moreFilterCount =
    (sessionFilter ? 1 : 0) +
    (hasNurseryFilter ? 1 : 0) +
    (schoolandFreeSchemeFilter ? 1 : 0) +
    (schoolandNurseryServiceFilter ? 1 : 0) +
    (schoolandGroupFilter ? 1 : 0) +
    (schoolandSizeFilter ? 1 : 0);

  const activeFilterCount =
    selectedDistricts.length +
    vacancyFilter.length +
    (selectedType ? 1 : 0) +
    (sessionFilter ? 1 : 0) +
    (hasNurseryFilter ? 1 : 0) +
    (schoolandFreeSchemeFilter ? 1 : 0) +
    (schoolandNurseryServiceFilter ? 1 : 0) +
    (schoolandGroupFilter ? 1 : 0) +
    (schoolandSizeFilter ? 1 : 0);

  const clearFilters = () => {
    onUpdateFilter("type", null);
    onUpdateFilter("session", null);
    onUpdateFilter("hasNursery", null);
    onUpdateFilter("schoolandFreeScheme", null);
    onUpdateFilter("schoolandNurseryService", null);
    onUpdateFilter("schoolandGroup", null);
    onUpdateFilter("schoolandSize", null);

    selectedDistricts.forEach((district) => onToggleDistrict(district));
    vacancyFilter.forEach((status) => onToggleVacancy(status));
  };

  return (
    <>
      <div className="rounded-[24px] border border-[rgba(32,85,59,0.08)] bg-[rgba(255,255,255,0.92)] px-5 py-5 shadow-[0_16px_40px_rgba(31,80,55,0.08)] md:px-7 md:py-6">
        <div className="flex flex-wrap items-start gap-x-7 gap-y-5">
          <div className="min-w-[170px] flex-1">
            <p className={sectionLabel}>地區位置</p>
            <div className="relative">
            <button
              onClick={() => setShowDistrictFilter(!showDistrictFilter)}
              className={`flex h-10 min-w-[148px] items-center justify-between gap-3 rounded-full border px-4 text-sm font-medium transition-all ${selectedDistricts.length > 0 ? chipActive : "border-[#e5eadf] bg-white text-[#4b5f52]"}`}
            >
              <span className="inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedDistricts.length === 0 ? "選擇地區" : selectedDistricts.length === 1 ? DISTRICT_LABELS[selectedDistricts[0]] : `已選 ${selectedDistricts.length} 區`}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showDistrictFilter && (
              <div className="absolute left-0 top-full z-30 mt-3 max-h-72 w-72 overflow-y-auto rounded-[24px] border border-[rgba(32,85,59,0.08)] bg-white p-4 shadow-[0_22px_44px_rgba(31,80,55,0.14)]">
                {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 hover:bg-[#f6faf5]">
                    <input
                      type="checkbox"
                      checked={selectedDistricts.includes(key as District)}
                      onChange={() => onToggleDistrict(key as District)}
                      className="rounded border-[#d9e5d8] text-[#1f7a4d] focus:ring-[#1f7a4d]"
                    />
                    <span className="text-sm text-[#425448]">{label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          </div>

          <div className="min-w-[280px] flex-[1.2]">
            <p className={sectionLabel}>學位狀態</p>
            <div className="flex flex-wrap gap-2">
            {vacancyOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onToggleVacancy(key)}
                className={`${chipBase} ${vacancyFilter.includes(key) ? chipActive : chipInactive}`}
              >
                {label}
              </button>
            ))}
          </div>
          </div>

          <div className="min-w-[320px] flex-[1.4]">
            <p className={sectionLabel}>學校類別</p>
            <div className="flex flex-wrap gap-2">
            {schoolTypeOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onUpdateFilter("type", selectedType === key || (key === "all" && selectedType === null) ? null : key === "all" ? null : key)}
                className={`${chipBase} ${
                  (key === "all" && selectedType === null) || selectedType === key
                    ? chipActive
                    : chipInactive
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2 self-end pb-0.5">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e5eadf] bg-white px-4 text-sm font-medium text-[#4b5f52] transition hover:bg-[#f7fbf6]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="7" y1="12" x2="20" y2="12" />
                <line x1="10" y1="17" x2="20" y2="17" />
              </svg>
              更多篩選
              {moreFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1f7a4d] px-1.5 text-[11px] font-semibold text-white">
                  {moreFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="inline-flex h-10 items-center rounded-full border border-transparent px-4 text-sm font-medium text-[#7a8b80] transition hover:bg-[#f3f6f0] hover:text-[#405445]"
              >
                清除篩選
              </button>
            )}
          </div>
        </div>

        {showMoreFilters && (
          <div className="mt-5 rounded-[20px] border border-[rgba(32,85,59,0.07)] bg-[#fbfdf8] px-4 py-4 md:px-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* 上課時段 */}
            <div>
              <h4 className={sectionLabel}>上課時段</h4>
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
                    className={`${chipBase} ${
                      (key === "all" && !sessionFilter) || sessionFilter === key
                        ? chipActive
                        : chipInactive
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 設有N班 */}
            <div>
              <h4 className={sectionLabel}>設有 N 班（2-3 歲）</h4>
              <button
                onClick={() =>
                  onUpdateFilter("hasNursery", hasNurseryFilter ? null : "true")
                }
                className={`${chipBase} ${hasNurseryFilter ? chipActive : chipInactive}`}
              >
                設有N班
              </button>
            </div>

            {/* Schooland structured filters */}
            <div>
              <h4 className={sectionLabel}>免費計劃</h4>
              <button
                onClick={() =>
                  onUpdateFilter("schoolandFreeScheme", schoolandFreeSchemeFilter ? null : "true")
                }
                className={`${chipBase} ${schoolandFreeSchemeFilter ? chipActive : chipInactive}`}
              >
                參加
              </button>
            </div>

            <div>
              <h4 className={sectionLabel}>幼兒服務 / 集團</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    onUpdateFilter("schoolandNurseryService", schoolandNurseryServiceFilter ? null : "yes")
                  }
                  className={`${chipBase} ${schoolandNurseryServiceFilter ? chipActive : chipInactive}`}
                >
                  幼兒服務
                </button>
                {SCHOOLAND_GROUP_OPTIONS.slice(0, 12).map((group) => (
                  <button
                    key={group}
                    onClick={() =>
                      onUpdateFilter("schoolandGroup", schoolandGroupFilter === group ? null : group)
                    }
                    className={`${chipBase} ${schoolandGroupFilter === group ? chipActive : chipInactive}`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className={sectionLabel}>規模</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SCHOOLAND_SIZE_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      onUpdateFilter("schoolandSize", schoolandSizeFilter === key ? null : key)
                    }
                    className={`${chipBase} ${schoolandSizeFilter === key ? chipActive : chipInactive}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
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
