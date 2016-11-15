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
      <div>
        <form on-submit={ this.handleSubmit }>
          <input type='text' on-change={ this.handleChange } value={ name } />
          <button type='submit'> Join </button>
        </form>
      </div>
    )
  }
}
