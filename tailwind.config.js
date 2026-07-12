/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2B5B",
          deep: "#081A3D",
        },
        orange: {
          DEFAULT: "#FF8A00",
          light: "#FFB84D",
        },
        paper: "#FAF9F6",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(15,43,91,0.25)",
        card: "0 10px 40px -10px rgba(15,43,91,0.15)",
      },
    },
  },
  plugins: [],
};
