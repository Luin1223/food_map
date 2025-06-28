<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

//取得路由與使用者store
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

//畫面載入時發送請求兌換token
onMounted(async () => {
  const code = route.query.code //從Line callback URL 拿到 code
  try {
    //呼叫後端API換token
    const res = await axios.post('http://localhost:8080/api/auth/line/code', { code })

    const token = res.data.token
    const user = res.data.user

    //呼叫 Pinia 的 setUser，包含 name, picture, token
    //存進Pinia，觸發user.js裡的setUser()方法
    userStore.setUser({
      name: user.name,
      picture: user.picture,
      token: token
    })
    router.push('/')
  } catch (err) {
    console.error('LINE 登入錯誤:', err)
  }
})
</script>