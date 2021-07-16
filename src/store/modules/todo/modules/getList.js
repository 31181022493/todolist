import api from '@/api.js'
const state = () => ({
  loading: false,
  todos: [],
})

const getters = {
  all(state) {
    return state.todos
  },
  progress(state) {
    return state.todos.filter(function(item) {
      return !item.completed
    })
  },
  done(state) {
    return state.todos.filter(function(item) {
      return item.completed
    })
  },
}

const actions = {
  async getList({ commit }) {
    commit('LOADER', true)
    try {
      let response = await api.get('task')
      commit('GET_LIST', response.data.data)
      commit('LOADER', false)
      return true
    } catch (error) {
      commit('LOADER', false)
      return false
    }
  },
}

const mutations = {
  LOADER(state, payload) {
    state.loading = payload
  },
  GET_LIST(state, data) {
    state.todos = data.reverse()
  },
  ADD_TODO_ITEM(state, todoItem) {
    state.todos.unshift(todoItem.data)
  },
  UPDATE_TASK(state, payload) {
    const index = state.todos.findIndex(todo => todo._id === payload._id)
    state.todos.splice(index, 1, payload)
  },
  DELETE_TASK(state, payload) {
    const index = state.todos.findIndex(todo => todo.id === payload.id)
    state.todos.splice(index, 1)
  },
}

export default {
  namespaced: true,
  state: state(),
  actions,
  mutations,
  getters,
}
