import api from '@/api.js'
const state = () => ({})

const getters = {}

const actions = {
  async logOutUser({ commit }) {
    try {
      await api.post('user/logout')
      commit('auth/RESET_USER', null, { root: true })
      return true
    } catch (error) {
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
