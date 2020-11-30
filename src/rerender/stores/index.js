import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function initStore () {
  return new Vuex.Store({
    state: {
      login: false
    },
    mutations: {
      setLogin(state, bool) {
        state.login = bool
      }
    },
    actions: {
      setLogin(store, bool) {
        setTimeout(() => {
          store.commit('setLogin', bool)
        }, 2000);
      }
    }
  })
}

export default initStore