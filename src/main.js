import Vue from "vue";
// import App from "./utils/App.vue";
// import router from "./router";
// import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/common.less";
import { SimplifyPlugin, options } from "./utils/simplifyPlugin.js";

// import router from "./utils/autoRouter";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(SimplifyPlugin);

new Vue(options).$mount("#app");
