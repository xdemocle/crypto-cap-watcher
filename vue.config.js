require('dotenv').config()
const webpack = require('webpack')
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin')
const ExtractTextPlugin = require('mini-css-extract-plugin')
const buildInfo = require('./build-info')

const isEnvProduction = process.env.NODE_ENV === 'production'
const isEnvDevelopment = process.env.NODE_ENV === 'development'

// Prepare webpack plugins
const webpackPlugins = []

if (isEnvDevelopment) {
  webpackPlugins.push(new BitBarWebpackProgressPlugin())
}

const build = buildInfo()

webpackPlugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      VUE_APP_BUILD: JSON.stringify(build),
      VUE_APP_BRANCH: JSON.stringify(build.git.branch)
    }
  })
)

module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '^/api': {
        target: process.env.API_URL,
        changeOrigin: true,
        proxyTimeout: 5 * 60 * 1000,
        onProxyReq: (proxyReq, req) => req.setTimeout(5 * 60 * 1000)
      }
    }
  },

  chainWebpack: config => {
    if (isEnvProduction) {
      config.plugin('workbox')
    }

    config.plugin('extract-css').use(ExtractTextPlugin, [
      {
        filename: 'css/[name].css?[hash]',
        allChunks: true
      }
    ])
  },

  pwa: {
    name: 'CryptoCapWatch',
    start_url: './index.html',
    display: 'standalone',
    themeColor: '#1372BA',
    msTileColor: '#1372BA',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: 'index.html',
      exclude: [/.*service-worker\.js$/, /.*admin\.html$/]
    }
  },

  configureWebpack: {
    devtool: isEnvDevelopment ? 'eval-source-map' : 'source-map',
    plugins: webpackPlugins,
    output: {
      filename: 'js/[name].js?[hash]',
      chunkFilename: 'js/[name].js?[hash]'
    }
  }
}
