<template>
  <ul class="foods-list">
    <foods-item v-for="item in info" :key="item.id" :info="item">{{item}}</foods-item>
  </ul>
</template>

<script>
import FoodsItem from "@c/common/FoodsItem";
import axios from 'axios'
export default {
  name: "foods-list",
  data(){
      return {
          info: []
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

