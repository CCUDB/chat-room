import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Chat from '../views/Chat'
import Video from '../views/Video'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/chat',
    component: Chat
  }, {
    path: '/',
    component: Home
  }, {
    path: '/video',
    component: Video
  }]
})
