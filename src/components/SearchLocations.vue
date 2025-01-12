<template>
<div>
  <!-- 觸發按鈕 -->
  <PhMapPin :size="24" @click="showLocationPicker = true" />

  <!-- 底部滑出模態框 -->
  <transition name="slide-up">
    <div
      v-if="showLocationPicker"
      class="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-lg z-50"
      style="height: 100vh"
    >
      <!-- 半弧形頂部 -->
      <div class="relative w-full bg-gray-100 h-12 flex items-center justify-center rounded-t-3xl">
        <div class="w-16 h-1.5 bg-gray-400 rounded-full"></div>
      </div>

      <!-- 搜尋框 -->
      <div class="px-4 py-2">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="搜尋地點..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- 地點選項列表 -->
      <div class="px-4 py-2 overflow-y-auto" style="max-height: calc(50vh - 80px)">
        <p
          v-for="(result, index) in searchResults"
          :key="index"
          @click="selectLocation(result)"
          class="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer mb-2"
        >
          {{ result }}
        </p>
      </div>
    </div>
  </transition>
</div>
</template>