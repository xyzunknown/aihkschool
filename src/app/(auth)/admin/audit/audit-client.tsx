"use client";

import { useEffect, useState } from "react";

interface AuditRow {
  id: string;
  admin_email: string | null;
  action: string;
  target_type: string;
  target_id: string | null;
  before_summary: Record<string, unknown>;
  after_summary: Record<string, unknown>;
  created_at: string;
}

export function AdminAuditClient() {
  const [filters, setFilters] = useState({ admin: "", action: "", targetType: "" });
  const [rows, setRows] = useState<AuditRow[]>([]);

  async function loadRows() {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    const res = await fetch(`/api/admin/audit?${params.toString()}`);
    const json = await res.json();
    setRows(json.data ?? []);
  }

  useEffect(() => { void loadRows(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">操作記錄</h1>
        <p className="mt-1 text-sm text-ink-500">查看後台關鍵操作，方便追溯資料變更。</p>
      </div>
      <div className="mb-4 grid gap-3 rounded-card border border-surface-border bg-white p-4 md:grid-cols-4">
        <input value={filters.admin} onChange={(e) => setFilters({ ...filters, admin: e.target.value })} placeholder="操作人" className="rounded-button border border-surface-border px-3 py-2 text-sm" />
        <input value={filters.action} onChange={(e) => setFilters({ ...filters, action: e.target.value })} placeholder="操作" className="rounded-button border border-surface-border px-3 py-2 text-sm" />
        <input value={filters.targetType} onChange={(e) => setFilters({ ...filters, targetType: e.target.value })} placeholder="模組" className="rounded-button border border-surface-border px-3 py-2 text-sm" />
        <button onClick={loadRows} className="rounded-button border border-surface-border px-3 py-2 text-sm font-medium">套用</button>
      </div>
      <div className="overflow-hidden rounded-card border border-surface-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs text-ink-500"><tr><th className="px-4 py-3">時間</th><th className="px-4 py-3">操作人</th><th className="px-4 py-3">操作</th><th className="px-4 py-3">內容</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3 text-ink-700">{row.created_at.slice(0, 16).replace("T", " ")}</td>
                <td className="px-4 py-3">{row.admin_email ?? "-"}</td>
                <td className="px-4 py-3">{row.action}</td>
                <td className="px-4 py-3 text-ink-700">{describeChange(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function describeChange(row: AuditRow) {
  const before = row.before_summary ?? {};
  const after = row.after_summary ?? {};
  const name = String(after.name_tc ?? after.title ?? after.name_zh ?? before.name_tc ?? before.title ?? before.name_zh ?? row.target_id ?? "");
  const changed = Object.keys(after).filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key])).slice(0, 5);
  return `${row.target_type}${name ? `：${name}` : ""}${changed.length ? `；改動：${changed.join("、")}` : ""}`;
}
