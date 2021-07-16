import Vue from 'vue'
import Router from 'vue-router'

import MainWrapper from '@/layouts/MainWrapper'
import BaseWrapper from '@/layouts/BaseWrapper'

import LoginPage from '@/views/account/LoginPage'
import RegisterPage from '@/views/account/RegisterPage'

import TodoListPage from '@/views/main/todo/TodoListPage'
import ProfilePage from '@/views/account/ProfilePage'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  history: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'dashboard',
      component: MainWrapper,
      redirect: { name: 'todos' },
      children: [
        {
          path: '/todos',
          name: 'todos',
          component: BaseWrapper,
          meta: { requiresAuth: true },
          redirect: { name: 'todoList' },
          children: [{ path: '', name: 'todoList', component: TodoListPage }],
        },
        {
          path: '/login',
          name: 'login',
          meta: { requiresVisit: true },
          component: LoginPage,
        },
        {
          path: '/register',
          name: 'register',
          meta: { requiresVisit: true },
          component: RegisterPage,
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfilePage,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.getters['auth/isLoggedIn']
  ) {
    next({ name: 'login' })
  } else if (
    to.matched.some(record => record.meta.requiresVisit) &&
    store.getters['auth/isLoggedIn']
  ) {
    next({ name: 'todos' })
  } else {
    next()
  }
})
export default router
