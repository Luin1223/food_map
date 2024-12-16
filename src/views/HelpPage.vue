<template>
  <!-- 主畫面 -->
  <div 
    class="flex flex-col bg-black min-h-dvh justify-center items-center"
    @click="showCard = true" 
  >
    <p class="text-3xl text-white">?今天要吃什麼?</p>
    <p class="text-sm text-[#9ca3af] mt-2">按一下</p>
  </div>

  <!-- 推薦卡片 -->
  <div 
    v-if="showCard" 
    class="fixed inset-0 flex justify-center items-center"
  >
    <div class="bg-white rounded-xl shadow-lg w-80 p-4">
        <!-- 關閉按鈕 -->
      <button 
        class="flex text-gray-500 text-lg"
        @click="showCard = false"
      >
      <PhX :size="24" />
      </button>
      <img 
        src="/images/牛肉麵.jpg"
        class="rounded-lg w-full py-2"
      />
      <h2 class="text-lg font-semibold">超好吃牛肉麵</h2>
      <p class="text-gray-500 text-sm mb-2">4.5⭐ (10000+)</p>
      <p class="text-gray-700 mb-4">$200-400</p>
      <button 
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        2.5km 前往導航
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {PhX} from '@phosphor-icons/vue';

const showCard = ref(false);
</script>

<style scoped>
/* 可選樣式：增加過渡效果 */
.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>