<template>
  <div class="relative">
    <!-- 搜索框 -->
    <label class="input absolute top-5 left-3 right-3 flex items-center space-x-2 z-10 rounded-full">
      <PhMagnifyingGlass :size="24" />
      <input type="search" class="grow rounded-full" placeholder="Search" />
    </label>

    <!-- 列表圖標 -->
    <div class="absolute right-3 bottom-5 transform p-3 bg-blue-500 rounded-full z-20 w-12 h-12 flex justify-center items-center">
      <router-link to="/delicious">
        <PhListBullets :size="24" class="text-white" />
      </router-link>
    </div>

    <!-- Google 地圖容器 -->
    <div id="map" class="w-full h-[600px]"></div>
  </div>
</template>



<script setup>
import { onMounted,ref } from 'vue';
import {PhListBullets,PhMagnifyingGlass} from '@phosphor-icons/vue';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// 確保 Google Maps API 只載入一次
const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    if (document.getElementById('google-maps-script')) {
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject("Google Maps API 載入失敗");
    document.head.appendChild(script);

    script.onload = () => resolve();
  });
};

onMounted(async () => {
  try {
    await loadGoogleMaps();

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 24.9844808, lng: 121.3423518 },
      zoom: 15,
    });

    new google.maps.Marker({
      position: { lat: 24.9844808, lng: 121.3423518 },
      map,
      title: "銘傳大學桃園校區",
    });
  } catch (error) {
    console.error("地圖載入錯誤:", error);
  }
});
</script>


<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>