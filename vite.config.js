import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true, // 允許區域網路訪問
    port: 3000,  // 設置你希望使用的端口
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
