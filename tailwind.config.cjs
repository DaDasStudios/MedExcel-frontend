/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Helvetica', 'serif']
    },
    extend: {
      animation: {
        'enter': "enter 250ms ease-in-out both",
        'leave': "leave 250ms ease-in-out both"
      },
      keyframes: {
        enter: {
          'from': { opacity: '0', transform: "translate3d(0, -20%, 0)" },
          'to': { opacity: '1', transform: "translate3d(0, 0, 0)" },
        },
        leave: {
          'from': { opacity: '1', transform: "translate3d(0, 0, 0)" },
          'to': { opacity: '0', transform: "translate3d(0, -20%, 0)" },
        }
      }
    }
  },
  plugins: [],
}
