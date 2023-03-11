<template>
  <div>
    <label for="postcode">Postcode</label>
    <input v-model="postcode" type="text" @blur="findAddresses()" />

    <label for="address">Addresses</label>
    <select name="addresses" id="" v-model="selectedAddress" @change="setSelected($event, $event.target.selectedIndex)">
      <option v-for="(address, index) in addresses" v-bind:key="index">
        {{ address.summaryline }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      postcode: "",
      addresses: [],
      apikey: "PCWYL-C4W5T-9VWP5-NAPNY",
      selectedAddress: '',
      selectedAddressJSON: {}
    };
  },
  methods: {
    findAddresses() {
      if (this.postcode != "") {
        axios
          .get(
            "https://ws.postcoder.com/pcw/" +
              this.apikey +
              "/address/uk/" +
              this.postcode
          )
          .then((response) => (this.addresses = response.data));
      }
    },
    setSelected(event, index){
      this.selectedAddressJSON = this.addresses[index]
    }

  },
};
</script>

<style>
</style>