/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    typography: {
      default: {
        css: {
          "code::before": {
            content: "none",
          },
          "code::after": {
            content: "none",
          },
        },
      },
    },
    extend: {
      fontFamily: {
        head: ["var(--ysabeau-infant-font)"],
        code: ["var(--source-code-pro)"],
        body: ["var(--assistant-font)"],
      },
      height: {
        adaptive: "calc(100vh - 4rem)",
      },
      backgroundImage: {
        pattern: "url('/hypnotize.png')",
      },
      colors: {
        primary: {
          50: "#fff4e5",
          100: "#ffe4bf",
          200: "#ffd399",
          300: "#ffc274",
          400: "#ffb34d",
          500: "#ff9301",
          600: "#e67f00",
          700: "#cc6f00",
          800: "#b35f00",
          900: "#994f00",
        },
        secondary: {
          50: "#e6f2f7",
          100: "#cce6ee",
          200: "#99ccdd",
          300: "#66b3cc",
          400: "#3399bb",
          500: "#00678c",
          600: "#005a7a",
          700: "#004d68",
          800: "#003f56",
          900: "#003244",
        },
        // Dark Theme Brand (lebih pekat & sejuk)
        "primary-dark": {
          50: "#332100",
          100: "#4d3000",
          200: "#664000",
          300: "#805000",
          400: "#995f00",
          500: "#b36f00",
          600: "#cc7f00",
          700: "#e68f00",
          800: "#ff9f1a",
          900: "#ffaf33",
        },
        "secondary-dark": {
          50: "#0a1a1e",
          100: "#0f2c33",
          200: "#15414a",
          300: "#1b5661",
          400: "#216b78",
          500: "#27808f",
          600: "#2c96a6",
          700: "#33abbd",
          800: "#39c0d4",
          900: "#3fd5eb",
        },
        "text-light": {
          base: "#1a1a1a",
          muted: "#4a4a4a",
          invert: "#ffffff",
        },
        "text-dark": {
          base: "#e0e0e0",
          muted: "#a0a0a0",
          invert: "#000000",
        },
        background: {
          // Light
          light: {
            surface: "#f9fafb", // Base
            subtle: "#f3f4f6", // Sections
            elevated: "#e5e7eb", // Navbar, Card
            overlay: "#d1d5db", // Popup, Modal
            hover: "#e2e8f0", // Hover State
          },
          // Dark
          dark: {
            surface: "#0f172a", // Base
            subtle: "#1e293b", // Sections
            elevated: "#334155", // Navbar, Card
            overlay: "#475569", // Popup, Modal
            hover: "#64748b", // Hover State
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
