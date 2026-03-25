import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  variant?: "content" | "featured";
}

export function GlassCard({ children, className = "", hoverable = false, onClick, variant = "content" }: GlassCardProps) {
  const baseStyles = "rounded-2xl p-6 transition-shadow duration-200";

  const variantStyles = {
    content: "bg-white border border-slate-200 hover:shadow-sm",
    featured: "bg-slate-900 text-white rounded-2xl",
  };

  const interactiveStyles = hoverable ? "cursor-pointer" : "";

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${interactiveStyles}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
