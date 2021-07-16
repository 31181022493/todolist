const state = () => ({
  accessToken: '',
  user: null,
  loading: false,
  notification: '',
  disableBtn: false,
  imgUrl: '',
  lang: '',
})

const getters = {
  isLoggedIn: state => state.accessToken !== '',
}

const actions = {}

const mutations = {
  ON_LANG_CHANGED(state, payload) {
    payload.i18n.locale = payload.lang
    state.lang = payload.lang
  },
  SET_CURRENT_USER(state, user) {
    state.user = user
  },
  SET_CURRENT_TOKEN(state, token) {
    state.accessToken = token
  },
  RESET_USER(state) {
    state.accessToken = ''
    state.user = ''
  },
  LOADER(state, payload) {
    state.loading = payload
  },
  ERROR_REGISTER(state, error) {
    state.notification = error
  },
  ERROR_LOGIN(state, error) {
    state.notification = error
  },
  DISABLE_BUTTON(state, status) {
    state.disableBtn = status
  },
  GET_IMAGE(state, url) {
    state.imgUrl = url
  },
}

export default {
  namespaced: true,
  state: state(),
  actions,
  mutations,
  getters,
}
