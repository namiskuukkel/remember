import { createMemoryHistory, createRouter } from 'vue-router'

import RememberView from './pages/RememberView.vue'

const routes = [
  { path: '/', component: RememberView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router