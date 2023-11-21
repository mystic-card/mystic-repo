/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',],
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        pink: colors.fuchsia,
      }
    },
  },
  plugins: [],
}

