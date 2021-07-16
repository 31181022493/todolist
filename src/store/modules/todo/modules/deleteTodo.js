import api from '@/api.js'
const state = () => ({
  loading: false,
  todos: [],
})

const getters = {}

const actions = {
  async deleteTodoItem({ commit }, deleteInfor) {
    commit('todo/getList/LOADER', true, { root: true })
    try {
      let response = await api.delete(`task/${deleteInfor.id}`)
      commit('todo/getList/DELETE_TASK', response.data.data, { root: true })
      commit('todo/getList/LOADER', false, { root: true })
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
