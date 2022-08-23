module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand']
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
