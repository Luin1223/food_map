<script>
import { PhQuestion, PhMapPin, PhUsersThree, PhGear } from '@phosphor-icons/vue'; // 引入 Phosphor 圖標

export default {
  components: {
    PhQuestion,   // 問號圖標
    PhMapPin,     // 地圖圖標
    PhUsersThree, // 社群圖標
    PhGear,       // 設定圖標
  },
};
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
    <ul class="flex justify-around items-center p-4">
      <!-- 問號 -->
      <li>
        <router-link to="/help" class="text-center">
          <PhQuestion :size="24" />
          <span>吃什麼</span>
        </router-link>
      </li>
      <!-- 地圖 -->
      <li>
        <router-link to="/map" class="text-center">
          <PhMapPin :size="24" />
          <span>地圖</span>
        </router-link>
      </li>
      <!-- 社群 -->
      <li>
        <router-link to="/community" class="text-center">
          <PhUsersThree :size="24" />
          <span>社群</span>
        </router-link>
      </li>
      <!-- 設定 -->
      <li>
        <router-link to="/settings" class="text-center">
          <PhGear :size="24" />
          <span>設定</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: white;
}

ul {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

a:hover {
  color: #1e90ff; /* 應根據需求調整顏色 */
}
</style>