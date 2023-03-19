/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      gray: colors.gray,
      sky: colors.sky,
    },
  },
  plugins: [],
}
