import Vue from 'vue'

import '@utils/filters'
import ajax from '@utils/axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import cities from '@utils/cities'
import bus from '@utils/bus'

import { Lazyload,Toast } from 'mint-ui';


Vue.component(Toast.name, Toast);

Vue.use(Lazyload);

Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = ajax
Vue.prototype.$cities = cities
Vue.prototype.$bus = bus