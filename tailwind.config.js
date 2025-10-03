/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#d9ca9c',
        brand: '#ae983c',
        dark: '#000000',
        bg_secondary: '#c5b16d',
        light: '#34322a',
        border: '#615f59',
        highlight: '#baa455'
      }
    },
  },

  plugins: [],
};
