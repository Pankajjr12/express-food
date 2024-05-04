/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#3333cc",
        red: "#800000",
        secondary: "#555",
        primaryBG: "#f2f2f2",
        maroon: '#800000', 
      },
      fontFamily:{
        "primary":['Public Sans','sans-serif']
      },
      boxShadow: {
        'custom-shadow': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require("daisyui")],
}

