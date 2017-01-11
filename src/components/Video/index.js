import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.headers.common['Authorization'] = 'http://localhost:8000'

export default {
  name: 'Video',
  render (h) {
    return (
      <div class="container">
        <h3 style="font-family: 'Monoton', cursive;" class="center">VIDEO</h3>

        <div class="row center">
          <video controls style="height: 70vh; width: 70vw; margin: 0 auto;">
            <source src="http://localhost:8000/video_test_backend.php?action=play"></source>
            <p>Browser not support</p>
          </video>
        </div>
      </div>
    )
  }
}
