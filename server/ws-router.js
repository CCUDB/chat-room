import Router from 'koa-router'
import Pool from './websocket/Pool'
import { insertChat, dumpChat } from './adapter'

const router = new Router()
const pool = new Pool()

const actions = {
  register (socket, payload) {
    socket.id = payload
  },

  async message (socket, payload) {
    console.log(`Socket ${socket.id} emit message: ${payload}`)
    pool.boardcast(JSON.stringify({
      event: 'message',
      id: socket.id,
      message: payload
    }))

    const result = await insertChat(socket.id, payload)

    if (result) {
      console.log('Insert successfully!')
    }
  },

  async dump (socket, payload) {
    const allmessage = await dumpChat()

    socket.send(JSON.stringify({
      event: 'dump',
      payload: allmessage.map((message) => {
        message.id = message.uid
        message.message = message.content
        return message
      })
    }))
  }
}

router.get('/socket', (ctx) => {
  const remove = pool.register(ctx.websocket)
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
