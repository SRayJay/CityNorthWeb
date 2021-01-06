const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: true,

  devServer: {
    port: 80,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://chengbei.site:28089/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'js-cookie': 'Cookies',
      'element-ui': 'ELEMENT',
      'vuex': 'Vuex',
      'wangeditor': 'wangEditor'
    }

  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@utils', resolve('src/utils'))
      .set('@photo', resolve('src/photo'))

    // 发布模式的isProd为true
    // config.plugin('html').tap(args => {
    //   args[0].cdn = cdn
    //   return args
    // })

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
