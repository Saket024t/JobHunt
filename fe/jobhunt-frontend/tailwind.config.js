/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#10B981",
        background: "#F1F5F9",
        surface: "#FFFFFF",
        textMain: "#1E293B",
        textMuted: "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
