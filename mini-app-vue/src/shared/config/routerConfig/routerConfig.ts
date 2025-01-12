import { RouteRecordRaw } from "vue-router";

export enum AppRoutes {
  MAIN = "main",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.NOT_FOUND]: "/:pathMatch(.*)*",
};

export const RouteConfig: Record<AppRoutes, RouteRecordRaw> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    name: "home",
    component: () => import("@/pages/HomeView.vue"),
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    name: "not_found",
    component: () => import("@/pages/AboutView.vue"),
  },
};
