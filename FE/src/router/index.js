import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import AppHome from '@pages/home/AppHome'
import Order from '@pages/order/Order'
import Mine from '@pages/mine/Mine'

import Detail from '@pages/detail/Detail'
import Login from '@pages/Login'
import Regist from '@pages/Regist'
import FoodsList from '@c/layout/FoodsList'
import CommentList from '@c/layout/CommentList'
import RestIntro from '@c/layout/RestIntro'
import EditUserInfo from '@pages/EditUserInfo'
import MyAdress from '@pages/MyAdress'
import CartPage from '@pages/CartPage'
import Complaint from '@pages/Complaint'
import Assessment from '@pages/Assessment'

const routes = [
    {
        path:'/',
        redirect:{name:'home'}
    },
    {
        path:'/regist',
        name:'regist',
        component: Regist
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/user-info',
        name:'user-info',
        component: EditUserInfo
    },
    {
        path:'/cart',
        name:'cart',
        component: CartPage
    },
    {
        path:'/adress',
        name:'adress',
        component: MyAdress
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
        path:'assessment',
        name:'assessment',
        component:Assessment
    },
    {
        path:'complaint',
        name:'complaint',
        component:Complaint
    },
    {
        path:'/mine',
        name:'mine',
        component : Mine,
    },
    {
        path:'/detail/:shopId',
        name:'detail',
        component : Detail,
        props: true,
        children:[
            {path:'foods-list/:shopId',name:'foods-list', component : FoodsList},
            {path:'comment-list/:shopId',name:'comment-list',component : CommentList},
            {path:'rest-introduce/:shopId',name:'rest-introduce',component : RestIntro}
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
