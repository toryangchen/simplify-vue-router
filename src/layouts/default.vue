<template>
  <el-container class="layout-default">
    <el-aside width="210px">
      <side-bar />
    </el-aside>
    <el-container>
      <el-header>
        <nav-bar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>this is default footer</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import NavBar from "@/components/default/NavBar.vue";
import SideBar from "@/components/default/SideBar";

export default {
  name: "default",
  components: { NavBar, SideBar }
};
</script>

<style lang="less" scoped>
.layout-default {
  height: 100%;
  .el-aside {
    height: 100%;
    background: #545c64;
  }
  .el-header {
    padding: 0px;
  }

  .el-footer {
    background: #cccccc;
    text-align: center;
    line-height: 60px;
  }
}
</style>
