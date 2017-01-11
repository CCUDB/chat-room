import Room from 'components/Room'
export default {
  name: 'Chat',
  render (h) {
    return (
      <div class="container">
        <h2 style="font-family: 'Monoton', cursive;" class="center">CCUDB - CHAT ROOM</h2>

        <div class="row">
         <div class="col s5">
           <Room name={ this.$store.state.name } adapter='rethinkdb' />
         </div>
         <div class="col s5 offset-s2">
           <Room name={ this.$store.state.name } adapter='eazydb' />
         </div>
       </div>
      </div>
    )
  }
}
