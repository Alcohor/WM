<template>
    <div class="order-item">
        <div class="order-img">
            <img src="http://p0.meituan.net/128.180/movie/363e3a7e614d29b2847ff4e62afcd3f42168651.jpg" alt="">
        </div>
        <div class="order-info">
            <div class="order-main-title">
                <a href="" class="order-rest"> <div class="rest-name">大西北面食城<i class="fa fa-angle-right"></i></div> 
                </a>
                <span class="order-status">{{data.status===0 ? '已付款' : '已完成'}}</span>
            </div>
            <span class="order-create-time">{{time}}</span>
            <div class="goods-info">
                <div class="goods-title">{{orderInfo}}</div>
                <div class="order-price">￥{{data.sum}}</div>
            </div>
            <mt-button  class="comment-btn" type="primary" size="small" v-if="type ==='order-complete'">去评价</mt-button>
            <mt-button  class="comment-btn" type="primary" size="small" @click="submit(data._id)" v-else>确认收货</mt-button>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'mint-ui'
import {mapMutations} from 'vuex'
import moment from 'moment'
export default {
  props:{
    type: {
      type: String,
      default: 'order-complete'
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    orderInfo(){
      if (this.data.list.length===1){
        return `${this.data.list[0].name} ${this.data.list[0].num}件商品`
      }
      return `${this.data.list[0].name} 等商品`
    },
    time(){
      return moment(this.data.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      status: "进行中"
    };
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        this.status = this.type === "order-underway" ? "进行中" : "订单已完成";
      }
    }
  },
  methods: {
    ...mapMutations('order',['COMMIT_GOOD']),
    submit(_id){
      axios.post('be/api/order/updata-status', {
        _id:_id,
        status: 2
      }).then(data => {
        if(data.data.code ===200 && data.data.data.nModified===1){
          Toast('确认收货成功')
          this.COMMIT_GOOD(_id)
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import "../../stylesheets/particles/_variable.scss";
.order-item {
  padding: 0.333333rem 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  .order-img {
    width: 1.333333rem;
    height: 1.333333rem;
    margin-right: 0.333333rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .order-info {
    flex-grow: 1;
    .order-main-title {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      .order-rest {
        text-align: left;
        font-size: 0.466667rem;
        line-height: 0.533333rem;
        color: #333;
        display: flex;
        flex-direction: column;
        .rest-name{
            .fa-angle-right{
                margin-left: .133333rem;
            }
        }
      }
    }
    .order-create-time {
        display: inline-block;
        width: 100%;
        font-size: 0.293333rem;
        font-weight: 300;
        text-align: left;
        color: #999;
    }
    .goods-info {
      display: flex;
      justify-content: space-between;
      line-height: 1.066667rem;
    }
    .comment-btn {
      float: right;
    }
  }
}
</style>

