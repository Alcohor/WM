<template>
    <div>
    <app-header title="注册" :isBackShow="true">
    </app-header>
    <div class="form-wrap">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号：">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="form.passWord1"></el-input>
        </el-form-item>
        <el-form-item label="确认：">
          <el-input type="password" v-model="form.passWord2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span>已有账号？</span><a href="/regist">去登录</a>
    <div style="width:90%; margin:0 auto;margin-top:10px">
      <mt-button size="large" type="primary" @click="handleRegiste" :disabled="isBtnDisabled">注册</mt-button>
    </div>
  </div>
</template>

<script>
import AppHeader from '@c/common/CommonHeader'
import axios from 'axios'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      form: {
        userName:'',
        passWord1:'',
        passWord2:''
      }
    }
  },
  components: {
    AppHeader
  },
  computed: {
    isBtnDisabled (){
      if(this.form.userName === ''|| this.form.passWord1=== ''|| this.form.passWord2 !== this.form.passWord1){
          return true;
      }
      return false;
    }
  },
  methods: {
        handleRegiste (ev) {
          axios.post('/be/m/api/admin/regist', {
            userName: this.form.userName, 
            passWord: this.form.passWord1, 
            }).then(data => {
              if (data.data.code === 200) {
                Toast('注册成功，即将跳转至登录');
                setTimeout(()=> {
                  this.$router.push({name: 'login'})
                }, 1500)
              } else {
                this.$message.error(data.data.data);
                
              }
            } )
    },
  },
}
</script>

<style lang="scss">

</style>
