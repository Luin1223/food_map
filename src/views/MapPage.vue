<template>
  <div class="relative">
    <!-- 搜索框 -->
    <label class="input absolute top-5 left-3 right-3 flex items-center space-x-2 z-10 rounded-full">
      <PhMagnifyingGlass :size="24" />
      <input 
      type="search" 
      class="grow rounded-full" 
      placeholder="Search"
      />
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
import { onMounted } from 'vue';
import { PhListBullets, PhMagnifyingGlass } from '@phosphor-icons/vue';
import { getRestaurants } from '@/services/api.js';

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
    // 載入 Google Maps
    await loadGoogleMaps();

    // 使用者的當前位置
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject('Geolocation not supported');
        }
      });
    };

    const position = await getUserLocation(); // 獲取當前位置
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    // 初始化 Google 地圖
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: userLat, lng: userLng }, // 以當前位置為中心
      zoom: 15,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });

    // 顯示使用者位置的 marker
    const userMarker = new google.maps.Marker({
      position: { lat: userLat, lng: userLng },
      map,
      title: "您的位置",
    });

    // 取得餐廳資料
    const restaurants = (await getRestaurants()).data;

    // 在地圖上顯示餐廳的 marker
    restaurants.forEach(restaurant => {
      new google.maps.Marker({
        position: {
          lat: parseFloat(restaurant.latitude),
          lng: parseFloat(restaurant.longitude),
        },
        map,
        icon: "/images/食物圖標.png",
        title: restaurant.name,
      });
    });

  } catch (error) {
    console.error("地圖載入錯誤:", error);

    // 如果用戶拒絕了位置授權
    if (error.code === 1) {
      console.log("使用者拒絕分享位置，顯示預設位置");
      const defaultLat = 25.053713905153057;
      const defaultLng = 121.28840270038565;

      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: defaultLat, lng: defaultLng },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });

      // 顯示預設位置的 marker
      new google.maps.Marker({
        position: { lat: defaultLat, lng: defaultLng },
        map,
        title: "預設位置",
      });

      // 顯示餐廳標記
      const restaurants = (await getRestaurants()).data;

      restaurants.forEach(restaurant => {
        new google.maps.Marker({
          position: {
            lat: parseFloat(restaurant.latitude),
            lng: parseFloat(restaurant.longitude),
          },
          map,
          icon: "/images/食物圖標.png",
          title: restaurant.name,
        });
      });

      // 顯示提示訊息
      alert("無法取得您的位置，已顯示預設位置。請在瀏覽器設定中允許定位。");
    } else {
      alert("無法取得位置，請檢查瀏覽器的定位設定。");
    }
  }
});
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>