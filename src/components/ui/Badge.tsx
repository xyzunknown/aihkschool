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
  active: "bg-forest-600 text-white border-forest-600",
  success: "bg-status-available-bg text-status-available-fg border-status-available-bg",
  warning: "bg-status-limited-bg text-status-limited-fg border-status-limited-bg",
  danger: "bg-status-full-bg text-status-full-fg border-status-full-bg",
};

const sizes: Record<string, string> = {
  default: "h-8 px-3 text-label",
  sm: "h-6 px-2 text-label",
};

export function Badge({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 rounded-pill font-medium border transition-colors whitespace-nowrap";

  const interactive = onClick
    ? "cursor-pointer hover:bg-forest-50"
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
