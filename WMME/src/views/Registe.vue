<!--登录页-->
<template>
    <el-form :model="registeForm" :rules="registeRules" ref="registeForm" label-position="left" label-width="0px" class="login-container">
        <h3 class="title text-center">外卖平台管理系统</h3>
        <el-form-item prop="loginuser">
            <el-input type="text" v-model="registeForm.loginuser" auto-complete="off" placeholder="请输入账号" @keyup.enter.native="loginIn" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item prop="loginpwd">
            <el-input type="password" v-model="registeForm.loginpwd" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="loginIn"></el-input>
        </el-form-item>
        <el-form-item prop="loginuser">
           <el-select v-model="registeForm.userType" placeholder="请选择账号类型">
            <el-option label="平台管理员" :value="1"></el-option>
            <el-option label="店铺管理员" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;margin-top:10px;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegiste" :loading="logining">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {requestLogin, login} from '../service/api';
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      registeForm: {
        userName: '',
        passWord: '',
        userType: null
      },
      registeRules: {
        userName: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userType: [
                    { required: true, message: '请选择用户类型', trigger: 'blur' }
        ]
      },
      checked: false
    };
  },
  methods: {
    resetForm () {
      this.$refs.loginForm.resetFields();
    },
    handleRegiste (ev) {
      // this.$refs.registeForm.validate((valid) => {
          var loginParams = {userName: this.registeForm.userName, passWord: this.registeForm.password, userType: this.resetForm.userType};
          axios.get('www.baidu.com')
          // requestLogin(loginParams).then(data => {
          //   this.logining = false;
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
      login({account: 'admin'}).then(data => {
        console.log(data);
      });
    }
  }
};
</script>

<style lang= "scss">
  .login-container {
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