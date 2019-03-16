<template>
  <div class="complaint-wrap">
    <app-header title="店铺投诉" :isBackShow="true"></app-header>
    <div class="wrap">
        <mt-cell v-for="shopInfo in shopData" :key="shopInfo._id" :title="'店铺名：'+shopInfo.shopName">
            <span></span>
            <mt-button size="small" type="danger" @click="submit(shopInfo._id)">投诉</mt-button>
        </mt-cell>
    </div>
  </div>
</template>

<script>
import AppHeader from "@c/common/CommonHeader";
import { mapGetters, mapMutations } from "vuex";
import {Toast} from 'mint-ui'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
  data() {
    return {
      adress:'',
      shopData: []
    };
  },
  computed: {
    ...mapGetters("adress", ["getLocat","fullAdress", 'getPrecise']),
    ...mapGetters("user", ["userInfo"]),
    city: function(){
        if (Object.keys(this.userInfo.locat).length===0) {
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
    },
    submit(id) {

    }
  },
  components: {
    AppHeader
  },
  mounted(){
      axios.get('/be/api/shop/order-shop').then(
        data => {
            this.shopData = data.data.data
        }
      )
  }
};
</script>

<style lang="scss">
    .complaint-wrap {
        .wrap {
            padding: .133333rem .266667rem;
        }
    }
</style>
