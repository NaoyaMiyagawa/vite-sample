import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Population from '@/views/Population.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/population',
    name: 'Population',
    component: Population,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
