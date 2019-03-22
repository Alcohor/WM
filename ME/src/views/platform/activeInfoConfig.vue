<template>
<div>
  <el-button type="text" @click="handleAddClick">+新增活动</el-button>
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
      prop="desc"
      label="活动描述">
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="remove(scope.row)" type="text" size="small">删除活动</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  @close="handleClose">
  <div>
    <el-form ref="form" :model="active" label-width="80px">
    {{active}}
      <el-form-item label="活动名称">
        <el-input v-model="active.name"></el-input>
      </el-form-item>
      <el-form-item label="活动封面">
        <el-upload
          class="pic-uploader"
          :data="{_id:this.active.id}"
          ref="avatar"
          action="/be/api/active/save-pic"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="active.pic" :src="active.pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="active.start" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="active.end" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="active.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="优惠活动" name="type"></el-checkbox>
          <el-checkbox label="线下活动" name="type  "></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动文案">
        <el-input type="textarea" v-model="active.desc"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        fetchdata : [],
        dialogVisible: false,
        pic: '',
        active: {
          id: '',
          name: '',
          pic: '',
          start: '',
          end: '',
          type: [],
          desc: ''
        }
      }
    },
    methods: {
      handleAddClick(){
        this.dialogVisible = true
        this.create();
      },
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
      },
      handleClose(){
        this.dialogVisible = false;
        this.active = {
          id: '',
          name: '',
          pic: '',
          start: '',
          end: '',
          type: [],
          desc: ''
        }
      },



      save() {
        this.dialogVisible = false;
        let { id, name, start, end, type, desc} = this.active
        axios.post('/be/api/active/update',{ id, name, start, end, type, desc}).then(
          data => {
            if (data.data.code ===200) {
              this.$message.success('创建成功');
              this.fetchData();
            }
          }
        )
      },
      create() {
        axios.post('/be/api/active/create').then(
          data => {
            console.log(data.data.data._id)
            this.active.id = data.data.data._id;
          }
        )
      },
      handleSuccess(res, file) {
          console.log(file.raw)
          this.active.pic = URL.createObjectURL(file.raw);
        },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // getActiveList(){
      //   axios.get(`/be/api/active/info?shopId=${this.shopId}`).then(
      //     data =>{
      //       if (data.data.data === []) {
      //       this.active =  {
      //         _id: '',
      //         name: '',
      //         pic: '',
      //         start: '',
      //         end: '',
      //         type: [],
      //         desc: ''
      //         }
      //       } 
      //       this.active = data.data.data[0]
      //     }
      //   )
      // }
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
    mounted(){
      this.fetchData();
    }
  }
</script>


<style lang="scss">
.avatar-uploader {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 150px;
    }
  }
  .shop-info-name {
    text-align: center;
    font-size: 20px;
    color: #565656;
  }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  img.avatar {
    max-width: 400px
  }
</style>