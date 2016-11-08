import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  name: ''
}

const mutations = {
  SET_NAME (state, payload) {
    state.name = payload
  }
}

const actions = {
  setName ({ commit }, payload) {
    commit('SET_NAME', payload)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
