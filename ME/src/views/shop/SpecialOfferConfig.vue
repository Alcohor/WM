<template>
  <div>
    <el-form ref="form" :model="active" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="active.name"></el-input>
      </el-form-item>
      <el-form-item label="活动封面">
        <el-upload
          class="pic-uploader"
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
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      pic: '',
      active: {
        _id: '',
        name: '',
        pic: '',
        start: '',
        end: '',
        type: [],
        desc: ''
      }
    }
  },
  computed: {
    ...mapGetters('shop',['shopId'])
  },
  methods: {
    save() {
      axios.post('/be/api/active/update',this.active)
    },
    create() {
      axios.post('/be/api/active/create',{shopId: this.shopId}).then(
        this.getActiveList()
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
      getActiveList(){
        axios.get(`/be/api/active/info?shopId=${this.shopId}`).then(
          data =>{
            if (data.data.data === []) {
            this.active =  {
              _id: '',
              name: '',
              pic: '',
              start: '',
              end: '',
              type: [],
              desc: ''
              }
            } 
            this.active = data.data.data[0]
          }
        )
      }
  },
  // created(){
  //   this.getActiveList()
  // }
};
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
