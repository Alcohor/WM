<!--404找不到页面提示页-->
<template>
    <span class="page-container">
        <p><br/><br/><br/><br/><br/><br/><br/><br/><span style="font-size:50px;">404 您访问的页面不存在1</span><br/><br/><router-link :to="{ path: 'home' }" style="text-align:center;">返回主页</router-link></p>
    </span>
</template>

<style lang="scss" scoped>
    .page-container {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
</style>