const {
  black,
  darkBG,
  darkGrey,
  lines,
  mediumGrey,
  white,
  mainPurple,
  mainPurpleHover,
  red,
  redHover,
  linesLight,
  linesGrey,
} = require("./colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  colors: {
    black: black,
    darkBG: darkBG,
    darkGrey: darkGrey,
    lines: lines,
    mediumGrey: mediumGrey,
    white: white,
    mainPurple: mainPurple,
    mainPurpleHover: mainPurpleHover,
    red: red,
    redHover: redHover,
    linesLight: linesLight,
    linesGrey: linesGrey,
  },
  fontFamily: {
    sans: ["Plus Jakarta Sans", "sans-serif"],
  },
  plugins: [require("flowbite/plugin")],
};
