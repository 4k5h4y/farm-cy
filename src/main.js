import Vue from 'vue'
import App from './App.vue'
import wb from './registerServiceWorker'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import VueRouter from 'vue-router'

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
