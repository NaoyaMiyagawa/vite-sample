import { createApp } from 'vue';
import router from './router/index';
import App from './App.vue';
import 'virtual:windi.css';
import 'virtual:windi-devtools';

createApp(App).use(router).mount('#app');
