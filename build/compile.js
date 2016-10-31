import webpack from './webpack-compiler'
import config from './webpack.dev'

(async () => {
  try {
    await webpack(config)
  } catch (err) {
    console.error(err.message)
    console.error(err)
  }
})()
