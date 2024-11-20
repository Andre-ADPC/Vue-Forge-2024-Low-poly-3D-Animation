import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import '@tresjs/leches/styles'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
