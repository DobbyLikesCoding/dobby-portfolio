/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#edeef0",
          200: "#d9dbe0",
          300: "#b3b8c3",
          400: "#8b94a5",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#0b1220"
        },
        accent: {
          500: "#64ffda"
        }
      }
    },
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     keyframes: {
      modalOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
        },
      },
      animation: {
        modalIn: 'modalIn 0.25s ease-out',
        modalOut: 'modalOut 0.2s ease-in',
      },
    },
  },
  plugins: [],
};