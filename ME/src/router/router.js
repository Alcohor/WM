import Main from '@/views/layout/Main'
import Login from '@/views/Login'

// 不作为Main组件的子页面展示的页面
export const loginRouter = {
    path: '/login',
    name: 'login',
    component: resolve => { require(['@/views/Login'], resolve); },
    meta: { isLogin: false, isAuth: false },
};
export const registeRouter = {
    path: '/registe',
    name: 'regist',
    component: resolve => { require(['@/views/Registe'], resolve); },
    meta: { isLogin: false, isAuth: false },
};
export const page404Router = {
    path: '*',
    name: '404',
    component: resolve => { require(['@/views/404'], resolve); },
    meta: { isLogin: false, isAuth: false }
};

//作为Main组件的子页面展示的页面
export const appRouter = [
    {
        path: '/',
        name: 'index',
        component: Main,
        children: [
            { path: '/', redirect: { path: '/home' } },
            { path: '/home', name: '首页', component: resolve => { require(['@/views/Home'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/shopInfoConfig', name: '店铺信息维护', component: resolve => { require(['@/views/shop/ShopInfoConfig'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/offer', name: '优惠活动上架', component: resolve => { require(['@/views/shop/SpecialOfferConfig'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/foodInfoConfig', name: '餐食信息维护', component: resolve => { require(['@/views/shop/FoodinfoConfig'], resolve); } },
            { path: '/createFoodInfo', name: '餐食上架', component: resolve => { require(['@/views/shop/CreatedFoodInfo'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/newOrder', name: '新订单', component: resolve => { require(['@/views/shop/NewOrder'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/progressOrder', name: '进行中订单', component: resolve => { require(['@/views/shop/ProgressOrder'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/achievedOrder', name: '已完成订单', component: resolve => { require(['@/views/shop/AchievedOrder'], resolve); }, meta: { isLogin: true, isAuth: true } },
            { path: '/auth', name: '权限管理', component: resolve => { require(['@/views/system/Auth'], resolve); }, meta: { isLogin: true, isAuth: true } },
        ]
    }
];

//导出
export const routers = [
    loginRouter,
    registeRouter,
    ...appRouter,
    page404Router
];
