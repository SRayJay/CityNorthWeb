// import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import './theme/index.css'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import '@/components/global.js'
import '@/icons' // icon

/*global Vue*/
/*global ELEMENT */
Vue.use(ELEMENT)
Vue.prototype.$host = 'http://chengbei.site:8080'

Vue.prototype.getNowTime = function() {
  const date_ = new Date()
  const Y = date_.getFullYear()
  const M = date_.getMonth() + 1
  const D = date_.getDate()
  let H = date_.getHours()
  let Min = date_.getMinutes()
  let S = date_.getSeconds()
  H = H < 10 ? '0' + H : H
  Min = Min < 10 ? '0' + Min : Min
  S = S < 10 ? '0' + S : S
  const now_date = Y + '年' + M + '月' + D + '日 ' // eslint-disable-line no-unused-vars
  const now_time = H + ':' + Min + ':' + S // eslint-disable-line no-unused-vars
  return now_date + now_time
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
