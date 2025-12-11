/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'child': ['Comic Sans MS', 'Chalkboard', 'sans-serif'],
      },
      fontSize: {
        'child-base': '1.5rem',
        'child-lg': '2rem',
        'child-xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
