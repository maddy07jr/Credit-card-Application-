/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bank-navy": "#0a192f",
        "bank-navy-light": "#112240",
        "bank-gold": "#ffd700",
        "bank-gold-light": "#ffe033",
        "bank-grey": "#8892b0",
        "bank-white": "#e6f1ff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
