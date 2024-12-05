/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'hsl(14, 86%, 42%)',
          200:'hsl(159, 69%, 38%)'
        },
        secondary: {
          100: 'hsl(20, 50%, 98%)',
          200: 'hsl(13, 31%, 94%)',
          300: 'hsl(14, 25%, 72%)',
          400: 'hsl(7, 20%, 60%)',
          500: 'hsl(12, 20%, 44%)',
          600:' hsl(14, 65%, 9%)'
        }
      }
    },
  },
  plugins: [],
}

