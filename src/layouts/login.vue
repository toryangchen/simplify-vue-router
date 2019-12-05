<template>
  <el-container>
    <el-header>Login page</el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>Login page footer layout</el-footer>
  </el-container>
</template>
<script>
export default {
  name: "login"
};
</script>
<style lang="less" scoped></style>
