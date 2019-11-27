<template>
  <div class="siderbar">
    <el-menu
      default-active="dashboard"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <sidebar-item :menu="routes" />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical {
  width: 210px;
  height: 100%;
}
</style>
