import Counter from 'components/Counter'
import observableSocket from 'observable-socket'

export default {
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    const socket = observableSocket(new WebSocket('ws://localhost:3000/socket'))
    const vm = this
    socket.subscribe({
      next (msg) {
        console.log(msg)
        if (msg === 'Ping') {
          setTimeout(() => socket.next('Pong'), 1000)
          vm.$data.count += 1
        }
      }
    })
  },
  render (h) {
    return (
      <div class="page">
        <Counter />
        <p>
          Ping-pong: { this.$data.count } time(s) test
        </p>
      </div>
    )
  }
}
