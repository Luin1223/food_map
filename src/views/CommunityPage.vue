<template>
  <div>
    <!-- 上方導航欄 -->
    <div class="flex flex-row justify-between items-center py-2 border-b border-gray-300">
      <router-link to="/addpost">
      <PhPlusCircle :size="24" />
      </router-link>
      <PhUsers :size="24" />
    </div>

    <!-- 按鈕切換區 -->
    <div class="flex flex-row justify-around items-center py-4">
      <button
        @click="setActive('recommend')"
        :class="[
          'p-1 w-28 rounded-lg shadow-md',
          activeButton === 'recommend' ? 'bg-[#DFDFDF]' : 'bg-[#EFEFF1]'
        ]"
      >
        熱門推薦
      </button>

      <button
        @click="setActive('follow')"
        :class="[
          'p-1 w-28 rounded-lg shadow-md',
          activeButton === 'follow' ? 'bg-[#DFDFDF]' : 'bg-[#EFEFF1]'
        ]"
      >
        我的追蹤
      </button>
    </div>

    <!-- 視圖內容區 -->
    <div>
      <!-- 熱門推薦內容 -->
      <div v-if="activeButton === 'recommend'">
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

      <!-- 我的追蹤內容 -->
      <div v-if="activeButton === 'follow'">
        <p class="text-sm text-gray-600 text-center">尚未追蹤任何用戶。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  PhPlusCircle,
  PhUsers,
  PhMapPin,
  PhHeart,
  PhChatCircle,
  PhBookmarkSimple,
  PhExport,
} from '@phosphor-icons/vue';
import { ref } from 'vue';

// 設定響應式狀態
const activeButton = ref('recommend'); // 初始狀態為「熱門推薦」

// 切換按鈕狀態的函數
const setActive = (button) => {
  activeButton.value = button; // 將點擊的按鈕設置為激活狀態
};

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