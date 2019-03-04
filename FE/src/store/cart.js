import api  from '../utils/api'
import Storage from '../utils/api'
import _ from 'lodash'

export default {
    namespaced: true,
    state: {
        orders:[]
    },
    actions: {
        async addGoods(context, payload) {
        
            let result = await api.addGoods(payload)
            if (result.status === 200) {
                context.commit({
                    type: 'UPDATE_CAR_GOODS',
                    goods: result.goods
                })
            }
        },
        async initialCarGoods(context) { 
            let result = await api.getCarGoods()
            if (result.status === 200) {
                context.commit({
                    type: 'UPDATE_CAR_GOODS',
                    goods: result.goods
                })
            }
        },
        async controlGoodNumber(context,payload){
            let result = await api.controlGoodNumber(payload)
            if(result.status===200){
                context.commit({
                    type:'UPDATE_CAR_GOODS',
                    goods:result.goods
                })
                
            }
        }
    },
    mutations: {
        'UPDATE_CAR_GOODS': (state, payload) => {
            console.log(payload,"payload")
            if(payload===null){
                state.orders = []
                return
            }
            let { id, name, price, num = 1, shopId } = payload
            let shops  = state.orders
            let shop = _.find(shops, item => item.shopId === shopId)
            if (shop&&shop.list) {
                let good = _.find(shop.list, item => item.id === id)
                if(good){
                    good.num = num;
                    // good.num += control_type ? 1 : -1
                    if (good.num <= 0) {
                        console.log(good.num,1121)
                        _.remove(shop.list, item => item.id === id)
                    }
                }else {
                    if(shop.list){
                        shop.list.push({ id, name, price, num })
                    }else{
                        shop.list = []
                        shop.list.push({ id, name, price, num })
                    }          
                }
            } else {
                shops.push({ shopId, list:[{id, name, price, num}] })
                console.log(shops)
            }
            _.remove(shops, item => Object.keys(item.list).length === 0)
            Storage.changeCarGoods(shops)
            state.goods = _.cloneDeep(shops)
        }
    },

    getters: {
        allInfo:(state) => { // 派生出来的购物车商品的总价钱和总数量
            let allNumber = 0
            let allPrice = 0
            if ( state.orders.length ) {
                state.orders.forEach(shop => {
                    console.log(shop, 9898)
                    if ( shop.list.length ) {
                        shop.list.forEach(good => {
                            allNumber += good.num
                            allPrice  += good.num * good.price
                        });
                    }
                });
            }
            allPrice = allPrice.toFixed(2)
            return { allNumber, allPrice }
        }
    }
}