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
