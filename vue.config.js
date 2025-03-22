const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Configure Webpack devtool for source maps
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    
  },
  productionSourceMap: true,
  pages: {
    index: {
      entry: "src/main.js",
      title: "Task Manager",
    },
  },
})
