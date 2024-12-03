/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#27272a",
        secondary: "#3f3f46",
        accent: "#a855f7",
        accentDark: "#86198f",
      },
    },
  },
  plugins: [],
};
