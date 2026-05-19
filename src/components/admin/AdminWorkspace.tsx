import type { ReactNode } from "react";

type Tone = "neutral" | "good" | "warn" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warn: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
};

const inputClasses =
  "min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50 disabled:text-slate-400";

export function AdminDrawer({
  title,
  eyebrow,
  description,
  children,
  actions,
  onClose,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  actions: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/30">
      <div className="ml-auto flex h-full w-full max-w-3xl flex-col border-l border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{eyebrow}</p> : null}
              <h2 className="mt-1 truncate text-xl font-bold text-slate-950">{title}</h2>
              {description ? <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p> : null}
            </div>
            <button onClick={onClose} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              關閉
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex flex-wrap justify-end gap-3">{actions}</div>
        </div>
      </div>
    </div>
  );
}

export function AdminSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
        {description ? <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function AdminFormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

export function AdminField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "未填寫",
  full = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <label className={full ? "block md:col-span-2" : "block"}>
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses}
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  value,
  onChange,
  placeholder = "未填寫",
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClasses} resize-y`}
      />
    </label>
  );
}

export function AdminSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [string, string])[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClasses}>
        {options.map(([optionValue, labelText]) => (
          <option key={optionValue} value={optionValue}>
            {labelText}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AdminCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

const PUBLISH_CHANNEL_OPTIONS = [
  ["web", "網頁端"],
  ["ios", "iOS 端"],
  ["android", "Android 端"],
] as const;

export function AdminPublishChannels({
  value,
  onChange,
}: {
  value: string[] | null | undefined;
  onChange: (value: string[]) => void;
}) {
  const selected = value?.length ? value : ["web", "ios", "android"];

  function toggle(channel: string, checked: boolean) {
    const next = checked
      ? Array.from(new Set([...selected, channel]))
      : selected.filter((item) => item !== channel);
    onChange(next.length ? next : selected);
  }

  return (
    <div className="md:col-span-2">
      <span className="mb-2 block text-xs font-medium text-slate-500">顯示在哪些端</span>
      <div className="grid gap-2 sm:grid-cols-2">
        {PUBLISH_CHANNEL_OPTIONS.map(([channel, label]) => (
          <AdminCheckbox
            key={channel}
            label={label}
            checked={selected.includes(channel)}
            onChange={(checked) => toggle(channel, checked)}
          />
        ))}
      </div>
    </div>
  );
}

export function AdminInfoGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 md:grid-cols-2">{children}</div>;
}

export function AdminInfoItem({ label, value, full = false }: { label: string; value: ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <div className="mt-1 break-words text-sm font-medium leading-6 text-slate-800">{value || "未填寫"}</div>
    </div>
  );
}

export function AdminStatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}>{children}</span>;
}

export function EmptyTableRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-slate-400">
        {message}
      </td>
    </tr>
  );
}

export function formatAdminDate(value: string | null | undefined, fallback = "未設定") {
  if (!value) return fallback;
  return value.includes("T") ? value.slice(0, 16).replace("T", " ") : value;
}

export function formatAdminMoney(value: number | null | undefined) {
  if (value == null) return "未填寫";
  return `HK$${Number(value).toLocaleString("zh-HK")}`;
}

export function formatAdminText(value: unknown, fallback = "未填寫") {
  if (value == null || value === "") return fallback;
  if (typeof value === "boolean") return value ? "是" : "否";
  return String(value);
}
