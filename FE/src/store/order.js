
import axios from 'axios'
export default {
    namespaced: true,
    state: {
        orderList: []
    },
    mutations:{
        SET_ORDER_LIST(state,payload){
            console.log(payload,11)
            state.orderList = payload || []
        },
        COMMIT_GOOD(state,payload){
            state.orderList.forEach(element => {
                if(element._id===payload){
                    element.status = 2
                }
            });
        }
    },
    actions: {
        GET_ORDERS: (context,{guestId}) => {
            if (!guestId) {
                context.commit('SET_ORDER_LIST', []);
                return
            }
            axios.get('be/api/order/list',{params: { guestId }}).then(
                ({data}) => {
                  if(data.code===200){
                    context.commit('SET_ORDER_LIST', data.data.orderList);
                  }
                }
              )
        }
    },
    getters:{
        progressOrder: (state)=>{
            return state.orderList.filter(item => {
                return item.status < 2
            })
        },
        completedOrder: (state)=>{
            return state.orderList.filter(item => {
                return item.status >= 2
            })
        }
    }
}