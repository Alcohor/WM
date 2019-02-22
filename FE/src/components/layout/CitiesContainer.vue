<template>
    
    <div class="cities-container">
        <section>
            <h1 class="cities-type">{{info.title}}</h1>
            <div class="main-wrap">
                <div class="cities-item" v-for="item in info.cities" :key="item.id">{{city?city:item.name}}</div>
            </div>
        </section>
    </div>

</template>

<script>
    export default{
        props:['info','city'],
        created() {
        
    }, 
    } 
    
</script>

<style lang="scss">
.cities-container{
    width: 100%;
    padding: .2rem;
    background-color: #ebebeb;
    .cities-type{
        text-align: left;
        height: .8rem;
        line-height: .8rem;
        margin: 0;
        
    }
    .main-wrap{
        padding: .333333rem 0;
        background-color: #f7f7f7;
        display:flex;
        flex-wrap: wrap;
        justify-content:space-around;
        align-items: center;
        .cities-item{
            margin-top: 15px;
            height: .8rem;
            padding: 0 .066667rem;
            background-color: #fff;
            min-width: 2.826667rem;
            border-radius:.093333rem; 
            text-align: center;
            line-height: .8rem;
            flex-shrink: 0; 
        }
    }

}
</style>
