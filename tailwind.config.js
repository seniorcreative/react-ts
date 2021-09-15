// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      blue: {
        light: '#424b78',
        DEFAULT: '#424b78',
        dark: '#424b78',
      },
      white: colors.white
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
