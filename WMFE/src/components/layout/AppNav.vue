<template>
    <div class="app-nav">
        <ul class="nav-wrap">
            <router-link  active-class="active" @click.native = "$emit('update:show', false)" tag = "li" to = "/home" class="nav-bar">
                <a href="" class="nav-link">
                    <i class="fa fa-home"></i>
                    <span class="nav-title">首页</span>
                </a>
            </router-link >
            <router-link active-class="active" @click.native = "$emit('update:show', false)" tag = "li" to = "/order" class="nav-bar"  >
                <a href="" class="nav-link">
                    <i class="fa fa-sticky-note"></i>
                    <span class="nav-title">订单</span>
                </a>
            </router-link>
            <router-link active-class="active" @click.native = "$emit('update:show', false)" tag = "li" to = "/mine" class="nav-bar">
                <a href="" class="nav-link">
                    <i class="fa fa-user-o"></i>
                    <span class="nav-title">我的</span>
                </a>
            </router-link>
            
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style lang = "scss">
@import "../../stylesheets/particles/_variable.scss";
.app-nav {
  box-shadow: 0 0 0.066667rem 0.066667rem rgba($color: #000000, $alpha: 0.1);
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 1.333333rem;
  width: 100%;
  .nav-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    .active {
      .nav-link {
            .fa {
                color: $base-them-color;
            }
            .nav-title {
                color: $base-them-color !important;
            }  
      }
    }
    .nav-bar {
      flex-grow: 1;
      height: 100%;
      background-color: #fff;
      .nav-link {
        color: #fff;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0.133333rem 0;

        i {
          color: rgb(142, 142, 142);
          font-size: 0.533333rem;
        }
        .nav-title {
          color: rgb(142, 142, 142);
          margin-top: 7px;
          font-size: $middle-font-size;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
