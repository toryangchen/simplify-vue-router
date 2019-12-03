import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 解决思路：
// 由于获取到的keys是扁平化的数组，因此，将每个该文件名拆开：
// 如 ["./nested/menu1/index.vue"] => [".", "nested", "menu1", "index.vue"]
var pages;
var autoRouter = function(lazy = true) {
  var router = [];
  if (lazy) {
    pages = require.context("@/pages/", true, /\.vue$/, "lazy");
  } else {
    pages = require.context("@/pages/", true, /\.vue$/);
  }
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

// 获取路由的 component, 这里是懒加载
autoRouter.prototype.getComponent = key => {
  let filename = "";
  if (key.length === 1) {
    filename = key[0].replace(".vue", "");
  } else {
    filename = key.join("/").replace(".vue", "");
  }
  return () => import(`@/pages/${filename}`);
};

// 获取路由的meta, 会生成一个带有路由层级的数据结构, 一旦调用该函数,则会失去懒加载的功能
// DFS，
// 这里返回一个promise对象
autoRouter.prototype.createCell = async keys => {
  let res = [];

  // cells表示要返回的数组, path表示路径数组
  var saveInCells = (cells, path, metaInfo) => {
    if (path.length === 0) {
      return;
    }
    let index = cells.findIndex(cell => {
      return cell.name && cell.name === path[0];
    });
    if (index === -1) {
      let cell = {
        name: path[0],
      };
      if (path.length > 1) {
        cell.children = [];
        cells.push(cell);
        saveInCells(cells[cells.length - 1].children, path.slice(1), metaInfo);
      } else {
        cell.metaInfo = metaInfo;
        cells.push(cell);
      }
    } else {
      if (!cells[index].hasOwnProperty("children")) {
        cells[index].children = [];
      }
      saveInCells(cells[index].children, path.slice(1), metaInfo);
    }
  };
  for (const key of keys) {
    let component = await pages("./" + key.join("/"));
    saveInCells(res, key, component.default.metaInfo);
  }
  return res;
};

// 获取路由的 name
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

// 获取路由信息的path
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
