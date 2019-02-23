<template>
    <li class="foods-item">
        <img class="foods-img" :src= 'info.pic'>
        <div class="foods-intro-wrap">
            <h2 class = "foods-name">{{info.name}}</h2>
            <div class="price">
                <span>单价:￥{{info.price}}</span>
                <mark>7.9</mark>
            </div>
        </div>
        <el-input-number size="mini" class="number-input" @change = "addGoodsHandler" v-model = "num" :min="0" :max="10" label="描述文字"></el-input-number>
    </li>
</template>

<script>
import { mapActions } from 'vuex'
    export default{
        props:['info'],
        data(){
            return{
                num:0,
            }
        },
        created(){
            console.log(this.num,111)
        },
        methods:{
            ...mapActions({
                addGoods:'cart/addGoods'
            }),
            addGoodsHandler(val,oldval){
                console.log(this.num)
                let control_type=oldval<val
                let {id,name,price}= this.info
                this.addGoods({
                    id,name,price,num:this.num
                })
            }
        }
    }
</script>

<style lang="scss">
@import "../../stylesheets/particles/_variable.scss";
.foods-item {
    width: 100%;
    padding: 0.32rem 0.746667rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #aaa;
  .foods-img {
    width: 2rem;
    height: 2rem;
  }
  .foods-intro-wrap {
    padding: 0 0.2rem;
    .foods-name {
      font-size: 0.453333rem;
      font-weight: 700;
      margin-bottom: 0.133333rem;
    }
  }
  .addto-cart-btn {
    width: 0.72rem;
    height: 0.72rem;
    background-color: $base-them-color;
    color: #ffffff;
    font-size:.666667rem;
    font-weight: 900;
    text-align: center;
    line-height: 0.72rem;
    border-radius: 50%;
  }
}
</style>
