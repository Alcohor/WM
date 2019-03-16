<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="活动名称">
    </el-table-column>
    <el-table-column
      prop="type"
      label="活动类型">
    </el-table-column>
    <el-table-column
      prop="start"
      label="开始时间">
    </el-table-column>
    <el-table-column
      prop="end"
      label="结束时间">
    </el-table-column>
    <el-table-column
      prop="shopId"
      label="主办方店铺ID">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="活动描述">
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="remove(scope.row)" type="text" size="small">删除活动</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      remove(row){
        axios.post('/be/api/active/remove', {...row}).then(
          data => {
            if (data.data.code = 200) {
              this.$message.success('删除成功')
              this.fetchData();
            }
          }
        )
      },
      fetchData() {
        axios.get('/be/api/active/list').then(
        data => {
          if(data.data.code === 200) {
            this.fetchdata = data.data.data
          }
        }
      )
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
        fetchdata : [],
      }
    },
    mounted(){
      this.fetchData();
    }
  }
</script>