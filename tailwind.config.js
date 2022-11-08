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
        inkLip: ["InkLipquid", "sans-serif"],
        kyobo: ["KyoboHandwriting2020A", "sans-serif"],
        ridi: ["RIDIBatang", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  backgroundImage: {
    mainImage: "url('/images/original.avif')",
  },
};
