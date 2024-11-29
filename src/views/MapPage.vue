<template>
  <div v-if="apiKey && center">
    <GoogleMap
      :api-key="apiKey"
      :center="center"
      :zoom="12"
      style="height: 400px; width: 100%;"
    >
      <Marker :options="markerOptions" />
    </GoogleMap>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const center = ref({ lat: 25.12662, lng: 121.45747 });
const markerOptions = ref({ position: { lat: 25.12662, lng: 121.45747 } });
</script>