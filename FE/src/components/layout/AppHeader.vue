<template>
    
    <header class="app-header">
        <div class="header-main">
            <div class="position-wrap">
                <a @click="isLocatShow = !isLocatShow">
                    <i class="fa fa-map-marker locat-icon"></i>
                    <span class="locat-name">{{chunks.city?chunks.city.cityName:"正在定位"}}</span>
                    <i class="fa fa-sort-down arrow-down" ></i>
                </a>
            </div>
        </div>
    <div class="searchbox-container">
        <div class="searbox-wrap">
            <input type="text" class="searchbox" placeholder="搜索商家、餐食名称">
        </div>
    </div>
    <app-header-locat :isShow.sync = "isLocatShow"></app-header-locat>
    </header>
</template>

<script>
    import AppHeaderLocat from '@c/layout/AppHeaderLocat'
    import { CHANGE_CITY } from '@/store/chunks/mutation-types'
    import { mapState } from 'vuex'
    export default{
        data(){
            return{ isLocatShow:false}
        },
        components:{
            AppHeaderLocat
        },
        beforeCreate() {
             this.$bus.$on("changeIsShow",function(){
            }),
           
            this.$store.dispatch( 'chunks/getCurrentPosition')
        },
        computed: mapState(['chunks']),       
    }

</script>

<style lang = "scss">
    @import '../../stylesheets/particles/_variable.scss';
    .app-header{
        .header-main{
            width: 100%;
            box-sizing: border-box;
            padding:.266667rem .373333rem 0 .373333rem;
            height: 1.186667rem;
            background-color: $base-them-color;
            color: #ffffff;
            .position-wrap{
                height: .92rem;
                display: flex;
                align-items: center;
                a{ 
                    height: auto;
                    width: 60%;;
                    display: flex;
                    align-items: center;
                    .locat-icon{
                        font-size: .533333rem;
                        float: left;
                        display: inline-block;
                        margin-right: .133333rem;
                    }
                    
                    .locat-name{
                        width: auto;
                        font-size: .453333rem;
                        font-weight: 700;
                    }
                    i.arrow-down{
                        margin-left: .066667rem;
                        font-size:$middle-font-size; 
                        margin-top:-0.2rem; 
                    }
                }
            } 
        }
        .searchbox-container{
            height: 1.36rem;
            width: 100%;
            position: sticky;
            top: 0;
            background-color: $base-them-color;
            .searbox-wrap{
                display:flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                .searchbox{
                    width: 9.253333rem;
                    height:.96rem;
                    border: none;
                    outline: none;
                    text-align: center;
                    font-weight: 300;
                    font-size: $middle-font-size;
                }
            }
        }  
    }
</style>
