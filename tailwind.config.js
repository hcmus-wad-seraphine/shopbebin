/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7FA0F4",
        secondary: "#D1A3FF",
        black: "#525252",
        success: "#4BB543",
        warning: "#FFC107",
        error: "#FF0000",
      },
      fontFamily: {
        mono: ['"Poppins"'],
        fontawesome: ["FontAwesome", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-primary",
    "bg-secondary",
    "bg-black",
    "bg-success",
    "bg-warning",
    "bg-error",
    "text-primary",
    "text-secondary",
    "text-black",
    "text-success",
    "text-warning",
    "text-error",
    "border-primary",
    "border-secondary",
    "border-black",
    "border-success",
    "border-warning",
    "border-error",
  ],
};
