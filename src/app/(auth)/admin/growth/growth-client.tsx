"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AdminCheckbox,
  AdminDrawer,
  AdminField,
  AdminFormGrid,
  AdminSelect,
  EmptyTableRow,
} from "@/components/admin/AdminWorkspace";

type Tab = "dashboard" | "placements" | "partners" | "newsletter" | "topics" | "assistant";
type Resource = Exclude<Tab, "dashboard" | "newsletter"> | "campaigns";
type Item = Record<string, unknown>;

const EMPTY: Record<Resource, Item> = {
  placements: {
    slot_type: "home", title: "", target_type: "school", target_id: "", target_url: "",
    starts_at: "", ends_at: "", is_visible: true, sort_order: 100, notes: "",
  },
  partners: {
    school_id: "", partner_name: "", contact_name: "", contact_email: "", contact_phone: "",
    status: "lead", starts_at: "", ends_at: "", placement: "", notes: "",
  },
  campaigns: {
    title: "", audience_filter: "all", subject: "", body_summary: "", status: "draft", scheduled_at: "", sent_at: "",
  },
  topics: {
    slug: "", title: "", summary: "", category: "guide", hero_image_url: "", body_md: "",
    is_visible: false, is_featured: false, published_at: "",
  },
  assistant: {
    suggestion_type: "school_update", title: "", summary: "", target_type: "school", target_id: "",
    status: "open", source_url: "",
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: "dashboard", label: "數據看板" },
  { key: "placements", label: "推薦位" },
  { key: "partners", label: "學校合作" },
  { key: "newsletter", label: "郵件訂閱" },
  { key: "topics", label: "專題內容" },
  { key: "assistant", label: "AI 助手" },
];

