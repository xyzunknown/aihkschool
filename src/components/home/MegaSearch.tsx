"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";

const DISTRICT_OPTIONS = [
  { value: "", label: "所有地區" },
  { value: "central_and_western", label: "中西區" },
  { value: "wan_chai", label: "灣仔區" },
  { value: "eastern", label: "東區" },
  { value: "southern", label: "南區" },
  { value: "yau_tsim_mong", label: "油尖旺區" },
  { value: "sham_shui_po", label: "深水埗區" },
  { value: "kowloon_city", label: "九龍城區" },
  { value: "kwun_tong", label: "觀塘區" },
  { value: "wong_tai_sin", label: "黃大仙區" },
  { value: "sha_tin", label: "沙田區" },
  { value: "tai_po", label: "大埔區" },
  { value: "yuen_long", label: "元朗區" },
  { value: "tuen_mun", label: "屯門區" },
  { value: "tsuen_wan", label: "荃灣區" },
  { value: "kwai_tsing", label: "葵青區" },
  { value: "sai_kung", label: "西貢區" },
  { value: "north", label: "北區" },
  { value: "islands", label: "離島區" },
];

export function MegaSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("");
  const [grade, setGrade] = useState("");
  const [session, setSession] = useState("");
  const [language, setLanguage] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const activeFilterCount = [district, grade, session, language].filter(Boolean).length;

  function buildSearchParams() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (district) params.set("district", district);
    if (grade) params.set("grade", grade);
    if (session) params.set("session", session);
    if (language) params.set("language", language);
    return params;
  }

  function runSearch() {
    const params = buildSearchParams();
    router.push(`/kg?${params.toString()}`);
  }

  function resetFilters() {
    setDistrict("");
    setGrade("");
    setSession("");
    setLanguage("");
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    runSearch();
  }

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-1 md:mt-2">
      <form
        onSubmit={submit}
        className="bg-white rounded-card border border-surface-border shadow-[0_12px_32px_rgba(30,82,56,0.07)] p-5 md:p-6"
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex items-center gap-2 px-4 h-[52px] flex-1 rounded-pill bg-surface-soft border border-surface-border focus-within:border-brand-500 focus-within:bg-white transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-500">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜尋學校名稱、地區或特色..."
              className="flex-1 bg-transparent outline-none text-base text-ink-900 placeholder:text-ink-500"
            />
          </div>
          <button
            type="submit"
            className="h-[52px] px-6 inline-flex items-center justify-center gap-2 rounded-pill bg-brand-700 text-white text-sm font-semibold hover:bg-brand-500 transition shadow-[0_10px_24px_rgba(30,82,56,0.16)]"
          >
            搜尋
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className="flex-1 h-11 inline-flex items-center justify-between gap-3 rounded-2xl border border-surface-border bg-surface-soft px-4 text-sm text-ink-800 font-medium hover:border-brand-500 transition"
          >
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="10" y1="18" x2="14" y2="18" />
              </svg>
              篩選條件
            </span>
            <span className="text-xs text-ink-500">
              {activeFilterCount > 0 ? `已選 ${activeFilterCount} 項` : "全部學校"}
            </span>
          </button>
        </div>

        <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <Select label="地區" icon="📍" value={district} onChange={setDistrict} options={DISTRICT_OPTIONS} />
          <Select
            label="年級"
            icon="👶"
            value={grade}
            onChange={setGrade}
            options={[
              { value: "", label: "K1 / K2 / K3" },
              { value: "N", label: "N 班" },
              { value: "K1", label: "K1" },
              { value: "K2", label: "K2" },
              { value: "K3", label: "K3" },
            ]}
          />
          <Select
            label="全日 / 半日"
            icon="🕓"
            value={session}
            onChange={setSession}
            options={[
              { value: "", label: "所有" },
              { value: "whole", label: "全日制" },
              { value: "am", label: "上午班" },
              { value: "pm", label: "下午班" },
            ]}
          />
          <Select
            label="語言"
            icon="🗣️"
            value={language}
            onChange={setLanguage}
            options={[
              { value: "", label: "不限" },
              { value: "bilingual", label: "中英雙語" },
              { value: "english", label: "英語" },
              { value: "chinese", label: "中文" },
            ]}
          />
          <button
            type="button"
            onClick={() => router.push("/kg")}
            className="h-11 inline-flex items-center justify-center gap-2 rounded-pill border border-surface-border bg-white text-sm text-ink-700 font-medium hover:border-brand-500 hover:text-brand-700 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            進階篩選
          </button>
        </div>
      </form>

      <BottomSheet isOpen={isFilterSheetOpen} onClose={() => setIsFilterSheetOpen(false)} title="搜尋與篩選">
        <div className="space-y-4">
          <div className="rounded-3xl border border-surface-border bg-surface-soft/70 p-4">
            <p className="text-sm font-semibold text-ink-900">已選條件</p>
            <p className="mt-1 text-xs text-ink-500">
              {activeFilterCount > 0 ? `目前已套用 ${activeFilterCount} 個篩選條件。` : "未套用任何篩選，將顯示全部學校。"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Select label="地區" icon="📍" value={district} onChange={setDistrict} options={DISTRICT_OPTIONS} />
            <Select
              label="年級"
              icon="👶"
              value={grade}
              onChange={setGrade}
              options={[
                { value: "", label: "K1 / K2 / K3" },
                { value: "N", label: "N 班" },
                { value: "K1", label: "K1" },
                { value: "K2", label: "K2" },
                { value: "K3", label: "K3" },
              ]}
            />
            <Select
              label="全日 / 半日"
              icon="🕓"
              value={session}
              onChange={setSession}
              options={[
                { value: "", label: "所有" },
                { value: "whole", label: "全日制" },
                { value: "am", label: "上午班" },
                { value: "pm", label: "下午班" },
              ]}
            />
            <Select
              label="語言"
              icon="🗣️"
              value={language}
              onChange={setLanguage}
              options={[
                { value: "", label: "不限" },
                { value: "bilingual", label: "中英雙語" },
                { value: "english", label: "英語" },
                { value: "chinese", label: "中文" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="h-11 rounded-pill border border-surface-border bg-white text-sm font-medium text-ink-700 hover:border-brand-500 hover:text-brand-700 transition"
            >
              清除篩選
            </button>
            <button
              type="button"
              onClick={() => {
                runSearch();
                setIsFilterSheetOpen(false);
              }}
              className="h-11 rounded-pill bg-brand-700 text-sm font-semibold text-white hover:bg-brand-500 transition shadow-[0_10px_24px_rgba(30,82,56,0.16)]"
            >
              查看結果
            </button>
          </div>
        </div>
      </BottomSheet>
    </section>
  );
}

function Select({
  label,
  icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] text-ink-500 font-medium">{label}</span>
      <div className="flex items-center gap-1.5 px-3 h-11 rounded-xl bg-white border border-surface-border hover:border-brand-500 transition">
        <span className="text-sm shrink-0 opacity-80" aria-hidden>{icon}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-ink-900 cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
