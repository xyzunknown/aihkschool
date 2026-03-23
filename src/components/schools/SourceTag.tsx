import type { DataSource } from "@/types/database";

const sourceConfig: Record<DataSource, { label: string; className: string }> = {
  edb: {
    label: "Official · EDB",
    className: "bg-blue-50/60 text-blue-800 border-blue-200/30",
  },
  school: {
    label: "School-published",
    className: "bg-green-50/60 text-green-800 border-green-200/30",
  },
  parent: {
    label: "家长投稿",
    className: "bg-orange-50/60 text-orange-800 border-orange-200/30",
  },
  inferred: {
    label: "Inferred",
    className: "bg-slate-50/60 text-slate-500 border-slate-200/30",
  },
};

interface SourceTagProps {
  source: DataSource;
}

export function SourceTag({ source }: SourceTagProps) {
  const config = sourceConfig[source];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium font-mono border ${config.className}`}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-current opacity-70" />
      {config.label}
    </span>
  );
}
