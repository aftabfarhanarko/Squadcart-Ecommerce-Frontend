/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baiJamjuree: ["var(--font-bai-jamjuree)", "sans-serif"],
      },
      colors: {
        primary: "#D31A7A",
      },
    },
  },
  plugins: [],
};
