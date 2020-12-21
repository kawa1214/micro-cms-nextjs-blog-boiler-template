module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-flexbugs-fixes": [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 0,
        "features": {
          "custom-properties": false,
          "nesting-rules": true  // Enable nesting
        }
      }
    ]
  },
}