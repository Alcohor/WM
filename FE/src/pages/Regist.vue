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
        <el-form-item label="密码：">
          <el-input type="password" v-model="form.passWord2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span>已有账号？</span><a href="/regist">去登录</a>
    <div style="width:90%; margin:0 auto;margin-top:10px">
      <mt-button size="large" type="primary">登录</mt-button>
    </div>
  </div>
</template>

<script>
import AppHeader from '@c/common/CommonHeader'
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
  }
}
</script>

<style lang="scss">

</style>
