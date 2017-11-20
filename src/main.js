// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'
import { currency } from './util/currency'

Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.use(VueLazyLoad,{
    loading: '/static/loading-svg/loading-bars.svg'
})

Vue.config.productionTip = false;
Vue.filter('currency', currency);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
