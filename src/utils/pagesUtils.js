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
    if (key.length === 1) {
      router.push({
        name: this.getName(key),
        path: this.getPath(key),
        component: this.getComponent(key),
      });
    }
  }
  console.log(router);
};

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

autoRouter.prototype.getComponent = key => {
  let filename = "";
  if (key.length === 1 && key[0].lastIndexOf(".vue") !== -1) {
    filename = key[0].replace(".vue", "");
  }
  return () => import(`@/pages/${filename}`);
};

autoRouter.prototype.getName = key => {
  if (key.length === 1 && key[0].lastIndexOf(".vue") !== -1) {
    return key[0].replace(".vue", "");
  }
  return "name";
};

autoRouter.prototype.getPath = key => {
  if (key.length === 1 && key[0].lastIndexOf(".vue") !== -1) {
    return key[0].replace(".vue", "");
  }
  return "path";
};

export default autoRouter;
