<template>
  <div>
    新订单
    <div v-for="order in orderList" :key="order.id">
      <p>{{order.createTime}}</p>
      <p>{{order.sum}}</p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex' 
export default {
  computed:{
    ...mapGetters('shop', ['shopId'])
  },
  data(){
    return {
      orderList: []
    }
  },
  created() {
    axios.get('be/api/order/list', {params:
      {
        shopId: this.shopId
      }
    }).then(data => {
      if(data.data.code === 200) {
        console.log(data.data.data.orderList)
        this.orderList = data.data.data.orderList.filter(item => {
          return item.status < 2
        })
      }
    })
  }
}
</script>


<style lang="scss">

</style>
