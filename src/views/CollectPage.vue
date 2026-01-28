<template>
  <div class="flex items-center py-2 border-b border-gray-300 relative bg-white sticky top-0 z-10">
    <router-link to="/settings" class="absolute left-2 text-black">
      <PhCaretLeft :size="24" />
    </router-link>
    <p class="w-full text-center text-lg font-bold">你的收藏</p>
  </div>

  <div class="w-full mt-5 px-4">
    <label class="flex items-center space-x-2 bg-white px-4 py-2 shadow-md border border-gray-300 rounded-full w-full">
      <PhMagnifyingGlass :size="20" />
      <input type="search" v-model="searchQuery" class="grow outline-none" placeholder="搜尋收藏的餐廳..." />
    </label>
  </div>

  <div class="p-4">
    <div class="flex flex-row space-x-2 mb-4 items-center">
      <div class="flex justify-between items-center">
        <button @click="toggleFilter" class="text-gray-500">
          <PhSliders :size="24" />
        </button>
      </div>
      
      <div class="flex space-x-2 overflow-x-auto no-scrollbar" style="white-space: nowrap;">
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

    <div v-if="isFilterVisible" class="bg-gray-50 p-3 rounded-lg mb-4">
      <div class="mb-2">
        <label for="rating" class="text-sm text-gray-600 block">最低評分: {{ ratingRange }} 星</label>
        <input type="range" id="rating" v-model="ratingRange" min="1" max="5" step="0.5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
      </div>
      <div>
        <label for="price" class="text-sm text-gray-600 block">最高價格: {{ priceRange }} 元</label>
        <input type="range" id="price" v-model="priceRange" min="0" max="1000" step="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
      </div>
    </div>

    <div class="space-y-4 mt-3">
      <div v-if="filteredFoods.length === 0" class="text-center text-gray-500 mt-10">
        <p>目前沒有符合條件的收藏餐廳</p>
        <router-link to="/" class="text-blue-500 underline mt-2 block">去探索餐廳</router-link>
      </div>

      <div
        v-for="item in filteredFoods"
        :key="item.id"
        class="block bg-white shadow-md rounded-xl overflow-hidden flex p-4 relative"
      >
        <router-link :to="`/store/${item.id}`" class="flex flex-row w-full">
          <img :src="item.image" alt="food image" class="w-40 h-24 object-cover rounded-lg bg-gray-200">

          <div class="ml-3 flex-1 pr-8"> <div class="flex justify-between items-start">
              <h3 class="font-semibold text-lg line-clamp-1">{{ item.name }}</h3>
            </div>
            <div class="text-sm text-gray-500 flex items-center space-x-1 mt-1">
              <span :class="item.open ? 'text-green-500' : 'text-red-500'">●</span>
              <span>{{ item.price }}</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">{{ item.distance }} km</div>
          </div>
        </router-link>

        <div class="flex flex-col items-end justify-between ml-auto absolute right-4 top-4 bottom-4">
           <button @click.stop="handleRemoveFavorite(item)" class="text-gray-500 hover:text-red-500 transition">
            <PhBookmarkSimple 
              :size="24" 
              weight="fill"
              style="color: #000000"
            />
          </button>
          <span class="font-bold text-lg text-yellow-500 flex items-center">
            {{ item.rating }} <span class="text-xs text-gray-400 ml-1">★</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { PhCaretLeft, PhMagnifyingGlass, PhBookmarkSimple, PhSliders } from '@phosphor-icons/vue';
import { getFavorites, removeFavorite } from '@/services/api.js'; // 只需要這兩個 API

const favoriteList = ref([]);
const tags = ref(["中式", "美式", "日式", "韓式", "法式", "泰式", "越式", "港式", "義式", "其他"]);
const selectedTags = ref([]);
const isFilterVisible = ref(false);
const searchQuery = ref(""); 

const ratingRange = ref(0); // 預設顯示所有評分
const priceRange = ref(1000); // 預設顯示所有價格

// 載入收藏列表
const loadFavorites = async () => {
  try {
    const res = await getFavorites();
    // 取得資料後，手動加上 isCollected = true (雖然這裡是收藏頁，但為了邏輯一致)
    favoriteList.value = res.data.map(item => ({
      ...item,
      isCollected: true
    }));
  } catch (error) {
    console.error('無法載入收藏清單', error);
  }
};

onMounted(() => {
  loadFavorites();
});

// 取消收藏邏輯
const handleRemoveFavorite = async (item) => {
  if (!confirm(`確定要取消收藏「${item.name}」嗎？`)) return;
  
  try {
    await removeFavorite(item.id);
    // 直接從前端陣列中移除該項目，不用重新整理頁面，體驗更好
    favoriteList.value = favoriteList.value.filter(f => f.id !== item.id);
  } catch (err) {
    console.error('取消收藏失敗', err);
    alert('操作失敗，請稍後再試');
  }
};

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

const parsePrice = (priceStr) => {
    // 處理 "$100-200" 或 "$150" 這種格式
    if(!priceStr) return 0;
    const cleanPrice = priceStr.replace('$', '').replace(/,/g, ''); // 去掉 $ 和逗號
    const parts = cleanPrice.split('-');
    return parseInt(parts[0]) || 0; // 取最低價
};

// 綜合篩選 (搜尋 + 標籤 + 評分 + 價格)
const filteredFoods = computed(() => {
  return (favoriteList.value || []).filter(item => {
    // 1. 搜尋關鍵字
    const matchSearch = searchQuery.value 
        ? item.name.includes(searchQuery.value) || item.tag.includes(searchQuery.value)
        : true;
    
    // 2. 評分
    const matchRating = item.rating >= ratingRange.value;

    // 3. 價格
    const matchPrice = parsePrice(item.price) <= priceRange.value;

    // 4. 標籤
    const matchTags = selectedTags.value.length === 0 || selectedTags.value.includes(item.tag);

    return matchSearch && matchRating && matchPrice && matchTags;
  });
});

</script>

<style scoped>
/* 隱藏 Scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>