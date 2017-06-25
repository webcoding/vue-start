
import { state as stateData } from './state'

export const GET_DATA = 'GET_DATA'
export const ADD_ITEMNUM = 'ADD_ITEMNUM'
export const REMBER_ANSWER = 'REMBER_ANSWER'
export const REMBER_TIME = 'REMBER_TIME'
export const INITIALIZE_DATA = 'INITIALIZE_DATA'
export const GET_USER_INFORM = 'GET_USER_INFORM'

export default {
  [GET_DATA](state, payload) {
    if (payload.res.httpStatusCode === 200) {
      state.itemDetail = payload.res.topiclist
    } else {
      console.log('ajax result is empty, set test data')
      state.itemDetail = stateData.itemDetail
      // state.itemDetail.splice(0, 0, stateData.itemDetail)
      // console.log(state.itemDetail)
    }
  },

  [GET_USER_INFORM](state, payload) {
    state.userId = payload.res.users_id
  },

  [ADD_ITEMNUM](state, payload) {
    state.itemNum += payload.num
    // console.log(state.itemNum)
  },

  [REMBER_ANSWER](state, payload) {
    state.answerid[state.itemNum] = payload.id
  },

  [REMBER_TIME](state) {
    state.timer = setInterval(() => {
      state.allTime++
      console.log(state.allTime)
    }, 1000)
  },

  [INITIALIZE_DATA](state) {
    state.itemNum = 1
    state.allTime = 0
  },
}

