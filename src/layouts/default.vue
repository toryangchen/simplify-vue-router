<template>
  <div class="layout-default">
    <side-bar></side-bar>
    <nav-bar></nav-bar>
    <div>App Main</div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import NavBar from "@/components/default/NavBar.vue";
import SideBar from "@/components/default/SideBar.vue";

export default {
  name: "default",
  components: { NavBar, SideBar }
};
</script>

<style lang="css" scoped></style>
