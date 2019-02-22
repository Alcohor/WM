import axios from 'axios'
export default {
  namespaced: true,
  state: {
    shopId:''
  },
  mutations: {
    'SET_SHOP_ID'(state, payload) {
      state.shopId = payload || ''
    }
  },
  actions: {
    'GET_SHOP_ID'(ctx) {
      axios.get('/be/api/shop/id').then(
        data => {
          let id = data.data.data
          ctx.commit('SET_SHOP_ID', id)
        }
      )
    }
  },
  getters: {
    shopId(state) {
      return state.shopId
    }
  }
    
}
