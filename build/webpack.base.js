'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/main.js'
    ]
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    modules: [
      path.join(__dirname, '../src'),
      'node_modules'
    ],
    alias: {
      components: path.join(__dirname, '../src/components')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/],
      options: config.babel
    }, {
      test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      options: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: config.postcss
      }
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      template: path.join(__dirname, '../src/index.html'),
      filename: _.outputIndexPath
    })
  ],
  target: 'web'
}
