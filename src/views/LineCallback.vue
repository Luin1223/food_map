<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

onMounted(async () => {
  const code = route.query.code 
  
  // 建議：如果沒有 code，直接踢回登入頁，避免發送無效請求
  if (!code) {
    console.error('無授權碼')
    router.push('/login')
    return
  }

  try {
    // 建議：使用環境變數，避免寫死 localhost
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
    
    const res = await axios.post(`${apiUrl}/auth/line/code`, { code })

    const token = res.data.token
    const user = res.data.user

    // ==========================================
    // ★ 關鍵修正：必須手動存入 localStorage
    // 這樣 api.js 的攔截器才抓得到 Token！
    // ==========================================
    localStorage.setItem('token', token)

    // 同步存入 Pinia (為了讓畫面顯示頭像、名字)
    userStore.setUser({
      name: user.name,
      picture: user.picture,
      token: token
    })

    console.log('登入成功，跳轉首頁')
    router.push('/')
    
  } catch (err) {
    console.error('LINE 登入錯誤:', err)
    alert('登入失敗，請稍後再試')
    router.push('/login') // 失敗後踢回登入頁
  }
})
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <p class="text-xl font-bold">正在登入中...</p>
    </div>
</template>