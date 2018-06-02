'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new VueLoaderPlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // filename: process.env.NODE_ENV === 'testing'
      //   ? 'index.html'
      //   : config.build.index,
      filename: 'index.html',
      template: require('html-webpack-template'),
      inject: false,
      mobile: true,
      links: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        {
          href: '/favicon.ico',
          rel: 'shortcut icon'
        },
        {
          href: '/manifest.json',
          rel: 'manifest'
        },
        {
          href: '/static/android-icon-192x192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          href: '/static/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          href: '/static/favicon-96x96.png',
          rel: 'icon',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          href: '/static/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          href: '/static/apple-icon-57x57.png',
          rel: 'apple-touch-icon',
          sizes: '57x57'
        },
        {
          href: '/static/apple-icon-60x60.png',
          rel: 'apple-touch-icon',
          sizes: '60x60'
        },
        {
          href: '/static/apple-icon-72x72.png',
          rel: 'apple-touch-icon',
          sizes: '72x72'
        },
        {
          href: '/static/apple-icon-76x76.png',
          rel: 'apple-touch-icon',
          sizes: '76x76'
        },
        {
          href: '/static/apple-icon-114x114.png',
          rel: 'apple-touch-icon',
          sizes: '114x114'
        },
        {
          href: '/static/apple-icon-120x120.png',
          rel: 'apple-touch-icon',
          sizes: '120x120'
        },
        {
          href: '/static/apple-icon-144x144.png',
          rel: 'apple-touch-icon',
          sizes: '144x144'
        },
        {
          href: '/static/apple-icon-152x152.png',
          rel: 'apple-touch-icon',
          sizes: '152x152'
        },
        {
          href: '/static/apple-icon-180x180.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        }
      ],
      appMountId: 'app',
      // appMountHtmlSnippet: '<div id="app"></div>',
      title: 'Crypto Cap Watcher | A tool for monitoring crypto currencies global market capitalization and Bitcoin data',
      meta: [
        {
          name: 'description',
          content: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.'
        },
        {
          name: 'canonical',
          content: 'https://cryptocap.watch'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Crypto Cap Watcher'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: '#ffffff'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        },
        {
          name: 'msapplication-TileColor',
          content: '#ffffff'
        },
        {
          name: 'msapplication-TileImage',
          content: '/static/ms-icon-144x144.png'
        },
        {
          name: 'og:title',
          content: 'Crypto Cap Watcher'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:image',
          content: 'https://cryptocap.watch/static/android-icon-192x192.png'
        },
        {
          name: 'og:url',
          content: 'https://cryptocap.watch/'
        },
        {
          name: 'og:description',
          content: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:url',
          content: 'https://cryptocap.watch/'
        },
        {
          name: 'twitter:title',
          content: 'Crypto Cap Watcher'
        },
        {
          name: 'twitter:description',
          content: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.'
        },
        {
          name: 'twitter:image',
          content: 'https://cryptocap.watch/static/android-icon-192x192.png'
        }
      ],
      bodyHtmlSnippet: '<noscript>Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.</noscript><script>(function() { if(\'serviceWorker\' in navigator) { navigator.serviceWorker.register(\'/service-worker.js\'); }})();</script>',
      headHtmlSnippet: '<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script><script async src="https://www.googletagmanager.com/gtag/js?id=UA-63832089-2"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'UA-63832089-2\');</script>',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      // filename: process.env.NODE_ENV === 'testing'
      //   ? 'index.html'
      //   : config.build.index,
      filename: 'receiver.html',
      template: require('html-webpack-template'),
      inject: false,
      mobile: true,
      links: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        {
          href: '/favicon.ico',
          rel: 'shortcut icon'
        },
        {
          href: '/manifest.json',
          rel: 'manifest'
        },
        {
          href: '/static/android-icon-192x192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          href: '/static/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          href: '/static/favicon-96x96.png',
          rel: 'icon',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          href: '/static/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          href: '/static/apple-icon-57x57.png',
          rel: 'apple-touch-icon',
          sizes: '57x57'
        },
        {
          href: '/static/apple-icon-60x60.png',
          rel: 'apple-touch-icon',
          sizes: '60x60'
        },
        {
          href: '/static/apple-icon-72x72.png',
          rel: 'apple-touch-icon',
          sizes: '72x72'
        },
        {
          href: '/static/apple-icon-76x76.png',
          rel: 'apple-touch-icon',
          sizes: '76x76'
        },
        {
          href: '/static/apple-icon-114x114.png',
          rel: 'apple-touch-icon',
          sizes: '114x114'
        },
        {
          href: '/static/apple-icon-120x120.png',
          rel: 'apple-touch-icon',
          sizes: '120x120'
        },
        {
          href: '/static/apple-icon-144x144.png',
          rel: 'apple-touch-icon',
          sizes: '144x144'
        },
        {
          href: '/static/apple-icon-152x152.png',
          rel: 'apple-touch-icon',
          sizes: '152x152'
        },
        {
          href: '/static/apple-icon-180x180.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        }
      ],
      appMountId: 'app',
      // appMountHtmlSnippet: '<div id="app"></div>',
      title: 'Crypto Cap Watcher | A tool for monitoring crypto currencies global market capitalization and Bitcoin data',
      meta: [
        {
          name: 'description',
          content: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.'
        },
        {
          name: 'canonical',
          content: 'https://cryptocap.watch'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Crypto Cap Watcher'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: '#ffffff'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        },
        {
          name: 'msapplication-TileColor',
          content: '#ffffff'
        },
        {
          name: 'msapplication-TileImage',
          content: '/static/ms-icon-144x144.png'
        },
        {
          name: 'og:title',
          content: 'Crypto Cap Watcher'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:image',
          content: 'https://cryptocap.watch/static/android-icon-192x192.png'
        },
        {
          name: 'og:url',
          content: 'https://cryptocap.watch/'
        },
        {
          name: 'og:description',
          content: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:url',
          content: 'https://cryptocap.watch/'
        },
        {
          name: 'twitter:title',
          content: 'Crypto Cap Watcher'
        },
        {
          name: 'twitter:description',
          content: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.'
        },
        {
          name: 'twitter:image',
          content: 'https://cryptocap.watch/static/android-icon-192x192.png'
        }
      ],
      bodyHtmlSnippet: '<noscript>Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.</noscript><script>(function() { if(\'serviceWorker\' in navigator) { navigator.serviceWorker.register(\'/service-worker.js\'); }})();</script>',
      headHtmlSnippet: '<script type="text/javascript" src="https://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"></script><script async src="https://www.googletagmanager.com/gtag/js?id=UA-63832089-2"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'UA-63832089-2\');</script>',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../CNAME'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../robots.txt'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../humans.txt'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static/manifest.json'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static/favicon.ico'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      }
    ]),

    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'crypto-cap-watcher',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: 'cacheFirst'
        }]
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
