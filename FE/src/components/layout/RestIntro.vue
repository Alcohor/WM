<template>
    
    <div class="rest-intro">
        <p class="words">
        {{this.introduce}}
        </p>
    </div>

</template>

<script>
    export default{
        props: ['introduce']
    }  
</script>

<style lang="scss">
    .words{
        padding: 0 .133333rem;
        text-align-last: left;
    }
</style>
