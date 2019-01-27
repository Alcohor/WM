<template>
    <div class="mine-link"> 
        <i :class = 'info.icon' class="fa" :style="{color:info.color}" ></i>
        <span class="title">{{info.title}}</span>
        <i class="fa fa-angle-right"></i>
    </div>
</template>

<script>

export default{
    
    props:['info']
}
</script>

<style lang="scss">
.mine-link{
    height: 1.2rem;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    i.fa{
        font-size: .533333rem;
        margin: 0 .4rem 0 .4rem;
    }
    .title{
        font-size: .426667rem;
        font-weight: 500;
        flex-grow: 1;
        text-align: left;
        color: #444;
    }
}
</style>
