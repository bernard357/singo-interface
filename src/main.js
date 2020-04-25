import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false

Vue.directive('focus', {     // register a global custom directive called `v-focus`
  inserted: function (el) {  // when the bound element is inserted into the DOM...
    el.focus()               // focus the element
  }
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
