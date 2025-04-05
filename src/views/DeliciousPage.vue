<template>
  <div class="w-full mt-5">
    <div class="flex items-center justify-center space-x-3 px-4">
      
      <!-- 返回鍵 -->
      <router-link to="/map" class="text-black">
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
    
    <!-- #標籤 -->
    <div class="flex space-x-2 mb-4">
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
        <img :src="item.image" alt="food image" class="w-40 h-24 object-cover rounded-lg">

        <!-- 店名 -->
        <div class="ml-3 flex-1">
          <div class="flex justify-between">
            <h3 class="font-semibold text-lg">{{ item.name }}</h3>
          </div>
          <div class="text-sm text-gray-500 flex items-center space-x-1">
            <span :class="item.isOpen ? 'text-green-500' : 'text-red-500'">●</span>
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
          <span class="font-bold text-lg ">{{ item.rating }}</span>
        </div>
      </div>
      </div>
    </div>
</template>

<script setup>
import {ref,computed} from 'vue';
import {PhCaretLeft,PhMagnifyingGlass,PhBookmarkSimple} from '@phosphor-icons/vue';

const foodList = ref([
  { id: 1, name: "牛肉麵好吃好吃好吃好吃",tag:"麵食", image: "/images/牛肉麵.jpg", isOpen: true, price: "$200-400", distance: "2.5", rating: 4.5,isCollected: false },
  { id: 2, name: "排骨飯",tag:"飯類", image: "/images/牛肉麵.jpg", isOpen: false, price: "$200-400", distance: "2.5", rating: 4.6,isCollected: false },
]);

const tags = ref(["麵食", "飯類", "小吃"]);
const selectedTags = ref([]);

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
};

const filteredFoods = computed(() => {
  if(selectedTags.value.length === 0) return foodList.value;
  return foodList.value.filter(food => selectedTags.value.includes(food.tag));
});

const toggleCollect = (item) => {
  item.isCollected = !item.isCollected;
};
</script>

<style scoped>
/* 可選樣式 */
</style>