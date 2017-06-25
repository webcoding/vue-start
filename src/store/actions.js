// import ajax from '../services/ajax'

// 注意 import 和 export 的使用
// 参见 http://es6.ruanyifeng.com/#docs/module

import * as types from './types'
// import ajaxApi from './api'
console.log(types)
// console.log(ajaxApi)

export default {
  // addNum({ commit, state }, id) {
  //   commit('REMBER_ANSWER', { id })
  //   if (state.itemNum < state.itemDetail.length) {
  //     commit('ADD_ITEMNUM', {
  //       num: 1,
  //     })
  //   }
  // },

  // async getData ({ commit, state }) {
  //   const res = await ajaxApi.getItemDetail()
  //   setTimeout(function () {
  //     console.log('api 再延迟 1s')
  //     commit('GET_DATA', {
  //       res,
  //     })
  //   }, 2000)
  // },

  // initializeData({ commit }) {
  //   commit('INITIALIZE_DATA')
  // },
}
