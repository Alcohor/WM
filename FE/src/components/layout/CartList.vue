<template>
<transition
    enter-active-class="slideInUp"
    leave-active-class="slideOutDown">
    <div class="cart-list animated">
        <div class="title">
            <span class="title-wrap">已选商品:</span>
            <a class="clear-all"> <i class="fa fa-trash-o"></i> 清空</a>
        </div>
        <ul class="cart-list-wrap">
            <cart-goods-item v-for="item in cartData" :key="item.id" :goodInfo="item"></cart-goods-item>
        </ul>
        
    </div>
</transition>
</template>

<script>
import CartGoodsItem from '@c/common/CartGoodsItem'
    export default{
        props:['cart-data'],
        components:{
            CartGoodsItem
        }
    }
</script>

<style lang="scss">
    .cart-list{
        
        .title{
            width: 100%;
            height: 1.2rem;
            background-color: #eceff1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .333333rem;
            .title-wrap{
                text-align: left;
                font-size: .426667rem;
                line-height: 1.2rem;
            }
            .clear-all{
                
            }
        }
        width: 100vw;
        position: absolute;
        z-index: -100;
        bottom:1.28rem ;
        left: 0;
        background-color: #fff;
    }
</style>