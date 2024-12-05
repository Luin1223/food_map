<template>
  <div class="flex flex-row justify-center items-center py-2 border-b border-gray-300">
    <router-link to="/community">
    <PhCaretLeft :size="24" />
    </router-link>
    <p class="w-full text-center">新增貼文</p>
  </div>
  <div class="flex">
  <input type="text" placeholder="Type here" class="input input-ghost w-full max-w-xs" />
  </div>
</template>

<script setup>
import {PhCaretLeft} from "@phosphor-icons/vue";
</script>

<style scoped>
/* 可選樣式 */
</style>