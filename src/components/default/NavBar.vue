<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container"></breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
export default {
  name: "navbar",
  components: {
    Breadcrumb,
  },
};
</script>
<style lang="less" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .breadcrumb-container {
    float: left;
  }
}
</style>
