<template>
    <li class="rest-item" @click="goToDetail">
        <img class="rest-img" :src= "info.pic" alt="">
        <div class="rest-intro-wrap">
            <h2 class = "rest-name">{{info.shopName}}</h2>
            <div class="actors">营业时间: {{info.startTime}}-{{info.endTime}}</div>
            <div class="about-info">￥{{info.startCost}} 起送 
              <span class="describ" v-if="info.startTime==='00:00'&&info.endTime==='24:00'">24H</span>
              <span class="describ" v-if="info.delivery">即时配送</span>
              <span class="describ" v-if="!info.deliveryCost">免配送费</span>
            </div>
            <p class="mark">{{info.mark.join('')}}</p>
        </div>
        <div class="entry-btn">进店</div>
    </li>
</template>

<script>
export default {
  props: ["info"],
  methods: {
    goToDetail() {
      //   this.$router.push({ name: 'detail', params: { id: this.info.id } })
      this.$router.push({
        name: "detail",
        params: { shopId: this.info._id },
        query: { name: this.info.name }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../stylesheets/particles/_variable.scss";
.rest-item {
  border-bottom:1px solid #cbcbcb; 
  .rest-img {
    height: 50px;
    width: 50px;
  }
  width: 100%;
  padding: 0.32rem 0.746667rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rest-intro-wrap {
    flex-grow: 1;
    text-align: left;
    padding: 0 0.2rem;
    .about-info {
      display: flex;
      .describ {
        display:inline-block;
        background-color:#ff9912;
        color:#fff; 
        padding:.026667rem .053333rem;
        border-radius:.053333rem;
        margin: 0 .053333rem;
        font-size:.266667rem; 
      }
    }
    .mark{
      font-size: .266667rem;
      color: #676767;
    }
    .rest-name {
      font-size: 0.453333rem;
      font-weight: 700;
      margin-bottom: 0.133333rem;
    }
  }
  .entry-btn {
    width: 1.253333rem;
    height: 0.72rem;
    background-color: $base-them-color;
    color: #ffffff;
    font-size: $middle-font-size;
    font-weight: 600;
    text-align: center;
    line-height: 0.72rem;
    border-radius: 0.106667rem;
  }
}
</style>
