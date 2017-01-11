import { mapActions } from 'vuex'

export default {
  name: 'JoinRoom',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['setName']),
    handleChange (event) {
      this.$data.name = event.target.value
    },
    handleSubmit (event) {
      event.preventDefault()
      this.setName(this.$data.name)
      this.$router.push('/chat')
    }
  },
  render (h) {
    const { name } = this.$data
  
    return (
      <div class="container">
        <h2 style="font-family: 'Monoton', cursive;" class="center">CCUDB - CHAT ROOM</h2>
        <form on-submit={ this.handleSubmit } >
          <div class="row">
            <input type='text' on-change={ this.handleChange } value={ name } placeholder="Enter your nickname" />
          </div>
          <div class="row center">
            <button type='submit' class="btn"> Join </button>
          </div>
        </form>
      </div>
    )
  }
}
