"use client";

import type { ActivityDistrict } from "@/lib/db/activities";
import {
  CATEGORY_GROUP_LABELS,
  CATEGORY_GROUP_ORDER,
  DISTRICT_LABELS,
  type ActivityCategoryGroup,
} from "@/lib/activities/labels";

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
  const hasFilter = !!group || !!district || free || includeExpired;

  return (
    <div className="space-y-3">
      {/* 類別 pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {CATEGORY_GROUP_ORDER.map((key) => {
          const label = CATEGORY_GROUP_LABELS[key];
          const isActive = group === key;
          return (
            <button
              key={key}
              onClick={() => onChangeGroup(isActive ? null : key)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-pill px-4 h-10 text-sm font-medium transition ${
                isActive
                  ? "bg-forest-600 text-white shadow-soft"
                  : "bg-white border border-cream-200 text-ink-700 hover:border-forest-300 hover:bg-leaf-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 地區 + 免費 + 已結束 + 清除 */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={district ?? ""}
          onChange={(e) => onChangeDistrict((e.target.value || null) as ActivityDistrict | null)}
          className="rounded-pill border border-cream-200 bg-white px-4 h-10 text-sm text-ink-700 outline-none focus:border-forest-400"
        >
          <option value="">全部地區</option>
          {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-cream-200 bg-white px-4 h-10 text-sm text-ink-700 transition hover:bg-leaf-50">
          <input
            type="checkbox"
            checked={free}
            onChange={(e) => onChangeFree(e.target.checked)}
            className="h-4 w-4 rounded border-cream-300 text-forest-600 focus:ring-forest-200"
          />
          只顯示免費
        </label>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-cream-200 bg-white px-4 h-10 text-sm text-ink-700 transition hover:bg-leaf-50">
          <input
            type="checkbox"
            checked={includeExpired}
            onChange={(e) => onChangeIncludeExpired(e.target.checked)}
            className="h-4 w-4 rounded border-cream-300 text-forest-600 focus:ring-forest-200"
          />
          顯示已結束 ({expiredCount})
        </label>

        {hasFilter && (
          <button
            onClick={onReset}
            className="rounded-pill border border-cream-200 bg-white px-4 h-10 text-sm text-ink-500 transition hover:bg-cream-100"
          >
            清除篩選
          </button>
        )}
      </div>
    </div>
  );
}
