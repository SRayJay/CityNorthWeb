import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './theme/index.css'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import '@/icons' // icon

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
