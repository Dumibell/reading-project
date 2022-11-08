/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["Nanum Myeongjo", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
        referi: ["LeferiPoint-WhiteObliqueA", "sans-serif"],
        nanumsq: ["Nanum Square", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  backgroundImage: {
    mainImage: "url('/images/original.avif')",
  },
};
