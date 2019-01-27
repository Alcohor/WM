<template>
    <li class="rest-item" @click="goToDetail">
        <img class="rest-img" :src= "info.img|getImgUrl" alt="">
        <div class="rest-intro-wrap">
            <h2 class = "rest-name">{{info.nm}}</h2>
            <div class="grade">
                <span>观众评</span>
                <mark>7.9</mark>
            </div>
            <div class="actors">主演:郭达斯坦森</div>
            <div class="about-info">今天2018家影院放映2020场</div>
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
        name: "rest-introduce",
        params: { id: this.info.id },
        query: { name: this.info.name }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../stylesheets/particles/_variable.scss";
.rest-item {
  .rest-img {
    height: 100%;
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
