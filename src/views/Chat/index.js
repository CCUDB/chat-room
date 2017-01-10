import Room from 'components/Room'
export default {
  name: 'Chat',
  render (h) {
    return (
      <div>
        <Room name={ this.$store.state.name } adapter='rethinkdb' />
        <Room name={ this.$store.state.name } adapter='eazydb' />
      </div>
    )
  }
}
