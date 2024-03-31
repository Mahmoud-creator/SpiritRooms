import './assets/main.css'
import PrimeVue from 'primevue/config';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'l2o7syleu1etvue9bjbh',
    wsHost: 'localhost',
    wsPort: 8080 ?? 80,
    wssPort: 8080 ?? 443,
    forceTLS: ('http' ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')


