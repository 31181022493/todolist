import api from '@/api.js'
const state = () => ({})

const getters = {}

const actions = {
  async updateTodoItem({ commit }, updateInfor) {
    commit('todo/getList/LOADER', true, { root: true })
    try {
      const payload = {
        description: updateInfor.description,
        completed: updateInfor.completed,
      }
      let response = await api.put(`task/${updateInfor.id}`, payload)
      commit('todo/getList/UPDATE_TASK', response.data.data, { root: true })
      commit('todo/getList/LOADER', false, { root: true })
      return true
    } catch (error) {
      commit('todo/getList/LOADER', false, { root: true })
      return false
    }
  },
}

const mutations = {
  LOADER(state, payload) {
    state.loading = payload
  },
}

export default {
  namespaced: true,
  state: state(),
  actions,
  mutations,
  getters,
}
