import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import searchListed from './components/lib/searchListed.js'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    showResultsPage: false,
    address: null,
    buildingAge: 10,
    listed: { isListed: false}
  },
  mutations: {
    setAddress(state, payload){
      state.address = payload.address
    },
    searchListed(state){
      console.log("searchListed");
      state.listed = searchListed(state.address);
    },
    showResultsPage(state, payload){
      state.showResultsPage = payload
    }
  }, 
  actions: {
    fetchProp ({ commit }) {
      commit('searchListed')
      commit('showResultsPage', true);
    }
  }
  

})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
