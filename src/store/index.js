import Vue from 'vue'
import Vuex from 'vuex'
import Env from '../setting/env'
import state from './state'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: Env.debug,
    state,
    // actions,
    // mutations,
    // getters,
    modules,
  })
}
