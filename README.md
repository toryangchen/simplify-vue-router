# 换个优雅地方式写Vue的路由配置

[原文链接](https://www.toryang.top/archives/251)

## Installation

将项目`utils/`下的内容拷贝到你的项目中；

改变`main.js`中引入方式：

```javascript
import Vue from "vue";
//...其它包引入
import { SimplifyPlugin, options } from "./utils/simplifyPlugin.js";

Vue.config.productionTip = false;

// 使用插件
Vue.use(SimplifyPlugin); 

// 替换全局Vue实例的options
new Vue(options).$mount("#app");
```

## Usages

在项目src目录下，新建`pages`和`layouts`两个文件夹即可，pages文件夹下的文件即可自动生成路由；

**举例：**

`pages/dashboard.vue`

```javascript
<template>
  <div>this is dashboard page;</div>
</template>
<script>
export default {
  layout: "default",
  metaInfo: { title: "Dashboard", icon: "location", weight: 1 },
};
</script>
<style lang="less" scoped></style>
```

`layout/default.vue`

```javascript
<template>
  <div>
    <div>default page Head</div>
    <router-view />
    <div>default page Footer</div>
  </div>
</template>
<script>
export default {
  name: "default"
};
</script>

<style lang="less" scoped></style>
```

执行`npm run serve`启动项目，浏览器打开我们写的页面路由，就可以看到该项目效果：
`http://localhost:8080/#/dashboard`

## Others Function

### 1. 动态路由

如：`pages/_login.vue` 生成的路由配置为 --> `path: "/dashboard/login/:id"`

### 2. 页面层级数据结构：

*一旦调用该函数，页面懒加载失效*

在pages文件夹下的页面可以加入一个数据：`metaInfo:{weight|Number, hidden:boolean}`：
* weight：表示页面权重，用来排序；
* hidden：表示该页面是否出现在生成的数组中；

获取该结构的全局函数：`this.$createCell`，该函数返回为一个promise对象，具体使用可[看这里](https://github.com/toryangchen/simplify-vue-router/blob/master/src/components/default/SideBar/index.vue)：

举例：

如果pages的层级如下：

```
pages
  |-- dashboard
  |     |--index.vue (weight: 4)
  |-- nested
  |     |--menu1
  |     |    |--menu1-1.vue (weight: 3)
  |     |    |--menu1-2.vue  (weight: 2)
  |     |--menu2
  |     |    |-- menu2-1
  |     |    |     |-- menu2-1-1
  |     |    |     |       |--index.vue (weight: 1)
  | --- index.vue (hidden: true)
```

那么调用`this.$createCell`函数生成的数据结构如下：

```javascript
[
  {
    name: "nested",
    children: [
      {
        name: "menu2",
        children: [
          {
            name: "menu2-1",
            children: [
              {
                name: "menu2-1-1",
                path: "/nested/menu2/men2-1/menu2-1-1",
                metaInfo: { weight: 1 ... },
              },
            ],
          },
        ],
      },
      {
        name: "menu1",
        children: [
          {
            name: "menu1-2",
            path: "/nested/menu1/menu1-2",
            metaInfo: { weight: 2 ... },
          },
          {
            name: "menu1-1",
            path: "/nested/menu1/menu1-1",
            metaInfo: { weight: 3 ... },
          },
        ],
      },
    ],
  },
  {
    name: "dashboard",
    path: "/dashboard",
    metaInfo: { weight: 4 ... },
  },
];
```
