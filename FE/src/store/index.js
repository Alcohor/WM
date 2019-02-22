import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import chunks from './chunks'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        cart,
        chunks
    },

})

export default store