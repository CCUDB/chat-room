'use strict'
const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'Chat room',
  vendor: Object.keys(pkg.dependencies),
  babel: {
    babelrc: false,
    presets: [
      ['modern-async', {
        promise: 'bluebird',
        esModules: true,
        stage: 0,
        'fast-async': {
          compiler: {
            promises: true,
            generators: false
          },
          useRuntimeModule: true
        }
      }]
    ],
    plugins: [
      'transform-vue-jsx',
      'dedent'
    ]
  },
  postcss: [
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('postcss-nested')
  ],
  cssModules: true,
  jsx: true
}
