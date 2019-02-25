<template>
  <div>
    <app-header title="我的地址" :isBackShow="true"></app-header>
    <!-- <p>{{city}}</p> -->
    <mt-field
      label="详细地址"
      :placeholder="adress"
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
import axios from 'axios'
export default {
  data() {
    return {
      adress:''
    };
  },
  computed: {
    ...mapGetters("adress", ["getLocat","fullAdress"]),
    city: function() {
      if (Object.keys(this.getLocat).length === 0) {
        return "暂未选择省市区";
      }
      return (
        this.getLocat.province.value +
        this.getLocat.city.value +
        this.getLocat.area.value
      );
    }
  },
  methods: {
    ...mapMutations('adress', ['SET_PRECISE']),
    handleSave(){
      this.SET_PRECISE(this.adress);
      let adress = this.fullAdress
      console.log(adress)
      axios.post('be/m/api/admin/edit', {adress: adress}).then(
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
