/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef5ff",
          100: "#fce7ff",
          200: "#f9cfff",
          300: "#f5a6ff",
          400: "#ef6dff",
          500: "#e534ff",
          600: "#d012f5",
          700: "#b008d1",
          800: "#9009ab",
          900: "#770b8a",
        },
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
    },
  },
  plugins: [],
};
