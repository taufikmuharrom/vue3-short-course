import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/computed-vs-method',
      name: 'computed-vs-method',
      component: () => import('../views/ComputedVsMethod.vue'),
    },
    {
      path: '/session-2',
      name: 'session-2',
      component: () => import('../views/Session2.vue'),
    },
    {
      path: '/watch-vs-watch-effect',
      name: 'watch-vs-watch-effect',
      component: () => import('../views/WatchVsWatchEffect.vue'),
    },
    {
      path: '/lifecycle-vue',
      name: 'lifecycle-vue',
      component: () => import('../views/LifecycleVue.vue'),
    },
  ],
})

export default router
