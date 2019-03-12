<!--菜单组件-->
<template>
  <el-menu
    :collapse="collapsed"
    :router="true" 
    unique-opened
    default-active="1"
    background-color="#031529"
    style="border-right:0px;"
    text-color="#b7bcc2"
    active-text-color="#fff"
  >
    <template v-if="userInfo.userType === 1">
      <el-menu-item index="1" :route="{name: '首页'}">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" :route="{name: '用户管理'}">
        <template slot="title">
          <i class="el-icon-info"></i>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>商家管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" :route="{name: '商家信息维护'}">商家信息维护</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-bell"></i>
          <span>活动管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" :route="{name: '活动信息管理'}">活动信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span>投诉管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" :route="{name: '未处理投诉'}">未处理投诉</el-menu-item>
          <el-menu-item index="5-2" :route="{name: '已处理投诉'}">已处理投诉</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item index="1" :route="{name: '首页'}">
        <i class="el-icon-menu" style="margin-right: 10px"></i>
        首页
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>店铺管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" :route="{name:'店铺信息维护'}">店铺信息维护</el-menu-item>
          <el-menu-item index="2-2" :route="{name:'优惠活动上架'}">活动优惠上架</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>餐食管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" :route="{name:'餐食信息维护'}">餐食信息维护</el-menu-item>
          <el-menu-item index="3-2" :route="{name:'餐食上架'}">餐食上架</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" :route="{name:'新订单'}">
            <el-badge :value="newOrder.length" :max="99" class="item" :hidden="!newOrder.length">
              新订单
            </el-badge>
          </el-menu-item>
          <el-menu-item index="4-2" :route="{name:'进行中订单'}">进行中订单</el-menu-item>
          <el-menu-item index="4-3" :route="{name:'已完成订单'}">已完成订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
// 导入vuex状态
import { getMenus } from "../../service/api";
import { mapMutations, mapGetters, mapActions } from "vuex";
import Cookies from "js-cookie";
import axios from "axios";
import Vue from 'vue'
export default {
  name: "LeftMenu",
  data() {
    return {
      menus: []
    };
  },
  props: ["collapsed"],
  computed: {
    ...mapGetters("user", ["userInfo"]),
    ...mapGetters("order", ["newOrder"])
  },
  methods: {
    ...mapActions("shop", ['GET_SHOP_ID']),
    ...mapActions("user", ['GET_USER_INFO']),
    getMenus() {
      // 从sessionStorage中加载用户menu信息
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        this.menus = user.menus;
      }
    }
  },
  async created() {
    await this.GET_USER_INFO()
    this.GET_SHOP_ID()
  },
};
</script>

<style>
ul.el-menu > li > ul > li.is-active {
  background: rgb(62, 144, 254) !important;
}
ul.el-menu > li.is-active {
  background: rgb(62, 144, 254) !important;
}
ul.el-menu > li > ul > li {
  background: rgb(1, 12, 23) !important;
}
ul.el-menu > li > ul > li .el-submenu__title {
  background: rgb(1, 12, 23) !important;
}
</style>