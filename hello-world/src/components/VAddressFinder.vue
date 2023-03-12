<template>
  <div>
    <div class="container-sm">
      <div class="form-group mb-3 mt-4">
        <label for="postcode" class="mb-2 ps-1">Postcode</label>
        <input class="form-control" v-model="postcode" type="text" @blur="findAddresses()" />
      </div>
  
      <div class="form-group mb-3">
    
        <label for="address" class="mb-2 ps-1">Addresses</label>
        <select
          class="form-control"
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
      <div class="form-group mb-3">
        <label for="company-number" class="mb-2 ps-1">Company Reference Number</label>
        <input class="form-control mb-3" type="text" v-model="companyRegistrationNumber">
      </div>
      <div class="row mx-0">
        <button class="btn btn-primary px-0" @click="investigate">Investigate</button>
      </div>
    </div>


    <div class="row">
      <result-page v-if= "showResultsPage"></result-page>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import ResultPage from './ResultPage.vue'
import { mapState } from 'vuex'



export default {
  components: { ResultPage },
  data() {
    return {
      postcode: '',
      addresses: [],
      apikey: 'PCWYL-C4W5T-9VWP5-NAPNY',
      selectedAddress: '',
      selectedAddressJSON: {},
      companyRegistrationNumber:''
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
    async investigate(){
      if(this.$store.state["address"] != null && this.companyRegistrationNumber !=null){

        console.log("investigate")
        this.$store.dispatch("fetchProp")
        this.$store.dispatch("fetchCompany", this.companyRegistrationNumber)
      }else{
        alert("Pick Something")
      }


    }
  },
};
</script>

<style></style>
