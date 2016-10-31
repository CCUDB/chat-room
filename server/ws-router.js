import Router from 'koa-router'

const router = new Router()

router.get('/socket', (ctx) => {
  ctx.websocket.send('Ping')
  ctx.websocket.on('message', (message) => {
    if (message === 'Pong') {
      setTimeout(() => ctx.websocket.send('Ping'), 1000)
    }
  })
})

export default router
