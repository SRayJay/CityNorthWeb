// import Vue from 'vue'
// import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
/*global Vue */
/*global Vuex */
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters

})

export default store
