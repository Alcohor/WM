<template>
<div class="app-home">
    <app-header></app-header>
    <div class="scroll-wrap" ref="root">
        <div class="content">
            <div class="hot-events"> <span></span> <i>热门活动</i> <span></span></div>
            <app-home-swiper></app-home-swiper>
            <div class="rest-list"> <span></span> <i>热门店铺</i> <span></span></div>
            <div class="rest-wrap">
                <ul class="wrap" v-if = "shopList.length" >
                    <rest-item
                    v-for= "shop in shopList"
                    :key = "shop._id"
                    :info = "shop"
                    ></rest-item>
                </ul>
            </div>
        </div>
    </div>
    <app-nav></app-nav>
</div>
</template>

<script>
import AppNav from '@c/layout/AppNav'
import AppHeader from '@c/layout/AppHeader'
import RestItem from '@c/common/RestItem'
import AppHomeSwiper from '@c/layout/AppHomeSwiper'
import scroll from '@utils/scroll'
import { Toast } from 'mint-ui';
import axios from 'axios'
import {mapGetters} from 'vuex'
import Vue from 'vue'
let vue = new Vue()
    export default{
        name:"app-home",
        data(){
            return {
                shopList: [],
                results: null,
                count: 0
            }
        },
        components:{
            RestItem,
            AppHeader,
            AppNav,
           AppHomeSwiper
        },
        async created(){
            axios.get('/be/api/shop/list').then(
              data => {
                this.shopList = data.data.data
                console.log(this.shopList, 2384)
                }
            )
        },


        sockets: {
            //不能改,j建立连接自动调用connect
            connect: function() {
            //与socket.io连接后回调
            console.log("socket connected");
            },
        //服务端向客户端发送login事件
            login: function(value) {
            //监听login(后端向前端emit  login的回调)
               vue.$message.success(value)
            },
            push: function(value) {
                console.log(2020)
            }
        },
       
        mounted(){           
           this.scroll = scroll({
                el:this.$refs.root,
                handler:this.getMoreRests
            }) 
            // setInterval(() => {
            //     this.$socket.emit("order",{shopId:'5c740367388a5e34b4c91e64', msg: '购买'});
            // }, 2000)
        },
        methods:{
            async getMoreRests(){
                if ( this.count>=this.idArr.length ) {
                if (this.instance) this.instance.close()
                this.instance = Toast({
                    message: '没有更多了...',
                    position: 'bottom',
                    duration: 2000
                })
                return false;
            };
                // let moreRests = await this.$http({
                //     url:'/maoyan/ajax/moreComingList?token=',
                //     params:{
                //         movieIds:this.idArr[this.count]
                //     }
                // })
                this.count++
                console.log(moreRests)
                this.results = this.results.concat(moreRests.data.coming);
            }
        }
    }
</script>
    
<style lang = "scss">
html{
    height: 100%;
    body{
        height: 100%;
        #app{
            height: 100%;
            main{
                height: 100%;
                .app-home{
                    height: 100% !important;
                }
            }   
        }
    }
}
.app-home {
    display: flex;
    flex-direction: column;
    .scroll-wrap{
        flex-grow: 1;
        overflow: hidden;
    }
  .hot-events,
  .rest-list {
    font-size: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.96rem;
    i {
      margin: 0 0.4rem;
    }
    span {
      width: 0.666667rem;
      height: 2px;
      background-color: #999;
    }
  }
  .rest-wrap{
      padding-bottom: 1.333333rem;
  }
}
</style>
