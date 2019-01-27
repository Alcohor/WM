<template>
    <ul class="comment-list"> 
        <comment-item ></comment-item>
    </ul>
</template>

<script>
import CommentItem from '@c/common/CommentItem'
export default{
    
    components:{
        CommentItem
    }
}
</script>

<style lang="scss">
.comment-list{
    padding: 0 .266667rem
}
</style>

