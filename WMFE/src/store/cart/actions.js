import api from '@utils/api'
import {
    namespace,
    UPDATE_CAR_GOODS
} from './mutation-types'
const actions = {
    async addGoods(context, payload) {
        
        let result = await api.addGoods(payload)
        if (result.status === 200) {
            context.commit({
                type: UPDATE_CAR_GOODS,
                goods: result.goods
            })
        }
    },
    async initialCarGoods(context) {
        let result = await api.getCarGoods()
        if (result.status === 200) {
            context.commit({
                type: UPDATE_CAR_GOODS,
                goods: result.goods
            })
        }
    },
    async controlGoodNumber(context,payload){
        let result = await api.controlGoodNumber(payload)
        if(result.status===200){
            context.commit({
                type:UPDATE_CAR_GOODS,
                goods:result.goods
            })
            
        }
    }

    
}
export default actions