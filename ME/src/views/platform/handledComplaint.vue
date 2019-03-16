<template>
  <el-table
    :data="fetchdata"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="shopName"
      label="被投诉店铺名">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="投诉时间"
      :formatter="fomatterTime"
      >
    </el-table-column>
    <el-table-column
      prop="guestName"
      label="顾客用户名">
    </el-table-column>
    <el-table-column
      prop="content"
      label="投诉内容">
    </el-table-column>
    <el-table-column
      prop="guestPhone"
      label="顾客手机号">
    </el-table-column>
    <el-table-column
    label="操作">
      <template slot-scope="scope">
        <el-button @click="handleStatus(scope.row)" type="text" size="small">上架店铺</el-button>
        <el-button @click="deleteById(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data(){
    return {
      fetchdata:[]
    }
  },
  methods:{
      deleteById(row){
        console.log(row)
        axios.post('/be/api/complain/delete',{_id:row._id}).then(data => {
                  if(data.data.code===200){
                    this.$message.success('操作成功')
                    this.fetchData();  
                  }
                })
      },
      fomatterTime(row){
        console.log(row.createTime)
        return moment(row.createTime).format('YYYY-MM-DD, hh:mm')
      },
      handleStatus(row, status) {
        let { shopId,_id } = row;
        console.log(row)
        axios.post('/be/api/shop/status',{_id: shopId, status: true}).then(data => {
          if(data.data.code===200){
            this.$message.success('操作成功')
            this.fetchData();  
          }
        })
      },

      fetchData() {
        axios.get('/be/api/complain/list').then(
        data => {
          if(data.data.code === 200) {
            this.fetchdata = data.data.data.orderList.filter(item => {return item.status === true})
          }
        }
      )
      },
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style lang="scss">

</style>
