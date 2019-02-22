import http from '@utils/axios'
import {CHANGE_CITY} from './mutation-types'

export default {
    async getCurrentPosition(context){
        let cityId = 12
        let cityName = '北京'

        let cities = await http({
            url:'mz/v4/api/city'
        })
        cities=cities.data.data
        let result = await http({
            url:'/bd/location/ip',
            params:{
                ak:"xWyyds5iUxX4zHPk8bWYKVBhTrzfGNRd"
            }
        })
        //定位成功
        if(result){
            cityName = result.data.content.address.replace("市",'')
            for(let i=0;i<cities.cities.length;i++){
               if(cities.cities[i].name===cityName){

                   cityId=cities.cities[i].id
                   break;
               }
            }
        }
        context.commit({
            type:CHANGE_CITY,
            city:{cityId,cityName},
            cities:cities.cities
        })

    }
}