<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
      label="订单创建时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orderList"
      label="商品列表"
      width="300">
    </el-table-column>
    <el-table-column
      prop="sum"
      label="金额"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="派送地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="客户昵称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="客户手机号"
      width="120">
    </el-table-column>
     <el-table-column
      prop="orderStatus"
      label="订单状态">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex' 
import moment from 'moment'
export default {
  computed:{
    ...mapGetters('order', ['progressOrder']),
    tableData(){
      let tableData = this.progressOrder.map(order => {
        let time = moment(order.createTime).format('YYYY-MM-DD HH:mm:ss')
        let orderStatus = order.status === 1 ? '派送中' : '';
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
  }
}
</script>


<style lang="scss">

</style>
