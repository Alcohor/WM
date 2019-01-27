import {CHANGE_CITY} from './mutation-types'

export default{
    [CHANGE_CITY]:(state,payload)=>{
        state.city  = payload.city;
        if(payload.cities){
            state.cities = payload.cities
        }
    }
}