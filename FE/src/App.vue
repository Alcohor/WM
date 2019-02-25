<template>
  <div id="app">
    <main>
      <keep-alive include="app-home">
        <router-view></router-view>
        <input type="text">
      </keep-alive>
    </main>
  </div>
</template>

<script>

import axios from 'axios'
import {mapActions} from 'vuex'
export default {
  name: "app",
  components: {},
  methods: {
    ...mapActions('user',['GET_USER_INFO']) 
  },
  mounted() {
    this.GET_USER_INFO();
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>