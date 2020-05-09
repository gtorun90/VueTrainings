import Vue from 'vue'
import App from './App.vue'
import {router} from './router/router' 
import {store} from './store/store'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
Vue.use(VueResource)
Vue.use(Vuelidate)

Vue.filter('upper',(value) =>{
  return value.toLocaleUpperCase('tr-TR');
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
