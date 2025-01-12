<template>
  <!-- 判斷是否是需要特殊處理的頁面 -->
  <div v-if="noLayoutPages.includes(route.name)">
    <!-- 僅渲染 RouterView，跳過底部導航和內容限制 -->
    <RouterView />
  </div>

  <!-- 一般頁面，使用固定佈局 -->
  <div v-else class="app-content pb-16">
    <RouterView />
  </div>

  <!-- 固定的底部導航欄 -->
  <BottomNav v-if=" !noBottonNav.includes(route.name)" />
</template>

<script setup>
import { RouterView } from 'vue-router';
import BottomNav from '@/components/BottomNav.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 不需要底部導航的頁面名稱
const noBottonNav = ['LoginPage', 'AddPostPage', 'ProfilePage', 'DeliciousPage','MessagePage'];

// 完全跳過 App.vue 佈局的頁面名稱
const noLayoutPages = ['HelpPage'];
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.app-content {
  overflow-y: auto;
  max-height: calc(100% - 4rem); /* 限制高度 */
}
</style>