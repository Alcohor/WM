<!--
***系统主窗体布局***
-->
<template>
    <el-container v-loading="sysloading">
        <!--左侧-->
        <el-aside :class="collapsed?'aside-mini':'aside-long'" width="collapsed?'65px':'220px'">
            <!--LOGO-->
            <el-col :span="24" :class="collapsed?'logo-mini':'logo-long'">
                <!-- {{collapsed?logoMiniName:logoLongName}} -->
            </el-col>
            <el-col :span="24">
                <!--菜单-->
                <LeftMenu :collapsed="collapsed"></LeftMenu>
            </el-col>
        </el-aside>
        <!--右侧-->
        <el-container>
            <!--头部-->
            <el-header class="header">
                <el-col :span="12">
                    <el-button style="margin-left:10px;" @click="collapse"><i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i></el-button>
                </el-col>
                <el-col :span="12" style="text-align:right;"><UserInfo></UserInfo></el-col>
            </el-header>
            <!--BODY-->
            {{orderCount}}
            <el-main :class="collapsed?'main-mini':''">
                <el-col :span="24" style="background-color:#fff;height:71px;;">
                    <!--面包屑-->
                    <Breadcrumb></Breadcrumb>
                </el-col>
                <el-col :span="24" style="background-color:#fff; border: 20px solid #f0f2f5; padding: 20px;">
                    <!--主体内容路由视图-->
                    <router-view></router-view>     
                </el-col>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
//引入菜单、面包屑、用户信息组件
import LeftMenu from '@/views/components/LeftMenu'
import UserInfo from '@/views/components/UserInfo'
import Breadcrumb from '@/views/components/Breadcrumb'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import axios from 'axios';
	export default{
		name:'Main',
		components:{
			LeftMenu,
      UserInfo,
      Breadcrumb
		},
    computed:{
      ...mapGetters('app',['logoLongName','logoMiniName','collapsed','sysloading']),
      ...mapGetters("user", ["userInfo"]),
      ...mapGetters("shop", ["shopId"]),
      ...mapGetters('order', ['orderCount'])
    },
		data(){
			return{
        isLogin: true,
        tID: null
      }
		},
		methods: {
      ...mapActions(['setLogoLongName','setLogoMiniName','setCollapsed','setSysLoading']),
      ...mapMutations('order', ['SET_ORDERS']),
			//折叠导航栏，状态保存在sessionStorage中刷新保持状态
			collapse:function(){
				let collapse=!this.collapsed;
        this.setCollapsed(collapse);
        //将菜单的打开状态保存到浏览器的localStorage中
        localStorage.setItem('collapsed',collapse);
      },
      checkLogin(){
        axios.get('/be/api/admin/isLogin').then(
          data => {
            if(data.data.code === 200){
              this.isLogin = data.data.data;
            }else{
              this.isLogin=false;
            }
          }
        )
      }
    },
    
    watch:{
      isLogin: {
        handler: function() {
          if(!this.isLogin){
            this.$message.warning('您未登录，跳转至登录页')
            window.location.href = '/#/login'
          }
        }
      },
      orderCount:  function(nv) {
        this.$message.success(`您有${nv}个新订单，请前往查看`)
      }
    },
     mounted(){
      //先从浏览器localStorage中读出菜单状态
      this.setCollapsed(localStorage.getItem('collapsed')=="true");
      this.checkLogin()
      //系统加载显示延迟一秒
      setTimeout(() => {
        this.setSysLoading(false);
      }, 1000);
      this.tID = setInterval(() => {
          axios.get('/be/api/order/list', {
            params: {
              shopId: this.shopId
            }
          }).then(
          data => {
            if(data.data.code === 200){
              let orders = data.data.data.orderList
              this.$store.commit('order/SET_ORDER', orders)
            }else{
              this.isLogin=false;
            }
          }
        )
      }, 5000)
    },
    beforeDesotry() {
      clearInterval(this.tID)
    }
	}
</script>

<style scoped>
  /*容易样式*/
  .el-container {
    height: 100%;
  }
  .logo-long,
  .logo-mini {
    color:#fff;
    font-size:25px;
    width:260px;
    text-align: center;
    background-color: #072140;
  }
  .logo-long {
    height: 60px;
    line-height: 60px;
  }
  .el-aside {
    background: #000;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 6;
    -webkit-box-shadow: 1px 1px 7px #333;
    -moz-box-shadow: 1px 1px 7px #333;
    -o-box-shadow: 1px 1px 7px #333;
  }
  .aside-long, .aside-mini{
  	background-color:#031529;
    width: 260px;
    height: 100%;
    
    overflow-y: auto;
  }
  .aside-mini {
    width: 65px;
    overflow: inherit;
  }

  /*右侧*/
  .header {
    padding-left: 0px;
    background-color: #fff;
    color: #333;
    line-height: 60px;
    height:60px;
    color:#fff;
    width: 100%;
    z-index: 5;
    box-shadow: 1px 1px 5px #ccc;
    -webkit-box-shadow: 1px 1px 5px #ccc;
    -moz-box-shadow: 1px 1px 5px #ccc;
    -o-box-shadow: 1px 1px 5px #ccc;
  }
  
  .logo-mini  {
    width:65px;
    height: 60px;
    line-height: 60px;
  }
  .el-main {
    background-color: #f0f2f5;
    width: 100%;
    padding: 0;
  }
  
  .el-menu--collapse .el-submenu .el-menu {
    display: block;
  }
  .el-menu-item {
    -webkit-transition: 0s !important;
    transition: 0s !important;
    background: #f00;
  }
</style>