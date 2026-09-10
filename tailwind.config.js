/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './*.js',
    './src/**/*.js',
    './data/**/*.js',
    '!./data/geography_geojson_data.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
