<template>
  <div>
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
          <el-button type="text" size="small" @click="handleStatus(scope.row, false)">店铺下架整顿</el-button>
          <el-button type="text" size="small" @click="showStarConfig(scope.row)">店铺星级调整</el-button>
          <el-button type="text" size="small" @click="deleteById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="星级调整"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="shop" label-width="80px">
          <el-form-item label="商铺名称">
            <span>{{shop.shopName}}</span>
          </el-form-item>
          <el-form-item label="星级">
            <el-rate v-model="shop.stars"></el-rate>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data(){
    return {
      fetchdata:[],
      dialogVisible: false,
      shop: {}
    }
  },
  methods:{
      handleClose(){
        this.shop = {};
        this.dialogVisible = false;
      },
      deleteById(row){
        console.log(row)
        axios.post('/be/api/complain/delete',{_id:row._id},true).then(data => {
                  if (data.data.code === 200) {
                    this.$message.success('操作成功')
                    this.fetchData();  
                  }
                })
      },
      showStarConfig(row){
        this.dialogVisible = true;
        this.shop = {...row}
      },
      editStar(){
        let shopId = this.shop.shopId
        let _id = this.shop._id
        let p1 = axios.post('/be/api/shop/status',{_id:shopId, stars: this.shop.star})
        let p2 = axios.post('/be/api/complain/update',{_id, status: true})
        let list = [p1,p2];
        Promise.all(list).then(data => {
          if(data[0].data.code===200 && data[1].data.code===200){
            this.$message.success('操作成功')
            this.dialogVisible = false;
            this.fetchData();  
          }
        })
      },
      handleStatus(row, status) {
        let { shopId,_id } = row;
        console.log(row)
        let p1 = axios.post('/be/api/shop/status',{_id: shopId, status:false})
        let p2 = axios.post('/be/api/complain/update',{_id, status: true})
        let list = [p1,p2];
        Promise.all(list).then(data => {
          if(data[0].data.code===200 && data[1].data.code===200){
            this.$message.success('操作成功')
            this.fetchData();  
          }
        })
      },
      fomatterTime(row){
        return moment(row.createTime).format('YYYY-MM-DD, hh:mm')
      },
      fetchData() {
        axios.get('/be/api/complain/list').then(
        data => {
          if(data.data.code === 200) {
            this.fetchdata = data.data.data.orderList.filter(item => {return item.status === false})
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
