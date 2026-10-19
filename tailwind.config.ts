import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        west: {
          navy: "#061523",
          petrol: "#0B253A",
          teal: "#0E7C8E",
          tealLight: "#169DB2",
          gold: "#E5A93C",
          amber: "#F4C266",
          sand: "#F6EFE2",
        },
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "fade-up-1": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both",
        "fade-up-2": "fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both",
        "fade-up-3": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
        "fade-up-4": "fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
