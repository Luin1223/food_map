<template>
  <div class="w-full mt-5">
    <div class="flex items-center justify-center space-x-3 px-4">
      
      <!-- 返回鍵 -->
      <router-link to="/" class="text-black">
        <PhCaretLeft :size="24" />
      </router-link>

      <!-- 搜尋框 -->
      <label class="flex items-center space-x-2 bg-white px-4 py-2 shadow-md border border-gray-300 rounded-full w-full">
        <PhMagnifyingGlass :size="20" />
        <input type="search" class="grow outline-none" placeholder="Search" />
      </label>
    </div>
  </div>

  
  <div class="p-4">
    
    <div class="flex flex-row space-x-2 mb-4 items-center">
    <!-- 篩選 -->
      <div class="flex justify-between items-center">
        <button @click="toggleFilter" class="text-gray-500">
      <PhSliders :size="24" />
        </button>
      </div>
    <!-- #標籤 -->
    <div class="flex space-x-2 overflow-x-auto" style="white-space: nowrap;">
      <button
        v-for="tag in tags"
        :key="tag"
        @click="toggleTag(tag)"
        :class="[
          'px-3 py-1 rounded-lg border',
          selectedTags.includes(tag) ? 'bg-gray-300' : 'bg-white'
        ]"
      >
        #{{ tag }}
      </button>
    </div>
    </div>

    <!-- 篩選版面 -->
    <div v-if="isFilterVisible">
    <div>
      <label for="rating">評分範圍 </label>
      <input type="range" id="rating" v-model="ratingRange" value="30" min="1" max="5" step="0.5" class="range range-info range-xs" />
      <span>{{ ratingRange }} 星</span>
    </div>
    <div>
      <label for="price">價格範圍 </label>
      <input type="range" id="price" v-model="priceRange" value="30" min="0" max="1000" step="50" class="range range-info range-xs" />
      <span>{{ priceRange }} 元</span>
    </div>
    </div>


    <!-- 卡片 -->
    <div class="space-y-4 mt-3">
      
      <div
       v-for="item in filteredFoods"
       :key="item.id"
       :to="`/store/${item.id}`"
       class="block bg-white shadow-md rounded-xl overflow-hidden flex p-4"
       >
       <router-link :to="`/store/${item.id}`" class="flex flex-row w-full">
        <!-- 圖片 -->
        <img :src="item.image" alt="food image" class="w-40 h-24 object-cover rounded-lg max-w-full">

        <!-- 店名 -->
        <div class="ml-3 flex-1">
          <div class="flex justify-between">
            <h3 class="font-semibold text-lg">{{ item.name }}</h3>
          </div>
          <div class="text-sm text-gray-500 flex items-center space-x-1">
            <span :class="item.open ? 'text-green-500' : 'text-red-500'">●</span>
            <span>{{ item.price }}</span>
          </div>
          <div class="text-sm text-gray-500">{{ item.distance }} km</div>
        </div>
       </router-link>
        <!-- 評分 -->
        <div class="flex flex-col items-center justify-between ml-auto">
          <button @click.stop="toggleCollect(item)" class="text-gray-500">
          <PhBookmarkSimple 
            :size="20" 
            :weight="item.isCollected ? 'fill' : 'regular'"
            :style="{ color: item.isCollected ? '#000000' : 'inherit' }"
          />
          </button>
          <span class="font-bold text-lg">{{ item.rating }}</span>
        </div>
      </div>
      </div>
    </div>
</template>

<script setup>
import {ref,computed,onMounted} from 'vue';
import axios from 'axios';
import {PhCaretLeft,PhMagnifyingGlass,PhBookmarkSimple,PhSliders} from '@phosphor-icons/vue';
import { getRestaurants } from '@/services/api.js';

const foodList = ref([]);
const tags = ref(["中式", "美式", "日式", "韓式", "法式", "泰式", "越式", "港式", "義式", "其他"]);
const selectedTags = ref([]);
const isFilterVisible = ref(false);

const ratingRange = ref(3);
const priceRange = ref(300);

/*錯的
const loadRestaurants = async () => {
  try {
    const response = await getRestaurants();
    foodList.value = response; 
  } catch (error) {
    console.error('無法載入餐廳資料', error);
    // 可以在这里添加用户提示，比如使用Toast或Alert
  }
};*/

const loadRestaurants = async () => {
  try {
    const response = await getRestaurants();
    console.log(response.data);  // 檢查返回的資料
    foodList.value = response.data;
  } catch (error) {
    console.error('無法載入餐廳資料', error);
  }
};

// 頁面載入時呼叫
onMounted(() => {
  loadRestaurants();
});

// 篩選條件
const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
};

const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
};

const filteredFoods = computed(() => {
  return (foodList.value || [])
    .filter(item =>
      (item.rating >= ratingRange.value) &&
      (parsePrice(item.price) <= priceRange.value) &&
      (selectedTags.value.length === 0 || selectedTags.value.includes(item.tag))
    );
});

const parsePrice = (price) => {
  const priceRange = price.replace('$', '').split('-');
  const minPrice = parseInt(priceRange[0]);
  return minPrice;
};

const toggleCollect = (item) => {
  item.isCollected = !item.isCollected;
};
</script>

<style scoped>
  /* 隱藏滾動條 */
  .flex {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  
  .flex::-webkit-scrollbar {
    display: none;  /* 隱藏滾動條 */
  }
</style>