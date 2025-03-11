/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-peach': '#F5764D',
        'custom-magenta': '#F10665',
        'custom-light-purple': '#A39EF7',
        'custom-deep-blue': '#0554B7',
        'custom-black': '#000000',
      },
    },
  },
  plugins: [],
};