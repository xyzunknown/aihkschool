import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "sm";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-1.5 font-medium transition-transform duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
      primary: "bg-slate-950 text-white rounded-xl hover:scale-[1.02]",
      secondary: "bg-white text-slate-900 border border-slate-200 rounded-xl hover:scale-[1.02]",
    };

    const sizes: Record<string, string> = {
      default: "px-6 py-3 text-sm",
      sm: "px-4 py-2 text-xs",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
