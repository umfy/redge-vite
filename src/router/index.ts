import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../pages/TodoPage.vue'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/todo', name: 'TodoPage', component: TodoPage }
  ]
})

export default router
