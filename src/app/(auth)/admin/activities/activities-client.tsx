"use client";

import { useEffect, useState } from "react";
import {
  AdminCheckbox,
  AdminDrawer,
  AdminField,
  AdminFormGrid,
  AdminPublishChannels,
  AdminSection,
  AdminSelect,
  AdminStatusPill,
  AdminTextarea,
  EmptyTableRow,
  formatAdminMoney,
} from "@/components/admin/AdminWorkspace";
import { DISTRICT_OPTIONS } from "@/lib/admin/options";

const CATEGORY_OPTIONS = [
  ["", "全部類別"], ["music", "音樂"], ["sports", "運動"], ["art", "藝術"], ["dance", "舞蹈"],
  ["stem", "STEM"], ["language", "語言"], ["drama", "戲劇"], ["other", "其他"],
] as const;

const EMPTY = {
  title: "",
  category: "other",
  organizer: "",
  district: "",
  address: "",
  description: "",
  age_min: null,
  age_max: null,
  fee: null,
  fee_note: "",
  start_date: "",
  end_date: "",
  schedule: "",
  contact_phone: "",
  contact_url: "",
  image_url: "",
  source: "manual",
  source_url: "",
  match_confidence: "high",
  is_active: true,
  publish_channels: ["web", "ios", "android"],
  admin_status: "visible",
  admin_notes: "",
};

type ActivityRow = Omit<typeof EMPTY, "age_min" | "age_max" | "fee"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
  age_min: number | null;
  age_max: number | null;
  fee: number | null;
};

