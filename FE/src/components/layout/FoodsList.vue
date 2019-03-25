<template>
  <div>
    <ul class="foods-list" v-if="info.length">
      <foods-item :shop-id="shopId" v-for="item in info" :shop-name="shopName" :key="item.id" :info="item">{{item}}</foods-item>
    </ul>
    <div v-else>
      <p>这家店还没有餐食，去别家看看吧！</p>
    </div>
  </div>
</template>

<script>
import FoodsItem from "@c/common/FoodsItem";
import axios from 'axios'
export default {
  name: "foods-list",
  computed: {
    shopName() {
      return this.$route.query.shopName
    }
  },
  data(){
      return {
          info: [],
      }
  },
  methods: {
    getFoodsList() {
      axios
        .get("/be/api/foods/list", {
          params: {
            shopId: this.$route.query.shopId
          }
        })
        .then(data => {
          if (data.data.data.length) {
            this.info = data.data.data;
          } else {
            this.info = [];
          }
        });
    }
  },
  created() {
    this.shopId = this.$route.query.shopId;
    this.getFoodsList();
  },
  components: {
    FoodsItem
  }
};
</script>

<style>
.foods-list {
  padding-bottom: 1.4rem;
}
</style>

