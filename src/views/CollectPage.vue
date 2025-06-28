<template>
    <div class="flex items-center py-2 border-b border-gray-300 relative">
      <router-link to="/settings" class="absolute left-2">
        <PhCaretLeft :size="24" />
      </router-link>
      <p class="w-full text-center text-lg">你的收藏</p>
    </div>
</template>

<script setup>
import {PhCaretLeft} from '@phosphor-icons/vue';
</script>
