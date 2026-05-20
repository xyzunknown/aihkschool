"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "success" | "warning" | "danger";
  size?: "default" | "sm";
  className?: string;
  onClick?: () => void;
}

const variants: Record<string, string> = {
  default: "bg-surface-soft text-ink-500 border-surface-border",
  active: "bg-brand-600 text-white border-brand-600",
  success: "bg-status-available-bg text-status-available-fg border-status-available-bg",
  warning: "bg-status-limited-bg text-status-limited-fg border-status-limited-bg",
  danger: "bg-status-full-bg text-status-full-fg border-status-full-bg",
};

const sizes: Record<string, string> = {
  default: "px-3 py-1 text-xs",
  sm: "px-2 py-0.5 text-[11px]",
};

export function Badge({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 rounded-full font-medium border transition-colors whitespace-nowrap";

  const interactive = onClick
    ? "cursor-pointer hover:scale-[1.02] transition-transform"
    : "";

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${interactive} ${className}`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      {children}
    </Tag>
  );
}
