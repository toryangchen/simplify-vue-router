<template>
  <div class="navbar">
    <div class="title">Demo for 'simplify-vue-router'</div>
    <div>
      <router-link :to="{ path:'/login/1234'}">登录</router-link>
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
  height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .title {
    float: left;
  }

  div {
    line-height: 60px;
    margin: 0 10px;
    float: right;
  }
}
</style>
