import { remove } from 'lodash'

class Pool {
  register (websocket) {
    this.sockets.push(websocket)
    return () => {
      remove(this.sockets, websocket)
    }
  }

  boardcast (msg) {
    this.sockets.forEach((socket) => {
      socket.send(msg)
    })
  }

  sockets = []
}

export default Pool
