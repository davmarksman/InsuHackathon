<template>
  <div class="card">
    <h5 class="card-title"></h5>
    <div class="card-body">
        <p class="fw-bold">Address</p>
        <p 
          v-for="(line, index) in company.registered_office_address"
          v-bind:key="index"
        >
          {{ line }}
        </p>

        <p class="fw-bold">Date Founded</p>
        <p>{{ company.date_of_creation }}</p>

      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
        ...mapState(['company'])
    }    
}
</script>

<style>

</style>