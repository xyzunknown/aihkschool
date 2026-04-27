import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF5",
          100: "#FAF6EC",
          200: "#F4ECD8",
          300: "#EADFC1",
        },
        forest: {
          50: "#F0F6F1",
          100: "#DBE8DD",
          200: "#B6D2BB",
          400: "#5A9B72",
          500: "#3A8159",
          600: "#2F6B47",
          700: "#245636",
          800: "#1B4129",
          900: "#143020",
        },
        sand: {
          50: "#FFF8EC",
          100: "#FCEFD0",
          200: "#F8E0A8",
          600: "#B98430",
          700: "#8E5F1E",
        },
        ink: {
          900: "#1F2A24",
          800: "#2A3630",
          700: "#3F4B44",
          500: "#6B766F",
          400: "#8C9690",
        },
        leaf: {
          50: "#F2F7EE",
          100: "#E8F0E3",
          200: "#CFE0C5",
        },
        rust: {
          500: "#C5562B",
          600: "#A84620",
        },
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 4px 20px -8px rgba(31, 42, 36, 0.08)",
        card: "0 8px 24px -12px rgba(31, 42, 36, 0.10)",
        glow: "0 0 0 4px rgba(58, 129, 89, 0.12)",
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans-hk)',
          '"Noto Sans HK"',
          '"PingFang HK"',
          '"PingFang TC"',
          '"Hiragino Sans CNS"',
          '"Microsoft JhengHei"',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'var(--font-noto-serif-hk)',
          '"Noto Serif HK"',
          'var(--font-noto-sans-hk)',
          '"PingFang HK"',
          'serif',
        ],
      },
      fontSize: {
        display: ["44px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }],
        h1: ["28px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.015em" }],
        h2: ["20px", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" }],
        body: ["15px", { lineHeight: "1.65", fontWeight: "400" }],
        small: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["11px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.06em" }],
      },
      spacing: {
        "7": "28px",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        "heart-fill": {
          "0%": { transform: "scale(0.8)", opacity: "0.5" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-6px) rotate(2deg)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "ken-burns": "ken-burns 20s ease-in-out infinite alternate",
        "heart-fill": "heart-fill 0.3s ease-out forwards",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
