import webpack from 'webpack'

function webpackCompiler (webpackConfig, statsFormat) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }

      const jsonStats = stats.toJson()

      if (jsonStats.errors.length > 0) {
        console.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
      } else {
      }
      resolve(jsonStats)
    })
  })
}

export default webpackCompiler
