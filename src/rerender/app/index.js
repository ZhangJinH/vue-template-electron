import Vue from 'vue'

import App from './App.vue'

import initRouter from '../routes/index'
import initStore from '../stores/index'

import './style.styl'


new Vue({
  render: h => h(App),
  router: initRouter(),
  store: initStore()
}).$mount('#app')