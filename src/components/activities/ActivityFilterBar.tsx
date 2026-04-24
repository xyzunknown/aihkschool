import type { ActivityCategory, ActivityDistrict } from "@/lib/db/activities";
import {
  CATEGORY_LABELS,
  DISTRICT_LABELS,
} from "@/lib/activities/labels";

interface ActivityFilterBarProps {
  category: ActivityCategory | null;
  district: ActivityDistrict | null;
  free: boolean;
  search: string;
  onChangeCategory: (v: ActivityCategory | null) => void;
  onChangeDistrict: (v: ActivityDistrict | null) => void;
  onChangeFree: (v: boolean) => void;
  onChangeSearch: (v: string) => void;
  onReset: () => void;
}

export function ActivityFilterBar({
  category,
  district,
  free,
  search,
  onChangeCategory,
  onChangeDistrict,
  onChangeFree,
  onChangeSearch,
  onReset,
}: ActivityFilterBarProps) {
  const hasFilter = !!category || !!district || free || !!search;

  return (
    <div className="space-y-3">
      {/* 類別 pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const isActive = category === key;
          return (
            <button
              key={key}
              onClick={() => onChangeCategory(isActive ? null : (key as ActivityCategory))}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 地區 + 免費 + 搜索 + 清除 */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={district ?? ""}
          onChange={(e) => onChangeDistrict((e.target.value || null) as ActivityDistrict | null)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
        >
          <option value="">全部地區</option>
          {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50">
          <input
            type="checkbox"
            checked={free}
            onChange={(e) => onChangeFree(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
          />
          只顯示免費
        </label>

        <input
          type="text"
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="搜尋活動名稱或機構"
          className="min-w-[200px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
        />

        {hasFilter && (
          <button
            onClick={onReset}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50"
          >
            清除篩選
          </button>
        )}
      </div>
    </div>
  );
}
