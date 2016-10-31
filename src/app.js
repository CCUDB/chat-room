import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

if (module.hot) {
  const api = require('vue-hot-reload-api')
  api.install(Vue)
}

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export {app, router, store}
