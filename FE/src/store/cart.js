import api  from '../utils/api'
import Storage from '../utils/api'
import _ from 'lodash'

export default {
    namespaced: true,
    state: {
        orders:{}
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
            if(!payload){
                state.orders = [];
                return;
            }
            let {orders} = state
            let { id, name, price, num = 1, shopId } = payload
            // order不为空对象
            if (Object.keys(orders).length > 0 && orders.shopId === shopId) {
                let good = _.find(orders.list, item => item.id === id)
                if(good){
                    good.num = num;
                    if (good.num <= 0) {
                        console.log(good.num,1121)
                        _.remove(orders.list, item => item.id === id)
                    }
                }else {
                    if(orders.list){
                        orders.list.push({ id, name, price, num })
                    }else{
                        orders.list = []
                        orders.list.push({ id, name, price, num })
                    }          
                }
            } else {
                orders = { 
                    shopId,
                    list:[{id, name, price, num}]
                }
            }
            _.remove(orders.list, item => Object.keys(item).length === 0)
            Storage.changeCarGoods(orders)
            state.orders = _.cloneDeep(orders)
        }
    },

    getters: {
        orders: ({orders}) => {
            return orders
        },
        allInfo:({orders}) => { // 派生出来的购物车商品的总价钱和总数量
            let allNumber = 0
            let allPrice = 0
            if ( Object.keys(orders).length > 0 && orders.list.length ) {
                orders.list.forEach(good => {
                    allNumber += good.num
                    allPrice  += good.num * good.price
                });
            }
        allPrice = allPrice.toFixed(2)
        return { allNumber, allPrice }
        }
    }
}