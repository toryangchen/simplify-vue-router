import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const pages = require.context("@/pages/", true, /\.vue$/, "lazy");

// 解决思路：
// 由于获取到的keys是扁平化的数组，因此，将每个该文件名拆开：
// 如 ["./nested/menu1/index.vue"] => [".", "nested", "menu1", "index.vue"]

var autoRouter = function() {
  var router = [];
  let keys = pages.keys().map(item => {
    return item.replace("./", "").split("/");
  });
  for (const key of keys) {
    router.push({
      name: this.getName(key),
      path: this.getPath(key),
      component: this.getComponent(key),
    });
  }
  return router;
};

autoRouter.prototype.getComponent = key => {
  let filename = "";
  if (key.length === 1) {
    filename = key[0].replace(".vue", "");
  } else {
    filename = key.join("/").replace(".vue", "");
  }
  return () => import(`@/pages/${filename}`);
};

autoRouter.prototype.getName = key => {
  if (key.length === 1) {
    return key[0].replace(".vue", "");
  }
  if (key[key.length - 1] === "index.vue") {
    return key[key.length - 2];
  } else {
    return key[key.length - 1].replace(".vue", "");
  }
};

autoRouter.prototype.getPath = key => {
  if (key.length === 1) {
    if (key[0] === "index.vue") {
      return "/";
    } else {
      return "/" + key[0].replace(".vue", "");
    }
  }
  if (key[key.length - 1] === "index.vue") {
    return "/" + key.slice(0, key.length - 1).join("/");
  } else {
    return "/" + key.join("/");
  }
};

export default new Router({ routes: new autoRouter() });
