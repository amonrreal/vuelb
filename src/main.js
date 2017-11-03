require('../node_modules/bootstrap/scss/bootstrap.scss')

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant/dist/vue-instant.common'

Vue.use(VueInstant)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },

  store
})
