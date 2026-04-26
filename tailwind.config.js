/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: '#0B3C5D',
        accent: '#F57C00',

        brand: {
          // Primary - Navy Blue
          navy: '#0B3C5D',
          'navy-light': '#134B6E',
          'navy-dark': '#062A42',

          // Accent - Orange
          orange: '#F57C00',
          'orange-light': '#FF9124',
          'orange-dark': '#D66A00',

          // Accent Yellow
          accent: '#FFB800',

          // Backgrounds
          'gray-light': '#F8FAFC',
          white: '#FFFFFF',

          // Text
          'text-dark': '#1E293B',
          'text-muted': '#475569',

          // Border
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};