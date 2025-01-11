import { createApp } from "vue";
import App from "./app/App.vue";
import "./app/registerServiceWorker";
import router from "./app/router";
import store from "./app/store";

createApp(App).use(store).use(router).mount("#app");
