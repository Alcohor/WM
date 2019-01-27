<template>
    <div v-if="results" class="detail">
        <common-header :isBackShow= "isBackShow"  :title= "results.nm"></common-header>
        <div class="rest-intro-wrap">
            <img :src="results.img|getImgUrl" alt="" class="rest-img">
            <div class="words-intro">
                <h1 class="rest-main-title">{{results.nm}}</h1>
                <div class="rest-sale-info">
                    <span class="gread">顾客评分：<mark>8.9</mark> </span>
                    <span class="sale-vol">月售：<span>{{results.wish}}</span>单</span>
                </div>
            </div>
        </div>
        <div class="rest-content">
           <router-link :to= "{name:'rest-introduce'}" tag="div" class="rest-menu-btn">商家</router-link>
           <router-link v-if="info" :to= "{name:'foods-list',query:{info:info}}" tag="div" class="rest-menu-btn" >点餐</router-link>
           <router-link :to= "{name:'comment-list'}" tag="div" class="rest-menu-btn">评论</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        
    <cart></cart>
    </div>
</template>

<script>
    import CommonHeader from '@c/common/CommonHeader'
    import FoodsList from '@c/layout/FoodsList'
    import Cart from '@c/common/Cart'
    export default{
        components:{
            CommonHeader,
            FoodsList,
            Cart
        },
        props: ['id'],
        data(){
            return{
                results:null,
                isBackShow:true,
                info:[
                    {id:1,name:"金汤肥牛面",price:19,img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=807352104,276955120&fm=26&gp=0.jpg"},
                    {id:2,name:"冷吃兔",price:54,img:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3269792325,1692240919&fm=26&gp=0.jpg"},
                    {id:3,name:"老麻抄手",price:60,img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3032874312,1619604786&fm=26&gp=0.jpg"},
                    {id:4,name:"双流老妈兔头",price:118,img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2241025852,2262246080&fm=26&gp=0.jpg"},
                    {id:5,name:"锅包肉",price:12,img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1389379697,1570790544&fm=26&gp=0.jpg"},
                    {id:6,name:"宫保鸡丁",price:56,img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542891249&di=bcbc98b50ccf60b7e947c719cc492dfa&imgtype=jpg&er=1&src=http%3A%2F%2Fcp1.douguo.net%2Fupload%2Fcaiku%2F7%2F1%2F5%2Fyuan_7158db2f0425096c9de113e87573e125.jpeg"},
                    {id:7,name:"甜皮鸭",price:89,img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542891286&di=504d4aab6a64cb484a1c8b3c5aae10ed&imgtype=jpg&er=1&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150107%2F0042040210877277_b.jpg"},
                    {id:8,name:"花甲米线",price:78,img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542296594581&di=962757482c5a93263840b8727eacfef9&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170514%2F66297f18ef3c4cfa9637ede0f5073206_th.jpg"}
                    ]
            }
        },
        async created(){
            let _result = await this.$http({
             url:`/maoyan/ajax/detailmovie?movieId=${this.id}`
         })
         this.results = _result.data.detailMovie;
            
        },
        
    }
</script>

<style lang = "scss">
@import "../../stylesheets/particles/_variable.scss";
    .detail{
        width: 100%;
        .rest-intro-wrap{
            padding: .2rem .266667rem;
            .rest-img{
                width: 2rem;
                height: 2rem;
                display: inline-block;
            }
            .words-intro{
                margin-top: .4rem;
                padding-bottom: .2rem;
                border-bottom: 1px solid $base-them-color;
                h1.rest-main-title{
                    font-size: .546667rem;
                    font-weight: 700;
                }
            }
        }
        .rest-content{
            padding: 0 .2rem;
            width: 100%;
            height: 1.066667rem;
            line-height: 1.066667rem;
            display: flex;
            .rest-menu-btn{
                flex-grow: 1;
            }
            .router-link-active{
                color: $base-them-color;
            }
            

        }
    }
</style>
