import 'babel-polyfill'
import path from 'path'
import webpack from 'webpack'
import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'
import convert from 'koa-convert'
import webpackConfig from './build/webpack.dev'
import Koa from 'koa'
import serve from 'koa-static'
import websocketify from 'koa-websocket'
import wsRouter from './server/ws-router'

const app = websocketify(new Koa())
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.entry.app = [
    ...webpackConfig.entry.app,
    'webpack-hot-middleware/client?noInfo=false&reload=true'
  ]
}

const compiler = webpack(webpackConfig)

app.ws.use(wsRouter.routes())

app.use(convert(devMiddleware(compiler, {
  noInfo: false,
  quiet: false,
  historyApiFallback: true,
  publicPath: '/',
  stats: {
    colors: true
  }
})))

if (process.env.NODE_ENV !== 'production') {
  app.use(convert(hotMiddleware(compiler, {})))
}

app.use(serve(path.join(__dirname, 'static')))

app.listen(port)
console.log(`App start at ${port}`)
