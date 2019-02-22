import Cookies from 'js-cookie'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    userInfo:{
      nickName: "",
      userName: "",
      userType: null,
      userid: ""
    }
  },
  mutations: {
    'SET_USER_INFO'(state, payload){
      state.userInfo = payload
    }
  },
  actions: {
    'GET_USER_INFO'(ctx){
      axios.get('/be/api/users/userInfo').then(
        data => {
          let userInfo = data.data.data
          ctx.commit('SET_USER_INFO', userInfo)
        }
      )
    }
  },
  getters: {
    userInfo(state){
      return state.userInfo
    }
  }
    
}
