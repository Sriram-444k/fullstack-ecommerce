/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#ff5151",
        secondary: "#ff2121",
        darkGray: "#212121",
        mediumGray: "#303030",
        mediumGray2: "#555",
        lightGray: "#9e9e9e",
        lightGray2: "#aeaeae",
        lightGray3: "#dadada",
        dimWhite: "rgba(255, 255, 255, 0.7)",
      }
    },
  },
  plugins: [],
}

