// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import Vuex from 'vuex'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts/components/ECharts';
import Mock from './mock'
import VueSocketIO from 'vue-socket.io';
// import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio('ws://localhost:9091'));
// Vue.use(VueSocketio, 'ws://localhost:9091');

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'ws://localhost:9091',
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // }
}))
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(ECharts)


Vue.config.productionTip = false

Mock.bootstrap();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.filter('getYMD',function(input){
	return input.split(' ')[0];
})