<template>
  <div class="flex flex-row justify-between items-center py-2 border-b border-gray-300">
  <PhPlusCircle :size="24" />
  <PhUsers :size="24" />
  </div>

  <div class="flex flex-row justify-around items-center py-4">
    <button class="p-1 w-28 rounded-lg bg-[#DFDFDF] shadow-md">熱門推薦</button>
    <button class="p-1 w-28 rounded-lg bg-[#EFEFF1] shadow-md">我的追蹤</button>
  </div>
  <div class="flex flex-row">
    <img src="/images/頭像.jpg" class="w-10 h-10 rounded-full">
    <div class="flex flex-col ml-4">
      <p>luin1223</p>
      <div class="flex flex-row items-center">
        <PhMapPin :size="12" :style="{color:'#CA2521'}" weight="bold"/>
        <p class="text-xs ml-1">700台南市中西區尊王路110號</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col py-2">
    <p class="text-sm">台南新開美味大漢堡，超好吃，大家快來嘗嘗。</p>
    <img src="/images/大漢堡.jpg" class="py-2">
  </div>

  <div class="flex flex-row justify-between py-1 border-b border-gray-300">
    <div class="flex flex-row">
    <PhHeart :size="20" />
    <PhChatCircle :size="20" class="ml-2"/>
    <PhBookmarkSimple :size="20" class="ml-2"/>
    </div>
    <PhExport :size="20" />
  </div>
</template>

<script setup>
import {PhPlusCircle,PhUsers,PhMapPin,PhHeart,PhChatCircle,PhBookmarkSimple,PhExport} from "@phosphor-icons/vue";
import daisyui from "daisyui";
</script>

<style scoped>
/* 可選樣式 */
</style>