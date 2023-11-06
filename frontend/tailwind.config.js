/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'lato': ['lato', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
      'roboto': ['Roboto Condensed', 'sans-serif']
    },
    screens: {
      'phone': '370px',
      'sm':'640px',
      'md': '768px',
      'lg': '1024px',
      'xl':'1280px',
      '2xl':'1536px'
    },
  },
  plugins: [],
}