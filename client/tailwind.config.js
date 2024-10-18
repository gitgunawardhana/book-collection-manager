/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'lime-green': {
          'DEFAULT': '#FEFEFE',  // Base
          '20': '#F6F6F6',   // Lightest shade
          '50': '#72EB3A',   // Lighter shade
          '100': '#5D9D0B',  // Light shade
          '200': '#365A08',  // Medium shade
          '250': '#23252e',  // Darker shade
          '300': '#1B1D24',  // Darkest shade
        }
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

