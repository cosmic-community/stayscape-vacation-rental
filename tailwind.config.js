/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF385C',
          dark: '#E31C5F',
          light: '#FF5A7C',
        },
        secondary: {
          DEFAULT: '#00A699',
          dark: '#008A7E',
          light: '#00BAA9',
        },
        gray: {
          50: '#F7F7F7',
          100: '#EBEBEB',
          200: '#DDDDDD',
          300: '#B0B0B0',
          400: '#717171',
          500: '#484848',
          600: '#222222',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'listing': '0 2px 16px rgba(0,0,0,0.12)',
        'listing-hover': '0 6px 20px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}