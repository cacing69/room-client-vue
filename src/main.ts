import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerSW } from "virtual:pwa-register";

// vant-3 ui
import { Button } from "vant";

const updateSW = registerSW({
  onOfflineReady() {},
});

const vApp = createApp(App);

vApp.use(Button)

vApp.mount("#app");
