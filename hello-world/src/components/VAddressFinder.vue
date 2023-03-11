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
      <button class="btn btn-primary">Investigate</button>
    </div>
    <div class="row">
      <result-page></result-page>
    </div>
  </div>
</template>

<script>
import searchListed from './lib/searchListed.js'
import axios from 'axios';
import ResultPage from './ResultPage.vue'



export default {
  components: { ResultPage },
  data() {
    return {
      postcode: '',
      addresses: [],
      apikey: 'PCWYL-C4W5T-9VWP5-NAPNY',
      selectedAddress: '',
      selectedAddressJSON: {},
    };
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
      const address = this.$store.address
      if(address != ""){
        const result = searchListed(this.$store.address);
        console.log(result);
      }
    }
  },
};
</script>

<style></style>
