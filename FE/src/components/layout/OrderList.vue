<template>
    <ul class="order-list"> 
        <order-item :type ="type" ></order-item>
    </ul>
</template>

<script>
import OrderItem from '@c/common/OrderItem'
export default{
    components:{
        OrderItem
    },
    props:['type']
}
</script>

<style lang="scss">
.order-list{
    padding: .533333rem .266667rem
}
</style>

