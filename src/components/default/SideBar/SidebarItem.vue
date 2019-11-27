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
          <span :class="`el-icon-${getIcon(item)}`" />
          <span slot="title">{{ getTitle(item) }}</span>
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
    getIcon(route) {
      if (route.hasOwnProperty("meta")) {
        return route.meta.icon;
      }
      if (route.hasOwnProperty("children") && route.children.length === 1) {
        return route.children[0].meta.icon;
      }
    },
    getTitle(route) {
      if (route.hasOwnProperty("meta")) {
        return route.meta.title;
      }
      if (route.hasOwnProperty("children") && route.children.length === 1) {
        return route.children[0].meta.title;
      }
    },
    onClick(item) {
      let name = "";
      if (!item.name) {
        name = item.children[0].name;
      } else {
        name = item.name;
      }
      if (name === this.$route.name) {
        return;
      }
      this.$router.push({ name });
    }
  }
};
</script>

<style></style>
