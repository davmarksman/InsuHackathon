<template>
  <div>
    <h1 class="container text-center mt-4">
      Property Proposal Peek
    </h1>
    <v-address-finder></v-address-finder>
  </div>
</template>

<script>
import VAddressFinder from './components/VAddressFinder.vue'

export default {
  name: 'App',
  components: {
    VAddressFinder
  },

}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1{
  font-family: 'Climate Crisis', cursive;
}

</style>
