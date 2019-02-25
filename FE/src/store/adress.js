export default {
  namespaced: true,
  state: {
    locat:{},
    precise:''
  },
  mutations: {
    'SET_LOCAT': (state, payload) => {
      state.locat = payload
    },
    'SET_PRECISE': (state, payload) => {
      state.precise = payload
    }
  },
  getters: {
    getLocat(state) {
      return state.locat
    },
    getPrecise(state) {
      return state.precise
    },
    fullAdress(state) {
      if(!Object.keys(state.locat).length)
      {return state.precise}
      let adress = (state.locat.province.value +
        state.locat.city.value +
        state.locat.area.value+
        state.precise)
      return adress
    }
  }
}