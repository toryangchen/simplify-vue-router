<template>
  <div>nested -> menu1 -> menu1-1</div>
</template>
<script>
export default {
  metaInfo: {
    title: "Menu1-1",
    weight: 2,
    nested: { title: "Nested", icon: "menu" },
    menu1: { title: "Menu1", icon: "" }
  }
};
</script>

<style lang="less" scoped></style>
