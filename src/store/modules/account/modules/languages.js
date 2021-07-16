const state = () => ({})

const getters = {}

const actions = {
  changeLanguage({ commit }, payload) {
    commit('auth/ON_LANG_CHANGED', payload, { root: true })
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
