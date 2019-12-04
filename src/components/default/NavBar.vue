<template>
  <div class="navbar">
    <div>
      <router-link to="/login">登录</router-link>
    </div>
    <div>
      <router-link to="/register">注册</router-link>
    </div>
    <div>
      <router-link to="/404">404</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar"
};
</script>
<style lang="less" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  div {
    line-height: 50px;
    margin: 0 10px;
    float: right;
  }
}
</style>
