'use strict'
const webpack = require('webpack')
const base = require('./webpack.base')
const DashBoardPlugin = require('webpack-dashboard/plugin')
const _ = require('./utils')
const merge = require('webpack-merge')

module.exports = merge(base, {
  devtool: 'cheap-module-source-map',
  module: {
    // loader for .css file
    rules: [{
      test: /\.css$/,
      loader: _.cssLoader
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashBoardPlugin()
  ]
})
