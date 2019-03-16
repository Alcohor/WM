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
        prop="_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类型">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
     <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="用户昵称">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="user.userType" placeholder="请选择活动区域">
            <el-option label="平台管理员" :value="1"></el-option>
            <el-option label="商铺管理员" :value="2"></el-option>
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
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    computed:{
      tableData(){
        return this.fetchdata.map(element => {
          let type = element.userType === 1 ? '平台管理员' : '商铺管理员'
          return {...element, type}    
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
        this.user.nickName = row.nickName;
        this.user.userType = row.userType;
        this.user._id = row._id
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