/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{ts,tsx}',
    './src/**/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          100: '#412B12',
          200: '#583812',
          300: '#704512',
          400: '#885213',
          500: '#A05F13',
          600: '#B86C13',
          700: '#CF7913',
          800: '#E78614',
          900: '#5379FF'
        },
        secondary: {
          100: '#1A1D25',
          200: '#1E232F',
          300: '#222939',
          400: '#273044',
          500: '#2B364E',
          600: '#2F3C58',
          700: '#334262',
          800: '#38486C',
          900: '#FE863D'
        },
        light: {
          100: '#5F5E5D',
          200: '#777674',
          300: '#8E8E8B',
          400: '#A6A5A2',
          500: '#BEBDBA',
          600: '#D9D9D9',
          700: '#EDECE8',
          800: '#F6F6F0',
          900: '#FFFFFF'
        },
        dark: {
          100: '#CCCCCC',
          200: '#B2B2B2',
          300: '#999999',
          400: '#808080',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333',
          800: '#111111',
          900: '#000000'
        }
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
};
