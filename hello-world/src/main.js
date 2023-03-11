import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import searchListed from './components/lib/searchListed.js'
// import json from './components/lib/property.json'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    showResultsPage: false,
    address: null,
    buildingAge: 10,
    listed: { isListed: false},
    propertyInfo: null,
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
    setPropData(state, payload){
      state.propertyInfo = payload
    },
  }, 
  actions: {
    async fetchProp ({ commit }) {
      commit('searchListed')
      commit('showResultsPage', true);
      let propData = await fetchRightMove();
      commit('setPropData', propData);


      let floodData = await fetchFlood(propData.latitude, propData.longitude);
      commit('setFloodData', floodData);
    }
  }
  

})

async function fetchFlood(lat, long){
  let response = await fetch(`https://localhost:7167/api/Proxy/Flood?Latitude=${lat}&Longitude=${long}`);
  let data = await response.json();
  console.log("floodData", data);
  return data;
}


async function fetchRightMove(){
  let response = await fetch("https://localhost:7167/api/Proxy/RightMove");
  let data = await response.json();
  console.log("PropertyData", data);
  return data.properties[0];
}


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
