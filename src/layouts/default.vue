<template>
  <div class="layout-default">
    <side-bar />
    <div class="main-container">
      <nav-bar />
      <router-view />
    </div>
  </div>
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
  display: flex;
  flex-direction: row;
  .main-container {
    width: 100%;
    height: 100%;
    .nav-container {
      height: 80px;
    }
  }
}
</style>
