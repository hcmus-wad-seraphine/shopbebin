/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7FA0F4",
        secondary: "#D1A3FF",
        black: "#525252",
      },
      fontFamily: {
        mono: ['"Poppins"'],
      },
    },
  },
  plugins: [],
};
