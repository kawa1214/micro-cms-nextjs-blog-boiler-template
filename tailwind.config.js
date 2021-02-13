module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  theme: {
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    boxShadow: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.2)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.9)',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '960px',
      xl: '1440px',
    },
  }
}