// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/shops/',
    // assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    hostname:"192.168.0.157",
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/index':'http://118.89.54.28:8087/shops/',
      '/comment_data':'http://118.89.54.28:8087/shops/',
      '/store_detail':'http://118.89.54.28:8087/shops/',
      '/comments_list':'http://118.89.54.28:8087/shops/',
      '/comment':'http://118.89.54.28:8087/shops/',
      '/add_store':'http://118.89.54.28:8087/shops/',
      '/store_list_data':'http://118.89.54.28:8087/shops/',
      '/store_list_search_data':'http://118.89.54.28:8087/shops/',
      '/upload_store_data':'http://118.89.54.28:8087/shops/',
      '/store_form_data':'http://118.89.54.28:8087/shops/',
      '/changeLikeStatus':'http://118.89.54.28:8087/shops/',
      '/small_store_image':'http://118.89.54.28:8087/shops/',
      '/store_image':'http://118.89.54.28:8087/shops/'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
