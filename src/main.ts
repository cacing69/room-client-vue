import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// vant-3 ui
import { Button } from "vant";

const vApp = createApp(App);

vApp.use(Button)

vApp.mount("#app");
