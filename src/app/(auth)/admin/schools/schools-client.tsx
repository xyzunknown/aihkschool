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
  EmptyTableRow,
  formatAdminDate,
  formatAdminMoney,
} from "@/components/admin/AdminWorkspace";
import { DISTRICT_OPTIONS, SCHOOL_TYPE_OPTIONS, SESSION_OPTIONS } from "@/lib/admin/options";

interface SchoolRow {
  id: string;
  school_code: string | null;
  name_tc: string;
  name_en: string | null;
  district: string;
  school_type: string;
  phone: string | null;
  website: string | null;
  logo_url: string | null;
  fee_monthly_hkd: number | null;
  last_verified_at: string | null;
  is_active: boolean;
  publish_channels: string[] | null;
}

type SchoolDetail = SchoolRow & {
  address_tc: string | null;
  address_en: string | null;
  email: string | null;
  kep_participant: boolean;
  session_type: string | null;
  language_primary: string | null;
  language_secondary: string | null;
  fee_annual_hkd: number | null;
  grades_offered: string[] | null;
};

const emptyFilters = { search: "", district: "", type: "", active: "", completeness: "" };

export function AdminSchoolsClient() {
  const [filters, setFilters] = useState(emptyFilters);
  const [rows, setRows] = useState<SchoolRow[]>([]);
  const [editing, setEditing] = useState<SchoolDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadRows() {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    params.set("limit", "50");
    const res = await fetch(`/api/admin/schools?${params.toString()}`);
    const json = await res.json();
    setRows(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => { void loadRows(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function openEdit(id: string) {
    const res = await fetch(`/api/admin/schools/${id}`);
    const json = await res.json();
    setEditing(json.data);
  }

  async function saveSchool() {
    if (!editing) return;
    setSaving(true);
    const res = await fetch(`/api/admin/schools/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        fee_monthly_hkd: editing.fee_monthly_hkd === null ? null : Number(editing.fee_monthly_hkd),
        fee_annual_hkd: editing.fee_annual_hkd === null ? null : Number(editing.fee_annual_hkd),
        grades_offered: editing.grades_offered ?? [],
        publish_channels: editing.publish_channels?.length ? editing.publish_channels : ["web", "ios", "android"],
      }),
    });
    if (res.ok) {
      setEditing(null);
      await loadRows();
    }
    setSaving(false);
  }

  async function uploadLogo(file: File) {
    if (!editing) return;
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`/api/admin/schools/${editing.id}/logo`, { method: "POST", body: form });
    const json = await res.json();
    if (json.data?.logo_url) setEditing({ ...editing, logo_url: json.data.logo_url });
  }

  function missing(row: SchoolRow) {
    const items = [];
    if (!row.website) items.push("官網");
    if (!row.logo_url) items.push("Logo");
    if (!row.phone) items.push("電話");
    if (row.fee_monthly_hkd == null) items.push("月費");
    if (!row.last_verified_at) items.push("確認時間");
    return items;
  }

  function completionTone(row: SchoolRow) {
    const miss = missing(row);
    if (!row.is_active) return "neutral";
    if (miss.length >= 3) return "danger";
    if (miss.length) return "warn";
    return "good";
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">學校管理</h1>
          <p className="mt-1 text-sm text-ink-500">搜尋、篩選和編輯前台會展示的學校資料。</p>
        </div>
        <button onClick={loadRows} className="rounded-button bg-ink-900 px-4 py-2 text-sm font-medium text-white">刷新</button>
      </div>

      <div className="mb-4 grid gap-3 rounded-card border border-surface-border bg-white p-4 md:grid-cols-5">
        <input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="搜尋學校" className="rounded-button border border-surface-border px-3 py-2 text-sm" />
        <select value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="">全部地區</option>
          {DISTRICT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="">全部類型</option>
          {SCHOOL_TYPE_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={filters.completeness} onChange={(e) => setFilters({ ...filters, completeness: e.target.value })} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="">全部完整度</option>
          <option value="incomplete">資料不完整</option>
        </select>
        <button onClick={loadRows} className="rounded-button border border-surface-border px-3 py-2 text-sm font-medium">套用</button>
      </div>

      <div className="overflow-hidden rounded-card border border-surface-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs text-ink-500">
            <tr>
              <th className="px-4 py-3">學校</th>
              <th className="px-4 py-3">地區</th>
              <th className="px-4 py-3">狀態</th>
              <th className="px-4 py-3">完整度</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <EmptyTableRow colSpan={5} message="正在載入學校資料" />
            ) : rows.map((row) => {
              const miss = missing(row);
              return (
                <tr key={row.id}>
                  <td className="px-4 py-3 font-medium text-ink-900">{row.name_tc}<div className="text-xs text-ink-500">{row.school_code}</div></td>
                  <td className="px-4 py-3 text-ink-700">{row.district}</td>
                  <td className="px-4 py-3"><AdminStatusPill tone={row.is_active ? "good" : "neutral"}>{row.is_active ? "前台顯示" : "已隱藏"}</AdminStatusPill></td>
                  <td className="px-4 py-3 text-ink-700"><AdminStatusPill tone={completionTone(row)}>{miss.length ? `缺 ${miss.join("、")}` : "資料完整"}</AdminStatusPill></td>
                  <td className="px-4 py-3 text-right"><button onClick={() => openEdit(row.id)} className="font-medium text-ink-900 underline">編輯</button></td>
                </tr>
              );
            })}
            {!loading && rows.length === 0 ? <EmptyTableRow colSpan={5} message="沒有符合條件的學校" /> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <AdminDrawer
          eyebrow="學校資料"
          title={editing.name_tc}
          description={`目前狀態：${editing.is_active ? "前台顯示" : "已隱藏"}。最近確認：${formatAdminDate(editing.last_verified_at)}。月費：${formatAdminMoney(editing.fee_monthly_hkd)}。`}
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => setEditing(null)} className="rounded-chip border border-surface-border bg-white px-5 py-2 text-sm">取消</button>
              <button disabled={saving} onClick={saveSchool} className="rounded-chip bg-ink-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-50">保存</button>
            </>
          }
        >
          <AdminSection title="基本資料" description="這些欄位會直接影響前台搜尋、列表和學校詳情頁的顯示。">
            <AdminFormGrid>
              <AdminField label="中文名" value={editing.name_tc} onChange={(v) => setEditing({ ...editing, name_tc: v })} />
              <AdminField label="英文名" value={editing.name_en ?? ""} onChange={(v) => setEditing({ ...editing, name_en: v })} />
              <AdminSelect label="地區" value={editing.district} options={DISTRICT_OPTIONS} onChange={(v) => setEditing({ ...editing, district: v })} />
              <AdminSelect label="類型" value={editing.school_type} options={SCHOOL_TYPE_OPTIONS} onChange={(v) => setEditing({ ...editing, school_type: v })} />
              <AdminField label="地址" value={editing.address_tc ?? ""} onChange={(v) => setEditing({ ...editing, address_tc: v })} full />
            </AdminFormGrid>
          </AdminSection>

          <AdminSection title="聯絡和展示" description="缺官網、電話或 Logo 時，資料健康頁會要求跟進。">
            <AdminFormGrid>
              <AdminField label="電話" value={editing.phone ?? ""} onChange={(v) => setEditing({ ...editing, phone: v })} />
              <AdminField label="Email" value={editing.email ?? ""} onChange={(v) => setEditing({ ...editing, email: v })} />
              <AdminField label="官網" value={editing.website ?? ""} onChange={(v) => setEditing({ ...editing, website: v })} />
              <AdminField label="Logo 地址" value={editing.logo_url ?? ""} onChange={(v) => setEditing({ ...editing, logo_url: v })} />
              <label className="block md:col-span-2">
                <span className="mb-1 block text-xs font-medium text-ink-500">上傳 Logo</span>
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])} className="w-full rounded-chip border border-surface-border px-3 py-2 text-sm" />
              </label>
            </AdminFormGrid>
          </AdminSection>

          <AdminSection title="招生和費用" description="費用與班制會用於家長比較，也會影響資料完整度。">
            <AdminFormGrid>
              <AdminSelect label="班制" value={editing.session_type ?? ""} options={SESSION_OPTIONS} onChange={(v) => setEditing({ ...editing, session_type: v || null })} />
              <AdminField label="主要語言" value={editing.language_primary ?? ""} onChange={(v) => setEditing({ ...editing, language_primary: v })} />
              <AdminField label="月費" type="number" value={editing.fee_monthly_hkd?.toString() ?? ""} onChange={(v) => setEditing({ ...editing, fee_monthly_hkd: v ? Number(v) : null })} />
              <AdminField label="年費" type="number" value={editing.fee_annual_hkd?.toString() ?? ""} onChange={(v) => setEditing({ ...editing, fee_annual_hkd: v ? Number(v) : null })} />
              <AdminField label="年級（逗號分隔）" value={(editing.grades_offered ?? []).join(", ")} onChange={(v) => setEditing({ ...editing, grades_offered: v.split(",").map((x) => x.trim()).filter(Boolean) })} />
              <AdminField label="最近確認時間" type="datetime-local" value={editing.last_verified_at?.slice(0, 16) ?? ""} onChange={(v) => setEditing({ ...editing, last_verified_at: v ? new Date(v).toISOString() : null })} />
              <AdminCheckbox label="參加資助計劃" checked={editing.kep_participant} onChange={(v) => setEditing({ ...editing, kep_participant: v })} />
              <AdminCheckbox label="前台顯示" checked={editing.is_active} onChange={(v) => setEditing({ ...editing, is_active: v })} />
              <AdminPublishChannels value={editing.publish_channels} onChange={(v) => setEditing({ ...editing, publish_channels: v })} />
            </AdminFormGrid>
          </AdminSection>
        </AdminDrawer>
      ) : null}
    </div>
  );
}
