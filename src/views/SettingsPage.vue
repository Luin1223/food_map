<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { name, picture, token } = storeToRefs(userStore);

onMounted(() => {
  userStore.loadUserFromStorage();
});

const logout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="flex flex-col justify-center items-center py-2 border-b border-gray-300">
    <p class="w-full text-center text-lg">設定</p>   
  </div>

  <div class="flex flex-col justify-center items-center py-2 border-b border-gray-300">
    <template v-if="token">
      <img :src="picture" class="rounded-full py-2" style="width: 150px; height: 150px;" />
      <p class="text-lg">{{ name }}</p>

      <button @click="logout" class="mt-4 p-2 px-4 border border-red-500 text-red-500 rounded-full">登出</button>
    </template>
    <template v-else>
      <img src="/images/頭像.jpg" class="rounded-full py-2" style="width: 150px; height: 150px;" />
      <p class="text-lg">{{ '未登入' }}</p>
      <button @click="logout" class="mt-4 p-2 px-4 border border-red-500 text-red-500 rounded-full">登入</button>

    </template>
  </div>
  <div class="flex flex-col justify-center items-center py-2 border-b border-gray-300">
    <router-link to="/collect">
    <p class="w-full text-center text-lg">我的收藏</p>  
    </router-link> 
  </div>
</template>