<template>
  <div class="sidebar">
    <template v-for="(item, index) in menu">
      <el-menu-item
        v-if="!item.hasOwnProperty('children') || item.children.length === 1"
        :key="index"
        :index="item.name || item.children[0].name"
        @click.native="onClick(item)"
      >
        <span :class="`el-icon-${getIcon(item)}`" />
        <span slot="title">{{ getTitle(item) }}</span>
      </el-menu-item>
      <el-submenu v-else :key="index" :index="item.name">
        <template slot="title">
          <span :class="`el-icon-${getSubInfo(item, false)}`" />
          <span slot="title">{{ getSubInfo(item, true) }}</span>
        </template>
        <sidebar-item :menu="item.children" />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menu: { type: Array, required: true }
  },
  methods: {
    getSubInfo(route, isTitle) {
      let key = route.name;
      let getInfo = (r, key) => {
        if (r.metaInfo && r.metaInfo[key]) {
          return r.metaInfo[key];
        }
        if (r.children) {
          return getInfo(r.children[0], key);
        }
        return "";
      };
      let info = getInfo(route, key);
      if (!info) {
        return "";
      }
      return isTitle ? info.title : info.icon;
    },
    getIcon(route) {
      if (route.hasOwnProperty("metaInfo")) {
        return route.metaInfo.icon;
      }
      if (route.hasOwnProperty("children") && route.children.length === 1) {
        return route.children[0].metaInfo
          ? route.children[0].metaInfo.icon
          : this.getIcon(route.children[0]);
      }
    },
    getTitle(route) {
      if (route.hasOwnProperty("metaInfo")) {
        return route.metaInfo.title;
      }
      if (route.hasOwnProperty("children") && route.children.length === 1) {
        return route.children[0].metaInfo
          ? route.children[0].metaInfo.title
          : this.getTitle(route.children[0]);
      }
    },
    onClick(item) {
      this.$router.push({ path: this.getPath(item) });
    },
    getPath(item) {
      if (!item.path) {
        if (item.hasOwnProperty("children")) {
          return this.getPath(item.children[0]);
        } else {
          return "/";
        }
      } else {
        return item.path;
      }
    }
  }
};
</script>

<style></style>
