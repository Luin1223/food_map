<template>
  <router-link to="/delicious">
  <PhMagnifyingGlass :size="24" />
  </router-link>
  <div v-if="apiKey && center" class="mt-4 p-2">
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
import {PhMagnifyingGlass} from '@phosphor-icons/vue';

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const center = ref({ lat: 24.9844808, lng: 121.3423518 }); // 銘傳大學桃園校區中心
const markerOptions = ref({ position: { lat: 24.9844808, lng: 121.3423518 } }); // 銘傳大學桃園校區地標
</script>