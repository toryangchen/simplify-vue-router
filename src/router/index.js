import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "firstPage",
      component: () => import("@/pages"),
    },
    {
      path: "/404",
      name: "404Page",
      component: () => import("@/pages/404"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/pages/dashboard"),
    },
    {
      path: "/nested/menu1/menu1-1",
      name: "menu1-1",
      component: () => import("@/pages/nested/menu1/menu1-1"),
    },
    {
      path: "/nested/menu1/menu1-2/menu1-2-1",
      name: "menu1-2-1",
      component: () => import("@/pages/nested/menu1/menu1-2/menu1-2-1"),
    },
    {
      path: "/nested/menu1/menu1-2/menu1-2-2",
      name: "menu1-2-2",
      component: () => import("@/pages/nested/menu1/menu1-2/menu1-2-2"),
    },
    {
      path: "/nested/menu1/menu1-3",
      name: "menu1-3",
      component: () => import("@/pages/nested/menu1/menu1-3"),
    },
    {
      path: "/nested/menu2",
      name: "menu2",
      component: () => import("@/pages/nested/menu2"),
    },
  ],
});

export default router;
