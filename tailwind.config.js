/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // Add your custom fonts and enjoy.
      'Patrick': ["Patrick Hand", "cursive"]
    },
    extend: {},
  },
  plugins: [],
}
