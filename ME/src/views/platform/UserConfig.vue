<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="nickName"
        label="昵称">
      </el-table-column>
      <el-table-column
        fixed
        prop="realName"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        fixed
        prop="phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="status"
        label="账号状态"
        :formatter="formatterStatus"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
     <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户昵称:">
          <div>{{user.nickName}}</div>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <div>{{user.realName}}</div>
        </el-form-item>
        <el-form-item label="身份证号:">
          <div>{{user.idCard}}</div>
        </el-form-item>
        <el-form-item label="手机号码:">
          <div>{{user.phone}}</div>
        </el-form-item>
        <el-form-item label="账号状态:">
          <el-select v-model="user.status" placeholder="请选择活动区域">
            <el-option label="待激活" :value="1"></el-option>
            <el-option label="正常" :value="0"></el-option>
            <el-option label="封禁" :value="2"></el-option>
          </el-select>
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
    computed:{
      tableData(){
        return this.fetchdata.filter(element => {
          return element.userType !== 1 
        })
      }
    },
    data() {
      return {
        dialogVisible: false,
        user: {
          nickName:'',
          userType:null,
          _id:null
        },
        fetchdata : [],
      }
    },
    methods:{
      submit(){
         this.dialogVisible = false
         axios.post('/be/api/admin/update',this.user).then(
           data => {
             if (data.data.code===200) {
               this.$message.success('修改成功')
               this.fetchData()
             }
           }
         )
      },
      formatterStatus(row){
        console.log(row)
        let statusName = ['正常', '待激活','已封禁']
        return statusName[row.status]
      },
      handleClose(){
        this.user = {
          nickName:'',
          userType:null,
          _id:null
        }
         this.dialogVisible = false
      },
      edit(row){
        this.dialogVisible = true;
        this.user = {...row}
      },
      fetchData(){
        axios.get('/be/api/admin/list').then(
        data => {
          if(data.data.code === 200) {
            this.fetchdata = data.data.data
          }
        }
      )
      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>