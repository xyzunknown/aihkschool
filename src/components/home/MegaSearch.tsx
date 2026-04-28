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

const HOT_TAGS = [
  { label: "有 K1 空缺", q: "k1-vacancy" },
  { label: "本月開放日", q: "open-this-month" },
  { label: "雙語課程", q: "雙語" },
  { label: "蒙特梭利", q: "蒙特梭利" },
  { label: "近港鐵", q: "港鐵" },
];

const HOT_DISTRICTS = ["中西區", "灣仔區", "九龍城", "沙田區", "元朗區", "屯門區", "北區"];

export function MegaSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("");
  const [grade, setGrade] = useState("");
  const [type, setType] = useState("");
  const [session, setSession] = useState("");
  const [bilingual, setBilingual] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (district) params.set("district", district);
    if (grade) params.set("grade", grade);
    if (type) params.set("school_type", type);
    if (session) params.set("session", session);
    if (bilingual) params.set("bilingual", bilingual);
    router.push(`/kg?${params.toString()}`);
  }

  return (
    <section className="relative -mt-10 md:-mt-16 z-20 px-5 md:px-8 max-w-7xl mx-auto">
      <form
        onSubmit={submit}
        className="bg-white rounded-card shadow-card border border-cream-200 p-5 md:p-6"
      >
        <div className="flex items-center gap-2 mb-5 px-5 h-14 md:h-16 rounded-pill bg-cream-50 border-2 border-cream-200 focus-within:border-forest-400 focus-within:shadow-glow transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-forest-500">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋學校名稱、地區"
            className="flex-1 bg-transparent outline-none text-base text-ink-900 placeholder:text-ink-400"
          />
          <button
            type="submit"
            className="px-6 md:px-8 h-11 md:h-12 rounded-pill bg-forest-600 text-white text-sm md:text-base font-semibold hover:bg-forest-700 transition flex items-center gap-2 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            搜尋幼稚園
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
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
            label="學校類別"
            icon="🏫"
            value={type}
            onChange={setType}
            options={[
              { value: "", label: "所有類別" },
              { value: "non_profit", label: "非牟利" },
              { value: "private_independent", label: "私立獨立" },
              { value: "international", label: "國際" },
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
            label="雙語教學"
            icon="🗣️"
            value={bilingual}
            onChange={setBilingual}
            options={[
              { value: "", label: "不限" },
              { value: "yes", label: "雙語" },
              { value: "english", label: "英語" },
            ]}
          />
          <Select
            label="有否"
            icon="✨"
            value=""
            onChange={() => {}}
            options={[{ value: "", label: "不限" }]}
          />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-500 shrink-0">快捷任務：</span>
            {HOT_TAGS.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => router.push(`/kg?q=${encodeURIComponent(t.q)}`)}
                className="px-3 h-7 rounded-pill bg-leaf-50 border border-leaf-100 text-xs text-forest-700 font-medium hover:bg-forest-100 hover:border-forest-200 transition"
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-500 shrink-0">熱門地區：</span>
            {HOT_DISTRICTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => router.push(`/kg?district=${encodeURIComponent(d)}`)}
                className="px-3 h-7 rounded-pill bg-white border border-cream-200 text-xs text-ink-800 hover:border-forest-300 hover:bg-cream-50 transition"
              >
                {d}
              </button>
            ))}
          </div>
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
      <span className="text-[10px] text-ink-500 font-medium">{label}</span>
      <div className="flex items-center gap-1.5 px-2.5 h-9 rounded-lg bg-white border border-cream-200 hover:border-forest-300 transition">
        <span className="text-xs shrink-0 opacity-70" aria-hidden>{icon}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-xs text-ink-700 cursor-pointer"
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
