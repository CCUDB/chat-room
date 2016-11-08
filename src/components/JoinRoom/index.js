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
    handleClick (event) {
      event.preventDefault()
      this.setName(this.$data.name)
      this.$router.push('/chat')
    }
  },
  render (h) {
    const { name } = this.$data

    return (
      <div>
        <input type='text' on-change={ this.handleChange } value={ name } />
        <button on-click={ this.handleClick }> Join </button>
      </div>
    )
  }
}
