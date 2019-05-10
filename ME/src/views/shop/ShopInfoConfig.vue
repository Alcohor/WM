<template>
<div>
  <el-dialog
    title="创建店铺"
    :visible.sync="dialogVisible"
    width="60%">
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
      <el-button type="primary" @click="createShop">创建</el-button>
    </span>
  </el-dialog>
  <div class="shop-info" v-if="shopInfo.shopName">
    <el-upload
      class="avatar-uploader"
      ref="avatar"
      action="/be/api/shop/saveAvatar"
      :show-file-list="false"
      :on-change="change"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="shopInfo.pic" :src="shopInfo.pic" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
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
      <el-form-item>
        <el-button type="primary" @click="modifyShop" round>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="no-shop-wrap" v-else>
    <img src="../../assets/images/noShop.jpg" alt="">
    <h3>您还没有店铺。</h3>
    <el-button type="text" @click="dialogVisible=true">+点击添加店铺</el-button>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      dialogVisible:false,
      shopInfo: {
        pic: '',
        shopName: '',
        notice: '',
        foodsType: '',
        mark:[],
        isLoaded: false,
        delivery: false,
        startTime: '00:00',
        endTime: '24:00',
        startCost: 0,
        deliveryCost: 0,
        packageCost: 0,
        status: true
      }
    };
  },
  methods: {
     ...mapActions("shop", ['GET_SHOP_ID']),
      handleAvatarSuccess(res, file) {
        console.log(file.raw)
        this.shopInfo.pic = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
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
      change(){
        console.log(this.$refs.avatar)
      },
      createShop() {
        this.dialogVisible = false
        axios.post('/be/api/shop/save', this.shopInfo).then(
          this.getShopInfo()
        )
      },
      modifyShop() {
        this.dialogVisible = false
        axios.post('/be/api/shop/update', this.shopInfo).then(
          () => {
            this.getShopInfo()
            this.GET_SHOP_ID();
          }
          
        )
      },
      getShopInfo() {
        axios.get('/be/api/shop/shopInfo').then(
        data => {
          console.log(data.data.data,8920)
          if (data.data.data.length) {
            this.shopInfo = data.data.data[0]
          }
        }
      )
      }
    },
    created() {
      this.getShopInfo();
      this.GET_SHOP_ID();
    },
};
</script>


<style lang="scss">
.no-shop-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 300px;
  }
  h3{
    text-align: center;
    color: #666;
  }
}
.shop-info {
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
}
</style>
