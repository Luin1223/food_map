<script setup>
import { PhQuestion, PhMapPin, PhUsersThree, PhGear } from '@phosphor-icons/vue'; // 引入 Phosphor 圖標
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-[#EFEFF1] border-t shadow-md">
    <ul class="flex justify-around items-center">
      <!-- 問號 -->
      <li>
        <router-link to="/help" class="flex flex-col items-center text-center">
          <PhQuestion :size="24" />
          <span>吃什麼</span>
        </router-link>
      </li>
      <!-- 地圖 -->
      <li>
        <router-link to="/map" class="flex flex-col items-center text-center">
          <PhMapPin :size="24" />
          <span>地圖</span>
        </router-link>
      </li>
      <!-- 社群 -->
      <li>
        <router-link to="/community" class="flex flex-col items-center text-center">
          <PhUsersThree :size="24" />
          <span>社群</span>
        </router-link>
      </li>
      <!-- 設定 -->
      <li>
        <router-link to="/settings" class="flex flex-col items-center text-center">
          <PhGear :size="24" />
          <span>設定</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
</style>