<template>
    <li class="car-goods-item">
        <span class="goods-name">{{goodInfo.name}}</span>
        <span class="goods-price">￥{{goodInfo.price}}</span>
        <span class="goods-num">X {{goodInfo.num}}</span>
    </li>
</template>

<script>
    export default{
        props:['goodInfo']
    }
</script>

<style lang="scss">
    .car-goods-item{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 1.333333rem;
        padding: .133333rem .333333rem;
        span{
            height: 100%;
            line-height: 1.066667rem;
        }
        .goods-name{
            font-size: .426667rem;
            font-weight: 600;
            width: 4.666667rem;
            text-align: left;
            
        }
        .goods-price{
            color: #ff5339;
            font-size: .426667rem;
            font-weight: 700;
            flex-grow:1; 
        }
        .goods-price{
            flex-grow:1;
        }
    }
</style>