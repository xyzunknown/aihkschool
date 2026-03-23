import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", hoverable = false, onClick }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/60 backdrop-blur-xl
        border border-slate-200/50
        rounded-card p-7
        ${hoverable ? "cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.02]" : ""}
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
