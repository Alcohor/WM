<template>
  <div v-if="results" class="detail">
    <common-header :isBackShow="isBackShow" :title="results.shopName"></common-header>
    <div class="rest-intro-wrap">
      <img :src="results.pic" alt class="rest-img">
      <div class="words-intro">
        <h1 class="rest-main-title">{{results.nm}}</h1>
        <div class="rest-sale-info">
          <span class="gread">顾客评分：
            <mark>8.9</mark>
          </span>
          <span class="sale-vol">月售：
            <span>{{results.wish}}</span>单
          </span>
          <div class="time">营业时间: {{results.startTime}}-{{results.endTime}}</div>
          <div class="about-info">
            ￥{{results.startCost}} 起送
            <span
              class="describ"
              v-if="results.startTime==='00:00'&&results.endTime==='24:00'"
            >24H</span>
            <span class="describ" v-if="results.delivery">即时配送</span>
            <span class="describ" v-if="!results.deliveryCost">免配送费</span>
          </div>
          <p class="mark">{{results.mark.join('')}}</p>
        </div>
      </div>
    </div>
    <div class="rest-content">
      <router-link
        :to="{name:'foods-list',query:{shopId}}"
        tag="div"
        class="rest-menu-btn"
      >点餐</router-link>
      <router-link :to="{name:'rest-introduce', query:{shopId}}" tag="div" class="rest-menu-btn">商家</router-link>
      <router-link :to="{name:'comment-list', query:{shopId}}" tag="div" class="rest-menu-btn">评论</router-link>
    </div>
    <keep-alive>
      <router-view :introduce="results.notice"></router-view>
    </keep-alive>

    <cart></cart>
  </div>
</template>

<script>
import CommonHeader from "@c/common/CommonHeader";
import FoodsList from "@c/layout/FoodsList";
import Cart from "@c/common/Cart";
import axios from "axios";
export default {
  components: {
    CommonHeader,
    FoodsList,
    Cart
  },
  props: ["id"],
  data() {
    return {
      results: null,
      isBackShow: true,
      shopId:this.$route.params.id
    };
  },
  async created() {
    axios
      .get(`/be/api/shop/shopInfoById?id=${this.$route.params.shopId}`)
      .then(data => {
        this.results = data.data.data;
        console.log(this.results, 23848209384);
      });
      this.$router.push({
        name: "foods-list",
        query: {shopId:  this.$route.params.shopId}
      });
  }
};
</script>

<style lang = "scss">
@import "../../stylesheets/particles/_variable.scss";
.detail {
  width: 100%;
  .rest-intro-wrap {
    padding: 0.2rem 0.266667rem;
    .rest-img {
      width: 2rem;
      height: 2rem;
      display: inline-block;
    }
    .words-intro {
      margin-top: 0.4rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid $base-them-color;
      h1.rest-main-title {
        font-size: 0.546667rem;
        font-weight: 700;
      }
    }
  }
  .rest-content {
    padding: 0 0.2rem;
    width: 100%;
    height: 1.066667rem;
    line-height: 1.066667rem;
    display: flex;
    .rest-menu-btn {
      flex-grow: 1;
    }
    .router-link-active {
      color: $base-them-color;
    }
  }
}
</style>