export function AdminActivitiesClient() {
  const [filters, setFilters] = useState({ search: "", category: "", district: "", status: "" });
  const [rows, setRows] = useState<ActivityRow[]>([]);
  const [editing, setEditing] = useState<ActivityRow | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadRows() {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    const res = await fetch(`/api/admin/activities?${params.toString()}`);
    const json = await res.json();
    setRows(json.data ?? []);
  }

  useEffect(() => { void loadRows(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function clean(value: ActivityRow) {
    const payload = { ...value };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    return {
      ...payload,
      organizer: payload.organizer || null,
      district: payload.district || null,
      address: payload.address || null,
      description: payload.description || null,
      fee_note: payload.fee_note || null,
      start_date: payload.start_date || null,
      end_date: payload.end_date || null,
      schedule: payload.schedule || null,
      contact_phone: payload.contact_phone || null,
      contact_url: payload.contact_url || null,
      image_url: payload.image_url || null,
      source_url: payload.source_url || null,
      admin_notes: payload.admin_notes || null,
      age_min: payload.age_min === null ? null : Number(payload.age_min),
      age_max: payload.age_max === null ? null : Number(payload.age_max),
      fee: payload.fee === null ? null : Number(payload.fee),
      publish_channels: payload.publish_channels?.length ? payload.publish_channels : ["web", "ios", "android"],
    };
  }

  async function save(payload?: Partial<ActivityRow>) {
    if (!editing) return;
    const next = { ...editing, ...payload };
    const res = await fetch(editing.id ? `/api/admin/activities/${editing.id}` : "/api/admin/activities", {
      method: editing.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean(next)),
    });
    const json = await res.json();
    if (res.ok) {
      setMessage("已保存活動");
      setEditing(null);
      await loadRows();
    } else {
      setMessage(json.error?.message ?? "保存失敗");
    }
  }

  function statusLabel(row: ActivityRow) {
    if (!row.is_active) return "不活躍";
    if (row.admin_status === "low_quality") return "低質量";
    if (row.admin_status === "hidden") return "已隱藏";
    return "顯示";
  }

  function statusTone(row: ActivityRow) {
    if (!row.is_active || row.admin_status === "hidden") return "neutral";
    if (row.admin_status === "low_quality") return "warn";
    return "good";
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">課外活動管理</h1>
          <p className="mt-1 text-sm text-slate-500">清理低質量活動、隱藏過期內容，也可手動新增活動。</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">新增活動</button>
      </div>
      {message ? <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{message}</div> : null}

      <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
        <input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="搜尋活動/機構" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">{CATEGORY_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        <select value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option value="">全部地區</option>{DISTRICT_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2 text-sm"><option value="">全部狀態</option><option value="visible">顯示</option><option value="hidden">隱藏</option><option value="low_quality">低質量</option></select>
        <button onClick={loadRows} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium">套用</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-3">活動</th><th className="px-4 py-3">機構</th><th className="px-4 py-3">日期</th><th className="px-4 py-3">狀態</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3 font-medium text-slate-950">{row.title}<div className="text-xs text-slate-400">{row.source_url || "沒有來源連結"}</div></td>
                <td className="px-4 py-3 text-slate-600">{row.organizer || "-"}</td>
                <td className="px-4 py-3 text-slate-600">{row.start_date || "-"} 至 {row.end_date || "長期"}</td>
                <td className="px-4 py-3"><AdminStatusPill tone={statusTone(row)}>{statusLabel(row)}</AdminStatusPill></td>
                <td className="px-4 py-3 text-right"><button onClick={() => setEditing(row)} className="font-medium text-slate-950 underline">編輯</button></td>
              </tr>
            ))}
            {rows.length === 0 ? <EmptyTableRow colSpan={5} message="沒有符合條件的活動" /> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <AdminDrawer
          eyebrow={editing.id ? "活動資料" : "新增活動"}
          title={editing.title || "未命名活動"}
          description={`目前狀態：${statusLabel(editing)}。費用：${formatAdminMoney(editing.fee)}。手動新增或清理活動時，請優先補齊機構、日期和報名連結。`}
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => save({ admin_status: "hidden" })} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">隱藏</button>
              <button onClick={() => save({ admin_status: "low_quality" })} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">標記低質量</button>
              <button onClick={() => save()} className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white">保存</button>
            </>
          }
        >
          <AdminSection title="活動內容" description="標題、機構和描述會直接展示給家長；低質量內容不要進前台。">
            <AdminFormGrid>
              <AdminField label="標題" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <AdminField label="機構" value={editing.organizer ?? ""} onChange={(v) => setEditing({ ...editing, organizer: v })} />
              <AdminSelect label="類別" value={editing.category} options={CATEGORY_OPTIONS.slice(1)} onChange={(v) => setEditing({ ...editing, category: v })} />
              <AdminSelect label="地區" value={editing.district ?? ""} options={[["", "未設定"], ...DISTRICT_OPTIONS]} onChange={(v) => setEditing({ ...editing, district: v })} />
              <AdminTextarea label="描述" value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} />
            </AdminFormGrid>
          </AdminSection>
          <AdminSection title="時間、年齡和費用">
            <AdminFormGrid>
              <AdminField label="開始日期" type="date" value={editing.start_date ?? ""} onChange={(v) => setEditing({ ...editing, start_date: v })} />
              <AdminField label="結束日期" type="date" value={editing.end_date ?? ""} onChange={(v) => setEditing({ ...editing, end_date: v })} />
              <AdminField label="最低年齡" type="number" value={editing.age_min?.toString() ?? ""} onChange={(v) => setEditing({ ...editing, age_min: v ? Number(v) : null })} />
              <AdminField label="最高年齡" type="number" value={editing.age_max?.toString() ?? ""} onChange={(v) => setEditing({ ...editing, age_max: v ? Number(v) : null })} />
              <AdminField label="費用" type="number" value={editing.fee?.toString() ?? ""} onChange={(v) => setEditing({ ...editing, fee: v ? Number(v) : null })} />
              <AdminField label="費用備註" value={editing.fee_note ?? ""} onChange={(v) => setEditing({ ...editing, fee_note: v })} />
            </AdminFormGrid>
          </AdminSection>
          <AdminSection title="連結和後台狀態" description="報名連結用於前台行動按鈕，來源連結用於之後查證。">
            <AdminFormGrid>
              <AdminField label="詳情/報名連結" value={editing.contact_url ?? ""} onChange={(v) => setEditing({ ...editing, contact_url: v })} full />
              <AdminField label="來源連結" value={editing.source_url ?? ""} onChange={(v) => setEditing({ ...editing, source_url: v })} full />
              <AdminSelect label="後台狀態" value={editing.admin_status} options={[["visible", "顯示"], ["hidden", "隱藏"], ["low_quality", "低質量"]]} onChange={(v) => setEditing({ ...editing, admin_status: v })} />
              <AdminCheckbox label="前台可用" checked={editing.is_active} onChange={(v) => setEditing({ ...editing, is_active: v })} />
              <AdminPublishChannels value={editing.publish_channels} onChange={(v) => setEditing({ ...editing, publish_channels: v })} />
            </AdminFormGrid>
          </AdminSection>
        </AdminDrawer>
      ) : null}
    </div>
  );
}
