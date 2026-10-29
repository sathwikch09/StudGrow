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
        studIndigo: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5', // Primary
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        studViolet: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        studTeal: {
          DEFAULT: '#14B8A6',
          50: '#F0FDFA',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        navy: {
          900: '#0B1020',
          800: '#111827',
          700: '#1E293B',
          600: '#334155',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        dyslexic: ['"OpenDyslexic"', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(79, 70, 229, 0.12)',
        'glow-indigo': '0 0 25px -5px rgba(79, 70, 229, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(20, 184, 166, 0.4)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
