"use client";

import { useEffect, useRef, useState } from "react";
import type {
  ActivityCategory,
  ActivityDistrict,
} from "@/lib/db/activities";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  DISTRICT_LABELS,
  DISTRICT_ORDER,
} from "@/lib/activities/labels";

interface ActivityFilterBarProps {
  category: ActivityCategory | null;
  district: ActivityDistrict | null;
  free: boolean;
  onChangeCategory: (cat: ActivityCategory | null) => void;
  onChangeDistrict: (d: ActivityDistrict | null) => void;
  onToggleFree: (v: boolean) => void;
  onReset: () => void;
}

const pillBase =
  "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors";
const pillActive = "bg-slate-950 text-white";
const pillInactive =
  "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50";

export function ActivityFilterBar({
  category,
  district,
  free,
  onChangeCategory,
  onChangeDistrict,
  onToggleFree,
  onReset,
}: ActivityFilterBarProps) {
  const [districtOpen, setDistrictOpen] = useState(false);
  const districtRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!districtOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        districtRef.current &&
        !districtRef.current.contains(e.target as Node)
      ) {
        setDistrictOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [districtOpen]);

  const hasAnyFilter = category !== null || district !== null || free;

  return (
    <div className="space-y-3">
      {/* 類別 pills */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => onChangeCategory(null)}
          className={`${pillBase} ${category === null ? pillActive : pillInactive}`}
        >
          全部
        </button>
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => onChangeCategory(cat === category ? null : cat)}
            className={`${pillBase} ${cat === category ? pillActive : pillInactive}`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* 次要篩選：地區 + 免費 */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 地區 dropdown */}
        <div className="relative" ref={districtRef}>
          <button
            onClick={() => setDistrictOpen((v) => !v)}
            className={`${pillBase} ${district !== null ? pillActive : pillInactive} flex items-center gap-1`}
          >
            {district !== null ? DISTRICT_LABELS[district] : "全港"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {districtOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden />
              <div className="absolute left-0 top-full z-20 mt-2 max-h-72 w-56 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <button
                  onClick={() => {
                    onChangeDistrict(null);
                    setDistrictOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    district === null
                      ? "bg-slate-100 font-medium text-slate-950"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  全港
                </button>
                {DISTRICT_ORDER.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      onChangeDistrict(d);
                      setDistrictOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      d === district
                        ? "bg-slate-100 font-medium text-slate-950"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {DISTRICT_LABELS[d]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 免費 toggle */}
        <button
          onClick={() => onToggleFree(!free)}
          className={`${pillBase} ${free ? "bg-emerald-600 text-white" : pillInactive}`}
        >
          只看免費
        </button>

        {hasAnyFilter && (
          <button
            onClick={onReset}
            className="ml-auto text-sm text-slate-500 hover:text-slate-950"
          >
            清除篩選
          </button>
        )}
      </div>
    </div>
  );
}
