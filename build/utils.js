'use strict'
const path = require('path')
const config = require('./config')

const _ = module.exports = {}

_.cssLoader = config.cssModules
  ? 'style!css?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  : 'style!css?-autoprefixer'

_.outputPath = path.join(__dirname, '../static')

_.outputIndexPath = path.join(__dirname, '../static/index.html')
