/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // RoundsAhead brand palette (matches the web app).
        brand: {
          DEFAULT: '#0f766e',
          dark: '#115e59',
          light: '#5eead4',
        },
        ink: '#0f172a',
        muted: '#64748b',
      },
    },
  },
  plugins: [],
};
