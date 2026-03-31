/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#6366f1",
          600: "#4f46e5"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(99, 102, 241, 0.35)"
      }
    }
  },
  plugins: []
};
