import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/layouts/default"),
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/pages/dashboard/index"),
          meta: { title: "Dashboard", icon: "location" }
        }
      ]
    },
    {
      path: "/nested",
      name: "nested",
      redirect: "/nested/menu1",
      component: () => import("@/layouts/default"),
      meta: {
        title: "Nested",
        icon: "menu"
      },
      children: [
        {
          path: "menu1",
          name: "menu1",
          component: () => import("@/pages/nested/menu1/index"),
          meta: { title: "Menu1" },
          children: [
            {
              path: "menu1-1",
              name: "menu1-1",
              component: () => import("@/pages/nested/menu1/menu1-1"),
              meta: { title: "Menu1-1" }
            },
            {
              path: "menu1-2",
              name: "menu1-2",
              component: () => import("@/pages/nested/menu1/menu1-2"),
              meta: { title: "Menu1-2" },
              children: [
                {
                  path: "menu1-2-1",
                  name: "menu1-2-1",
                  component: () =>
                    import("@/pages/nested/menu1/menu1-2/menu1-2-1"),
                  meta: { title: "Menu1-2-1" }
                },
                {
                  path: "menu1-2-2",
                  name: "menu1-2-2",
                  component: () =>
                    import("@/pages/nested/menu1/menu1-2/menu1-2-2"),
                  meta: { title: "Menu1-2-2" }
                }
              ]
            },
            {
              path: "menu1-3",
              name: "menu1-3",
              component: () => import("@/pages/nested/menu1/menu1-3"),
              meta: { title: "Menu1-3" }
            }
          ]
        },
        {
          path: "menu2",
          name: "menu2",
          component: () => import("@/pages/nested/menu2/index"),
          meta: { title: "Menu2" }
        }
      ]
    }
  ]
});
