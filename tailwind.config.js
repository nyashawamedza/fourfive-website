
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FFFFFF',
          light: '#E5E5E5',
          grey: '#A0A0A0',
          dark: '#4A4A4A',
          black: '#1A1A1A',
        }
      }
    }
  },
  plugins: []
}
