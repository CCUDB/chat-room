'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.base')
const _ = require('./utils')
const config = require('./config')
const merge = require('webpack-merge')

module.exports = merge(base, {
  entry: {
    // a white list to add dependencies to vendor chunk
    vendor: config.vendor
  },
  output: {
    // use hash filename to support long-term caching
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue',
      options: {
        loaders: {
          // extract css in single-file components
          css: ExtractTextPlugin.extract({
            loader: 'css-loader?-autoprefixer',
            fallbackLoader: 'vue-style-loader'
          })
        }
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: _.cssLoader,
        fallbackLoader: 'style-loader'
      })
    }]
  },
  // add webpack plugins
  plugins: [
    new ExtractTextPlugin('styles.[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    // extract vendor chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash:8].js'
    })
  ]
})

module.exports = base
