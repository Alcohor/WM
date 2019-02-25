import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import chunks from './chunks'
import user from './user'
import adress from './adress'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        cart,
        chunks,
        user,
        adress
    },

})

export default store