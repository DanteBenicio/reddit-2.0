/* eslint-disable prettier/prettier */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: {
          600: '#161617',
          700: '#1A1A1B',
          800: '#030303'
        },
        gray: {
          300: '#C8CBCD',
          500: '#818384',
          800: '#353537',
          850: '#393A3B',
          900: '#232324'
        },
        orange: {
          500: '#FF4500'
        }
      }
    },
    screens: {
      'mb': {'max': '420px'},
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
