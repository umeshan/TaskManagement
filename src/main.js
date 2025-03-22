import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from './router';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App)
  .use(router)  // Use the router
  .mount('#app');
