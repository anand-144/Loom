/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        open: ['Open Sans', 'sans-serif'], // Adds the Open Sans font family
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' }, // Start from the right
          '100%': { transform: 'translateX(-100%)' }, // Move to the left
        },
        horizontalMarquee: {
          '0%': { left: '-10%' },
          '100%': { left: '110%' },
        },
        verticalMarquee: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite', // Smooth scrolling animation
        horizontalMarquee: 'horizontalMarquee 5s linear infinite',
        verticalMarquee: 'verticalMarquee 5s linear infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
