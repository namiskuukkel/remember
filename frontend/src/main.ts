/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import router from './router'

// Components
import App from './App.vue'
// Your code here


// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(router).mount('#app')
