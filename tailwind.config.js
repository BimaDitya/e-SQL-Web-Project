/** @type {import('tailwindcss').Config} */
module.exports = {
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
        body: ["var(--assistant-font)"],
        code: ["Source Code Pro"],
      },
      height: {
        adaptive: "calc(100vh - 4rem)",
      },
      backgroundImage: {
        pattern: "url('/hypnotize.png')",
      },
      colors: {
        primary: {
          500: "#ff9301",
          400: "#ff9e1a",
          300: "#ffa934",
          200: "#ffb34d",
          100: "#ffbe67",
          50: "#ffc980",
        },
        secondary: {
          500: "#00678c",
          400: "#1a7698",
          300: "#3385a3",
          200: "#4d95af",
          100: "#66a4ba",
          50: "#80b3c6",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
