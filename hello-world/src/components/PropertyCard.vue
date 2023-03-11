<template>
  <div class="card">
    <div class="carousel slide" id="image-carousel">
      <div class="carousel-inner">
        <div
          v-for="(image, index) in propertyInfo.thumbnailPhotos"
          :key="index"
          :class="index === 0 ? 'carousel-item active' : 'carousel-item'"
        >
          <img class="d-block w-100" :src="image.url" :alt="image.name" />
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="card-body">
      <h5 class="card-title">{{ propertyInfo.address }}</h5>
      <p class="card-text">
        Bedrooms: {{ propertyInfo.bedrooms }} |
        Value: £{{ propertyInfo.price }} |  
        Type: {{ propertyInfo.propertyType }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["propertyInfo"]),
  },
};
</script>

<style>
.card {
  width: 18rem;
  margin: 0 auto;
}
</style>