import Room from 'components/Room'
export default {
  name: 'Chat',
  render (h) {
    return (
      <Room name={ this.$store.state.name } />
    )
  }
}
