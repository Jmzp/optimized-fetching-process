module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIDs: false, // Disable the ID minification, for some reasons the minified ID causes problems in my project
          removeViewBox: false, // Keep viewbox attribute
        },
      },
    },
  ],
};
