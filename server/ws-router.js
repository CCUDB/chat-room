import Router from 'koa-router'
import Pool from './websocket/Pool'
import { rethinkdb , eazydb } from './adapter'
import Fs from 'fs'

const router = new Router()
const pool = new Pool()
const adapters = {
  rethinkdb,
  eazydb
}

const actions = {
  register (socket, { adapter, id }) {
    socket.id = id
    socket.adapter = adapter
  },

  async message (socket, payload) {
    console.log(`Socket ${socket.id} emit message: ${payload}`)
    const adapter = adapters[socket.adapter]
    pool.boardcast(JSON.stringify({
      event: 'message',
      id: socket.id,
      message: payload
    }))

    const result = await adapter.insertChat(socket.id, payload)

    if (result) {
      console.log('Insert successfully!')
    }
  },

  async dump (socket, payload) {
    const adapter = adapters[socket.adapter]
    const allmessage = await adapter.dumpChat()

    socket.send(JSON.stringify({
      event: 'dump',
      payload: allmessage.map((message) => {
        message.id = message.uid
        message.message = message.content
        return message
      })
    }))
  },
  
  async testdata (socket, payload) {
    Fs.readFile(`./fakerdata/${payload}`, 'utf-8', (err, data) => {
      console.log(`get testdata success filename is ${payload}`)

      socket.send(JSON.stringify({
        event: 'testdata',
        payload: data
      }))
    })
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
