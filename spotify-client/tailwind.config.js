module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screenCalculated: "calc(var(--vh) * 100)",
      screen: "100vh",
    }),
    minHeight: (theme) => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
      screenCalculated: "calc(var(--vh) * 100)",
      screen: "100vh",
    }),
    extend: {
      colors: {
        spotifyGreen: "#18D860",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
