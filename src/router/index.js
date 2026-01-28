import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HelpPage from '@/views/HelpPage.vue';
import MapPage from '@/views/MapPage.vue';
import CommunityPage from '@/views/CommunityPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import AddPostPage from '@/views/AddPostPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import DeliciousPage from '@/views/DeliciousPage.vue';
import MessagePage from '@/views/MessagePage.vue';
import StoreDetail from '@/views/StoreDetail.vue';
import LineCallback from '@/views/LineCallback.vue';
import CollectPage from '@/views/CollectPage.vue';

const routes = [
  {
    path: '/',
    name: 'MapPage',
    component: MapPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/community',
    name: 'CommunityPage',
    component: CommunityPage,
  },
  {
    path: '/help',
    name: 'HelpPage',
    component: HelpPage,
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage,
  },
  {
    path: '/addpost',
    name: 'AddPostPage',
    component: AddPostPage,
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
  },
  {
    path: '/delicious',
    name: 'DeliciousPage',
    component: DeliciousPage,
  },
  {
    path: '/message',
    name: 'MessagePage',
    component: MessagePage,
  },
  {
    path: '/store/:id',
    name: 'StoreDetail',
    component: () => import('@/views/StoreDetail.vue')
  },
  {
    // ★ 這裡是關鍵：路徑必須跟 LINE Developer Console 設定的 Redirect URI 一致
    // Redirect URI 是 http://localhost:3000/line-callback
    path: '/line-callback',
    name: 'LineCallback',
    component: () => import('@/views/LineCallback.vue')
  },
  {
    path:'/collect',
    name: 'CollectPage',
    component:CollectPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;