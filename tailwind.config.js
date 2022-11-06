/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["Nanum Myeongjo", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  backgroundImage: {
    mainImage: "url('/images/original.avif')",
  },
};
