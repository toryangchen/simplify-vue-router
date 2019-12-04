import store from "../store";
import App from "./App.vue";
import Router from "vue-router";
import AutoRouter from "./autoRouter.js";

const layouts = require.context("@/layouts/", true, /\.vue$/, "lazy");
const SimplifyPlugin = {};

let route = [
  {
    path: "/",
    redirect: "/dashboard",
  },
];

const auto = new AutoRouter();
const router = new Router({
  routes: route.concat(auto.getRouter()),
});

const options = {
  router,
  store,
  render: h => h(App),
};

SimplifyPlugin.install = function(Vue, options) {
  Vue.use(Router);

  Vue.prototype.$createCell = auto.createCell();

  Vue.mixin({
    beforeRouteEnter(to, from, next) {
      let { layout } = to.matched[0].components.default;
      if (layout) {
        store.commit("SET_LAYOUT", layout);
      } else {
        store.commit("SET_LAYOUT", "default");
      }
      next();
    },
  });

  layouts.keys().forEach(element => {
    let name = element.match(/.\/(\S*)\.vue$/)[1];
    Vue.component(name, () => import(`@/layouts/${name}`));
  });
};

export { SimplifyPlugin, options };
