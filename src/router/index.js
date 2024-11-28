import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HelpPage from '@/views/HelpPage.vue';
import MapPage from '@/views/MapPage.vue';
import CommunityPage from '@/views/CommunityPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/map',
    name: 'MapPage',
    component: MapPage,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;