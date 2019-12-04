import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 构造函数
var AutoRouter = function() {
  this.pages = require.context("@/pages/", true, /\.vue$/, "lazy");
  this.keys = this.pages.keys().map(item => {
    return item.replace("./", "").split("/");
  });
};

// 解决思路：
// 由于获取到的keys是扁平化的数组，因此，将每个该文件名拆开：
// 如 ["./nested/menu1/index.vue"] => [".", "nested", "menu1", "index.vue"]
AutoRouter.prototype.getRouter = function() {
  var router = [];
  for (const key of this.keys) {
    router.push({
      name: this.getName(key),
      path: this.getPath(key),
      component: this.getComponent(key),
    });
  }
  return router;
};

// 获取路由的 component, 这里是懒加载
AutoRouter.prototype.getComponent = function(key) {
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
AutoRouter.prototype.createCell = async function() {
  let res = [];
  // cells表示要返回的数组, path表示路径数组
  var saveInCells = (cells, path, originInfo) => {
    if (path.length === 0) {
      return;
    }
    let index = cells.findIndex(cell => {
      return cell.name && cell.name === path[0];
    });
    if (index === -1) {
      // 如果当前cells中没有该路径，创建路径
      let cell = {
        name: path[0],
      };
      if (path.length > 1) {
        cell.children = [];
        cells.push(cell);
        saveInCells(
          cells[cells.length - 1].children,
          path.slice(1),
          originInfo,
        );
      } else {
        cells.push(Object.assign(cell, originInfo));
      }
    } else {
      // 如果当前cells中有该路径，使用该路径
      if (!cells[index].hasOwnProperty("children")) {
        cells[index].children = [];
      }
      saveInCells(cells[index].children, path.slice(1), originInfo);
    }
  };

  var sortCells = cells => {
    cells.sort((item1, item2) => {
      if (item1.hasOwnProperty("children")) {
        sortCells(item1.children);
      }
      if (item2.hasOwnProperty("children")) {
        sortCells(item2.children);
      }
      return getWeight(item1) - getWeight(item2);
    });
  };

  var getWeight = cell => {
    if (cell["metaInfo"] && cell.metaInfo.weight) {
      return cell.metaInfo.weight;
    } else {
      if (cell.hasOwnProperty("children")) {
        return getWeight(cell.children[0]);
      } else {
        return Number.MAX_SAFE_INTEGER;
      }
    }
  };

  for (const key of this.keys) {
    let component = await this.pages("./" + key.join("/"));
    if (component.default.metaInfo && component.default.metaInfo.hidden) {
      continue;
    }
    let originInfo = {
      path: this.getPath(key),
      metaInfo: component.default.metaInfo,
    };
    saveInCells(res, key, originInfo);
  }

  sortCells(res);

  return res;
};

// 获取路由的 name
AutoRouter.prototype.getName = function(key) {
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
AutoRouter.prototype.getPath = function(key) {
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
    return "/" + key.join("/").replace(".vue", "");
  }
};

// var auto = new AutoRouter();
// let routes = auto.getRouter();

// auto.createCell().then(res => {
//   console.log(res);
// });

export default AutoRouter;
