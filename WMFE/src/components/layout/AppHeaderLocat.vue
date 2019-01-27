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
              <div class="cities-wrap">
                <cities-container v-if="chunks" :info = "locatCities" :city= "chunks.city.cityName" ></cities-container>
                <cities-container :info = "popCities"></cities-container>
              </div>
              <div class="cities-all">
                <mt-index-list>
                  <mt-index-section 
                      v-for = "(value, key) in orderCities"
                      :key  = "key"
                      :index="key"
                  >
                  <mt-cell
                      v-for = "city in value"
                      :key  = "city.id"
                      :title= "city.name"
                      @click.native = "$emit('update:isShow', false),changeCity(city)"
          
                      
                  ></mt-cell>
                  </mt-index-section>
                </mt-index-list>
              </div>
            </div>
        </div>
    </transition>
</template>

<script>
import CitiesContainer from '@c/layout/CitiesContainer'
import { IndexList, IndexSection, Cell } from 'mint-ui';
import {mapState} from 'vuex'
import {CHANGE_CITY} from '../../store/chunks/mutation-types'
export default {
  props: { isShow: Boolean },
  components:{
      [IndexList.name]: IndexList,
      [IndexSection.name]: IndexSection,
      [Cell.name]: Cell,
      CitiesContainer
  },
 async beforeCreate(){
    let result = await this.$http({
            url: '/mz/v4/api/city'
        })
        
    this.cities = result.data.data.cities  
  },
  computed:{
    orderCities(){
      return this.$cities(this.cities)
    },
    ...mapState(['chunks'])
    
  },

  created(){
   
  },
  methods: {
        changeIsShow(){
          this.$bus.$emit('changeIsShow') 
        },
        changeCity ({id: cityId, name: cityName}) {
            // 更改城市信息
            this.$store.commit({type: 'chunks/' + CHANGE_CITY, city: {
                cityId, cityName
            }})
            // 回到首页
        }
    },
  data(){
    return{
      cities:[],
      locatCities:{
        title:'定位城市',
        cities:[{name:"",id:''}]
      },
      popCities:{
        title:'热门城市',
        cities:[
          {name:"上海",id:1},
          {name:"北京",id:2},
          {name:"深圳",id:3},
          {name:"广州",id:4},
          
         ]
      }
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
