import login from './modules/login'
import register from './modules/register'
import logout from './modules/logout'
import profile from './modules/profile'
import languages from './modules/languages'
const account = {
  namespaced: true,
  modules: { login, register, logout, profile, languages },
}

export default account
