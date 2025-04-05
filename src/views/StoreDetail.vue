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
      <p class="text-gray-500 mt-2">{{ store.description }}</p>
    </div>

    <!-- 導航按鈕 -->
    <div class="fixed bottom-5 left-0 right-0 flex justify-center">
      <a :href="`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`"
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
import {PhCaretLeft} from '@phosphor-icons/vue'

const route = useRoute()
const store = ref({})

onMounted(() => {
  const id = route.params.id
  // 模擬取得資料
  store.value = {
    id,
    name: '牛肉麵好吃',
    image: '/images/牛肉麵.jpg',
    description: '這是一家好吃的牛肉麵店',
    lat: 25.034, // 店家緯度
    lng: 121.562 // 店家經度
  }
})
</script>