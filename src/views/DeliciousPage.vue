<template>
  <div class="w-full mt-5">
    <div class="flex items-center justify-center space-x-3 px-4">
      
      <router-link to="/" class="text-black">
        <PhCaretLeft :size="24" />
      </router-link>

      <label class="flex items-center space-x-2 bg-white px-4 py-2 shadow-md border border-gray-300 rounded-full w-full">
        <PhMagnifyingGlass :size="20" />
        <input 
          type="search" 
          v-model="searchQuery" 
          class="grow outline-none" 
          placeholder="搜尋餐廳名稱或類別..." 
        />
      </label>
    </div>
  </div>

  <div class="p-4">
    <div class="flex flex-row space-x-2 mb-4 items-center">
      <div class="flex justify-between items-center">
        <button @click="toggleFilter" class="text-gray-500 hover:text-black transition">
          <PhSliders :size="24" />
        </button>
      </div>
      
      <div class="flex space-x-2 overflow-x-auto no-scrollbar" style="white-space: nowrap;">
        <button
          v-for="tag in tags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="[
            'px-3 py-1 rounded-lg border transition-colors duration-200',
            selectedTags.includes(tag) ? 'bg-gray-800 text-white border-gray-800' : 'bg-white border-gray-200 text-gray-700'
          ]"
        >
          #{{ tag }}
        </button>
      </div>
    </div>

    <div v-if="isFilterVisible" class="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-100 shadow-sm">
      <div class="mb-2">
        <label for="rating" class="text-sm text-gray-600 block mb-1">最低評分: {{ ratingRange }} 星</label>
        <input type="range" id="rating" v-model="ratingRange" min="1" max="5" step="0.5" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm" />
      </div>
      <div>
        <label for="price" class="text-sm text-gray-600 block mb-1">最高價格: {{ priceRange }} 元</label>
        <input type="range" id="price" v-model="priceRange" min="0" max="1000" step="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm" />
      </div>
    </div>

    <div class="space-y-4 mt-3">
      
      <div v-if="filteredFoods.length === 0" class="text-center text-gray-500 mt-10 py-10">
        <p class="text-lg font-medium">找不到符合的餐廳 😕</p>
        <p class="text-sm mt-1">試試看調整搜尋關鍵字或篩選條件</p>
      </div>

      <div
        v-for="item in filteredFoods"
        :key="item.id"
        class="block bg-white shadow-md rounded-xl overflow-hidden flex p-4 relative hover:shadow-lg transition-shadow duration-300"
      >
        <router-link :to="`/store/${item.id}`" class="flex flex-row w-full">
          <img :src="item.image" alt="food image" class="w-40 h-24 object-cover rounded-lg bg-gray-200">

          <div class="ml-3 flex-1 pr-8">
            <div class="flex justify-between">
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
          <button @click.stop="toggleCollect(item)" class="text-gray-500 hover:scale-110 transition-transform">
            <PhBookmarkSimple 
              :size="24" 
              :weight="item.isCollected ? 'fill' : 'regular'"
              :style="{ color: item.isCollected ? '#000000' : 'inherit' }"
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
import { useRouter } from 'vue-router';
import { PhCaretLeft, PhMagnifyingGlass, PhBookmarkSimple, PhSliders } from '@phosphor-icons/vue';
import { getRestaurants, getFavorites, addFavorite, removeFavorite } from '@/services/api.js';

const foodList = ref([]);
const tags = ref(["中式", "美式", "日式", "韓式", "法式", "泰式", "越式", "港式", "義式", "其他"]);
const selectedTags = ref([]);
const isFilterVisible = ref(false);
const router = useRouter();

// 搜尋與篩選狀態
const searchQuery = ref(""); // 新增搜尋字串狀態
const ratingRange = ref(0); // 預設 0 代表不篩選評分
const priceRange = ref(1000); // 預設 1000 代表顯示所有價格

// 載入餐廳與收藏狀態
const loadRestaurants = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // 定義要發送的請求陣列
    const promises = [getRestaurants()];
    
    // ★ 關鍵：只有在有 Token (已登入) 的時候，才去抓收藏列表
    if (token) {
      promises.push(getFavorites());
    }

    const results = await Promise.all(promises);
    const restaurantRes = results[0];
    
    // 如果有抓收藏列表，results[1] 才有東西，否則給空陣列
    const favoriteRes = token ? results[1] : { data: [] };

    const favoriteIds = new Set(favoriteRes.data.map(r => r.id));

    foodList.value = restaurantRes.data.map(item => ({
      ...item,
      // 訪客永遠是 false (未收藏)
      isCollected: favoriteIds.has(item.id)
    }));
  } catch (error) {
    console.error('無法載入餐廳資料', error);
  }
};

onMounted(() => {
  loadRestaurants();
});

// UI 操作邏輯
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

// 價格解析工具
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // 處理 "$100-200" 變為 100，或是 "$150" 變為 150
  const cleanPrice = priceStr.replace('$', '').replace(/,/g, ''); 
  const parts = cleanPrice.split('-');
  return parseInt(parts[0]) || 0;
};

// 核心篩選邏輯 (搜尋 + 標籤 + 價格 + 評分)
const filteredFoods = computed(() => {
  return (foodList.value || []).filter(item => {
    // 1. 搜尋 (比對店名 OR 標籤)
    const query = searchQuery.value.toLowerCase().trim();
    const matchSearch = query === "" || 
                        item.name.toLowerCase().includes(query) || 
                        item.tag.includes(query);

    // 2. 評分 (大於等於設定值)
    const matchRating = item.rating >= ratingRange.value;

    // 3. 價格 (小於等於設定值)
    const matchPrice = parsePrice(item.price) <= priceRange.value;

    // 4. 標籤篩選 (若沒選標籤則全部顯示，有選則需包含)
    const matchTags = selectedTags.value.length === 0 || selectedTags.value.includes(item.tag);

    return matchSearch && matchRating && matchPrice && matchTags;
  });
});

// 收藏功能
const toggleCollect = async (item) => {
  // ★ 關鍵：檢查是否登入
  const token = localStorage.getItem('token');
  
  if (!token) {
    // 沒登入 -> 詢問是否去登入
    const confirmLogin = confirm("訪客無法使用收藏功能，是否前往登入？");
    if (confirmLogin) {
      router.push('/login'); // 導向登入頁
    }
    return; // 中斷執行，不發送 API
  }

  // ... 以下維持原本的 API 呼叫邏輯 ...
  try {
    // 樂觀更新
    item.isCollected = !item.isCollected;
    if (!item.isCollected) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(item.id);
    }
  } catch (err) {
    item.isCollected = !item.isCollected;
    alert("操作失敗");
  }
};
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