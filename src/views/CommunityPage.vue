<template>
  <div class="flex flex-row justify-between items-center border-b-2 py-2">
  <PhPlusCircle :size="24" />
  <PhUsers :size="24" />
  </div>
</template>

<script setup>
import {PhPlusCircle,PhUsers} from "@phosphor-icons/vue";
</script>

<style scoped>
/* 可選樣式 */
</style>