<template>
  <div>
    <!-- 上方導航欄 -->
    <div class="flex items-center py-2 border-b border-gray-300 relative">
      <router-link to="/community" class="absolute left-2">
        <PhCaretLeft :size="24" />
      </router-link>
      <p class="w-full text-center text-lg">新增貼文</p>
    </div>

    <!-- 輸入框 -->
    <div class="flex flex-col px-4 py-4">
      <textarea
        v-model="content"
        placeholder="請輸入內容......"
        class="w-full px-3 py-2"
        rows="5"
        maxlength="500"
      ></textarea>

      <!-- 圖片列表 -->
      <div class="flex overflow-x-auto whitespace-nowrap py-2">
        <template v-for="(image, index) in uploadedImages" :key="index">
          <img
            :src="image"
            alt="上傳的圖片"
            class="w-40 h-auto rounded-md mx-1"
          />
        </template>
      </div>

      <!-- 操作按鈕 -->
      <div class="flex flex-row items-center justify-between p-1">
        <div class="flex flex-row">
          <!-- 上傳圖片按鈕 -->
          <button @click="triggerUpload" :disabled="uploadedImages.length >= 10">
            <PhImageSquare :size="24" />
          </button>
          <!-- 隱藏的文件輸入框 -->
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            multiple
            class="hidden"
            @change="handleFileUpload"
          />
          <PhMapPin :size="24" />
          <PhHash :size="24" />
        </div>
        <!-- 文字長度限制 -->
        <p class="text-right text-gray-500 text-sm mt-1">
          {{ content.length }}/500
        </p>
      </div>
    </div>
    <div class="p-4">
      <button class="btn btn-sm w-full">
        <PhPaperPlaneTilt :size="16" />
        新增
      </button>
    </div>
  </div>
</template>

<script setup>
import { PhCaretLeft, PhImageSquare, PhMapPin, PhHash,PhPaperPlaneTilt } from "@phosphor-icons/vue";
import { ref } from "vue";

const content = ref(""); // 輸入內容
const fileInput = ref(null); // 綁定文件輸入框
const uploadedImages = ref([]); // 存儲上傳的圖片

// 觸發隱藏的文件輸入框
const triggerUpload = () => {
  fileInput.value.click();
};

// 處理文件上傳
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files); // 獲取所有選中的文件

  // 判斷剩餘可上傳圖片數量
  const remainingSlots = 10 - uploadedImages.value.length;
  const filesToUpload = files.slice(0, remainingSlots); // 限制新增圖片數量

  filesToUpload.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.value.push(e.target.result); // 將圖片的 Base64 URL 添加到列表中
    };
    reader.readAsDataURL(file); // 讀取文件作為 Data URL
  });

  // 清空文件輸入框的值，避免重複上傳相同文件
  event.target.value = "";
};
</script>

<style scoped>
/* 提供額外樣式以提升使用者體驗 */
input::placeholder {
  color: #c0c0c0;
}

/* 自定義滾動條隱藏 */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>