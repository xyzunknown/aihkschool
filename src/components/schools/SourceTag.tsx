import type { DataSource } from "@/types/database";

const sourceConfig: Record<DataSource, { label: string; className: string }> = {
  edb: {
    label: "教育局官方",
    className: "bg-blue-50 text-blue-700",
  },
  school: {
    label: "學校公佈",
    className: "bg-emerald-50 text-emerald-700",
  },
  parent: {
    label: "家長提交",
    className: "bg-amber-50 text-amber-700",
  },
  inferred: {
    label: "推算",
    className: "bg-slate-100 text-slate-500",
  },
};

interface SourceTagProps {
  source: DataSource;
}

export function SourceTag({ source }: SourceTagProps) {
  const config = sourceConfig[source];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${config.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
