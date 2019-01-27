<template>
    <ul class="foods-list"> 
        <foods-item v-for="item in info" :key="item.id" :info="item">{{item}}</foods-item>
    </ul>
</template>

<script>
import FoodsItem from '@c/common/FoodsItem'
export default{
    name:"foods-list",
     created(){
            this.info = this.$route.query.info
        },
    components:{
        FoodsItem
    }
}
</script>

<style>
.foods-list{
    padding-bottom:1.4rem;
}
</style>

