import Vue from 'vue'
import App from './App.vue'

import '@styles/main.scss'//引入全局样式
import '@libs/flexible'//手淘移动端适配
import 'mint-ui/lib/style.css'
import '@libs'
import router from './router'
import store from './store/index'
import mintUI from 'mint-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
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

Vue.use(ElementUI)
Vue.use(mintUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
