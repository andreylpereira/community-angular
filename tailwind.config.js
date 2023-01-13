/** @type {import('tailwindcss').Config} */
require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || false;
module.exports = {
  important: true,
  darkMode: 'class',
  content: [],
  purge: {
      enabled: enablePurge,
      content: [
        './src/**/*.html',
        './src/**/*.scss'
      ]
    },
  theme: {
    extend: {},
  },
  plugins: [],
}
