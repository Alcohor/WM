<template>
  <div>
    <app-header title="我的地址" :isBackShow="true"></app-header>
    <p>{{city}}</p>
    <mt-field
      label="详细地址"
      :placeholder="getPrecise"
      type="textarea"
      rows="4"
      v-model="adress"
    ></mt-field>
    <mt-button size="large"  type="primary" @click="handleSave">保存</mt-button>
  </div>
</template>

<script>
import AppHeader from "@c/common/CommonHeader";
import { mapGetters, mapMutations } from "vuex";
import {Toast} from 'mint-ui'
import axios from 'axios'
export default {
  data() {
    return {
      adress:''
    };
  },
  computed: {
    ...mapGetters("adress", ["getLocat","fullAdress", 'getPrecise']),
    ...mapGetters("user", ["userInfo"]),
    city: function(){
        if(Object.keys(this.userInfo.locat).length===0){
            return '您暂未选择所在地，请前往首页选择'
        }
        return this.userInfo.locat.province.value+this.userInfo.locat.city.value + this.userInfo.locat.area.value
    }
  },
  methods: {
    ...mapMutations('adress', ['SET_PRECISE']),
    handleSave(){
      this.SET_PRECISE(this.adress);
      axios.post('be/m/api/admin/edit', {adress: this.adress}).then(
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
    }
  },
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
</style>
