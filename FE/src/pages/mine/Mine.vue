<template>
  <div class="mine">
    <common-header :isBackShow="isBackShow" :title="headerTitle"></common-header>
    <div class="user-facade-wrap" @click.stop="toUserInfo('user-info')">
      <img
        src="https://fuss10.elemecdn.com/a/29/a5da6c8edb150955f2286d7b1d371jpeg.jpeg?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/"
        alt
        class="user-portrait"
      >
      <div class="info-wrap">
        <span
          class="nickname"
          v-if="userInfo.nickName!==''"
        >{{userInfo.nickName}}</span>
        <span
          class="nickname"
          v-else
        >{{userInfo._id ? userInfo._id.slice(0,10) : '请登录'}}</span>
        <!-- <span class="tel-num">
          <i class="fa fa-mobile"></i> 131****2561
        </span> -->
      </div>
      <i class="fa fa-angle-right"></i>
    </div>
    <div class="menu-wrap">
      <mine-link :info="{title:'我的信息',icon:'fa-id-card',color:'#94D94A'}" @click.native.stop="toUserInfo('user-info')"></mine-link>
      <mine-link :info="{title:'我的地址',icon:'fa-paper-plane',color:'#4AA5F0'}" @click.native.stop="toUserInfo('adress')"></mine-link>
      <mine-link :info="{title:'投诉店铺',icon:'fa-thumbs-down',color:'#CB3848'}" @click.native.stop="toUserInfo('complaint')"></mine-link>
    </div>
    <app-nav></app-nav>
  </div>
</template>

<script>
import CommonHeader from "@c/common/CommonHeader";
import MineLink from "@c/layout/MineLink";
import AppNav from "@c/layout/AppNav";
import { mapGetters } from "vuex";
export default {
  components: {
    CommonHeader,
    MineLink,
    AppNav
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },

  data() {
    return {
      isBackShow: false,
      headerTitle: "我的",
    };
  },
  methods: {
    toUserInfo(target) {
      if (!this.userInfo._id) {
        this.$router.push({ name: 'login' });
        return;
      }
      this.$router.push({ name: target });
    }
  }
};
</script>

<style lang = "scss">
@import "../../stylesheets/particles/_variable.scss";
.mine {
  height: 100%;
  display: flex;
  flex-direction: column;
  .user-facade-wrap {
    padding: 0.666667rem 0.4rem;
    box-sizing: content-box;
    width: 9.2rem;
    height: 1.6rem;
    display: flex;
    background-color: $base-them-color;
    align-items: center;
    .user-portrait {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
    }
    .info-wrap {
      flex-grow: 1;
      display: flex;
      margin-left: 36px;
      flex-direction: column;

      .nickname {
        display: inline-block;
        font-size: 0.56rem;
        font-weight: 700;
        color: #fff;
        line-height: 1.066667rem;
        text-align: left;
      }
      .tel-num {
        color: #fff;
        text-align: left;
      }
    }
    .fa-angle-right {
      color: #fff;
      font-size: 0.666667rem;
    }
  }
  .menu-wrap {
    padding: 0.4rem 0;
    background-color: #f5f5f5;
  }
}
</style>
