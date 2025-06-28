<script setup>
import { PhUser } from '@phosphor-icons/vue'; 
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const router = useRouter();
const googleReady = ref(false);

const loginWithGoogle = () => {
  console.log("Google login 尚未實作");
};
const loginWithApple = () => {
  console.log("Apple login 尚未實作");
};

const loginAsGuest = () => {
  router.push({ name: 'MapPage' });
};

const client_id = import.meta.env.VITE_LINE_LOGIN_CHANNEL_ID;
const redirect_uri = encodeURIComponent(import.meta.env.VITE_LINE_LOGIN_REDIRECT_URI);
const loginWithLine = () => {
  const state = Math.random().toString(36).substring(2, 15); // 可加入 CSRF 保護
  const scope = 'profile openid email'; // 你想要的資料

  const authURL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

  window.location.href = authURL; // 跳轉到 LINE 登入
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
      <!--蘋果登入
      <button @click="loginWithApple" class="flex justify-center items-center p-3 w-full rounded-full text-base border-2 border-black bg-black text-white">
        <img src="/images/apple-logo.jpg" alt="Apple Logo" class="w-6 h-6 mr-2">
        Sign in with Apple
      </button>
      -->
      <button @click="loginWithLine" class="flex justify-center items-center p-3 w-full rounded-full text-base text-white bg-[#25B642]">
        <img src="/images/line-logo.png" alt="LINE Logo" class="w-6 h-6 mr-2">
        Sign in with LINE
      </button>
      <button @click="loginAsGuest" class="flex justify-center items-center p-3 w-full rounded-full text-base border-2 border-black">
        <PhUser :size="32" class="w-6 h-6 mr-2" />
        訪客登入
      </button>
    </div>
    <hr class="my-4 border-t border-gray-300 mt-10" />
    <h1 @click="qa">any questions?</h1>
  </div>
</template>

<style scoped>
img {
  margin-right: 0.5rem;
}
</style>