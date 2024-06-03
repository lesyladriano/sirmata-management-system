/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
 content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
    animation: {
        shake: 'shake 0.5s ease infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(3px)' },
        },

    },


   width: {
    25: "5rem",
    45: "7rem",
    48: "8rem",
    50: "10rem",
    53: "13rem",
    55: "15rem",
    110: "20rem",
    120: "30rem",
    125: "35rem",
    130: "40rem",
    140: "50rem",
    145: "60rem",
    150: "80rem",
    "60rem": "60rem",
   },

   height: {
    review: "4rem",
    25: "5rem",
    "60rem": "60rem",
    50: "10rem",
    45: "7rem",
    55: "15rem",
    100: "20rem",
    110: "25rem",
    120: "30rem",
    133: "33rem",
    130: "30rem",
    136: "36rem",
    137: "37rem",
    140: "40rem",
    150: "50rem",
    banner: "447px",
   },
   maxWidth: {
    "8xl": "88rem",
    "9xl": "99rem",
   },
   minHeight: {
    "8xl": "88rem",
    "9xl": "99rem",
    "10xl;": "30rem",
   },

   maxHeight: {
    50: "10rem",
    55: "15rem",
    100: "20rem",
    120: "30rem",
    125: "30rem",
    133: "33rem",
    130: "30rem",
    136: "36rem",
    137: "37rem",
    140: "40rem",
   },

   fontSize: {
    xxs: "0.5rem",
    xsm: "0.6rem",
   },

   textDecoration: ["hover", "focus"],
   colors: {
    forestgreen: {
     50: "#006400",
     100: "#375623",
     200: "#76a276",
     300: "#8EAC50",
     400: "#d5efd9",
     500: "#b1c3b8",
     600: "#4f7344",
     700: "#4c8275",
     800: "#4BA541",
     900: "#3b8533",
     1000: "#186918",
     1100: "#0f4e0f",
    },
    brown: {
     50: "#f6f2df",
     100: "#b4876b",
     200: "#76674c",
     300: "#3F3F3F",
    },
    beige: {
     50: "#f9ffed",
     100: "#fffae7",
    },
    dark: {
     50: "#2b3825",
    },

    fontFamily: {
     tenor: ['"Tenor Sans"', ...defaultTheme.fontFamily.sans],
     playlist: ["Playlist Script", "cursive"],
    },
   },
  },
  screens: {
   mobile: { min: "300px", max: "480px" },
   tablet: { min: "481px", max: "768px" },
   laptop: { min: "769px", max: "1024px" },
   desktop: { min: "1025px", max: "1366px" },
   win11: "1367px",
  },
  gridTemplateColumns: {
   sidebar: "300px auto", //for sidebar layout
   "sidebar-collapsed": "64px auto",
   2: "1fr 1fr",
   3: "1fr 1fr 1fr",
   4: "1fr 1fr 1fr 1fr",
   5: "1fr 1fr 1fr 1fr 1fr", //for collapsed sidebar layout
   6: "1fr 1fr 1fr 1fr 1fr 1fr",
  },
 },
 plugins: [],
});
