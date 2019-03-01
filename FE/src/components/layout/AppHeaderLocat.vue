<template>
    <transition
    enter-active-class="slideInRight"
    leave-active-class="slideOutRight">
        <div class="app-header-locat animated" v-if="isShow" >
            <div class="header-main">
                <span class="back-wrap" @click="$emit('update:isShow', false)">
                    <i class = 'fa fa-angle-left back-btn'></i> 
                </span>
                <p>选择收货地址</p>
            </div>
            <div class="content">
              <v-distpicker 
                :province="userInfo.locat.province ? userInfo.locat.province.value : ''"
                :city="userInfo.locat.province ? userInfo.locat.city.value : ''"
                :area="userInfo.locat.province ? userInfo.locat.area.value : ''"
                type="mobile" @selected="selectedCity">
              </v-distpicker>
            </div>
        </div>
    </transition>
</template>

<script>
import CitiesContainer from '@c/layout/CitiesContainer'
import { IndexList, IndexSection, Cell } from 'mint-ui';
import {mapState, mapMutations, mapGetters} from 'vuex'
import {CHANGE_CITY} from '../../store/chunks/mutation-types'
import VDistpicker from 'v-distpicker'
import {Toast} from 'mint-ui' 
import axios from 'axios'
export default {
  props: { isShow: Boolean },
  components:{
      CitiesContainer,
      VDistpicker
  },

  computed:{
    orderCities(){
      return this.$cities(this.cities)
    },
    ...mapState(['chunks']),
    ...mapGetters('user',['userInfo'])
  },

  created(){
   
  },
  methods: {
    ...mapMutations('user',['SET_LOCAT']),
    changeIsShow(){
      this.$bus.$emit('changeIsShow') 
    },
    selectedCity(city){
      if(!this.userInfo._id){
        Toast('保存地址请先登录')
        return
      }
      this.SET_LOCAT(city)
      this.handleSave(city)
      Toast('地址保存成功')
      setTimeout(() => {
        this.$emit('update:isShow', false)
      },800)
    },
    handleSave(city){
      axios.post('be/m/api/admin/edit', {locat: city}).then(
        data => {
          if(data.data.code === 200) {
            setTimeout(() => {
              this.$router.push({name:'mine'})
            }, 1500)
            this.GET_USER_INFO()
          }
        }
      )
    }
  },
  data(){
    return{
      cities:[],

    }
  }
};
</script>

<style lang = "scss">
@import "../../stylesheets/particles/_variable.scss";
.app-header-locat {
    z-index: 999;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  .header-main {
    flex: 0, 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0.266667rem 0.373333rem 0 0.373333rem;
    height: 1.186667rem;
    background-color: $base-them-color;
    color: #ffffff;
    p {
      text-align: center;
      font-size: 0.453333rem;
      font-weight: 700;
    }
    .back-wrap{
            width: .933333rem;
            left: .373333rem;
          display: inline-block;
          position: absolute;
        .back-btn {
          font-size: .666667rem;
        }
    }
  }
  .content {
    width: 100%;
    height: 16.6rem;
    background-color: #fff;
  }
}
.animated {
  animation-duration: 0.5s;
}
.mint-indexlist-navitem{
  font-size: .333333rem !important
}
.mint-cell-wrapper{font-size:.4rem }
.mint-cell-wrapper{padding: .133333rem 0 !important}
</style>
