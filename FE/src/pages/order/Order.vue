<template>
    <div class="order">
        <common-header :isBackShow= "isBackShow"  :title= "headerTitle"></common-header>
        <div class="order-type">
            <span
                v-for = "item in types"
                :key = "item.id"
                @click = "type = item.type"
                :class = "{choosing: item.type === type}"
                class="type-switch-btn"
            >{{item.title}}</span>
        </div>
        <order-list :type = "type" :order-list="orderList" v-if="orderList.length"></order-list>
        <p v-else style="margin-top:20px">暂无该类别订单</p>
        <app-nav></app-nav>
    </div>
</template>

<script>
import CommonHeader from "@c/common/CommonHeader";
import AppNav from "@c/layout/AppNav";
import OrderList from "@c/layout/OrderList";
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    CommonHeader,
    OrderList,
    AppNav
  },
  computed:{
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('order', ['progressOrder','completedOrder']),
    unfinishedList(){
      let list = []
      this.list.forEach(element => {
        if(element.status < 2){
          list.push(element)
        }
      });
      return list
    },
    finishedList(){
      let list = []
      this.list.forEach(element => {
        if(element.status > 1){
          list.push(element)
        }
      });
      return list
    },
    orderList(){
      return this. type === 'order-underway' ? this.progressOrder: this.completedOrder
    }
  },

  data() {
    return {
      isBackShow: false,
      headerTitle: "订单",
      type:"order-underway",
      list: [],
      types: [
        { id: 1, title: "进行中", type: "order-underway" },
        { id: 2, title: "已完成", type: "order-complete" }
      ]
    };
  },
  methods:{
    ...mapActions('order', ['GET_ORDERS'])
  },
  mounted(){
    let guestId = this.userInfo._id
    this.GET_ORDERS({guestId:guestId});
  }
};
</script>

<style lang = "scss">
@import "../../stylesheets/particles/_variable.scss";
.order {
  width: 100%;
  .order-type {
    width: 100%;
    height: 1.066667rem;
    display: flex;
    .type-switch-btn {
      flex-grow: 1;
      width: 50%;
      line-height: 1.066667rem;
      font-size: 0.453333rem;
      font-weight: 500;
    }
    .choosing{
        color: $base-them-color;
        font-weight: 700;
        border-bottom: 2px solid $base-them-color;
    }
  }
}
</style>
