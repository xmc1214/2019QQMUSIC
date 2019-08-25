// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import { Dialog, Divider, Toast, PullRefresh, Grid, GridItem, Image } from 'vant'
import api from './request/api'
Vue.use(Toast);
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(PullRefresh)
Vue.use(Grid).use(GridItem).use(Image)
Vue.use(VueLazyLoad, {
    loading: require('common/image/logo.png')
})

Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$api = api
fastclick.attach(document.body)
Vue.config.productionTip = false
console.log('test')
import 'common/stylus/index.styl'
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})