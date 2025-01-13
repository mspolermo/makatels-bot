import { createApp } from "vue";
import App from "@/app/App.vue";
import "@/app/providers/registerServiceWorker";
import router from "@/app/providers/router";
import store from "@/app/providers/store";

import "@/app/styles/index.css";

createApp(App).use(store).use(router).mount("#app");
