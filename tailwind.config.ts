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
        ink: {
          950: "#080e1d",
          900: "#0b1120",
          850: "#0d1322",
          800: "#151b2b",
          700: "#191f2f",
          600: "#242a3a",
          500: "#2f3445",
          400: "#475569",
          300: "#64748b",
          200: "#94a3b8",
          100: "#dde2f8",
        },
        gold: {
          deep: "#927218",
          DEFAULT: "#d4af37",
          bright: "#fbbf24",
          soft: "#f2ca50",
          dim: "#3e6fab",
        },
        crimson: {
          DEFAULT: "#b91c1c",
          bright: "#dc2626",
          dark: "#7f1d1d",
        },
        jade: {
          DEFAULT: "#10b981",
          bright: "#34d399",
          dark: "#065f46",
        },
        amethyst: {
          DEFAULT: "#a855f7",
          bright: "#c084fc",
        },
        element: {
          metal: "#ffd700", // Kim
          wood: "#10b981",  // Mộc
          water: "#0ea5e9", // Thủy
          fire: "#ef4444",  // Hỏa
          earth: "#f59e0b", // Thổ
        }
      },
      fontFamily: {
        serif: ["Noto Serif", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      boxShadow: {
        'gold-glow': '0 0 16px -2px rgba(212, 175, 55, 0.35)',
        'crimson-glow': '0 0 16px -2px rgba(185, 28, 28, 0.4)',
        'jade-glow': '0 0 16px -2px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
};

export default config;

