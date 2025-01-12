import { createRouter, createWebHistory } from "vue-router";
import { RouteConfig } from "@/shared/config/routerConfig/routerConfig";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: Object.values(RouteConfig),
});

export default router;
