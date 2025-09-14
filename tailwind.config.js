/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'var(--color-gray)',
        'custom-purple-washed': 'var(--color-purple-washed)',
        'custom-yellow': 'var(--color-yellow)',
        'custom-red': 'var(--color-red)',
        'custom-green': 'var(--color-green)',
        'custom-blue': 'var(--color-blue)',
        'custom-purple': 'var(--color-purple)',
        'custom-background': 'var(--color-background)',
        'custom-text': 'var(--color-text)', // Added a text color
      },
      fontFamily: {
        inter: ["Inter", "serif"],
        cascadia: ["Cascadia Code", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
