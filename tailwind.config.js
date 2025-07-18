/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // dark mode is enable
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e5dbff',
          200: '#d0bfff',
          300: '#b197fc',
          400: '#9775fa',
          500: '#845ef7',
          600: '#7950f2',
          700: '#7048e8',
          800: '#6741d9',
          900: '#5f3dc4',
          950: '#141C24',
        },
        accent: {
          50: '#f8f0fc',
          100: '#f3d9fa',
          200: '#eebefa',
          300: '#e599f7',
          400: '#da77f2',
          500: '#cc5de8',
          600: '#be4bdb',
          700: '#ae3ec9',
          800: '#9c36b5',
          900: '#862e9c',
          950: '#382814',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        orange: {
          50: '#fff4e6',
          100: '#ffe8cc',
          200: '#ffd8a8',
          300: '#ffc078',
          400: '#ffa94d',
          500: '#ff922b',
          600: '#fd7e14',
          700: '#f76707',
          800: '#e8590c',
          900: '#d9480f',
        },
      },
    },
    screens: {
      '3xs': '288px',
      '2xs': '320px',
      mobile_map: '390px',
      xs: '480px',
      mobile_map_sm_3: '540px',
      sm_2: '590px',
      sm: '640px',
      md_2: '710px',
      md: '760px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
