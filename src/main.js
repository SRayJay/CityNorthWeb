// import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import './theme/index.css'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import '@/components/global.js'
import '@/icons' // icon

/*global Vue*/

Vue.use(ElementUI)
Vue.prototype.$host = 'http://chengbei.site:8080'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
