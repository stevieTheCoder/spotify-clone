module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#18D860",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
