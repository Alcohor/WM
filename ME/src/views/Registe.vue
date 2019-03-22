<!--登录页-->
<template>
    <el-form :model="registeForm" :rules="registeRules" ref="registeForm" label-position="left" label-width="0px" class="registe-container">
        <h3 class="title text-center">外卖平台管理系统 · 注册</h3>
        <el-form-item prop="nickName">
            <el-input type="text" v-model="registeForm.nickName" auto-complete="off" placeholder="请输入昵称" @keyup.enter.native="registeIn" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
            <el-input type="text" v-model="registeForm.userName" auto-complete="off" placeholder="请输入账号" @keyup.enter.native="registeIn" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
            <el-input type="password" v-model="registeForm.passWord" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="registeIn"></el-input>
        </el-form-item>
        <el-form-item prop="realName">
            <el-input type="text" v-model="registeForm.realName" auto-complete="off" placeholder="真实姓名" @keyup.enter.native="registeIn"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
            <el-input type="text" v-model="registeForm.phone" auto-complete="off" placeholder="手机号码" @keyup.enter.native="registeIn"></el-input>
        </el-form-item>
        <el-form-item prop="idCard">
            <el-input type="text" v-model="registeForm.idCard" auto-complete="off" placeholder="身份证号" @keyup.enter.native="registeIn"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="userType">
           <el-select v-model="registeForm.userType" placeholder="请选择账号类型">
            <el-option label="平台管理员" :value="1"></el-option>
            <el-option label="店铺管理员" :value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;margin-top:10px;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegiste" :loading="registeing">注册</el-button>
        </el-form-item>
        <el-button type="text" @click.prevent="$router.push({name: 'login'})">去登陆</el-button>
    </el-form>
</template>

<script>
// import {requestregiste, registe} from '../service/api';
import axios from 'axios'
export default {
  name: 'registe',
  data () {
    return {
      registeing: false,
      registeForm: {
        nickName: '',
        userName: '',
        passWord: '',
        userType: 2,
        realName:'',
        idCard: '',
        phone: '',
        status: 1,
      },
      registeRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ]
      },
      checked: false
    };
  },
  methods: {
    // isSubmitDisabled() {
    //   if(this.registeForm.nickName === ''|| this.registeForm.userName === ''|| this.registeForm.passWord=== '' || this.registeForm === null){
    //     return true;
    //   }
    //   return false;
    // },
    resetForm () {
      this.$refs.registeForm.resetFields();
    },
    handleRegiste (ev) {
          if(this.registeForm.nickName === ''|| this.registeForm.userName === ''|| this.registeForm.passWord=== '' || this.registeForm === null){
            this.$message.error('请输入必填项');
            return false;
          }
          axios.post('/be/api/admin/registe', {
            ...this.registeForm
            }).then(data => {
              if (data.data.code === 200) {
                this.$message.success('注册成功，请等待审核')
                this.$router.push({name: 'login'})
              } else {
                this.$message.error(data.data.data);
              }
            } )
          // requestregiste(registeParams).then(data => {
          //   this.registeing = false;
          //   let {msg, code, user} = data;
          //   if (code !== 200) {
          //     this.$message({
          //       message: msg,
          //       type: 'error'
          //     });
          //   } else {
          //     sessionStorage.setItem('user', JSON.stringify(user));
          //     this.$router.push({path: '/'});
          //   }
          // });
      // });
    },
    test () {
      registe({account: 'admin'}).then(data => {
        console.log(data);
      });
    }
  }
};
</script>

<style lang= "scss">
  .registe-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .text-center {
    text-align: center;
  }
</style>