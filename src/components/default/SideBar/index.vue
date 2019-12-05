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
  data() {
    return {
      routes: []
    };
  },
  created() {
    console.log(this.$router.options.routes);
    this.$createCell.then(res => {
      this.routes = res;
    });
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical {
  width: 210px;
  height: 100%;
}
</style>
