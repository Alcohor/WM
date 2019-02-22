
<template>
    <div class="app-home-swiper">
        <swiper  v-if = "billboards.length" :options= "swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide
                v-for = "billboard in billboards"
                :key  = "billboard"
            >
                <img class="acitve-pic" :src="billboard" :title= "billboard.name" :alt="billboard.name">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
    
</template>

<script>
    
  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
              el: '.swiper-pagination'
          },
          loop: true, 
          autoplay: true
        },
        billboards: []
      }
    },
    async beforeCreate () {
        let result = await this.$http({
            url: '/be/api/active/pic'
        })
        console.log(result.data.data)
        this.billboards = result.data.data
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    }, 
    mounted() {
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        //   console.log('this is current swiper instance object', this.swiper)
        //   this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style lang="scss">
    .app-home-swiper {
        height: 5.625067rem!important;
    }
    .acitve-pic {
        height: 5.625067rem!important;
        width: 100%;
    }
</style>

