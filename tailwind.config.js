/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#939393",
        custom_purple_washed: "#2C2B32",
        "custom-yellow": "#F0B65A",
        "custom-red": "#FF6B6B",
        "custom-green": "#99B84A",
        "custom-blue": "#1E95E7",
        "custom-purple": "#895197",
        "custom-background": "#1F1E25",
      },
      fontFamily: {
        inter: ["Inter", "serif"],
        cascadia: ["Cascadia Code", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
