"use client";

import { useState, type ReactNode } from "react";
import { Check, ChevronDown, X } from "lucide-react";

export interface FilterOption {
  key: string;
  label: string;
}

export interface FilterOptionGroup {
  label: string;
  options: FilterOption[];
}

export interface FilterSectionConfig {
  key: string;
  label: string;
  options: FilterOption[];
  selectedKeys: string[];
  onToggle: (key: string) => void;
}

export interface FilterActiveTag {
  key: string;
  label: string;
  onRemove: () => void;
}

interface FilterBarProps {
  districtLabel?: string;
  districtSummary?: string;
  districtGroups?: FilterOptionGroup[];
  selectedDistrictKeys?: string[];
  onToggleDistrict?: (key: string) => void;
  onClearDistricts?: () => void;
  sections: FilterSectionConfig[];
  activeTags?: FilterActiveTag[];
  onReset?: () => void;
  footer?: ReactNode;
}

const chipBase =
  "inline-flex h-8 items-center rounded-chip px-3 text-label font-semibold transition-colors";
const chipActive = "border border-forest-700 bg-forest-700 text-white shadow-soft";
const chipInactive =
  "border border-surface-border bg-white text-ink-700 hover:border-forest-200 hover:bg-forest-50";

export function FilterBar({
  districtLabel = "地區位置",
  districtSummary = "全部地區",
  districtGroups = [],
  selectedDistrictKeys = [],
  onToggleDistrict,
  onClearDistricts,
  sections,
  activeTags = [],
  onReset,
  footer,
}: FilterBarProps) {
  const [openPanel, setOpenPanel] = useState(false);
  const hasDistricts = selectedDistrictKeys.length > 0;
  const hasFilters =
    hasDistricts || sections.some((section) => section.selectedKeys.length > 0) || activeTags.length > 0;

  return (
    <div className="relative rounded-card border border-surface-border bg-white px-4 py-4 shadow-soft md:px-5">
      <div className="grid divide-y divide-surface-border">
        {districtGroups.length > 0 && onToggleDistrict ? (
          <div className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-label font-semibold text-ink-700">{districtLabel}</h4>
            <div className="relative flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOpenPanel((value) => !value)}
                className={`inline-flex h-8 items-center gap-2 rounded-chip border px-3 text-label font-semibold transition-colors ${
                  openPanel || hasDistricts ? chipActive : chipInactive
                }`}
                aria-expanded={openPanel}
              >
                {districtSummary}
                <ChevronDown
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.7}
                  className={`transition-transform ${openPanel ? "rotate-180" : ""}`}
                />
              </button>

              {openPanel ? (
                <section className="absolute left-0 top-full z-30 mt-2 w-[min(92vw,440px)] overflow-hidden rounded-card border border-surface-border bg-white shadow-card">
                  <div className="flex items-center justify-between gap-3 border-b border-surface-border px-4 py-3">
                    <h3 className="text-label font-semibold text-ink-500">
                      共 18 區 · 已選 {selectedDistrictKeys.length}
                    </h3>
                    <button
                      type="button"
                      onClick={onClearDistricts}
                      className="text-label font-semibold text-ink-500 transition hover:text-forest-700"
                    >
                      清除全部
                    </button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto px-4 py-3">
                    {districtGroups.map((group) => (
                      <div key={group.label} className="mb-4 last:mb-0">
                        <div className="mb-2 text-label font-semibold text-ink-700">{group.label}</div>
                        <div className="flex flex-wrap gap-2">
                          {group.options.map((option) => {
                            const active = selectedDistrictKeys.includes(option.key);
                            return (
                              <button
                                key={option.key}
                                type="button"
                                onClick={() => onToggleDistrict(option.key)}
                                className={`${chipBase} ${
                                  active
                                    ? "border border-forest-200 bg-forest-50 text-forest-800"
                                    : chipInactive
                                }`}
                              >
                                {active ? <Check aria-hidden="true" size={16} strokeWidth={1.7} /> : null}
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end border-t border-surface-border px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setOpenPanel(false)}
                      className="inline-flex h-8 items-center rounded-pill bg-forest-700 px-5 text-label font-bold text-white"
                    >
                      完成
                    </button>
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        ) : null}

        {sections.map((section) => (
          <div key={section.key} className="grid gap-3 py-3 md:grid-cols-[88px_1fr] md:items-center">
            <h4 className="text-label font-semibold text-ink-700">{section.label}</h4>
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => {
                const active = section.selectedKeys.includes(option.key);
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => section.onToggle(option.key)}
                    className={`${chipBase} ${active ? chipActive : chipInactive}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          {activeTags.length > 0 ? (
            <div className="flex min-w-0 flex-1 flex-wrap gap-2">
              {activeTags.map((tag) => (
                <button
                  key={tag.key}
                  type="button"
                  onClick={tag.onRemove}
                  className="inline-flex h-8 items-center gap-1 rounded-chip bg-forest-50 px-3 text-label font-semibold text-forest-800"
                >
                  <X aria-hidden="true" size={14} strokeWidth={1.7} />
                  {tag.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-small text-ink-500">已選：無</span>
          )}

          {hasFilters && onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="text-label font-semibold text-ink-500 transition hover:text-forest-700"
            >
              清除全部
            </button>
          ) : null}
          {footer}
        </div>
      </div>

      {openPanel ? <div className="fixed inset-0 z-20" onClick={() => setOpenPanel(false)} /> : null}
    </div>
  );
}
