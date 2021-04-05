// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//前台去后台拿数据
import Resource from 'vue-resource'
import store from './vuex'

Vue.config.productionTip = false
//use()全局授权
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
