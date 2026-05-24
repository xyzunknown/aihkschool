import type { DataSource } from "@/types/database";

const sourceConfig: Record<DataSource, { label: string; className: string }> = {
  edb: {
    label: "教育局官方",
    className: "bg-forest-50 text-forest-700",
  },
  school: {
    label: "學校公佈",
    className: "bg-status-available-bg text-status-available-fg",
  },
  parent: {
    label: "家長提交",
    className: "bg-status-limited-bg text-status-limited-fg",
  },
  inferred: {
    label: "推算",
    className: "bg-status-pending-bg text-status-pending-fg",
  },
};

interface SourceTagProps {
  source: DataSource;
}

export function SourceTag({ source }: SourceTagProps) {
  const config = sourceConfig[source];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
