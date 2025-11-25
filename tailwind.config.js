/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        'primary-dark': '#5b21b6',
        secondary: '#db2777',
        accent: '#f472b6',
        background: '#0f172a',
        'section-bg': '#1e293b',
        'card-bg': '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}