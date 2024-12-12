<template>
  <div class="flex items-center py-2 border-b border-gray-300 relative">
    <router-link to="/community" class="absolute left-2">
      <PhCaretLeft :size="24" />
    </router-link>
    <p class="w-full text-center text-lg">個人檔案</p>
  </div>
  <div class="flex flex-row p-4 justify-around items-center py-2 border-b border-gray-300">
  <img src="/images/頭像.jpg" class="rounded-full py-2" style="width: 150px; height: 150px;" /> 
  <div class="flex flex-col justify-start items-center">
    <p class="text-2xl">張茹茵</p>
    <p>粉絲 0  追蹤  20  讚  0  收藏 12</p>
  </div>
  </div>
  <div class="flex flex-col p-4">
    <p class="text-xs py-2 text-gray-500">你的貼文</p>
    <div class="flex flex-row">
          <img src="/images/頭像.jpg" class="w-10 h-10 rounded-full" />
          <div class="flex flex-col ml-4">
            <p>luin1223</p>
            <div class="flex flex-row items-center">
              <PhMapPin :size="12" :style="{ color: '#CA2521' }" weight="bold" />
              <p class="text-xs ml-1">700台南市中西區尊王路110號</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col py-2">
          <p class="text-sm">台南新開美味大漢堡，超好吃，大家快來嘗嘗。</p>
          <img src="/images/大漢堡.jpg" class="py-2" />
        </div>
        <div class="flex flex-row justify-between py-1 border-b border-gray-300">
          <div class="flex flex-row">
            <button @click="toggleLike" class="flex items-center">
              <PhHeart
                :size="20"
                :weight="isLiked ? 'fill' : 'regular'"
                :style="{ color: isLiked ? '#CA2521' : 'inherit' }"
              />
            </button>
            <PhChatCircle :size="20" class="ml-2" />
            <button @click="togglecollect" class="flex items-center">
              <PhBookmarkSimple 
              :size="20" class="ml-2"
              :weight="isCollect ? 'fill' : 'regular'"
              :style="{color:isLiked ? '#000000' : 'inherit' }"
            />
            </button>
          </div>
          <PhExport :size="20" />
        </div>
  </div>
</template>

<script setup>
import {
  PhCaretLeft,
  PhMapPin,
  PhHeart,
  PhChatCircle,
  PhBookmarkSimple,
  PhExport,
} from '@phosphor-icons/vue';
import { ref } from 'vue';

const isLiked = ref(false);
const isCollect = ref(false);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};
const togglecollect = () => {
  isCollect.value = !isCollect.value;
}
</script>

<style scoped>
/* 可選樣式 */
</style>