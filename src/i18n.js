import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './languages/en.json'
import vi from './languages/vi.json'
import store from './store'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.auth.lang, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    vi,
  },
})

export default i18n
