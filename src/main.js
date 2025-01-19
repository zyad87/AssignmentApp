import { createApp } from 'vue';
import App from './App.vue';
import router from './router/Router'; 
import '@fortawesome/fontawesome-free/css/all.css';

import './style.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
