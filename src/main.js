// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store.js'
import vuelidate from 'vuelidate'

// Require the main Sass manifest file
require('./assets/sass/main.scss')

axios.defaults.baseURL = process.env.DB_URL;

Vue.config.productionTip = false

//This is how we inject a lot of third party packages in Vue
Vue.use(vuelidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
