"use client";

import { useEffect, useState } from "react";
import {
  AdminCheckbox,
  AdminDrawer,
  AdminFormGrid,
  AdminInfoGrid,
  AdminInfoItem,
  AdminPublishChannels,
  AdminSection,
  AdminSelect,
  AdminStatusPill,
  AdminTextarea,
  EmptyTableRow,
  formatAdminDate,
} from "@/components/admin/AdminWorkspace";
import { DISTRICT_OPTIONS } from "@/lib/admin/options";

const CATEGORY_OPTIONS = [
  ["", "全部類別"],
  ["swimming", "游泳"],
  ["music", "音樂"],
  ["dance", "舞蹈"],
  ["art", "藝術"],
  ["sport", "運動"],
  ["parent_child", "親子"],
  ["other", "其他"],
] as const;

const STATUS_OPTIONS = [
  ["", "全部狀態"],
  ["visible", "顯示"],
  ["hidden", "隱藏"],
  ["ended", "已結束"],
] as const;

interface ProgrammeRow {
  id: string;
  lcsd_programme_id: string;
  name_zh: string | null;
  name_en: string | null;
  category: string | null;
  age_min: number | null;
  age_max: number | null;
  venue: string | null;
  district: string | null;
  enrolment_open_at: string | null;
  enrolment_close_at: string | null;
  raw_url: string | null;
  is_active: boolean;
  publish_channels: string[] | null;
  admin_status: "visible" | "hidden" | "ended";
  admin_notes: string | null;
  subscription_count: number;
  lcsd_programme_status: Array<{ enrolment_status: string | null; seats_available: number | null; is_full: boolean | null; last_checked_at: string | null }> | null;
}

