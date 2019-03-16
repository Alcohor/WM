<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="shopName"
      label="店名">
    </el-table-column>
    <el-table-column
      prop="foodsType"
      label="菜系">
    </el-table-column>
    <el-table-column
      prop="mark"
      label="标签">
    </el-table-column>
    <el-table-column
      prop="notice"
      label="店铺简介">
    </el-table-column>
    <el-table-column
      prop="time"
      label="营业时间">
    </el-table-column>
    <el-table-column
      prop="packageCost"
      label="包装费">
    </el-table-column>
    <el-table-column
      prop="deliveryCost"
      label="配送费">
    </el-table-column>
    <el-table-column
      prop="startCost"
      label="起送金额">
    </el-table-column>
    <el-table-column
      prop="shopStatus"
      label="状态">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" v-if="scope.row.status" size="small" @click="handleStatus(scope.row,false)">下架</el-button>
        <el-button type="text" v-else size="small" @click="handleStatus(scope.row,true)">上架</el-button>
        <el-button type="text" size="small" @click="showedit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="编辑商铺"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
  <el-form ref="form" :model="shopInfo" label-width="80px">
      <el-form-item label="店铺名称">
        <el-input v-model="shopInfo.shopName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="菜系">
        <el-select v-model="shopInfo.foodsType" placeholder="请选择店铺菜系">
          <el-option label="川菜" value="川菜"></el-option>
          <el-option label="鲁菜" value="鲁菜"></el-option>
          <el-option label="粤菜" value="粤菜"></el-option>
          <el-option label="苏菜" value="苏菜"></el-option>
          <el-option label="浙菜" value="浙菜"></el-option>
          <el-option label="闽菜" value="闽菜"></el-option>
          <el-option label="湘菜" value="湘菜"></el-option>
          <el-option label="徽菜" value="徽菜"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺标签">
        <el-checkbox-group v-model="shopInfo.mark">
          <el-checkbox label="#便当/快餐" name="1"></el-checkbox>
          <el-checkbox label="#火锅/串串" name="2"></el-checkbox>
          <el-checkbox label="#面食/米粉" name="3"></el-checkbox>
          <el-checkbox label="#炒菜/点餐" name="4"></el-checkbox>
          <el-checkbox label="#甜点/饮品" name="5"></el-checkbox>
          <el-checkbox label="#龙虾/烧烤" name="6"></el-checkbox>
          <el-checkbox label="#日料/寿司" name="7"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="shopInfo.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="起送金额">
        <el-input-number  size="small" v-model="shopInfo.startCost" label="起送金额"></el-input-number>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input-number  size="small" v-model="shopInfo.deliveryCost" label="起送金额"></el-input-number>
      </el-form-item>
      <el-form-item label="包装费">
        <el-input-number  size="small" v-model="shopInfo.packageCost" label="包装费"></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="shopInfo.startTime"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00'
          }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="shopInfo.endTime"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00',
            minTime: shopInfo.startTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="shopInfo.notice"></el-input>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      handleStatus(row, status) {
        let { _id } = row;
        axios.post('/be/api/shop/status',{_id, status}).then(
          data => {
            if(data.data.code === 200){
              this.$message.success('操作成功')
              this.fetchData();            
            }
          }
        )
      },
      fetchData() {
        axios.get('/be/api/shop/list').then(
        data => {
          if(data.data.code === 200) {
            this.fetchdata = data.data.data
          }
        }
      )
      },
      handleClose(){
        this.dialogVisible = false,
        this.shopInfo={}
      },
      submit() {
        axios.post('/be/api/shop/editShop',this.shopInfo).then(
          data => {
            if(data.data.code === 200){
              this.dialogVisible = false,
              this.$message.success('操作成功')
              this.fetchData();            
            }
          }
        )
      },
      showedit(row) {
        this.dialogVisible = true
        this.shopInfo = row
      }
    },
    computed:{
      tableData(){
        return this.fetchdata.map(element => {
          let time = `${element.startTime} ~ ${element.endTime}`
          let shopStatus = element.status ? '正常' : '已下架'
          return {...element, time, shopStatus}    
        })
      }
    },
    data() {
      return {
        dialogVisible: false,
        shopInfo: {},
        fetchdata : [],
      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>