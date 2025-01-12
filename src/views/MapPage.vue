<template>
  <div id="map" style="width: 100%; height: 500px;"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

onMounted(() => {
  const map = L.map('map').setView([24.9844808, 121.3423518], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  L.marker([24.9844808, 121.3423518]).addTo(map)
    .bindPopup('銘傳大學桃園校區')
    .openPopup();
});
</script>