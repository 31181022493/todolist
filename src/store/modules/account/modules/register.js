import api from '@/api.js'

const state = () => ({})

const getters = {}

const actions = {
  async registerUser({ commit }, registrationInfo) {
    commit('auth/LOADER', true, { root: true })
    try {
      let response = await api.post('user/register', registrationInfo)
      let user = response.data.user
      let token = response.data.token
      commit('auth/SET_CURRENT_USER', user, { root: true })
      commit('auth/SET_CURRENT_TOKEN', token, { root: true })
      commit('auth/LOADER', false, { root: true })
      return true
    } catch (error) {
      commit('auth/LOADER', false, { root: true })
      error.response.data =
        'This email is already registered, please use another email'
      commit('auth/ERROR_REGISTER', error.response.data, { root: true })
      return false
    }
  },
}

const mutations = {}

export default {
  namespaced: true,
  state: state(),
  actions,
  mutations,
  getters,
}
