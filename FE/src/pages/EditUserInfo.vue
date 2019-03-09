<template>
<div>
  <app-header title="我的信息" :isBackShow="true"></app-header>
  <div>
    <mt-field label="昵称" placeholder="请输入用户名" v-model="baseUserInfo.nickName"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="baseUserInfo.phone"></mt-field>
  </div>
  <div style="width:90%; margin:0 auto;margin-top:20px">
      <mt-button size="large"  type="primary" @click="handleSave">保存</mt-button>
      <div style="height: 30px; width: 100%"></div>
      <mt-button size="large"  type="danger" @click="logout">退出当前账号</mt-button>
  </div>
</div>
</template>


<script>
import AppHeader from '@c/common/CommonHeader'
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
export default {
  data(){
    return {
      baseUserInfo: {
        nickName: '',
        phone:''
      }
    }
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user',['GET_USER_INFO']),

    isPoneAvailable(phone) {
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(phone)) {  
              return false;  
          } else {  
              return true;  
          }  
    },

    handleSave() {
      let isPhone = this.isPoneAvailable(this.baseUserInfo.phone)
      if(!isPhone){
        Toast('请输入正确的手机号');
        return false
      }
      axios.post('be/m/api/admin/edit', {...this.baseUserInfo}).then(
        data => {
          if(data.data.code === 200) {
            Toast('修改成功');
            setTimeout(() => {
              this.$router.push({name:'mine'})
            }, 1500)
            this.GET_USER_INFO()
          }
        }
      )
    },
    logout(){
      axios.get('be/m/api/admin/logout').then(
        data =>{ if (data.data.code === 200) {
          Toast('注销成功')
          location.href='/login'
        }
      })
    }
  },
  mounted() {
    this.baseUserInfo = this.userInfo
  },
}
</script>


<style lang="scss">

</style>
