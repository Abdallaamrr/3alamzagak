/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07090e',
          900: '#0a0d14',
          850: '#0f1420',
          800: '#141a29',
          750: '#1b2234',
          700: '#222b40',
          600: '#2d3852',
        },
        gold: {
          300: '#fef08a',
          400: '#f3e5ab',
          500: '#d4af37',
          600: '#b89220',
          700: '#8c6b12',
          800: '#634b0b',
        },
        cream: {
          50: '#fcfaf7',
          100: '#f6f1e9',
          200: '#e9dfd1',
          300: '#d9cbb6',
          900: '#2b2318',
        },
        suit: {
          red: '#dc2626',
          black: '#111827',
        }
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'Inter', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        heading: ['var(--font-alexandria)', 'var(--font-cairo)', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 35px rgba(212, 175, 55, 0.4)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f3e5ab 0%, #d4af37 50%, #b89220 100%)',
        'gold-radial': 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(10,13,20,0) 70%)',
        'table-texture': 'radial-gradient(ellipse at center, rgba(15,20,32,0.95) 0%, rgba(7,9,14,0.98) 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
