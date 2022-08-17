import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import Vue3Geolocation from 'vue3-geolocation';

import './assets/styles/main.css'

createApp(App)
    .use(Vue3Geolocation)
    .mount('#app')
