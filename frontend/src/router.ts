import {createWebHistory, createRouter } from 'vue-router'

import RememberView from './pages/RememberView.vue'
import CalendarView from './pages/CalendarView.vue'

const routes = [
  { path: '/', component: RememberView },
  { path: '/calendars', component: CalendarView}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router