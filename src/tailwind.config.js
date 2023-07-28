/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      'bgColor': '#090a09',
      bgImage: 'url("https://transparenttextures.com/patterns/black-mamba.png")'
    },
    fontFamily: {
      'quickSand': ['Quicksand', 'sans-serif']
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

