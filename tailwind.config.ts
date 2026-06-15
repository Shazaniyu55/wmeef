import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the WMEEF logo (deep forest green)
        ink: "#1C2218",
        forest: {
          DEFAULT: "#125F36",
          deep: "#0E4A2A",
          light: "#2C7A4F",
        },
        gold: {
          DEFAULT: "#B8893B",
          light: "#D8B25E",
        },
        parchment: "#F7F3EA",
        sand: "#ECE4D2",
      },
      fontFamily: {
        // Wired up via next/font CSS variables in app/layout.tsx
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
