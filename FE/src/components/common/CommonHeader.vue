<template>
    
    <header class="app-header">
        <div class="header-main">
            <span v-if= "isBackShow" class="back-wrap" @click= "back">
                <i class = 'fa fa-angle-left back-btn'></i> 
            </span>
            <h1 class="title">{{title}}</h1>
        </div>
    </header>
</template>

<script>

    export default{
        props:['title',"isBackShow"],
        name: 'app-header',
        data(){
            return{ }
        },
        methods:{
            back(){
                this.$router.push({name:"home"})
            }
        },
    
    }
</script>

<style lang = "scss">
    @import '../../stylesheets/particles/_variable.scss';
    .app-header{
        .header-main{
            width: 100%;
            box-sizing: border-box;
            padding:.266667rem .373333rem 0 .373333rem;
            height: 1.186667rem;
            background-color: $base-them-color;
            color: #ffffff;
            .back-wrap{
                width: .933333rem;
                height: .933333rem;
                left: .373333rem;
                display: inline-block;
                position: absolute;
                .back-btn {
                    width: 100%;
                    height: 100%;
                    font-size: .666667rem;
                }
            }
            
            .title {
                text-align: center;
                font-size: 0.453333rem;
                font-weight: 700;
             }
        }
    }
</style>
