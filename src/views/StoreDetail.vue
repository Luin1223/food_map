<template>
<div class="flex items-center mt-5 space-x-3 px-4">
    <router-link to="/delicious" class="text-black">
    <PhCaretLeft :size="24" />
    </router-link>
</div>

  <div class="p-4">
    <div class="mt-4">
      <!-- 假設你從 API 拿店家詳細資訊 -->
      <h1 class="text-2xl font-bold">{{ store.name }}</h1>
      <img :src="store.image" class="w-full rounded-lg mt-2" />
      <p class="text-gray-500 mt-2">{{ store.address }}</p>
    </div>

    <!-- 導航按鈕 -->
    <div class="fixed bottom-5 left-0 right-0 flex justify-center">
      <a :href="`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`"
         target="_blank"
         class="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
        導航至店家
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import {PhCaretLeft} from '@phosphor-icons/vue'
import {getRestaurantsById} from '@/services/api.js'

const store = ref({})
const route = useRoute();
const id = route.params.id;

const loadRestaurantsById = async () => {
  try {
    const response = await getRestaurantsById(id);
    console.log(response.data);  // 檢查返回的資料
    store.value = response.data;
  } catch (error) {
    console.error('無法載入餐廳資料', error);
  }
};

// 頁面載入時呼叫
onMounted(() => {
  loadRestaurantsById();
});
</script>