"use client";

import { useEffect, useState } from "react";
import {
  AdminCheckbox,
  AdminDrawer,
  AdminField,
  AdminFormGrid,
  AdminInfoGrid,
  AdminInfoItem,
  AdminSection,
  AdminSelect,
  AdminStatusPill,
  EmptyTableRow,
  formatAdminDate,
} from "@/components/admin/AdminWorkspace";
import { VACANCY_OPTIONS } from "@/lib/admin/options";

interface VacancyRow {
  id: string;
  school_id: string;
  academic_year: string;
  n_vacancy: string;
  k1_vacancy: string;
  k2_vacancy: string;
  k3_vacancy: string;
  application_deadline: string | null;
  edb_source_url: string | null;
  edb_published_date: string | null;
  is_current: boolean;
  schools: { id: string; name_tc: string; name_en: string | null; district: string; application_url?: string | null };
}

export function AdminVacanciesClient() {
  const [filters, setFilters] = useState({ search: "", deadline: "", vacancy: "" });
  const [rows, setRows] = useState<VacancyRow[]>([]);
  const [editing, setEditing] = useState<VacancyRow | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadRows() {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    params.set("limit", "50");
    const res = await fetch(`/api/admin/vacancies?${params.toString()}`);
    const json = await res.json();
    setRows(json.data ?? []);
  }

  useEffect(() => { void loadRows(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function save() {
    if (!editing) return;
    const res = await fetch(`/api/admin/vacancies/${editing.school_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id,
        academic_year: editing.academic_year,
        n_vacancy: editing.n_vacancy,
        k1_vacancy: editing.k1_vacancy,
        k2_vacancy: editing.k2_vacancy,
        k3_vacancy: editing.k3_vacancy,
        application_deadline: editing.application_deadline,
        edb_source_url: editing.edb_source_url,
        edb_published_date: editing.edb_published_date,
        is_current: editing.is_current,
        application_url: editing.schools.application_url ?? null,
      }),
    });
    const json = await res.json();
    if (res.ok) {
      setMessage(`已保存，重新生成 ${json.remindersSynced ?? 0} 條提醒`);
      setEditing(null);
      await loadRows();
    } else {
      setMessage(json.error?.message ?? "保存失敗");
    }
  }

  function vacancyTone(value: string) {
    if (value === "has_vacancy") return "good";
    if (value === "waiting_list" || value === "check_school") return "warn";
    if (value === "no_vacancy") return "danger";
    return "neutral";
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">學額管理</h1>
          <p className="mt-1 text-sm text-ink-500">集中維護 N / K1 / K2 / K3 學位和申請截止日。</p>
        </div>
        <button onClick={loadRows} className="rounded-button bg-ink-900 px-4 py-2 text-sm font-medium text-white">刷新</button>
      </div>
      {message ? <div className="mb-4 rounded-button border border-surface-border bg-white px-4 py-3 text-sm text-ink-700">{message}</div> : null}

      <div className="mb-4 grid gap-3 rounded-card border border-surface-border bg-white p-4 md:grid-cols-4">
        <input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="搜尋學校" className="rounded-button border border-surface-border px-3 py-2 text-sm" />
        <select value={filters.deadline} onChange={(e) => setFilters({ ...filters, deadline: e.target.value })} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="">全部截止時間</option>
          <option value="7">未來 7 天</option>
          <option value="14">未來 14 天</option>
          <option value="30">未來 30 天</option>
        </select>
        <select value={filters.vacancy} onChange={(e) => setFilters({ ...filters, vacancy: e.target.value })} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="">全部學位狀態</option>
          {VACANCY_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button onClick={loadRows} className="rounded-button border border-surface-border px-3 py-2 text-sm font-medium">套用</button>
      </div>

      <div className="overflow-hidden rounded-card border border-surface-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs text-ink-500">
            <tr>
              <th className="px-4 py-3">學校</th>
              <th className="px-4 py-3">N</th>
              <th className="px-4 py-3">K1</th>
              <th className="px-4 py-3">K2</th>
              <th className="px-4 py-3">K3</th>
              <th className="px-4 py-3">截止日</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{row.schools?.name_tc}</td>
                <td className="px-4 py-3"><AdminStatusPill tone={vacancyTone(row.n_vacancy)}>{label(row.n_vacancy)}</AdminStatusPill></td>
                <td className="px-4 py-3"><AdminStatusPill tone={vacancyTone(row.k1_vacancy)}>{label(row.k1_vacancy)}</AdminStatusPill></td>
                <td className="px-4 py-3"><AdminStatusPill tone={vacancyTone(row.k2_vacancy)}>{label(row.k2_vacancy)}</AdminStatusPill></td>
                <td className="px-4 py-3"><AdminStatusPill tone={vacancyTone(row.k3_vacancy)}>{label(row.k3_vacancy)}</AdminStatusPill></td>
                <td className="px-4 py-3 text-ink-700">{formatAdminDate(row.application_deadline)}</td>
                <td className="px-4 py-3 text-right"><button onClick={() => setEditing(row)} className="font-medium text-ink-900 underline">編輯</button></td>
              </tr>
            ))}
            {rows.length === 0 ? <EmptyTableRow colSpan={7} message="沒有符合條件的學額資料" /> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <AdminDrawer
          eyebrow="學額資料"
          title={editing.schools?.name_tc ?? "未命名學校"}
          description={`學年 ${editing.academic_year}，截止日 ${formatAdminDate(editing.application_deadline)}。保存後會同步相關提醒。`}
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => setEditing(null)} className="rounded-chip border border-surface-border bg-white px-5 py-2 text-sm">取消</button>
              <button onClick={save} className="rounded-chip bg-ink-900 px-5 py-2 text-sm font-medium text-white">保存並同步提醒</button>
            </>
          }
        >
          <AdminSection title="業務判斷" description="家長看到的是各級學位狀態；截止日會用於提醒。來源日期用來判斷資料是否過期。">
            <AdminInfoGrid>
              <AdminInfoItem label="學校地區" value={editing.schools?.district ?? "未填寫"} />
              <AdminInfoItem label="官方申請頁" value={editing.schools.application_url ?? "未填寫"} />
            </AdminInfoGrid>
          </AdminSection>
          <AdminSection title="學額和截止日">
            <AdminFormGrid>
              <AdminField label="學年" value={editing.academic_year} onChange={(v) => setEditing({ ...editing, academic_year: v })} />
              <AdminField label="申請截止日" type="date" value={editing.application_deadline ?? ""} onChange={(v) => setEditing({ ...editing, application_deadline: v || null })} />
              {(["n_vacancy", "k1_vacancy", "k2_vacancy", "k3_vacancy"] as const).map((key) => (
                <AdminSelect key={key} label={key.replace("_vacancy", "").toUpperCase()} value={editing[key]} options={VACANCY_OPTIONS} onChange={(v) => setEditing({ ...editing, [key]: v })} />
              ))}
            </AdminFormGrid>
          </AdminSection>
          <AdminSection title="來源和前台入口">
            <AdminFormGrid>
              <AdminField label="申請頁" value={editing.schools.application_url ?? ""} onChange={(v) => setEditing({ ...editing, schools: { ...editing.schools, application_url: v } })} full />
              <AdminField label="來源連結" value={editing.edb_source_url ?? ""} onChange={(v) => setEditing({ ...editing, edb_source_url: v })} full />
              <AdminField label="資料發布日" type="date" value={editing.edb_published_date ?? ""} onChange={(v) => setEditing({ ...editing, edb_published_date: v || null })} />
              <AdminCheckbox label="當前有效" checked={editing.is_current} onChange={(v) => setEditing({ ...editing, is_current: v })} />
            </AdminFormGrid>
          </AdminSection>
        </AdminDrawer>
      ) : null}
    </div>
  );
}

function label(value: string) {
  return VACANCY_OPTIONS.find(([key]) => key === value)?.[1] ?? value;
}
