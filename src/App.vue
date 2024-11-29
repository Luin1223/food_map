<script setup>
import { RouterView } from 'vue-router'; // 引入 RouterView 用來動態渲染路由對應的頁面
import BottomNav from '@/components/BottomNav.vue'; // 引入底部導航欄
import { useRoute } from 'vue-router'; // 引入 useRoute

const route = useRoute(); // 獲取當前路由

const noBottonNav = ['LoginPage','AddPostPage'];
</script>

<template>
  <!-- 主內容區域 -->
  <div class="app-content pb-16">
    <RouterView />
  </div>

  <!-- 固定的底部導航欄 -->
  <BottomNav v-if="!noBottonNav.includes(route.name)" />
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.app-content {
  overflow-y: auto;
  max-height: calc(100% - 4rem); /* 將高度限制為螢幕高度減去導航欄高度 */
}
</style>
