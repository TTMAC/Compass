/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "compass-green": "#355E3B",
        "compass-green-light": "#E6EFE8",
        "compass-green-dark": "#264A2C",
        "compass-gold": "#A68A2B",
        sphere: {
          national: "#1B4965",
          provincial: "#553691",
          municipal: "#8B2232",
          all: "#355E3B",
        },
        pillar: {
          "government-structure": "#355E3B",
          "safety-security": "#1B4965",
          "economic-growth": "#7A5C1F",
          "human-development": "#553691",
          "reform-agenda": "#8B2232",
        },
        "pillar-light": {
          "government-structure": "#E6EFE8",
          "safety-security": "#E0EBF2",
          "economic-growth": "#F3EBDA",
          "human-development": "#E8E0F4",
          "reform-agenda": "#F0DEE2",
        },
        "text-primary": "#1A1A1A",
        "text-secondary": "#4A4A4A",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#F7F6F4",
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
