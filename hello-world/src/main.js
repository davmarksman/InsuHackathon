import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    address: "",
    buildingAge: 10
  },
  mutations: {
    setAddress(state, payload){
      state.address = payload.address
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
