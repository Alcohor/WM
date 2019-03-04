<template>
    <div :class="classNameColor">
        <cart-list :cart-data="list" v-if="isCartListShow"></cart-list>
        <span class="cover"></span>
        <div class="cart-container" @click= "handlerCartBtnClick">
            <span :class="classNameCart">
                <span class="spot" v-if="allInfo.allNumber">{{allInfo.allNumber}}</span>
                <i class="fa fa-shopping-cart"></i>
            </span>
            <div class="cart-tips">
                <span class="price-tips">商品总计：￥{{allInfo.allPrice}}</span>
                <span class="extra-cost">另需需配送费6元</span>
            </div>
        </div>
        <div class="payment-btn" @click="toCartPage">去结算</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import CartList from '@c/layout/CartList'
export default {
    components:{
         CartList
    },
    computed:{
        ...mapGetters({
        allInfo: 'cart/allInfo'
        }),
        ...mapState({
        shops: state => state.cart.orders,
        }),
        list(){
            let list = []
            this.shops.forEach(shop => {
                shop.list.forEach(item => {
                    list.push(item)
                })
            });
            return list
        }
    },
    data(){
        return {
            isCartListShow:false,
            classNameColor:"cart empty",
            classNameCart:"car-icon-wrap"
        }
    }
    ,
    methods:{
        handlerCartBtnClick(){
            this.isCartListShow=!this.isCartListShow
           
        },
        toCartPage(){
            this.$router.push({name: 'cart'})
        },
        handlerCartStyle(){
            
            if(this.allInfo.allNumber>0){
                this.classNameColor="cart"
                this.classNameCart="car-icon-wrap animated bounceIn"
            }else{
                this.classNameColor="cart empty"
                this.classNameCart="car-icon-wrap"
            }
        }
    },

    watch:{
        allInfo:{
            immediate:true,
            handler(){
                this.handlerCartStyle()
            }
        }
    },
    mounted(){
        console.log(this.allInfo,1)
    }
}
</script>

<style lang="scss">
@import "../../stylesheets/particles/_variable.scss";
    .cart.empty{
        filter: grayscale(1);
    }
    .cart{
        width: 100%;
        height: 1.28rem;
        position: fixed;
        bottom: 0;
        background-color: rgb(65,65,65);
        display: flex;
        z-index: 999;
        justify-content: space-between;
        .cover{
            position: absolute;
            z-index: -1;
            width: 100vw;
            height: 1.333333rem;
            background-color:  rgb(65,65,65);
        }
        .cart-container{
            width: 55%;
            position: relative;
            .car-icon-wrap{
                position: absolute;
                width: 1.333333rem;
                top: -0.35rem;
                left: 0.4rem;
                background-color: rgba(60,60,60,.9);
                border-radius: 50%;
                height: 1.333333rem;
                display: inline-block;
                font-size: .666667rem;
                color:#fff ;
                display: flex;
                justify-content: center;
                align-items: center;
                .spot{
                    position: absolute;
                    display: inline-block;
                    width: .5rem;
                    height: .5rem;
                    background-color: #9D0F1B;
                    border-radius: 50%;
                    font-size: .373333rem;
                    text-align: center;
                    left: 0;
                    top: 0;
                    line-height: .5rem;
                    color: #fff;
                }
                .fa{
                    border-radius: 50%;
                    background-color: $base-them-color;
                    line-height: 1.066667rem;
                    text-align: center;
                    width: 1.066667rem;
                    height: 1.066667rem;
                }
            }
            .cart-tips{
                display: flex;
               justify-content: center;
                height: 100%;
                margin-left: .4rem;
                flex-direction: column;
                color: #aaa;
                float: right;
                width: 65%;
                text-align: left;
                .price-tips{
                    font-size: .333333rem;
                }
                .extra-cost{
                    font-size: .266667rem;
                }
            }

        }
        .payment-btn{
            width: 2.8rem;
            background-color: #38ca73;
            line-height: 1.333333rem;
            text-align: center;
            color: #fff;
            font-size: .4rem;
        }
    }

</style>


