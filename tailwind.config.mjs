/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "compass-green": "#1B6B4A",
        "compass-green-light": "#E8F5EE",
        "compass-gold": "#C8A951",
        sphere: {
          national: "#2563EB",
          provincial: "#7C3AED",
          municipal: "#DC2626",
          all: "#1B6B4A",
        },
        pillar: {
          "government-structure": "#1B6B4A",
          "safety-security": "#0369A1",
          "economic-growth": "#D97706",
          "human-development": "#7C3AED",
        },
        "pillar-light": {
          "government-structure": "#E8F5EE",
          "safety-security": "#E0F2FE",
          "economic-growth": "#FEF3C7",
          "human-development": "#EDE9FE",
        },
        "text-primary": "#1A1A1A",
        "text-secondary": "#4A4A4A",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#F8F8F8",
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Source Serif 4", "Georgia", "serif"],
      },
      maxWidth: {
        content: "680px",
      },
    },
  },
  plugins: [],
};
