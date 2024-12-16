<template>
  <div>
    <!-- 上方導航欄 -->
    <div class="flex flex-row justify-between items-center border-b border-gray-300">
      <router-link to="/addpost">
        <PhPlusCircle :size="24" class="ml-4" />
      </router-link>
      <router-link to="/profile">
        <PhUsers :size="24" class="justify-self-end mr-4" />
      </router-link>
    </div>

    <!-- 按鈕切換區 -->
    <div class="flex flex-row justify-around items-center mt-4">
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
    <div class="p-4">
      <!-- 熱門推薦內容 -->
      <div v-if="activeButton === 'recommend'">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post border-b border-gray-300 py-4"
        >
          <div class="flex flex-row">
            <img :src="post.user.avatar" class="w-10 h-10 rounded-full" />
            <div class="flex flex-col ml-4">
              <p>{{ post.user.username }}</p>
              <div class="flex flex-row items-center">
                <PhMapPin :size="12" :style="{ color: '#CA2521' }" weight="bold" />
                <p class="text-xs ml-1">{{ post.user.location }}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <p class="text-sm">{{ post.content }}</p>
            <!-- 圖片滑動容器 -->
            <div
              v-if="post.image.length > 0"
              class="overflow-x-auto flex gap-2 py-2 scrollbar-hide"
            >
              <img
                v-for="(imgSrc, index) in post.image"
                :key="index"
                :src="imgSrc"
                class="w-40 h-auto rounded-md"
                :alt="`Post image ${index + 1}`"
              />
            </div>
          </div>
          <div class="flex flex-row justify-between mt-2">
            <div class="flex flex-row">
              <button @click="toggleLike(post)" class="flex items-center">
                <PhHeart
                  :size="20"
                  :weight="post.isLiked ? 'fill' : 'regular'"
                  :style="{ color: post.isLiked ? '#CA2521' : 'inherit' }"
                />
              </button>
              <PhChatCircle :size="20" class="ml-2" />
              <button @click="toggleCollect(post)" class="flex items-center">
                <PhBookmarkSimple
                  :size="20"
                  class="ml-2"
                  :weight="post.isCollected ? 'fill' : 'regular'"
                  :style="{ color: post.isCollected ? '#000000' : 'inherit' }"
                />
              </button>
            </div>
            <PhExport :size="20" />
          </div>
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
import { generateMockData } from '@/utils/mockData.js'; // 引入動態生成的假資料

// 使用生成函數生成 10 條假資料
const posts = ref(generateMockData(10)); // 預設生成 10 條

// 當前激活的按鈕
const activeButton = ref('recommend');

// 切換按鈕狀態
const setActive = (button) => {
  activeButton.value = button;
};

// 切換按讚狀態
const toggleLike = (post) => {
  post.isLiked = !post.isLiked;
};

// 切換收藏狀態
const toggleCollect = (post) => {
  post.isCollected = !post.isCollected;
};
</script>

<style scoped>
/* 自定義滾動條隱藏 */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>