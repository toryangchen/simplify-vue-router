<template>
  <el-container>
    <el-header>Error page</el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>error page / 404 page layout</el-footer>
  </el-container>
</template>
<script>
export default {
  name: "error"
};
</script>

<style lang="less" scoped></style>

