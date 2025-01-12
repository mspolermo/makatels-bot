import { createApp } from "vue";
import App from "./app/App.vue";
import "./app/registerServiceWorker";
import router from "./app/providers/router";
import store from "./app/providers/store";

createApp(App).use(store).use(router).mount("#app");
