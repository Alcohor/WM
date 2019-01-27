<template>
    <div class="order-item">
        <div class="order-img">
            <img src="http://p0.meituan.net/128.180/movie/363e3a7e614d29b2847ff4e62afcd3f42168651.jpg" alt="">
        </div>
        <div class="order-info">
            <div class="order-main-title">
                <a href="" class="order-rest"> <div class="rest-name">大西北面食城<i class="fa fa-angle-right"></i></div> 
                </a>
                
                <span class="order-status">{{status}}</span>
            </div>
            <span class="order-create-time">2018-10-30 11:31</span>
            <div class="goods-info">
                <div class="goods-title">金汤肥牛面等3件商品</div>
                <div class="order-price">￥57.6</div>
            </div>
            <span class="comment-btn" v-if="type ==='order-complete'">去评价</span>
      </div>
   </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      status: "进行中"
    };
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        console.log(this.top);
        this.status = this.type === "order-underway" ? "进行中" : "订单已送达";
      }
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
      width: 1.453333rem;
      height: 0.8rem;
      display: inline-block;
      line-height: 0.72rem;
      border: 3px solid $base-them-color;
      color: $base-them-color;
      border-radius: 0.133333rem;
      float: right;
    }
  }
}
</style>

