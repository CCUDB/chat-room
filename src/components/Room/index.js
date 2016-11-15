import observableSocket from 'observable-socket'

const makeSocket = (onOpen) => {
  const socket = new WebSocket('ws://localhost:3000/socket')
  socket.addEventListener('open', onOpen)
  return observableSocket(socket)
}

export default {
  name: 'Room',
  data () {
    return {
      message: '',
      users: {},
      messages: []
    }
  },
  props: {
    name: {
      type: String
    }
  },
  methods: {
    handleChange (event) {
      this.message = event.target.value
    },
    handleSubmit (event) {
      event.preventDefault()
      const message = this.$data.message
      const data = JSON.stringify({
        event: 'message',
        payload: message
      })
      this.socket.next(data)
      this.message = ''
    }
  },
  mounted () {
    const vm = this
    if (!vm.name) {
      vm.$router.replace('/')
      return
    }
    const socket = makeSocket((event) => {
      event.target.send(JSON.stringify({
        event: 'register',
        payload: vm.name
      }))

      event.target.send(JSON.stringify({
        event: 'dump'
      }))
    })
    this.socket = socket
    socket.subscribe({
      next (content) {
        const data = JSON.parse(content)
        if (data.event === 'message') {
          vm.$data.messages.push({
            id: data.id,
            message: data.message
          })
        } else if (data.event === 'dump') {
          vm.$data.messages = data.payload
        }
      }
    })
  },
  render (h) {
    const { name } = this
    return (
      <div class="page">
        <span> Name: { name } </span>
        <form on-submit={ this.handleSubmit }>
          <input
            type='text'
            domProps-value={ this.message }
            on-input={ this.handleChange } />
          <button type='submit'> Send </button>
        </form>
        <div>
          {
            this.$data.messages.map((msg) => (
              <div>{ msg.id }: { msg.message }</div>
            ))
          }
        </div>
      </div>
    )
  }
}
