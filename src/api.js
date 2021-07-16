import Axios from 'axios'
import store from './store'

const baseURL = process.env.VUE_APP_BASE_API_URL
const api = Axios.create({ baseURL: baseURL })
api.interceptors.request.use(
  config => {
    const token = store.state.auth.accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
