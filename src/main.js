import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import VueSimpleAlert from 'vue-simple-alert'
import './styles/extensions/_notification.scss'
import i18n from '@/i18n'
import FlagIcon from 'vue-flag-icon'

import '@/elements'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(Notifications)
Vue.use(VueSimpleAlert)
Vue.use(FlagIcon)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
