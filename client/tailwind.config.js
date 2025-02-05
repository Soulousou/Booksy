/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors:{
      "green-forest": "#022c22",
      "stone": "#292524",
      "ivory": '#f0fdf4',
      "pastelgreen": "#a8e6cf",
      "softgreen": "#7ad7b8",
      "greygreen": "#B9C19C",
      "accentgreen": "#536E3B",
      "textgreen": "#444933",
      "black": "#000000",
      "red" : "#450a0a",
    },
    animation: {
      'spin-slow': 'spin 5s linear infinite',
      'pusle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    extend: {},
  },
  plugins: [],
}
