import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import AppHome from '@pages/home/AppHome'
import Order from '@pages/order/Order'
import Mine from '@pages/mine/Mine'

import Detail from '@pages/detail/Detail'
import FoodsList from '@c/layout/FoodsList'
import CommentList from '@c/layout/CommentList'
import RestIntro from '@c/layout/RestIntro'

const routes = [
    {
        path:'/',
        redirect:{name:'home'}
    },
    {
        path:'/home',
        name:'home',
        component : AppHome,
    },
    {
        path:'/order',
        name:'order',
        component : Order,
    },
    {
        path:'/mine',
        name:'mine',
        component : Mine,
    },
    {
        path:'/detail/:id',
        name:'detail',
        component : Detail,
        props: true,
        children:[
            {path:'foods-list',name:'foods-list', component : FoodsList},
            {path:'comment-list',name:'comment-list',component : CommentList},
            {path:'rest-introduce',name:'rest-introduce',component : RestIntro}
      ]

    }
]

// 路由工具
const router = new VueRouter({
    mode: 'history', // hash
    // base: '/app/',
    routes,
   
})


export default router
