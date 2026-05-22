"use client";

import { useState } from "react";
import type { ActivityDistrict } from "@/lib/db/activities";
import {
  CATEGORY_GROUP_LABELS,
  CATEGORY_GROUP_ORDER,
  DISTRICT_LABELS,
  type ActivityCategoryGroup,
} from "@/lib/activities/labels";

const DISTRICT_GROUPS: { label: string; districts: ActivityDistrict[] }[] = [
  { label: "港島", districts: ["central_and_western", "eastern", "southern", "wan_chai"] },
  { label: "九龍", districts: ["kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong"] },
  { label: "新界", districts: ["kwai_tsing", "north", "sai_kung", "sha_tin", "tai_po", "tsuen_wan", "tuen_mun", "yuen_long"] },
  { label: "離島", districts: ["islands"] },
];

interface ActivityFilterBarProps {
  group: ActivityCategoryGroup | null;
  district: ActivityDistrict | null;
  free: boolean;
  includeExpired: boolean;
  expiredCount: number;
  onChangeGroup: (v: ActivityCategoryGroup | null) => void;
  onChangeDistrict: (v: ActivityDistrict | null) => void;
  onChangeFree: (v: boolean) => void;
  onChangeIncludeExpired: (v: boolean) => void;
  onReset: () => void;
}

export function ActivityFilterBar({
  group,
  district,
  free,
  includeExpired,
  expiredCount,
  onChangeGroup,
  onChangeDistrict,
  onChangeFree,
  onChangeIncludeExpired,
  onReset,
}: ActivityFilterBarProps) {
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const hasFilter = !!group || !!district || free || includeExpired;
  const pillBase = "inline-flex h-8 items-center rounded-lg px-3 text-xs font-semibold transition-colors";
  const pillActive = "bg-brand-700 text-white shadow-sm";
  const pillInactive = "border border-slate-200 bg-white text-ink-700 hover:border-brand-200 hover:bg-brand-50";

  return (
    <>
      <div className="rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:px-5">
        <div className="grid divide-y divide-surface-border">
          <div className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-xs font-semibold text-slate-600">活動類別</h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_GROUP_ORDER.map((key) => {
                const label = CATEGORY_GROUP_LABELS[key];
                const isActive = group === key;
                return (
                  <button
                    key={key}
                    onClick={() => onChangeGroup(isActive ? null : key)}
                    className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-xs font-semibold text-slate-600">地區位置</h4>
            <div className="relative flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDistrictFilter(!showDistrictFilter)}
                className={`${pillBase} ${district ? pillActive : pillInactive}`}
              >
                <span className="mr-1">⌖</span>
                {district ? DISTRICT_LABELS[district] : "全部地區"}
                <span className="ml-2 text-[10px]">{showDistrictFilter ? "⌃" : "⌄"}</span>
              </button>
              <span className="text-xs text-slate-400">or 搜尋活動地區</span>
              {showDistrictFilter && (
                <div className="absolute left-0 top-full z-30 mt-2 w-[min(92vw,440px)] overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
                  <div className="flex items-center justify-between border-b border-surface-border px-4 py-3 text-xs text-slate-500">
                    <span>共 18 區 · {district ? "已選 1" : "未選"}</span>
                    <button type="button" onClick={() => onChangeDistrict(null)} className="font-semibold hover:text-brand-700">
                      清除全部
                    </button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto px-4 py-3">
                    {DISTRICT_GROUPS.map((area) => (
                      <div key={area.label} className="mb-4 last:mb-0">
                        <div className="mb-2 text-xs font-semibold text-slate-600">{area.label}</div>
                        <div className="flex flex-wrap gap-2">
                          {area.districts.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => onChangeDistrict(district === item ? null : item)}
                              className={`${pillBase} ${district === item ? "bg-brand-50 text-brand-800 ring-1 ring-brand-200" : pillInactive}`}
                            >
                              {district === item ? "✓ " : ""}{DISTRICT_LABELS[item]}
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
                      套用 {district ? 1 : 0}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onChangeFree(!free)}
                className={`${pillBase} ${free ? pillActive : pillInactive}`}
              >
                只顯示免費
              </button>
              <button
                type="button"
                onClick={() => onChangeIncludeExpired(!includeExpired)}
                className={`${pillBase} ${includeExpired ? pillActive : pillInactive}`}
              >
                顯示已結束 ({expiredCount})
              </button>
            </div>
            {hasFilter && (
              <button
                onClick={onReset}
                className="text-xs font-semibold text-slate-500 transition hover:text-brand-700"
              >
                清除全部
              </button>
            )}
          </div>
        </div>
      </div>
      {showDistrictFilter && <div className="fixed inset-0 z-20" onClick={() => setShowDistrictFilter(false)} />}
    </>
  );
}
