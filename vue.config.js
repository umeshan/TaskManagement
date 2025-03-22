const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Configure Webpack devtool for source maps
  configureWebpack: {
    devtool: 'source-map', // Ensures source maps are enabled for debugging
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // ✅ Ensure @ points to src
      },
    },
  },
  // Ensure Vue CLI doesn't strip out source maps
  productionSourceMap: true,  // This is to include source maps in production as well, if needed
  // Other configurations if needed can go here (e.g., proxy settings, plugins, etc.)
})
