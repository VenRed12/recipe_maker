/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f1',
          100: '#feeedc',
          200: '#fcd9b7',
          300: '#f9bd87',
          400: '#f49755',
          500: '#ee7527', // saffron terracotta
          600: '#df581b',
          700: '#b93f17',
          800: '#93331b',
          900: '#772d1a',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5eee7',
          200: '#ccdec0',
          300: '#a7c6af',
          500: '#588b68',
          700: '#3c6248',
          900: '#233b2b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -5px rgba(238, 117, 39, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.1), 0 0 1px 1px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
