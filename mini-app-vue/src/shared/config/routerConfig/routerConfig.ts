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
    name: "MainPage",
    component: () => import("@/pages/MainPage/MainPage.vue"),
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    name: "NotFoundPage",
    component: () => import("@/pages/NotFoundPage/NotFoundPage.vue"),
  },
};
