"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

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

  function submit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (district) params.set("district", district);
    if (grade) params.set("grade", grade);
    if (session) params.set("session", session);
    if (language) params.set("language", language);
    router.push(`/kg?${params.toString()}`);
  }

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-card border border-surface-border shadow-card p-5 md:p-6"
      >
        <div className="flex items-center gap-2 mb-4 px-4 h-12 rounded-pill bg-surface-soft border border-surface-border focus-within:border-brand-500 focus-within:bg-white transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-500">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋學校名稱、地區或特色..."
            className="flex-1 bg-transparent outline-none text-sm text-ink-900 placeholder:text-ink-400"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
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
