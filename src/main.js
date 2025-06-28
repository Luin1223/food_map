import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style/index.css';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia()); // ✅ 新增
app.use(router);
app.mount('#app');