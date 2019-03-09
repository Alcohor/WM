<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="time"
      label="订单创建时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orderList"
      label="商品列表"
      width="200">
    </el-table-column>
    <el-table-column
      prop="sum"
      label="金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="adress"
      label="派送地址">
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="客户昵称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="客户手机号"
      width="120">
    </el-table-column>
     <el-table-column
      prop="orderStatus"
      label="订单状态"
      width="130">
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { mapGetters } from 'vuex' 
export default {
  computed:{
    ...mapGetters('shop', ['shopId']),
    ...mapGetters('order', ['completedOrder']),
    tableData(){
      let tableData = this.completedOrder.map(order => {
        let time = moment(order.createTime).format('YYYY-MM-DD HH:mm:ss')
        let orderStatus = order.status === 2 ? '交易已完成' : '';
        let orderList = ''
        order.list.forEach(item => {
          orderList += ` ${item.name} * ${item.num} ` 
        })
        return {time, orderStatus, orderList,...order}
      });
      return tableData
    }
  },
  data(){
    return {
      orderList: []
    }
  },
  methods: {
    commitOrder({_id}){
      axios.post('be/api/order//updata-status', {
        _id,
        status: 1
      })
        .then()
    }
  }
}
</script>


<style lang="scss">

</style>