export function AdminGrowthClient() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [dashboard, setDashboard] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [campaigns, setCampaigns] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [editingResource, setEditingResource] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const listResource = useMemo(() => {
    if (tab === "newsletter") return "subscribers";
    if (tab === "dashboard") return "";
    return tab;
  }, [tab]);

  async function load() {
    setMessage(null);
    if (tab === "dashboard") {
      const res = await fetch("/api/admin/growth/dashboard");
      const json = await res.json();
      setDashboard(json.data ?? null);
      return;
    }
    const res = await fetch(`/api/admin/growth/${listResource}`);
    const json = await res.json();
    setItems(json.data ?? []);
    if (tab === "newsletter") {
      const campaignRes = await fetch("/api/admin/growth/campaigns");
      const campaignJson = await campaignRes.json();
      setCampaigns(campaignJson.data ?? []);
    }
  }

  useEffect(() => { void load(); }, [tab, listResource]); // eslint-disable-line react-hooks/exhaustive-deps

  function openCreate(resource: Resource = tab as Resource) {
    const next = resource === "campaigns" ? { ...EMPTY.campaigns } : { ...(EMPTY[resource as keyof typeof EMPTY] ?? {}) };
    setEditing(next);
    setEditingResource(resource);
  }

  function openEdit(item: Item, resource: Resource = tab as Resource) {
    setEditing({ ...item });
    setEditingResource(resource);
  }

  function clean(value: Item) {
    const payload = { ...value };
    for (const key of ["created_at", "updated_at", "subscribed_at", "unsubscribed_at", "last_opened_at", "last_clicked_at"]) delete payload[key];
    for (const key of ["target_id", "target_url", "starts_at", "ends_at", "school_id", "contact_name", "contact_email", "contact_phone", "placement", "notes", "audience_filter", "body_summary", "scheduled_at", "sent_at", "hero_image_url", "published_at", "target_type", "source_url"]) {
      if (payload[key] === "") payload[key] = null;
    }
    return payload;
  }

  async function save() {
    if (!editing || !editingResource) return;
    const res = await fetch(`/api/admin/growth/${editingResource}`, {
      method: editing.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean(editing)),
    });
    const json = await res.json();
    setMessage(res.ok ? "已保存" : json.error?.message ?? "保存失敗");
    setEditing(null);
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">增長後台</h1>
          <p className="mt-1 text-sm text-slate-500">查看用戶關注點，管理推薦、合作、郵件、專題和運營建議。</p>
        </div>
        {tab !== "dashboard" && tab !== "newsletter" ? <button onClick={() => openCreate()} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">新增</button> : null}
        {tab === "newsletter" ? <button onClick={() => openCreate("campaigns")} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">新增郵件</button> : null}
      </div>

      {message ? <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{message}</div> : null}

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button key={item.key} onClick={() => setTab(item.key)} className={`rounded-xl px-4 py-2 text-sm font-medium ${tab === item.key ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
            {item.label}
          </button>
        ))}
      </div>

      {tab === "dashboard" ? <Dashboard data={dashboard} /> : null}
      {tab === "placements" ? <SimpleTable items={items} columns={["title", "slot_type", "target_type", "is_visible", "starts_at", "ends_at"]} onEdit={(item) => openEdit(item)} /> : null}
      {tab === "partners" ? <SimpleTable items={items} columns={["partner_name", "status", "contact_name", "contact_email", "placement"]} onEdit={(item) => openEdit(item)} /> : null}
      {tab === "topics" ? <SimpleTable items={items} columns={["title", "slug", "category", "is_visible", "is_featured", "published_at"]} onEdit={(item) => openEdit(item)} /> : null}
      {tab === "assistant" ? <SimpleTable items={items} columns={["title", "suggestion_type", "status", "target_type", "source_url"]} onEdit={(item) => openEdit(item)} /> : null}
      {tab === "newsletter" ? <Newsletter subscribers={items} campaigns={campaigns} onEditCampaign={(item) => openEdit(item, "campaigns")} /> : null}

      {editing ? (
        <AdminDrawer
          eyebrow={resourceLabel(editingResource)}
          title={String(editing.title ?? editing.partner_name ?? editing.email ?? "新增項目")}
          description="這裡管理的是營運配置，不同欄位會影響推薦位、合作狀態、郵件計劃或專題內容。"
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => setEditing(null)} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">取消</button>
              <button onClick={save} className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white">保存</button>
            </>
          }
        >
          <Editor resource={editingResource} value={editing} onChange={setEditing} />
        </AdminDrawer>
      ) : null}
    </div>
  );
}

function Dashboard({ data }: { data: Item | null }) {
  const stats: [string, unknown][] = [
    ["今日訪問", data?.todayVisits ?? 0],
    ["新增收藏", data?.newFavorites ?? 0],
    ["新增課程追蹤", data?.newProgrammeFollows ?? 0],
    ["30 日事件", data?.totalEvents30d ?? 0],
  ];
  return <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-sm text-slate-500">{label}</div><div className="mt-2 text-3xl font-bold text-slate-950">{String(value)}</div></div>)}
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      <Rank title="熱門學校" rows={data?.hotSchools as Item[] | undefined} />
      <Rank title="熱門搜尋" rows={data?.hotSearches as Item[] | undefined} />
      <Rank title="申請連結點擊" rows={data?.applicationClicks as Item[] | undefined} />
    </div>
  </div>;
}

function Rank({ title, rows = [] }: { title: string; rows?: Item[] }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <h3 className="font-semibold text-slate-950">{title}</h3>
    <div className="mt-4 space-y-3 text-sm">
      {rows.length ? rows.map((row) => <div key={String(row.label)} className="flex justify-between gap-4"><span className="truncate text-slate-700">{String(row.label)}</span><span className="font-medium text-slate-950">{String(row.count)}</span></div>) : <div className="text-slate-400">暫無資料</div>}
    </div>
  </div>;
}

function SimpleTable({ items, columns, onEdit }: { items: Item[]; columns: string[]; onEdit?: (item: Item) => void }) {
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs text-slate-500"><tr>{columns.map((col) => <th key={col} className="px-4 py-3">{col}</th>)}{onEdit ? <th className="px-4 py-3 text-right">操作</th> : null}</tr></thead>
      <tbody className="divide-y divide-slate-100">
        {items.map((item) => <tr key={String(item.id)}>{columns.map((col) => <td key={col} className="max-w-xs truncate px-4 py-3 text-slate-700">{format(item[col])}</td>)}{onEdit ? <td className="px-4 py-3 text-right"><button onClick={() => onEdit(item)} className="font-medium text-slate-950 underline">編輯</button></td> : null}</tr>)}
        {!items.length ? <EmptyTableRow colSpan={columns.length + (onEdit ? 1 : 0)} message="暫無資料" /> : null}
      </tbody>
    </table>
  </div>;
}

function Newsletter({ subscribers, campaigns, onEditCampaign }: { subscribers: Item[]; campaigns: Item[]; onEditCampaign: (item: Item) => void }) {
  return <div className="grid gap-5 lg:grid-cols-2">
    <section>
      <h2 className="mb-3 font-semibold text-slate-950">訂閱名單</h2>
      <SimpleTable items={subscribers} columns={["email", "status", "source", "subscribed_at"]} />
    </section>
    <section>
      <h2 className="mb-3 font-semibold text-slate-950">郵件計劃</h2>
      <SimpleTable items={campaigns} columns={["title", "status", "subject", "open_count", "click_count"]} onEdit={onEditCampaign} />
    </section>
  </div>;
}

function Editor({ resource, value, onChange }: { resource: string; value: Item; onChange: (value: Item) => void }) {
  const set = (key: string, next: unknown) => onChange({ ...value, [key]: next });
  const fields: Record<string, { key: string; label: string; type?: string; options?: string[] }[]> = {
    placements: [
      { key: "title", label: "標題" }, { key: "slot_type", label: "位置", options: ["home", "school_list", "activity", "programme"] },
      { key: "target_type", label: "目標類型", options: ["school", "activity", "programme", "topic", "external"] },
      { key: "target_id", label: "目標 ID" }, { key: "target_url", label: "目標連結" }, { key: "starts_at", label: "開始時間", type: "datetime-local" },
      { key: "ends_at", label: "結束時間", type: "datetime-local" }, { key: "sort_order", label: "排序", type: "number" }, { key: "notes", label: "備註" },
    ],
    partners: [
      { key: "partner_name", label: "合作學校 / 機構" }, { key: "status", label: "狀態", options: ["lead", "contacted", "negotiating", "active", "paused", "ended"] },
      { key: "contact_name", label: "聯絡人" }, { key: "contact_email", label: "電郵" }, { key: "contact_phone", label: "電話" },
      { key: "placement", label: "展示位置" }, { key: "starts_at", label: "開始日期", type: "date" }, { key: "ends_at", label: "結束日期", type: "date" }, { key: "notes", label: "備註" },
    ],
    campaigns: [
      { key: "title", label: "名稱" }, { key: "status", label: "狀態", options: ["draft", "scheduled", "sent", "paused"] },
      { key: "audience_filter", label: "分組" }, { key: "subject", label: "郵件標題" }, { key: "body_summary", label: "內容摘要" },
      { key: "scheduled_at", label: "計劃時間", type: "datetime-local" },
    ],
    topics: [
      { key: "title", label: "專題標題" }, { key: "slug", label: "網址代號" }, { key: "category", label: "分類", options: ["district", "nursery", "international", "admission", "open_day", "guide"] },
      { key: "summary", label: "摘要" }, { key: "hero_image_url", label: "圖片連結" }, { key: "published_at", label: "發布時間", type: "datetime-local" }, { key: "body_md", label: "正文" },
    ],
    assistant: [
      { key: "title", label: "提醒標題" }, { key: "suggestion_type", label: "類型", options: ["school_update", "summary", "open_day", "application_date", "homepage_news"] },
      { key: "status", label: "狀態", options: ["open", "accepted", "dismissed", "done"] }, { key: "summary", label: "摘要" },
      { key: "target_type", label: "目標類型" }, { key: "target_id", label: "目標 ID" }, { key: "source_url", label: "來源連結" },
    ],
  };
  return <AdminFormGrid>
    {(fields[resource] ?? []).map((field) => field.options ? (
      <AdminSelect key={field.key} label={field.label} value={String(value[field.key] ?? "")} options={field.options.map((option) => [option, option] as const)} onChange={(v) => set(field.key, v)} />
    ) : (
      <AdminField key={field.key} label={field.label} type={field.type} value={field.type?.includes("datetime") ? String(value[field.key] ?? "").slice(0, 16) : String(value[field.key] ?? "")} onChange={(v) => set(field.key, field.type === "number" ? Number(v) : v)} full={field.key === "body_md" || field.key === "summary" || field.key === "body_summary"} />
    ))}
    {["placements", "topics"].includes(resource) ? <AdminCheckbox label="顯示" checked={Boolean(value.is_visible)} onChange={(v) => set("is_visible", v)} /> : null}
    {resource === "topics" ? <AdminCheckbox label="精選" checked={Boolean(value.is_featured)} onChange={(v) => set("is_featured", v)} /> : null}
  </AdminFormGrid>;
}

function format(value: unknown) {
  if (typeof value === "boolean") return value ? "是" : "否";
  if (typeof value === "string" && value.includes("T")) return value.slice(0, 10);
  return value == null || value === "" ? "-" : String(value);
}

function resourceLabel(resource: string) {
  if (resource === "placements") return "推薦位";
  if (resource === "partners") return "學校合作";
  if (resource === "campaigns") return "郵件計劃";
  if (resource === "topics") return "專題內容";
  if (resource === "assistant") return "AI 助手建議";
  return "增長後台";
}
