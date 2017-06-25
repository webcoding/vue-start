
import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录

// const Storage = window.sessionStorage
const Storage = window.localStorage

export default {
  state: JSON.parse(Storage.getItem('user')) || {},
  mutations: {
    [USER_SIGNIN](state, user) {
      Storage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
    },
    [USER_SIGNOUT](state) {
      Storage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    },
  },
  actions: {
    [USER_SIGNIN]({ commit }, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({ commit }) {
      commit(USER_SIGNOUT)
    },
  },
}
