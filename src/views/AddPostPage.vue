<template>
  <div class="flex flex-row items-center py-2 border-b border-gray-300">
    <router-link to="/community">
    <PhCaretLeft :size="24" />
    </router-link>
    <p>新增貼文</p>
  </div>
</template>

<script setup>
import {PhCaretLeft} from "@phosphor-icons/vue";
</script>

<style scoped>
/* 可選樣式 */
</style>