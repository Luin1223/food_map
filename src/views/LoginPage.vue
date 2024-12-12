<script setup>
import { PhUser } from '@phosphor-icons/vue'; 
import { useRouter } from 'vue-router';

const router = useRouter();

const loginAsGuest = () => {
    router.push({ name: 'MapPage' });
};
</script>

<template>
  <div class="flex flex-col text-center mt-20 p-4">
    <h1 class="flex flex-col justify-center font-bold text-4xl">Login</h1>
    <div class="flex flex-col gap-4 justify-center items-center mt-20">
      <button @click="loginWithGoogle" class="flex justify-center items-center p-3 w-full rounded-full text-base border-2 border-black">
        <img src="/images/google-logo.png" alt="Google Logo" class="w-6 h-6 mr-2">
        Sign in with Google
      </button>
      <button @click="loginWithApple" class="flex justify-center items-center p-3 w-full rounded-full text-base border-2 border-black bg-black text-white">
        <img src="/images/apple-logo.jpg" alt="Apple Logo" class="w-6 h-6 mr-2">
        Sign in with Apple
      </button>
      <button @click="loginWithLine" class="flex justify-center items-center p-3 w-full rounded-full text-base text-white bg-[#25B642]">
        <img src="/images/line-logo.png" alt="LINE Logo" class="w-6 h-6 mr-2">
        Sign in with LINE
      </button>
      <button @click="loginAsGuest" class="flex justify-center items-center p-3 w-full rounded-full text-base border-2 border-black">
        <PhUser :size="32" class="w-6 h-6 mr-2" />
        訪客登入
      </button>
    </div>
    <hr class="my-4 border-t border-gray-300 mt-10" /> <!-- 添加分隔線 -->
    <h1 @click="qa">any qusetions?</h1>
  </div>
</template>

<style scoped>
img {
  margin-right: 0.5rem; /* 圖片與文字間距 */
}
</style>