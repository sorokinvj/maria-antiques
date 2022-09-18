module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand']
      },
      spacing: {
        '112': '28rem',
      }
    }
  },
  variants: {
    extend: {
      padding: ['first']
    }
  },
  plugins: []
}
