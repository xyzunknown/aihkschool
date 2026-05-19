"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface HealthSummary {
  type: string;
  label: string;
  priority: string;
  href: string;
  count: number;
}

interface HealthRow {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  actionHref: string;
}

export function AdminHealthClient() {
  const searchParams = useSearchParams();
  const selectedType = searchParams?.get("type") ?? null;
  const [summary, setSummary] = useState<HealthSummary[]>([]);
  const [rows, setRows] = useState<HealthRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [summaryRes, rowsRes] = await Promise.all([
      fetch("/api/admin/health"),
      selectedType ? fetch(`/api/admin/health?type=${selectedType}`) : Promise.resolve(null),
    ]);
    const summaryJson = await summaryRes.json();
    setSummary(summaryJson.data ?? []);
    if (rowsRes) {
      const rowsJson = await rowsRes.json();
      setRows(rowsJson.data ?? []);
    } else {
      setRows([]);
    }
    setLoading(false);
  }

  useEffect(() => { void load(); }, [selectedType]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = summary.find((item) => item.type === selectedType);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">數據健康</h1>
          <p className="mt-1 text-sm text-slate-500">集中找出會影響前台準確度和展示質量的資料問題。</p>
        </div>
        <button onClick={load} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">重新檢查</button>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-3">問題類型</th><th className="px-4 py-3">數量</th><th className="px-4 py-3">優先級</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {summary.map((item) => (
              <tr key={item.type} className={item.type === selectedType ? "bg-slate-50" : ""}>
                <td className="px-4 py-3 font-medium text-slate-950">{item.label}</td>
                <td className="px-4 py-3">{item.count}</td>
                <td className="px-4 py-3">{item.priority}</td>
                <td className="px-4 py-3 text-right"><Link href={item.href} className="font-medium text-slate-950 underline">查看</Link></td>
              </tr>
            ))}
            {loading && summary.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400">載入中...</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {selectedType ? (
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-950">{selected?.label ?? "問題列表"}</h2>
              <p className="mt-1 text-xs text-slate-500">點擊處理會帶你到對應後台頁面。</p>
            </div>
            <Link href="/admin/health" className="text-sm font-medium text-slate-600 underline">返回總覽</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {rows.map((row) => (
              <div key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
                <div>
                  <p className="font-medium text-slate-950">{row.title}</p>
                  <p className="mt-1 text-slate-500">{row.subtitle} · {row.detail}</p>
                </div>
                <Link href={row.actionHref} className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700">處理</Link>
              </div>
            ))}
            {!loading && rows.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-slate-500">暫時沒有這類問題</div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
