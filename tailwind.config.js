/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ef",
          100: "#ffe8d4",
          400: "#d4854e",
          500: "#c67c4e",
          700: "#8a4e2a",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
