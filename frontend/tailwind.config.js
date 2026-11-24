/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mindease: {
          bg: '#FAF4EB',
          surface: '#FFFFFF',
          border: '#EFE8DD',
          dark: '#2C2622',
          muted: '#786F66',
          coral: '#E77A57',
          coralHover: '#D86845',
          coralLight: '#FDF2EE',
          sun: '#F5B844',
          joy: '#86C59C',
          positive: '#7BB6D8',
          anxious: '#E9A855',
          stressed: '#DC7254'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 38, 34, 0.05)',
        'hover': '0 10px 30px -4px rgba(44, 38, 34, 0.08)'
      }
    },
  },
  plugins: [],
}
