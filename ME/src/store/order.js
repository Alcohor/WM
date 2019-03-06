import axios from 'axios'
export default {
  namespaced: true,
  state: {
    order: []
  },
  mutations: {
    'SET_ORDER'(state, payload) {
      state.order = payload || []
    }
  },
  actions: {

  },
  getters: {
    order(state) {
      return state.order
    },
    orderCount(state) {
        return state.order.length
    }
  }
    
}
