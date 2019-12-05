<template>
  <div>
    this is first page;
    <div>参数传递：{{id}}</div>
  </div>
</template>
<script>
export default {
  layout: "login",
  metaInfo: { hidden: true },
  data() {
    return {
      id: ""
    };
  },
  created() {
    let { params } = this.$route;
    this.id = params.id;
  }
};
</script>

<style lang="css" scoped></style>
