"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CaretDown, Check, SlidersHorizontal, X } from "@phosphor-icons/react";
import { DISTRICT_LABELS, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { District, SchoolType } from "@/types/database";

interface FilterBarProps {
  selectedDistricts: District[];
  selectedType: SchoolType | null;
  vacancyFilter: string[];
  selectedGrade: "n" | "k1" | "k2" | "k3" | null;
  sessionFilter: string | null;
  hasNurseryFilter: boolean;
  onToggleDistrict: (district: District) => void;
  onUpdateFilter: (key: string, value: string | null) => void;
  onToggleVacancy: (status: string) => void;
  onResetAll: () => void;
}

type PanelKey = "district" | "vacancy" | "grade" | "type" | "more" | null;

const DISTRICT_GROUPS = [
  { label: "港島", options: ["central_and_western", "eastern", "southern", "wan_chai"].map(toDistrictOption) },
  { label: "九龍", options: ["kowloon_city", "kwun_tong", "sham_shui_po", "wong_tai_sin", "yau_tsim_mong"].map(toDistrictOption) },
  { label: "新界", options: ["kwai_tsing", "north", "sai_kung", "sha_tin", "tai_po", "tsuen_wan", "tuen_mun", "yuen_long"].map(toDistrictOption) },
  { label: "離島", options: ["islands"].map(toDistrictOption) },
];

const vacancyOptions = [
  { key: "has_vacancy", label: "有位" },
  { key: "no_vacancy", label: "滿額" },
  { key: "waiting_list", label: "候補" },
  { key: "no_information", label: "待更新" },
];

const gradeOptions = [
  { key: "n", label: "N" },
  { key: "k1", label: "K1" },
  { key: "k2", label: "K2" },
  { key: "k3", label: "K3" },
];

const sessionOptions = [
  { key: "am", label: "上午" },
  { key: "pm", label: "下午" },
  { key: "whole_day", label: "全日" },
  { key: "half_day", label: "混合/半日" },
];

const schoolTypeOptions = Object.entries(SCHOOL_TYPE_LABELS).map(([key, label]) => ({ key, label }));

function toDistrictOption(key: string) {
  return { key: key as District, label: DISTRICT_LABELS[key as District] ?? key };
}

function districtSummary(selectedDistricts: District[]) {
  if (selectedDistricts.length === 0) return "全部地區";
  if (selectedDistricts.length <= 2) return selectedDistricts.map((district) => DISTRICT_LABELS[district]).join("、");
  return `${DISTRICT_LABELS[selectedDistricts[0]]}等 ${selectedDistricts.length} 區`;
}

function optionLabel(options: Array<{ key: string; label: string }>, key: string | null) {
  if (!key) return null;
  return options.find((item) => item.key === key)?.label ?? key;
}

export function FilterBar({
  selectedDistricts,
  selectedType,
  vacancyFilter,
  selectedGrade,
  sessionFilter,
  hasNurseryFilter,
  onToggleDistrict,
  onUpdateFilter,
  onToggleVacancy,
  onResetAll,
}: FilterBarProps) {
  const [openPanel, setOpenPanel] = useState<PanelKey>(null);

  const activeTags = useMemo(() => [
    ...selectedDistricts.map((district) => ({
      key: `district-${district}`,
      label: DISTRICT_LABELS[district],
      onRemove: () => onToggleDistrict(district),
    })),
    ...vacancyFilter.map((status) => ({
      key: `vacancy-${status}`,
      label: optionLabel(vacancyOptions, status) ?? status,
      onRemove: () => onToggleVacancy(status),
    })),
    ...(selectedGrade ? [{ key: "grade", label: selectedGrade.toUpperCase(), onRemove: () => onUpdateFilter("grade", null) }] : []),
    ...(selectedType ? [{ key: "type", label: SCHOOL_TYPE_LABELS[selectedType] ?? selectedType, onRemove: () => onUpdateFilter("type", null) }] : []),
    ...(sessionFilter ? [{ key: "session", label: optionLabel(sessionOptions, sessionFilter) ?? sessionFilter, onRemove: () => onUpdateFilter("session", null) }] : []),
    ...(hasNurseryFilter ? [{ key: "nursery", label: "設有 N 班", onRemove: () => onUpdateFilter("hasNursery", null) }] : []),
  ], [hasNurseryFilter, onToggleDistrict, onToggleVacancy, onUpdateFilter, selectedDistricts, selectedGrade, selectedType, sessionFilter, vacancyFilter]);

  const moreCount = (sessionFilter ? 1 : 0) + (hasNurseryFilter ? 1 : 0);

  const resetAll = () => {
    onResetAll();
    setOpenPanel(null);
  };

  return (
    <div className="relative z-10 mb-6">
      <div className="relative z-30 rounded-card border border-surface-border bg-white p-3 shadow-soft md:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <SummaryButton label="地區" value={districtSummary(selectedDistricts)} active={selectedDistricts.length > 0} open={openPanel === "district"} onClick={() => setOpenPanel(openPanel === "district" ? null : "district")} />
          <SummaryButton label="學位" value={vacancyFilter.length === 0 ? "全部學位" : vacancyFilter.length === 1 ? optionLabel(vacancyOptions, vacancyFilter[0]) ?? "已選" : `已選 ${vacancyFilter.length}`} active={vacancyFilter.length > 0} open={openPanel === "vacancy"} onClick={() => setOpenPanel(openPanel === "vacancy" ? null : "vacancy")} />
          <SummaryButton label="年級" value={selectedGrade ? selectedGrade.toUpperCase() : "全部年級"} active={Boolean(selectedGrade)} open={openPanel === "grade"} onClick={() => setOpenPanel(openPanel === "grade" ? null : "grade")} />
          <SummaryButton label="類別" value={selectedType ? SCHOOL_TYPE_LABELS[selectedType] ?? selectedType : "全部類別"} active={Boolean(selectedType)} open={openPanel === "type"} onClick={() => setOpenPanel(openPanel === "type" ? null : "type")} />
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === "more" ? null : "more")}
            className={`inline-flex h-10 items-center gap-2 rounded-pill border px-3 text-small font-semibold transition ${moreCount > 0 || openPanel === "more" ? "border-forest-700 bg-forest-700 text-white" : "border-surface-border bg-white text-ink-700 hover:border-forest-200 hover:bg-forest-50"}`}
            aria-expanded={openPanel === "more"}
          >
            <SlidersHorizontal aria-hidden="true" size={16} weight="regular" />
            更多篩選{moreCount > 0 ? ` ${moreCount}` : ""}
          </button>
          {activeTags.length > 0 ? (
            <button type="button" onClick={resetAll} className="ml-auto inline-flex h-10 items-center rounded-pill px-3 text-small font-semibold text-ink-500 transition hover:bg-cream-50 hover:text-ink-900">
              清除
            </button>
          ) : null}
        </div>

        {activeTags.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-small text-ink-500">已選</span>
            {activeTags.map((tag) => (
              <button key={tag.key} type="button" onClick={tag.onRemove} className="inline-flex h-8 items-center gap-1 rounded-pill bg-leaf-50 px-2.5 text-label font-semibold text-forest-700 transition hover:bg-leaf-100">
                {tag.label}
                <X aria-hidden="true" size={13} weight="bold" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {openPanel ? (
        <>
          <div className="absolute left-0 top-full z-40 mt-2 w-[min(92vw,760px)] rounded-card border border-surface-border bg-white p-4 shadow-card">
            {openPanel === "district" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {DISTRICT_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 text-label font-semibold text-ink-500">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => (
                        <OptionButton key={option.key} selected={selectedDistricts.includes(option.key)} onClick={() => onToggleDistrict(option.key)}>
                          {option.label}
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {openPanel === "vacancy" ? (
              <OptionGrid options={vacancyOptions} selectedKeys={vacancyFilter} onToggle={onToggleVacancy} />
            ) : null}

            {openPanel === "grade" ? (
              <OptionGrid options={gradeOptions} selectedKeys={selectedGrade ? [selectedGrade] : []} onToggle={(key) => onUpdateFilter("grade", selectedGrade === key ? null : key)} />
            ) : null}

            {openPanel === "type" ? (
              <OptionGrid options={schoolTypeOptions} selectedKeys={selectedType ? [selectedType] : []} onToggle={(key) => onUpdateFilter("type", selectedType === key ? null : key)} />
            ) : null}

            {openPanel === "more" ? (
              <div className="space-y-4">
                <PanelSection title="上課時段">
                  <OptionGrid options={sessionOptions} selectedKeys={sessionFilter ? [sessionFilter] : []} onToggle={(key) => onUpdateFilter("session", sessionFilter === key ? null : key)} />
                </PanelSection>
                <PanelSection title="N 班">
                  <OptionButton selected={hasNurseryFilter} onClick={() => onUpdateFilter("hasNursery", hasNurseryFilter ? null : "true")}>
                    設有 N 班
                  </OptionButton>
                </PanelSection>
              </div>
            ) : null}
          </div>
          <button aria-label="關閉篩選" type="button" className="fixed inset-0 z-20 cursor-default" onClick={() => setOpenPanel(null)} />
        </>
      ) : null}
    </div>
  );
}

function SummaryButton({ label, value, active, open, onClick }: { label: string; value: string; active: boolean; open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-pill border px-3 text-small font-semibold transition ${active || open ? "border-forest-700 bg-forest-700 text-white" : "border-surface-border bg-white text-ink-700 hover:border-forest-200 hover:bg-forest-50"}`}
      aria-expanded={open}
    >
      <span className="text-label font-medium opacity-75">{label}</span>
      <span>{value}</span>
      <CaretDown aria-hidden="true" size={15} weight="bold" className={`transition ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

function OptionGrid({ options, selectedKeys, onToggle }: { options: Array<{ key: string; label: string }>; selectedKeys: string[]; onToggle: (key: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <OptionButton key={option.key} selected={selectedKeys.includes(option.key)} onClick={() => onToggle(option.key)}>
          {option.label}
        </OptionButton>
      ))}
    </div>
  );
}

function OptionButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1.5 rounded-pill border px-3 text-small font-semibold transition ${selected ? "border-forest-700 bg-forest-700 text-white" : "border-surface-border bg-white text-ink-700 hover:border-forest-200 hover:bg-forest-50"}`}
    >
      {selected ? <Check aria-hidden="true" size={14} weight="bold" /> : null}
      {children}
    </button>
  );
}

function PanelSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-label font-semibold text-ink-500">{title}</p>
      {children}
    </div>
  );
}
