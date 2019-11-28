import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/common.less";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    let { layout } = to.matched[0].components.default;
    if (layout) {
      store.commit("SET_LAYOUT", layout);
    } else {
      store.commit("SET_LAYOUT", "default");
    }
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
