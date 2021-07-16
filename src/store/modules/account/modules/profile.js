import api from '@/api.js'
const state = () => ({})

const getters = {}

const actions = {
  async uploadAvatar({ commit }, data) {
    commit('auth/LOADER', true, { root: true })
    const formData = new FormData()
    formData.append('avatar', data)
    try {
      await api.post('user/me/avatar', formData)
      commit('auth/LOADER', false, { root: true })
      return true
    } catch (error) {
      commit('auth/LOADER', false, { root: true })
      return false
    }
  },
  async getAvatar({ commit }, id) {
    commit('auth/LOADER', true, { root: true })
    try {
      let response = await api.get(`user/${id}/avatar`)
      commit('auth/GET_IMAGE', response.config.url, { root: true })
      commit('auth/LOADER', false, { root: true })
      return true
    } catch (error) {
      commit('auth/LOADER', false, { root: true })
      return false
    }
  },
  async updateInformation({ commit }, data) {
    commit('auth/LOADER', true, { root: true })
    try {
      let response = await api.put('user/me', data)
      const userData = response.data.data
      commit('auth/LOADER', false, { root: true })
      commit('auth/SET_CURRENT_USER', userData, { root: true })
      return true
    } catch (error) {
      commit('auth/LOADER', false, { root: true })
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
