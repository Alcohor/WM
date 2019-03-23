<template>
  <div>
    <el-button type="text" @click="createFood" v-if="!foodsInfo">+新餐食上架</el-button>
    <div v-else>
      <el-upload
        class="avatar-uploader"
        ref="pic"
        :data="{_id: this.foodsInfo._id}"
        action="/be/api/foods/save-pic"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <img v-if="foodsInfo.pic" :src="foodsInfo.pic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form ref="form" :model="foodsInfo" label-width="80px">
        <el-form-item label="餐食名称">
          <el-input v-model="foodsInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="餐食价格">
          <el-col :span="11">
            <el-input-number v-model="foodsInfo.price" :min="0"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="餐食标签">
          <el-checkbox-group v-model="foodsInfo.type">
            <el-checkbox label="网红小食" name="1"></el-checkbox>
            <el-checkbox label="地方特色" name="2"></el-checkbox>
            <el-checkbox label="特色美食" name="3"></el-checkbox>
            <el-checkbox label="健康养颜" name="4"></el-checkbox>
            <el-checkbox label="家常美味" name="5"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="餐食信息">
          <el-input type="textarea" v-model="foodsInfo.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">上架</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      foodsInfo: null
    };
  },
  computed: {
    ...mapGetters("shop", ["shopId"])
  },
  methods: {
    handleSuccess(res, file) {
      console.log(file.raw);
      this.foodsInfo.pic = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    createFood() {
      this.foodsInfo = {}
      axios.post("/be/api/foods/create", { shopId: this.shopId, }).then(data => {
        this.foodsInfo = data.data.data;
        console.log(this.foodsInfo,999)
      });
    },
    onSubmit() {
      let foodsInfo  = {...this.foodsInfo}
      delete foodsInfo.pic;
      axios.post("/be/api/foods/update", { ...foodsInfo }).then(data => {
        if(data.data.code ===200){
          this.foodsInfo = null
          this.$message.success('上架成功');
        } else {
          this.$message.error('上架失败')
        }
      });
    }
  }
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
