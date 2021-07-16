import Vue from 'vue'

import BaseButton from './BaseButton.vue'
import BaseInputNumber from './BaseInputNumber.vue'
import BaseInputText from './BaseInputText.vue'
import BaseInputPassword from './BaseInputPassword.vue'
import Navigation from './Navigation.vue'
import Loader from './Loader.vue'
import todoItem from './todoItem.vue'

const comps = {
  BaseButton,
  BaseInputNumber,
  BaseInputPassword,
  BaseInputText,
  Navigation,
  Loader,
  todoItem,
}
for (const key in comps) Vue.component(key, comps[key])
