<template>
<div style="height: 100vh">
    <app-header title="订单结算" :isBackShow="true"></app-header>
    <div>
        <ul class="order-list" v-if="list.length">
            <li class="item" v-for="item in list" :key="item.id">
                <p class="name">{{item.name}}</p>
                <div class="price">单价：{{item.price}}</div>
                <div class="num">数量：{{item.num}}</div>
            </li>
        </ul>
        <p v-else style="margin-top:30px">
            您的购物车里没有商品，去挑选点吧？
        </p>
    </div>
    <div class="container">
        <div class="cart-container">
            <div class="cart-tips">
                <span class="price-tips">商品总计：￥{{allInfo.allPrice}}</span>
                <span class="extra-cost">另需需配送费6元</span>
            </div>
        </div>
        <div class="payment-btn" @click="pay">去结算</div>
    </div>
</div>
</template>


<script>
import AppHeader from '@c/common/CommonHeader'
import axios from 'axios'
import {mapActions, mapGetters, mapState} from 'vuex'
import {Toast} from 'mint-ui'
export default {
  data(){
    return {
      baseUserInfo: {
        nickName: '',
        phone:''
      }
    }
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
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
  methods: {
    ...mapActions('user',['GET_USER_INFO']),
    pay(){
        let createTime = new Date().getTime();
        let guestId = this.userInfo._id
        let sum = this.allInfo.allPrice
        let list = this.shops
        let status = 0
        let shopId = []
        this.shops.forEach(shop => {
            shopId.push(shop.shopId)
        })
        axios.post('be/api/order/create', {
            createTime,
            guestId,
            sum,
            list,
            status,
            shopId
        }).then(
            data => {
                if(data.data.code===200){
                    Toast('购买成功')
                    this.$store.commit('cart/UPDATE_CAR_GOODS', null)
                }
            }
        )
    }
  }
}
</script>


<style lang="scss">
    @import "../stylesheets/particles/_variable.scss";
    .order-list {
        width: 100%;
        float: left;
        .item{
            width: 100%;
            padding: .266667rem;
            border-bottom: 1px solid #ccc;
        }
        p{text-align: left;}
        div{
            text-align: left;
        }
    }
    
    .container{
        width: 100%;
        height: 1.28rem;
        position: fixed;
        bottom: 0;
        background-color: rgb(65,65,65);
        display: flex;
        z-index: 999;
        justify-content: space-between;
    
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
