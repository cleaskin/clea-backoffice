/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clea: {
          coral: '#FB5F40',
          'coral-hover': '#e04b2c',
          'coral-light': '#FFF1EE',
          'coral-border': '#FFD0C7',
          sun: '#FFC758',
          bg: '#FCF8F4',
          'bg-subtle': '#FAF7F2',
          card: '#FFFFFF',
          charcoal: '#1C1918',
          muted: '#78716E',
          border: '#ECE7DE',
          'border-dark': '#E6E1D8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'clea-sm': '0 1px 3px rgba(28, 25, 24, 0.04)',
        'clea': '0 4px 16px rgba(28, 25, 24, 0.05)',
        'clea-lg': '0 10px 30px rgba(28, 25, 24, 0.08)',
        'clea-coral': '0 4px 14px rgba(251, 95, 64, 0.25)',
      }
    },
  },
  plugins: [],
}
