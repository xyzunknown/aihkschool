"use client";

import { useState } from "react";

interface SchoolSearchInputProps {
  onSelect: (school: { id: string; name_tc: string }) => void;
  inputClassName: string;
  labelClassName: string;
}

export function SchoolSearchInput({ onSelect, inputClassName, labelClassName }: SchoolSearchInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ id: string; name_tc: string; district: string }>>([]);
  const [selected, setSelected] = useState("");

  const search = async (value: string) => {
    setQuery(value);
    if (value.length < 2) { setResults([]); return; }
    try {
      const res = await fetch(`/api/schools?search=${encodeURIComponent(value)}&limit=10`);
      const json = await res.json();
      setResults(json.data ?? []);
    } catch { setResults([]); }
  };

  const select = (school: { id: string; name_tc: string }) => {
    setQuery(school.name_tc);
    setSelected(school.name_tc);
    setResults([]);
    onSelect(school);
  };

  return (
    <div>
      <label className={labelClassName}>學校 *</label>
      <div className="relative">
        <input type="text" placeholder="輸入學校名稱或拼音搜尋…" value={query}
          onChange={(e) => search(e.target.value)} className={inputClassName} />
        {selected && <span className="text-sm text-forest-700 mt-1 block">已選擇：{selected}</span>}
        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-button shadow-lg border border-surface-border overflow-hidden z-10">
            {results.map((s) => (
              <button key={s.id} onClick={() => select(s)}
                className="w-full text-left px-4 py-3 hover:bg-cream-50 text-sm text-ink-900 border-b border-surface-border last:border-b-0">
                {s.name_tc}<span className="text-ink-500 ml-2">{s.district}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
