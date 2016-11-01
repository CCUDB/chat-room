import Router from 'koa-router'
import Pool from './websocket/Pool'

const router = new Router()
const pool = new Pool()
let id = 0

const actions = {
  register (socket) {
    socket.send(JSON.stringify({
      event: 'register',
      id
    }))
    socket.id = id
    id += 1
  },
  message (socket, payload) {
    console.log(`Socket ${socket.id} emit message: ${payload}`)
    pool.boardcast(JSON.stringify({
      event: 'message',
      id: socket.id,
      message: payload
    }))
  }
}

router.get('/socket', (ctx) => {
  const remove = pool.push(ctx.websocket)
  ctx.websocket.on('message', (content) => {
    const data = JSON.parse(content)
    if (actions[data.event]) {
      actions[data.event](ctx.websocket, data.payload)
    }
  })
  ctx.websocket.on('close', () => {
    console.log(`Remove socket with id ${ctx.websocket.id}`)
    remove()
  })
})

export default router
