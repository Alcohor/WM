<template>
  <div>
    <app-header title="登录" :isBackShow="true">
    </app-header>
    <div class="form-wrap">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号：">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span>没有账号？</span><a href="/regist">去注册</a>
    <div style="width:90%; margin:0 auto;margin-top:10px">
      <mt-button size="large" :disabled="isBtnDisabled" @click="handleLogin" type="primary">登录</mt-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppHeader from '@c/common/CommonHeader'
import { Toast } from 'mint-ui'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      form: {
        userName:'',
        passWord:''
      }
    }
  },
  computed: {
    isBtnDisabled (){
      if(this.form.userName === ''|| this.form.passWord=== ''){
          return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions('user', ['GET_USER_INFO']),
        handleLogin (ev) {
          axios.post('/be/m/api/admin/login', {
            userName: this.form.userName, 
            passWord: this.form.passWord, 
            }).then(data => {
              if (data.data.code === 200) {
                this.GET_USER_INFO()
                Toast('登录成功');
                setTimeout(()=> {
                  this.$router.push({name: 'home'})
                }, 1000)
              } else {
                Toast(data.data.data)
                
              }
            } )
    },
  },
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
.form-wrap {
  width: 100%;
  padding: .533333rem .8rem 0 0;
}
</style>
