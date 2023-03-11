import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import searchListed from './components/lib/searchListed.js'
import json from './components/lib/property.json'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    showResultsPage: false,
    address: null,
    buildingAge: 10,
    listed: { isListed: false},
    propertyInfo: json.properties[0],
    floodData: null,
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
    },
    setFloodData(state, payload){
      state.floodData = payload
    },
  }, 
  actions: {
    async fetchProp ({ commit }) {
      commit('searchListed')
      commit('showResultsPage', true);
      let floodData = await fetchFlood();
      commit('setFloodData', floodData);
    }
  }
  

})

async function fetchFlood(){
  let response = await fetch("https://localhost:7167/api/Proxy/Flood?Latitude=51.5136056&Longitude=-0.0520536");
  let data = await response.json();
  console.log(data);
  return data;
}

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
