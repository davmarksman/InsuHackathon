<template>
  <div class="container">
    <div class="form-group">
      <label for="postcode">Postcode</label>
      <input v-model="postcode" type="text" @blur="findAddresses()" />
    </div>

    <div class="form-group">
      <label for="address">Addresses</label>
      <select
        name="addresses"
        id=""
        v-model="selectedAddress"
        @change="setSelected($event, $event.target.selectedIndex)"
      >
        <option v-for="(address, index) in addresses" v-bind:key="index">
          {{ address.summaryline }}
        </option>
      </select>
    </div>
    <div class="row">
      <button class="btn btn-primary" @click="investigate">Investigate</button>
    </div>
    <div class="row">
      <result-page v-if= "showResultsPage"></result-page>
    </div>
    <div class="row">
      <property-card v-if="showResultsPage"></property-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ResultPage from './ResultPage.vue'
import PropertyCard from './PropertyCard.vue';
import { mapState } from 'vuex'



export default {
  components: { ResultPage, PropertyCard },
  data() {
    return {
      postcode: '',
      addresses: [],
      apikey: 'PCWYL-C4W5T-9VWP5-NAPNY',
      selectedAddress: '',
      selectedAddressJSON: {},
    };
  },
  computed: {
    ...mapState([
      'showResultsPage',
    ]),
  },
  methods: {
    findAddresses() {
      if (this.postcode != '') {
        axios
          .get('https://ws.postcoder.com/pcw/' + this.apikey + '/address/uk/' + this.postcode)
          .then((response) => (this.addresses = response.data));
      }
    },
    setSelected(event, index) {
      const payload = {
        address: this.addresses[index],
      };
      this.$store.commit('setAddress', payload);
    },
    investigate(){
      if(this.$store.state["address"] != null){

        console.log("investigate")
        this.$store.dispatch("fetchProp")
      }else{
        alert("Pick Something")
      }

    }
  },
};
</script>

<style></style>
