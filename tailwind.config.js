const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      whitebg: '#fffff5',
      coral: '#9147ff',
      grape: '#5c16c5',
      muted: '#f2f2f2',
      moon: '#efeff1',
      important: '#bb1411',
      success: '#00db84',
      cherry: '#eb0400',
      sky: '#7aa7ff',
      red: colors.red,
      blueberry: '#1f69ff',
    },
    extend: {},
  },
  plugins: [],
}
