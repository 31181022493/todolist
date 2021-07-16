import api from '@/api.js'
const state = () => ({
  loading: false,
  todos: [],
})

const getters = {}

const actions = {
  async addTodoItem({ commit }, todoItem) {
    commit('todo/getList/LOADER', true, { root: true })
    try {
      let response = await api.post('task', todoItem)
      commit('todo/getList/ADD_TODO_ITEM', response.data, { root: true })
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
