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
      borderWidth: {
        thin: "0.1px",
      },
      minHeight: {
        4: "4rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
