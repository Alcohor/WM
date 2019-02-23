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
        passWord:''
      }
    }
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
