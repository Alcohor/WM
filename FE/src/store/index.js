import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import chunks from './chunks'
import user from './user'
import adress from './adress'
import order from './order'

Vue.use(Vuex) 

const store = new Vuex.Store({
    modules: {
        cart,
        chunks,
        user,
        adress,
        order
    },

})

export default store