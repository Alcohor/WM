<!--右上角用户信息操作组件-->
<template>
  <section>
    <!--用户信息下拉菜单-->
    <el-dropdown @command="dropdownCommand">
      <span class="el-dropdown-link">
        {{userInfo.nickName}}【{{userInfo.userType===1 ? '平台管理员' : '商铺管理员'}}】
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="modpass">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--修改密码窗体-->
    <el-dialog title="修改密码" :visible.sync="modpassFormVisible" append-to-body width="500px">
      <el-form :model="passForm" label-width="100px" ref="passForm" :rules="passRules">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" auto-complete="off" v-model="passForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" auto-complete="off" v-model="passForm.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPassConfirm">
          <el-input type="password" auto-complete="off" v-model="passForm.newPassConfirm"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modpassSubmit">确认</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      modpassFormVisible: false,
      passForm: {
        oldPass: '',
        newPass: '',
        newPassConfirm: ''
      },
      passRules: {
        oldPass: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        newPassConfirm: [
          { required: true, message: '确认新密码不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  methods: {
    dropdownCommand (command) {
      if (command === 'logout') {
        this.$confirm('确认退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            sessionStorage.removeItem('user');
            clearInterval(this.$tId);
            this.logout();
            this.$router.push({ path: '/login' });
          })
          .catch(() => {});
      }
      if (command === 'modpass') {
        this.modpassFormVisible = true;
      }
    },
    logout(){
      axios.get('/be/api/admin/logout')
    },
    modpassSubmit () {
      if (
        this.$refs.passForm.validate(valid => {
          if (valid) {
          }
        })
      );
    }
  }
};
</script>

<style lang='scss'>
.el-dropdown-link {
  cursor: pointer;
  color: #8a8f8e;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>