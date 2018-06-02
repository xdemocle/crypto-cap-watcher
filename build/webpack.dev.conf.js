'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const env = require('../config/dev.env')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    https: config.dev.https,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: require('html-webpack-template'),
      // Important to be false when used with html-webpack-template
      inject: false,
      mobile: true,
      appMountId: 'app',
      // appMountHtmlSnippet: '<div id="app"></div>',
      title: 'Crypto Cap Watcher',
      links: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      ],
      meta: [],
      headHtmlSnippet: '<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>',
    }),
    new HtmlWebpackPlugin({
      filename: 'static/receiver/index.html',
      template: require('html-webpack-template'),
      // Important to be false when used with html-webpack-template
      inject: false,
      mobile: true,
      appMountId: 'app',
      // appMountHtmlSnippet: '<div id="app"></div>',
      title: 'Crypto Cap Watcher',
      links: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      ],
      meta: [],
      headHtmlSnippet: '<script type="text/javascript" src="https://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"></script>',
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
