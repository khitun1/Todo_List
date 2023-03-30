import { createRouter, createWebHistory } from 'vue-router'
import listPage from "@/pages/listPage.vue";
import aboutPage from "@/pages/aboutPage.vue";
import settingsPage from "@/pages/settingsPage.vue";
import startPage from "@/pages/startPage.vue";
import type {Router} from 'vue-router';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: startPage,
    },
    {
      path: '/mine',
      name: 'myList',
      component: listPage,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage,
    },
    {
      path: '/settings',
      name: 'settings',
      component: settingsPage,
    },
  ]
})

export default router
