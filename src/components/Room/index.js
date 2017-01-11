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
    },
    adapter: {
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
    },
    DBTest (fakerdata) {
      for(let i=0; i<fakerdata.length; i++) {
        const data = JSON.stringify({
          event: 'message',
          payload: fakerdata[i]
        })
        this.socket.next(data)
      }
    },
    testLight () {
      const data = JSON.stringify({
        event: 'testdata',
        payload: '10.txt'
      })
      this.socket.next(data)
    },
    testMedium() {
      const data = JSON.stringify({
        event: 'testdata',
        payload: '100.txt'
      })
      this.socket.next(data)
    },
    testLarge () {
      const data = JSON.stringify({
        event: 'testdata',
        payload: '1000.txt'
      })
      this.socket.next(data)
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
        payload: {
          id: vm.name,
          adapter: vm.adapter
        }
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
        } else if (data.event === 'testdata') {
          vm.DBTest(JSON.parse(data.payload))
        }
      }
    })
  },
  updated () {
    const chatroomDiv = document.querySelectorAll('.chatroom')
    
    if(this.adapter == 'rethinkdb') {
      chatroomDiv[0].scrollTop = chatroomDiv[0].scrollHeight
    } else {
      chatroomDiv[1].scrollTop = chatroomDiv[1].scrollHeight
    }
  },
  render (h) {
    const { name } = this

    return (
      <div>
        <h3 style="font-family: 'Monoton', cursive;" class="center">{ this.adapter }</h3>

        <div class="row">
          <div class="col s2">
            <h5>Score:</h5>
          </div>
          <div class="col s2">
          </div>
          <div class="col s2">
          </div>
        </div>
        <div class="row">
          <div class="col s4 center">
            <button class="btn red lighten-4" on-click={ this.testLight }>Light</button>
          </div>
          <div class="col s4 center">
            <button class="btn red" on-click={ this.testMedium }>Medium</button>
          </div>
          <div class="col s4 center">
            <button class="btn red darken-4" on-click={ this.testLarge }>Large</button>
          </div>
        </div>
        <form on-submit={ this.handleSubmit }>
          <div class="row">
            <input
             type='text'
             domProps-value={ this.message }
             on-input={ this.handleChange } />
          </div>
          <div class="row center">
            <button type='submit' class="btn"> Send </button>
          </div>
        </form>
        <div class="row">
          <div class="col s12">
            <p><b>Data Amount:</b>{this.$data.messages.length}</p>
          </div>
          <div class="chatroom" style="
            height: 300px;
            width: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
          ">
          {
            this.$data.messages.map((msg) => (
              ((msg.id  == name )
              && (
                <div class="row right-align">
                  <div class="col offset-s6 s4">{ msg.message }</div>
                  <div class="col s1"><b>{ msg.id }</b></div>
                </div>
              ))
              || (
                <div class="row left-align">
                  <div class="col offset-s1"></div>
                  <div class="col s1"><b>{ msg.id }</b></div>
                  <div class="col s4">{ msg.message }</div>
                </div>
              )
            ))
          }
          </div>
        </div>
      </div>
    )
  }
}
