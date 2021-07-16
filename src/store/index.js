import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import account from './modules/account'
import createPersistedState from 'vuex-persistedstate'
import todo from './modules/todo'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'auth',
      storage: window.localStorage,
      paths: ['auth'],
    }),
  ],
  modules: { auth, account, todo },
})

export default store
