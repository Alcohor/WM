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
    },
    newOrder(state) {
      let orderList = state.order.filter(order => {
        return order.status === 0
      })
      return orderList
    },
    progressOrder(state) {
      let orderList = state.order.filter(order => {
        return order.status === 1
      })
      return orderList
    },
    completedOrder(state) {
      let orderList = state.order.filter(order => {
        return order.status === 2
      })
      return orderList
    }
  }
    
}
