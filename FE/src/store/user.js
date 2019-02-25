import axios from 'axios';
import { mutations } from './adress'
export default {
  namespaced: true,
  state: {
    userInfo: {
      nickName: '',
      userName: '',
      adress: '',
      userId: '',
      phone: '',
      avatar: ''
    }
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      payload= !payload? {} : payload
      state.userInfo = Object.assign(state.userInfo, payload)
    }
    },
  actions: {
    GET_USER_INFO(ctx) {
      axios.get('/be/m/api/admin/user-info').then(data => {
        let userInfo = data.data.data[0];
        ctx.commit('SET_USER_INFO', userInfo);
        mutations.SET_LOCAT(userInfo.adress.locat)
      });
    }
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    }
  }
};