export function AdminProgrammesClient() {
  const [filters, setFilters] = useState({ search: "", category: "", district: "", age: "", status: "" });
  const [rows, setRows] = useState<ProgrammeRow[]>([]);
  const [editing, setEditing] = useState<ProgrammeRow | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadRows(nextFilters = filters) {
    const params = new URLSearchParams();
    Object.entries(nextFilters).forEach(([key, value]) => { if (value) params.set(key, value); });
    const res = await fetch(`/api/admin/programmes?${params.toString()}`);
    const json = await res.json();
    if (res.ok) {
      setRows(json.data ?? []);
    } else {
      setMessage(json.error?.message ?? "載入失敗");
    }
  }

  useEffect(() => { void loadRows(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function save(payload?: Record<string, unknown>) {
    if (!editing) return;
    const body = payload ?? {
      admin_status: editing.admin_status,
      admin_notes: editing.admin_notes,
      is_active: editing.is_active,
      publish_channels: editing.publish_channels?.length ? editing.publish_channels : ["web", "ios", "android"],
    };
    const res = await fetch(`/api/admin/programmes/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (res.ok) {
      setMessage("已保存課程設定");
      setEditing(null);
      await loadRows();
    } else {
      setMessage(json.error?.message ?? "保存失敗");
    }
  }

  function status(row: ProgrammeRow) {
    const raw = Array.isArray(row.lcsd_programme_status) ? row.lcsd_programme_status[0] : row.lcsd_programme_status;
    if (row.admin_status === "hidden") return "已隱藏";
    if (row.admin_status === "ended") return "已結束";
    return raw?.enrolment_status ?? "未刷新";
  }

  function statusTone(row: ProgrammeRow) {
    const text = status(row);
    if (row.admin_status === "hidden") return "neutral";
    if (row.admin_status === "ended" || text.includes("滿")) return "danger";
    if (text.includes("未") || text.includes("候")) return "warn";
    return "good";
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">課程管理</h1>
          <p className="mt-1 text-sm text-slate-500">查看康體通課程、報名狀態、追蹤人數和提醒資料。</p>
        </div>
        <button onClick={() => { void loadRows(); }} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">刷新</button>
      </div>
      {message ? <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{message}</div> : null}

      <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-6">
        <input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="搜尋課程/場地/編號" className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2" />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">{CATEGORY_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        <select value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option value="">全部地區</option>{DISTRICT_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        <input value={filters.age} onChange={(e) => setFilters({ ...filters, age: e.target.value })} placeholder="年齡" type="number" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <button onClick={() => { void loadRows(); }} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium">套用</button>
      </div>
      <div className="mb-4 flex gap-2">
        {STATUS_OPTIONS.map(([value, label]) => (
          <button key={value} onClick={() => { const next = { ...filters, status: value }; setFilters(next); void loadRows(next); }} className={`rounded-xl px-4 py-2 text-sm ${filters.status === value ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>{label}</button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-3">課程</th><th className="px-4 py-3">地區/年齡</th><th className="px-4 py-3">報名狀態</th><th className="px-4 py-3">追蹤</th><th className="px-4 py-3">最近刷新</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => {
              const raw = Array.isArray(row.lcsd_programme_status) ? row.lcsd_programme_status[0] : row.lcsd_programme_status;
              return (
                <tr key={row.id}>
                  <td className="px-4 py-3 font-medium text-slate-950">{row.name_zh || row.name_en || row.lcsd_programme_id}<div className="text-xs text-slate-400">{row.venue}</div></td>
                  <td className="px-4 py-3 text-slate-600">{row.district ?? "-"} · {row.age_min ?? "?"}-{row.age_max ?? "?"}</td>
                  <td className="px-4 py-3"><AdminStatusPill tone={statusTone(row)}>{status(row)}</AdminStatusPill></td>
                  <td className="px-4 py-3">{row.subscription_count}</td>
                  <td className="px-4 py-3 text-slate-600">{formatAdminDate(raw?.last_checked_at)}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => setEditing(row)} className="font-medium text-slate-950 underline">查看</button></td>
                </tr>
              );
            })}
            {rows.length === 0 ? <EmptyTableRow colSpan={6} message="沒有符合條件的課程" /> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <AdminDrawer
          eyebrow="康體通課程"
          title={editing.name_zh || editing.name_en || editing.lcsd_programme_id}
          description={`追蹤人數 ${editing.subscription_count}。管理狀態會覆蓋前台顯示，刷新狀態會重新讀取報名情況。`}
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => save({ action: "refresh" })} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">刷新狀態</button>
              <button onClick={() => save({ admin_status: "hidden", admin_notes: editing.admin_notes })} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">隱藏</button>
              <button onClick={() => save({ admin_status: "ended", admin_notes: editing.admin_notes })} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">標記已結束</button>
              <button onClick={() => save()} className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white">保存</button>
            </>
          }
        >
          <AdminSection title="報名狀態" description="這裡用來判斷家長是否還需要追蹤，以及是否應該在前台繼續展示。">
            <AdminInfoGrid>
              <AdminInfoItem label="場地" value={editing.venue ?? "未填寫"} />
              <AdminInfoItem label="地區" value={editing.district ?? "未填寫"} />
              <AdminInfoItem label="年齡" value={`${editing.age_min ?? "?"}-${editing.age_max ?? "?"}`} />
              <AdminInfoItem label="報名開始" value={formatAdminDate(editing.enrolment_open_at)} />
              <AdminInfoItem label="報名截止" value={formatAdminDate(editing.enrolment_close_at)} />
              <AdminInfoItem label="來源" value={editing.raw_url ?? "未填寫"} />
            </AdminInfoGrid>
          </AdminSection>
          <AdminSection title="後台處理">
            <AdminFormGrid>
              <AdminSelect
                label="顯示狀態"
                value={editing.admin_status}
                options={[["visible", "顯示"], ["hidden", "隱藏"], ["ended", "已結束"]]}
                onChange={(v) => setEditing({ ...editing, admin_status: v as ProgrammeRow["admin_status"] })}
              />
              <AdminCheckbox label="保持活躍" checked={editing.is_active} onChange={(v) => setEditing({ ...editing, is_active: v })} />
              <AdminPublishChannels value={editing.publish_channels} onChange={(v) => setEditing({ ...editing, publish_channels: v })} />
              <AdminTextarea label="備註" value={editing.admin_notes ?? ""} onChange={(v) => setEditing({ ...editing, admin_notes: v })} />
            </AdminFormGrid>
          </AdminSection>
        </AdminDrawer>
      ) : null}
    </div>
  );
}
