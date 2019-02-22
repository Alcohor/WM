<template>
  <div>
    <el-dialog
      title="编辑餐食"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <div>
      <el-upload
        class="avatar-uploader"
        ref="pic"
        :data="{_id:this.editInfo._id}"
        action="/be/api/foods/save-pic"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <img v-if="editInfo.pic" :src="editInfo.pic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form ref="form" :model="editInfo" label-width="80px">
        <el-form-item label="餐食名称">
          <el-input v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="餐食价格">
          <el-col :span="11">
            <el-input-number v-model="editInfo.price" :min="0"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="餐食类型">
          <el-checkbox-group v-model="editInfo.type">
            <el-checkbox label="火锅/汤锅" name="1"></el-checkbox>
            <el-checkbox label="快餐/速食" name="2"></el-checkbox>
            <el-checkbox label="炒菜/炖菜" name="3"></el-checkbox>
            <el-checkbox label="面食/米粉" name="4"></el-checkbox>
            <el-checkbox label="烧烤/炸串" name="5"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="餐食信息">
          <el-input type="textarea" v-model="editInfo.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div v-if="tableData.length">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="price" label="价格 （元）" width="180"></el-table-column>
        <el-table-column prop="info" label="详细信息"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editFood(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deleteFood(scope.row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>您的店铺还没有餐食上架，快去
      <a href="#/createFoodInfo">添加</a>吧
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("shop", ["shopId"])
  },
  data() {
    return {
      dialogVisible:false,
      tableData: [],
      editInfo: {}
    };
  },
  methods: {
    handleSuccess(res, file) {
      console.log(file.raw);
      this.editInfo.pic = URL.createObjectURL(file.raw);
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
    editFood(row) {
      this.editInfo = row
      this.dialogVisible = true
    },
    handleClose(){
      this.editInfo = {},
      this.dialogVisible=false
    },
    getFoodsList() {
      axios
        .get("/be/api/foods/list", {
          params: {
            shopId: this.shopId
          }
        })
        .then(data => {
          if (data.data.data.length) {
            this.tableData = data.data.data;
          } else {
            this.tableData = []
          }
        });
    },
    deleteFood({ _id }) {
      axios
        .get("/be/api/foods/delete", {
          params: {
            _id
          }
        })
        .then(data => {
          if(data.data.code === 200) {
            this.$message.success('下架成功');
            this.getFoodsList()
          } else {
            this.$message.error(data.data.data);
          }
        });
    },
    onSubmit() {
      axios.post("/be/api/foods/update", { ...this.editInfo }).then(data => {
        if(data.data.code ===200){
          this.editInfo = {}
          this.dialogVisible = false;
          this.$message.success('编辑成功');
        } else {
          this.$message.error('编辑失败')
        }
      });
    }
  },
  created() {
    this.getFoodsList()
  }
};
</script>


<style lang="scss">
</style>
