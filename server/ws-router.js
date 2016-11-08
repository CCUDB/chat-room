import Router from 'koa-router'
import Pool from './websocket/Pool'
import r from 'rethinkdb'
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

    const conn = await r.connect({db: 'chatroom'})
    const result = await r.table('message').insert({

      'uid': socket.id,
      'content': payload
    }).run(conn)

    if (result) {
      console.log('Insert successfully!')
    }
    conn.close()
  },

  async dump (socket, payload) {
    const conn = await r.connect({db: 'chatroom'})
    const all = await r.table('message').run(conn)
    const allmessage = await all.toArray()

    socket.send(JSON.stringify({
      event:"dump",
      payload:allmessage.map( ( message )=>{
        message.id = message.uid
        message.message = message.content
        return message
      } )
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
