/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ejs,ts}"],
  theme: {
    extend: {
      colors: {
        'primary': '#7FA0F4',
        'secondary': '#D1A3FF',
        'black': '#525252',
      }
    },
  },
  plugins: [],
}

