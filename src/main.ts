import { createPinia } from 'pinia';
import { createApp } from 'vue'
import { responsive } from './mixins/responsive';
import './styles/main.scss';
import router from "./router/index";
import App from './App.vue'

const app = createApp(App);
app.use(createPinia());
app.config.globalProperties.$responsive = responsive;
app.use(router);
app.mount('#app');
