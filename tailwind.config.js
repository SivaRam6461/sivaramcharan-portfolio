/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#ff5722',
          400: '#ff7043',
          600: '#e64a19',
          300: '#ff8a65',
        },
        amber: {
          400: '#ffb300',
          300: '#ffca28',
          500: '#ff8f00',
        }
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        hand: ['Caveat', 'cursive'],
        grotesk: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        }
      }
    },
  },
  plugins: [],
}
