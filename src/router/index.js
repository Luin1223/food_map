import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HelpPage from '@/views/HelpPage.vue';
import MapPage from '@/views/MapPage.vue';
import CommunityPage from '@/views/CommunityPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage,
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityPage,
  },
  {
    path: '/help',
    name: 'Help',
    component: HelpPage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;